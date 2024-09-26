// 커스텀 노드 생성
import { NodeRendererProps } from 'react-arborist';
import { BsFolder } from 'react-icons/bs';
import { FaAngleDown, FaAngleRight, FaRegFile } from 'react-icons/fa6';

export interface TreeNode {
  id: string;
  name: string;
  childern?: TreeNode[];
}

function Node({ node, style }: NodeRendererProps<TreeNode>) {
  // console.log(node, tree);
  return (
    <div className="node-container" style={style}>
      <div className="node-content" onClick={() => node.isInternal && node.toggle()} style={{ cursor: 'pointer' }}>
        {/* isOpen : 하위 요소 노출 여부 */}
        {node.children ? node.isOpen ? <FaAngleDown color="white" /> : <FaAngleRight color="white" /> : null}

        {/* isInternal: 하위 요소 존재 여부 */}
        {node.children ? <BsFolder color="white" /> : <FaRegFile color="white" />}

        <span style={{ color: 'white', paddingLeft: '8px' }}>
          <span>{node.data.name}</span>
        </span>
      </div>
    </div>
  );
}

export default Node;
