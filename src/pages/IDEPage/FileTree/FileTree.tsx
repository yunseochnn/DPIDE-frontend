import { FaPlus } from 'react-icons/fa6';
import {
  IdeExplorer,
  IdeExplorer_Folders,
  IdeExplorer_Plus,
  IdeExplorer_PlusModal,
  IdeExplorer_PlusModal_content,
  IdeExplorer_ProjectName,
  IdeExplorer_Top,
} from './FileTree.style.ts';
import { useRef, useState } from 'react';
import TreeView from './TreeView/TreeView.tsx';
import { TreeApi } from 'react-arborist';
import { TreeNode } from './TreeView/Node.tsx';

const FileTree = () => {
  const [plusModal, setPlusModal] = useState(false);
  const treeRef = useRef<TreeApi<TreeNode> | null>(null);
  return (
    <IdeExplorer>
      <IdeExplorer_Top>
        <IdeExplorer_ProjectName>프로젝트</IdeExplorer_ProjectName>
        <IdeExplorer_Plus>
          <FaPlus size="20" color="white" style={{ cursor: 'pointer' }} onClick={() => setPlusModal(!plusModal)} />{' '}
          {plusModal && (
            <IdeExplorer_PlusModal>
              <IdeExplorer_PlusModal_content>폴더 추가</IdeExplorer_PlusModal_content>
              <IdeExplorer_PlusModal_content>파일 추가</IdeExplorer_PlusModal_content>
            </IdeExplorer_PlusModal>
          )}
        </IdeExplorer_Plus>
      </IdeExplorer_Top>
      <IdeExplorer_Folders>
        <TreeView treeRef={treeRef} />
      </IdeExplorer_Folders>
    </IdeExplorer>
  );
};

export default FileTree;
