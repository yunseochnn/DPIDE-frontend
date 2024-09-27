import { NodeApi, Tree, TreeApi } from 'react-arborist';
import Node from './Node';
import { useRecoilValue } from 'recoil';

import { SetStateAction } from 'react';
import { IFolder } from '../../../../recoil/Folder/types';
import FolderState from '../../../../recoil/Folder/atoms';

interface Props {
  treeRef: React.MutableRefObject<TreeApi<IFolder> | null>;
  selectedNode: NodeApi<IFolder> | null;
  setSelectedNode: React.Dispatch<SetStateAction<NodeApi<IFolder> | null>>;
}

const TreeView: React.FC<Props> = ({ treeRef, selectedNode, setSelectedNode }) => {
  const initalFolder = useRecoilValue(FolderState);

  return (
    <div>
      <Tree<IFolder> data={initalFolder} ref={treeRef} openByDefault={false}>
        {props => <Node {...props} isSelected={props.node.id === selectedNode?.id} setSelectedNode={setSelectedNode} />}
      </Tree>
    </div>
  );
};

export default TreeView;
