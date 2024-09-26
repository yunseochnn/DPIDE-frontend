import { IoChatbubbleOutline, IoClose } from 'react-icons/io5';
import {
  IdeCenter,
  IdeChat,
  IdeChat_Top,
  IdeCode,
  IdeCode_Button,
  IdeCode_Buttons,
  IdeCode_Files,
  IdeCode_Top,
  IdeContainer,
  IdeExplorer,
  IdeExplorer_Folders,
  IdeExplorer_Plus,
  IdeExplorer_PlusModal,
  IdeExplorer_PlusModal_content,
  IdeExplorer_ProjectName,
  IdeExplorer_Top,
  IdeSideBar,
  IdeSideBarIcon,
  IdeSideBarIcons,
  IdeTop,
  IdeTop_Close,
  IdeTop_Logo,
} from './Ide.style';
import { ImFilesEmpty } from 'react-icons/im';
import { BsTerminal } from 'react-icons/bs';

import { PiFloppyDisk, PiUserPlus } from 'react-icons/pi';
import { FaPlay, FaPlus } from 'react-icons/fa6';
import { useRef, useState } from 'react';
import TreeView from './components/TreeView';
import { TreeApi } from 'react-arborist';
import { TreeNode } from './components/Node';

const Ide = () => {
  const [plusModal, setPlusModal] = useState(false);
  const treeRef = useRef<TreeApi<TreeNode> | null>(null);
  console.log(treeRef);

  return (
    <IdeContainer>
      <IdeTop>
        <IdeTop_Logo>
          <img src="/src/assets/images/logo2.png" />
          <span>D P I D E</span>
        </IdeTop_Logo>
        <IdeTop_Close>
          <IoClose size="30" color="white" />
        </IdeTop_Close>
      </IdeTop>

      <IdeCenter>
        <IdeSideBar>
          <IdeSideBarIcons>
            <IdeSideBarIcon>
              <ImFilesEmpty size="24" color="white" />
            </IdeSideBarIcon>
            <IdeSideBarIcon>
              <BsTerminal size="24" color="white" />
            </IdeSideBarIcon>
            <IdeSideBarIcon>
              <IoChatbubbleOutline size="24" color="white" />
            </IdeSideBarIcon>
            <IdeSideBarIcon>
              <PiUserPlus size="30" color="white" />
            </IdeSideBarIcon>
          </IdeSideBarIcons>
        </IdeSideBar>

        <IdeExplorer>
          <IdeExplorer_Top>
            <IdeExplorer_ProjectName>프로젝트</IdeExplorer_ProjectName>
            <IdeExplorer_Plus>
              <FaPlus size="20" color="white" style={{ cursor: 'pointer' }} onClick={() => setPlusModal(!plusModal)} />
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

        <IdeCode>
          <IdeCode_Top>
            <IdeCode_Files></IdeCode_Files>

            <IdeCode_Buttons>
              <IdeCode_Button>
                <PiFloppyDisk size="25" color="white" />
              </IdeCode_Button>
              <IdeCode_Button>
                <FaPlay size="25" color="white" />
              </IdeCode_Button>
            </IdeCode_Buttons>
          </IdeCode_Top>
        </IdeCode>

        <IdeChat>
          <IdeChat_Top>
            <div>채팅</div>
          </IdeChat_Top>
        </IdeChat>
      </IdeCenter>
    </IdeContainer>
  );
};

export default Ide;
