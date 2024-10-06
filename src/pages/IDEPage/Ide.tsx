import { File, IdeCenter, IdeChat, IdeContainer, Section, Side } from './Ide.style';
import React, { useState } from 'react';

import Header from './Header/Header';
import Sidebar from './SideBar/Sidebar';
import FileTree from './FileTree/FileTree';

import Code from './Editor/Code';
import Terminal from './Terminal/Terminal';
import Modal from './Modal/Modal';
import Chat from '../../components/Chat';
import EditModal from './FileTree/EditModal/EditModal';
import { NodeApi } from 'react-arborist';
import { IFolder } from '../../recoil/Folder/types';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Ide = React.memo(() => {
  const [files, setFiles] = useState(true);
  const [terminal, setTerminal] = useState(true);
  const [chat, setChat] = useState(true);
  const [friend, setFriend] = useState(false);
  const [edit, setEdit] = useState('');
  const { projectId } = useParams();
  const id = Number(projectId);
  const [cookies] = useCookies(['nickname', 'Authorization']);
  const Authorization = cookies['Authorization'];
  const userName = cookies['nickname'];
  const [selectedNode, setSelectedNode] = useState<NodeApi<IFolder> | null>(null);

  return (
    <IdeContainer>
      {friend && <Modal setFriend={setFriend} />}
      {edit !== '' && <EditModal edit={edit} setEdit={setEdit} selectedNode={selectedNode} />}
      <Header />
      <IdeCenter>
        <Side>
          <Sidebar
            files={files}
            setFiles={setFiles}
            terminal={terminal}
            setTerminal={setTerminal}
            chat={chat}
            setChat={setChat}
            friend={friend}
            setFriend={setFriend}
          />
        </Side>
        {files && (
          <File>
            <FileTree setEdit={setEdit} selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
          </File>
        )}
        <Section>
          <Code />
          {terminal && <Terminal />}
        </Section>
        {chat && (
          <IdeChat>
            <Chat projectId={id} userName={userName} token={Authorization} />
          </IdeChat>
        )}
      </IdeCenter>
    </IdeContainer>
  );
});

export default Ide;
