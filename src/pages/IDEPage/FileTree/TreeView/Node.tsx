import { NodeApi, NodeRendererProps } from 'react-arborist';
import { BsFolder } from 'react-icons/bs';
import { FaAngleDown, FaAngleRight, FaRegFile } from 'react-icons/fa6';

import { SetStateAction } from 'react';
import { IFolder } from '../../../../recoil/Folder/types';
import { MdDeleteOutline } from 'react-icons/md';
import { useRecoilState } from 'recoil';
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
import FileContentRequest from '../../../../apis/IDE/File/FileContentRequest';

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
  const [code, setCode] = useRecoilState(CodeState);
  const isSelected = selectedNode?.id === node.id;
  const [cookies] = useCookies(['Authorization']);
  const Authorization = cookies['Authorization'];
  const { projectId } = useParams();
  const id = Number(projectId);
  const fileId = Number(node.data.id);

  const onClickNode = async () => {
    setSelectedNode(node);
    console.log(node);
    if (!node.children && !Files.find(file => file.id === node.data.id)) {
      //백엔드로 파일 read 로직 후 코드 업데이트
      // try {
      //   const response = await FileContentRequest(id, fileId, Authorization);

      //   if (!response) {
      //     alert('네트워크 오류');
      //     return;
      //   }

      //   //Blob 데이터를 문자열로 변화
      //   const blobToString = (blob: Blob): Promise<string> => {
      //     return new Promise((resolve, reject) => {
      //       const reader = new FileReader();
      //       reader.onload = () => resolve(reader.result as string); //성공적으로 읽으면 resolve
      //       reader.onerror = reject; //읽기 실패 시 reject
      //       reader.readAsText(blob); //Blob을 텍스트로 읽기
      //     });
      //   };

      //   const fileContent = await blobToString(response); //Blob을 문자열로 변환
      //   console.log('받아온 내용: ', fileContent);

      //   //content에 파일 read 해 온 content 넣기
      //   await setFiles([
      //     ...Files,
      //     { id: node.data.id, content: fileContent, name: node.data.name, modifyContent: fileContent },
      //   ]);
      //   setCode({ id: node.data.id, content: fileContent });
      // } catch (error) {
      //   console.log(error);
      //   if (axios.isAxiosError(error)) {
      //     if (error.response) {
      //       const { status } = error.response;
      //       if (status === 404) {
      //         console.log('파일을 찾을 수 없음');
      //       } else if (status === 500) {
      //         console.log('서버 오류');
      //       }
      //     }
      //   }
      // }
      await setFiles([...Files, { id: node.data.id, content: '', name: node.data.name, modifyContent: '' }]);
      setCode({ id: node.data.id, content: '' });
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
      if (status === 200) {
        toast.dark('파일이 삭제되었습니다.');
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
      title: '삭제',
      message: `"${node.data.name}"을 삭제하시겠습니까?`,
      buttons: [
        {
          label: '네',
          onClick: () => {
            RemoveFileResponse();
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
