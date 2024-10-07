import { NodeApi, NodeRendererProps } from 'react-arborist';
import { BsFolder } from 'react-icons/bs';
import { FaAngleDown, FaAngleRight, FaRegFile } from 'react-icons/fa6';

import { SetStateAction, useEffect } from 'react';
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
import FolderRequest from '../../../../apis/IDE/File/FolderReqeust';
import FolderState from '../../../../recoil/Folder/atoms';
import { IFile } from '../../../../recoil/File/type';
import Select from '../../../../recoil/Select/atom';

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
  const setFolder = useSetRecoilState(FolderState);
  const [code, setCode] = useRecoilState(CodeState);
  const [select, setSelect] = useRecoilState(Select);
  const isSelected = selectedNode?.id === node.id || select === node.id;
  const [cookies] = useCookies(['Authorization']);
  const Authorization = cookies['Authorization'];
  const { projectId } = useParams();
  const id = Number(projectId);
  const fileId = Number(node.data.id);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const fetchStreamAsString = async () => {
    const response = await fetch(`${baseURL}/projects/${id}/files/${fileId}`, {
      headers: {
        Authorization: `Bearer ${Authorization}`,
      },
    });

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
    setSelect('');
    console.log(node);

    // node.data.id와 동일한 파일이 있는지 찾기
    const foundFile = Files.find(file => file.id === node.data.id);

    // 파일이 이미 열려있지 않으면 새로 열고, 파일 내용 로드
    if (!node.children && !foundFile) {
      fetchStreamAsString()
        .then(result => {
          console.log('파일 내용: ', result);
          const newFile = {
            id: node.data.id,
            content: result,
            name: node.data.name,
            modifyContent: result,
          };

          // 이전 상태를 기반으로 새로운 상태 업데이트
          setFiles(prevFiles => {
            // 현재 코드 상태를 저장
            const currentCode = code;

            // Files 상태 업데이트
            const updatedFiles = prevFiles.map(f => {
              if (f.id === currentCode.id) {
                return { ...f, modifyContent: currentCode.content }; // 현재 코드의 modifyContent 업데이트
              }
              return f;
            });

            // 새로운 파일 추가
            return [...updatedFiles, newFile]; // 이전 파일 배열에 새로운 파일 추가
          });

          setCode({ id: node.data.id, content: result });
        })
        .catch(error => console.error('Error fetching stream data: ', error));
    }

    // 파일이 이미 열려있는 경우 해당 파일의 onClick 함수 실행
    if (foundFile) {
      handleFileClick(foundFile); // 파일 목록에서 onClick과 동일한 로직을 실행
    }
  };

  // 파일을 클릭할 때 실행할 함수
  const handleFileClick = (file: IFile) => {
    const currentCode = code;
    // FileList에서의 onClick 로직을 실행
    const newFile = Files.map(f => {
      if (f.id === currentCode.id) {
        return { ...f, modifyContent: currentCode.content };
      }
      return f;
    });

    setFiles(newFile);
    setCode({ id: file.id, content: file.modifyContent });
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
        const response = await FolderRequest(id, Authorization);
        const { files } = response.data;
        setFolder(files);
        const newFile = Files.filter(file => file.id !== node.data.id);
        setFiles(newFile);
        if (newFile.length !== 0) {
          setCode({ id: newFile[0].id, content: newFile[0].content });
        }
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
          if (status === 400) {
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

  useEffect(() => {}, []);

  return (
    <NodeContainer style={style} onClick={onClickNode} className={isSelected ? 'selected' : ''}>
      <div className="node-content" onClick={() => node.isInternal && node.toggle()} style={{ display: 'flex' }}>
        {node.children ? node.isOpen ? <FaAngleDown color={'white'} /> : <FaAngleRight color={'white'} /> : null}

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
              <MdDeleteOutline color={isSelected ? 'black' : 'white'} />
            </div>
          )}
        </div>
      </div>
    </NodeContainer>
  );
}

export default Node;
