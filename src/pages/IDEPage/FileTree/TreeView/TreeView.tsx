import { Tree, TreeApi } from 'react-arborist';

import Node, { TreeNode } from './Node';

import { useRecoilValue } from 'recoil';

import FolderState from '../../../../recoil/Folder/atoms';

interface Props {
  treeRef: React.MutableRefObject<TreeApi<TreeNode> | null>;
}

const TreeView = ({ treeRef }: Props) => {
  const Folder = useRecoilValue(FolderState);
  return (
    <div>
      <Tree data={Folder} ref={treeRef}>
        {props => <Node {...props} />}
      </Tree>
    </div>
  );
};

export default TreeView;
