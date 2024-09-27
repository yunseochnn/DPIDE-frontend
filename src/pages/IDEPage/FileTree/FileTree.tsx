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
import { NodeApi, TreeApi } from 'react-arborist';
import { IFolder } from '../../../recoil/Folder/types.ts';

const FileTree: React.FC = () => {
  const [plusModal, setPlusModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NodeApi<IFolder> | null>(null);
  const treeRef = useRef<TreeApi<IFolder> | null>(null);

  const onClickFolder = () => {
    setPlusModal(false);
  };

  const onClickFile = () => {
    setPlusModal(false);
  };

  console.log(selectedNode);

  return (
    <IdeExplorer>
      <IdeExplorer_Top>
        <IdeExplorer_ProjectName>프로젝트</IdeExplorer_ProjectName>
        <IdeExplorer_Plus>
          <FaPlus size="20" color="white" style={{ cursor: 'pointer' }} onClick={() => setPlusModal(!plusModal)} />
          {plusModal && (
            <IdeExplorer_PlusModal>
              <IdeExplorer_PlusModal_content onClick={onClickFolder}>파일 추가</IdeExplorer_PlusModal_content>
              <IdeExplorer_PlusModal_content onClick={onClickFile}>폴더 추가</IdeExplorer_PlusModal_content>
            </IdeExplorer_PlusModal>
          )}
        </IdeExplorer_Plus>
      </IdeExplorer_Top>
      {/* IdeExplorer_Folders 공간 외에 눌렀을 때 selectNodeId가 null이 되도록! */}
      <IdeExplorer_Folders>
        <TreeView treeRef={treeRef} selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
      </IdeExplorer_Folders>
    </IdeExplorer>
  );
};

export default FileTree;
