import { NodeApi, NodeRendererProps } from 'react-arborist';
import { BsFolder } from 'react-icons/bs';
import { FaAngleDown, FaAngleRight, FaRegFile } from 'react-icons/fa6';

import { SetStateAction } from 'react';
import { IFolder } from '../../../../recoil/Folder/types';

interface NodeProps extends NodeRendererProps<IFolder> {
  isSelected: boolean;
  setSelectedNode: React.Dispatch<SetStateAction<NodeApi<IFolder> | null>>;
}

function Node({ node, style, isSelected, setSelectedNode }: NodeProps) {
  const nodeStyle = {
    ...style,
    backgroundColor: isSelected ? '#d3d3d3' : 'transparent',
    paddingTop: '2px',
    paddingBottom: '2px',
  };

  return (
    <div
      className="node-container"
      style={nodeStyle}
      onClick={() => {
        setSelectedNode(node);
        console.log(node);
      }}
    >
      <div className="node-content" onClick={() => node.isInternal && node.toggle()} style={{ cursor: 'pointer' }}>
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

        <span style={{ color: isSelected ? 'black' : 'white', paddingLeft: '8px' }}>
          <span>{node.data.name}</span>
        </span>
      </div>
    </div>
  );
}

export default Node;
