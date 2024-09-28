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
import { useEffect, useRef, useState } from 'react';
import TreeView from './TreeView/TreeView.tsx';
import { NodeApi, TreeApi } from 'react-arborist';
import { IFolder } from '../../../recoil/Folder/types.ts';

const FileTree: React.FC = () => {
  const [plusModal, setPlusModal] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NodeApi<IFolder> | null>(null);
  const treeRef = useRef<TreeApi<IFolder> | null>(null);
  const ExplorerRef = useRef<HTMLDivElement | null>(null);

  const onClickFolder = () => {
    setPlusModal(false);
  };

  const onClickFile = () => {
    setPlusModal(false);
  };

  console.log(selectedNode);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ExplorerRef.current && ExplorerRef.current.contains(event.target as Node)) {
        setSelectedNode(null);
      }
    };

    //document에 클릭 이벤트 리스너 추가
    document.addEventListener('click', handleClick);
    //컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <IdeExplorer ref={ExplorerRef}>
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
