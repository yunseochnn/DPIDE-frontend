import { Tree, TreeApi } from 'react-arborist';

import Node, { TreeNode } from './Node';

import { useRecoilState } from 'recoil';
import { FolderState } from '../../../../stores';

interface Props {
  treeRef: React.MutableRefObject<TreeApi<TreeNode> | null>;
}

const TreeView = ({ treeRef }: Props) => {
  const [Folder, setFolder] = useRecoilState(FolderState);
  return (
    <div>
      <Tree data={Folder} ref={treeRef}>
        {props => <Node {...props} />}
      </Tree>
    </div>
  );
};

export default TreeView;
