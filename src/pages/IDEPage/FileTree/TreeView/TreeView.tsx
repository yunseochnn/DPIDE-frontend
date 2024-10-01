import { CreateHandler, NodeApi, Tree, TreeApi } from 'react-arborist';
import Node from './Node';
import { useRecoilValue } from 'recoil';

import { SetStateAction } from 'react';
import { IFolder } from '../../../../recoil/Folder/types';
import FolderState from '../../../../recoil/Folder/atoms';

interface Props {
  treeRef: React.MutableRefObject<TreeApi<IFolder> | null>;
  selectedNode: NodeApi<IFolder> | null;
  setSelectedNode: React.Dispatch<SetStateAction<NodeApi<IFolder> | null>>;
  term: string;
}
const TreeView: React.FC<Props> = ({ treeRef, selectedNode, setSelectedNode, term }) => {
  const initalFolder = useRecoilValue(FolderState);
  const onCreate: CreateHandler<IFolder> = ({ type }) => {
    const newNode: IFolder = {
      id: `id-${Date.now()}`,
      name: '', // 새로운 노드의 이름은 빈 문자열로 초기화
      extension: type === 'leaf' ? 'txt' : '', // 리프 노드인 경우 기본 확장자 설정
      path: selectedNode?.data.path || '/',
      children: type === 'internal' ? [] : undefined, // 내부 노드인 경우 자식 노드를 위한 배열을 초기화
    };

    // 여기에 새 노드를 트리 구조에 추가하는 로직을 작성해야 합니다.
    // 예: setState로 노드를 추가하거나 서버에 새 노드를 저장

    return newNode;
  };

  return (
    <div>
      <Tree<IFolder>
        data={initalFolder}
        ref={treeRef}
        openByDefault={false}
        onCreate={onCreate}
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
