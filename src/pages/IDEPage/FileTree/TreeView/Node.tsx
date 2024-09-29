import { NodeApi, NodeRendererProps } from 'react-arborist';
import { BsFolder } from 'react-icons/bs';
import { FaAngleDown, FaAngleRight, FaRegFile } from 'react-icons/fa6';

import { SetStateAction } from 'react';
import { IFolder } from '../../../../recoil/Folder/types';
import { MdDeleteOutline } from 'react-icons/md';

interface NodeProps extends NodeRendererProps<IFolder> {
  selectedNode: NodeApi<IFolder> | null;
  setSelectedNode: React.Dispatch<SetStateAction<NodeApi<IFolder> | null>>;
}

function Node({ node, style, selectedNode, setSelectedNode }: NodeProps) {
  const isSelected = selectedNode?.id === node.id;

  const nodeStyle = {
    ...style,
    backgroundColor: isSelected ? '#d3d3d3' : 'transparent',
    paddingTop: '2px',
    paddingBottom: '2px',
    cursor: 'pointer',
    width: '90%',
  };
  const onDeleteClickHandler = () => {};

  return (
    <div
      className="node-container"
      style={nodeStyle}
      onClick={() => {
        setSelectedNode(node);
        console.log(node);
      }}
    >
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
    </div>
  );
}

export default Node;
