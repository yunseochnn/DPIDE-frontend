import { NodeApi, Tree, TreeApi } from 'react-arborist';
import Node from './Node';
import { useRecoilState } from 'recoil';

import { SetStateAction } from 'react';
import { IFolder } from '../../../../recoil/Folder/types';
import FolderState from '../../../../recoil/Folder/atoms';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

interface Props {
  treeRef: React.MutableRefObject<TreeApi<IFolder> | null>;
  selectedNode: NodeApi<IFolder> | null;
  setSelectedNode: React.Dispatch<SetStateAction<NodeApi<IFolder> | null>>;
  term: string;
}
const TreeView: React.FC<Props> = ({ treeRef, selectedNode, setSelectedNode, term }) => {
  const [initalFolder, setInitalFolder] = useRecoilState(FolderState);
  const { projectId } = useParams();
  const [cookies] = useCookies(['Authorization', 'userId']);
  const Authorization = cookies['Authorization'];
  const userId = cookies['userId'];
  const id = Number(projectId);

  return (
    <div>
      <Tree<IFolder>
        data={initalFolder}
        ref={treeRef}
        openByDefault={false}
        searchTerm={term}
        searchMatch={(node, term) => node.data.name.toLowerCase().includes(term.toLowerCase())}
        width={'100%'}
      >
        {props => <Node {...props} selectedNode={selectedNode} setSelectedNode={setSelectedNode} />}
      </Tree>
    </div>
  );
};

export default TreeView;
