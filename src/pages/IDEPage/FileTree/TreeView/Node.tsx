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

  const onClickNode = async () => {
    setSelectedNode(node);
    console.log(node);
    if (!node.children && !Files.find(file => file.id === node.data.id)) {
      //백엔드로 파일 read 로직 후 코드 업데이트
      //content에 파일 read 해 온 content 넣기
      await setFiles([...Files, { id: node.data.id, content: '', name: node.data.name, modifyContent: '' }]);
      setCode({ id: node.data.id, content: '' });
      //FileState 업데이트 되면 리렌더링 해야할듯
    }
  };
  // useEffect(() => {
  //   if (node.data.id === code.id && selectedNode === node) {
  //     setSelectedNode(node);
  //   }
  // }, [node, code.id, setSelectedNode, selectedNode]);

  const onDeleteClickHandler = () => {
    confirmAlert({
      title: '삭제',
      message: `"${node.data.name}"을 삭제하시겠습니까?`,
      buttons: [
        {
          label: '네',
          onClick: () => {
            //파일 삭제하는 로직
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
