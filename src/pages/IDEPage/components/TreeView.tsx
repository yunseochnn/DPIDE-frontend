import { Tree, TreeApi } from 'react-arborist';
import { data } from '../mock/data';
import Node, { TreeNode } from './Node';

interface Props {
  treeRef: React.MutableRefObject<TreeApi<TreeNode> | null>;
}

const TreeView = ({ treeRef }: Props) => {
  return (
    <div>
      <Tree data={data} ref={treeRef}>
        {props => <Node {...props} />}
      </Tree>
    </div>
  );
};

export default TreeView;
