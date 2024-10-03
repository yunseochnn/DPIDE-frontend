import { NodeApi, NodeRendererProps } from 'react-arborist';
import { BsFolder } from 'react-icons/bs';
import { FaAngleDown, FaAngleRight, FaRegFile } from 'react-icons/fa6';

import { SetStateAction } from 'react';
import { IFolder } from '../../../../recoil/Folder/types';
import { MdDeleteOutline } from 'react-icons/md';
import { useRecoilState, useSetRecoilState } from 'recoil';
import FileState from '../../../../recoil/File/atoms';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import styled from 'styled-components';
import CodeState from '../../../../recoil/Code/atoms';
import RemoveFileRequest from '../../../../apis/IDE/File/RemoveFileRequest';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';

interface NodeProps extends NodeRendererProps<IFolder> {
  selectedNode: NodeApi<IFolder> | null;
  setSelectedNode: React.Dispatch<SetStateAction<NodeApi<IFolder> | null>>;
}

const NodeContainer = styled.div`
  background-color: transparent;
  padding-top: 2px;
  padding-bottom: 2px;
  cursor: pointer;

  &:hover {
    background-color: gray;
  }

  &.selected {
    background-color: #d3d3d3;
    &:hover {
      background-color: #d3d3d3;
    }
  }
`;

function Node({ node, style, selectedNode, setSelectedNode }: NodeProps) {
  const [Files, setFiles] = useRecoilState(FileState);
  const setCode = useSetRecoilState(CodeState);
  const isSelected = selectedNode?.id === node.id;
  const [cookies] = useCookies(['Authorization']);
  const Authorization = cookies['Authorization'];
  const { projectId } = useParams();
  const id = Number(projectId);
  const fileId = Number(node.data.id);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const fetchStreamAsString = async () => {
    const response = await fetch(`${baseURL}/projects/${id}/files/${fileId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('파일을 찾을 수 없습니다. (404)');
      } else if (response.status === 500) {
        throw new Error('서버 오류가 발생했습니다. (500)');
      } else {
        throw new Error(`HTTP 오류 발생: ${response.status}`);
      }
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('stream을 읽을 수 없습니다.');
    }

    const decoder = new TextDecoder('utf-8');
    let result = ''; //최종적으로 받을 문자열을 저장하는 변수

    //스트림 데이터 반복해서 읽기
    while (true) {
      const { done, value } = await reader.read(); //청크 데이터를 읽음

      if (done) {
        console.log('Stream complete');
        break;
      }

      const text = decoder.decode(value, { stream: true }); //바이너리 데이터를 문자열로 변환
      result += text; //읽은 문자열을 result에 추가
    }
    return result; //전체 데이터를 합친 문자열 반환
  };

  const onClickNode = async () => {
    setSelectedNode(node);
    console.log(node);
    if (!node.children && !Files.find(file => file.id === node.data.id)) {
      //백엔드로 파일 read 로직 후 코드 업데이트
      fetchStreamAsString()
        .then(result => {
          console.log('파일 내용: ', result);
          setFiles([...Files, { id: node.data.id, content: result, name: node.data.name, modifyContent: result }]);
          setCode({ id: node.data.id, content: result });
        })
        .catch(error => console.error('Error fetching stream data: ', error));
    }
  };

  const RemoveFileResponse = async () => {
    try {
      const response = await RemoveFileRequest(id, fileId, Authorization);

      if (!response) {
        alert('네트워크 문제');
        return;
      }

      const { status } = response;
      if (status === 204) {
        toast.dark('파일이 삭제되었습니다.', {
          pauseOnHover: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { status } = error.response;
          if (status === 404) {
            console.log('파일을 찾을 수 없습니다.');
          } else if (status === 500) {
            console.log('서버 오류');
          }
        }
      }
    }
  };

  const onDeleteClickHandler = () => {
    confirmAlert({
      message: `"${node.data.name}"을 삭제하시겠습니까?`,
      buttons: [
        {
          label: '네',
          onClick: async () => {
            await RemoveFileResponse();
            setSelectedNode(null);
          },
        },
        {
          label: '아니오',
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <NodeContainer style={style} onClick={onClickNode} className={isSelected ? 'selected' : ''}>
      <div className="node-content" onClick={() => node.isInternal && node.toggle()} style={{ display: 'flex' }}>
        {node.children ? (
          node.isOpen ? (
            <FaAngleDown color={isSelected ? 'black' : 'white'} />
          ) : (
            <FaAngleRight color={isSelected ? 'black' : 'white'} />
          )
        ) : null}

        {node.children ? (
          <BsFolder color={isSelected ? 'black' : 'white'} />
        ) : (
          <FaRegFile color={isSelected ? 'black' : 'white'} />
        )}
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <span style={{ color: isSelected ? 'black' : 'white', paddingLeft: '8px' }}>
            {node.isEditing ? <span>생성중</span> : <span>{node.data.name}</span>}
          </span>
          {isSelected && (
            <div style={{ paddingRight: '8px' }} onClick={onDeleteClickHandler}>
              <MdDeleteOutline />
            </div>
          )}
        </div>
      </div>
    </NodeContainer>
  );
}

export default Node;
