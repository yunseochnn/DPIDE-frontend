import { Tree, TreeApi } from 'react-arborist';

import Node, { TreeNode } from './Node';
import { data } from '../../mock/data';

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
