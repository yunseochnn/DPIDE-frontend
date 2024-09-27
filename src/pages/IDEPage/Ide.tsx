import { File, IdeCenter, IdeChat, IdeChat_Top, IdeContainer, Section, Side } from './Ide.style';
import { useState } from 'react';

import Header from './Header/Header';
import Sidebar from './SideBar/Sidebar';
import FileTree from './FileTree/FileTree';

import Code from './Editor/Code';
import Terminal from './Terminal/Terminal';
import Modal from './Modal/Modal';

const Ide = () => {
  const [files, setFiles] = useState(true);
  const [terminal, setTerminal] = useState(true);
  const [chat, setChat] = useState(true);
  const [friend, setFriend] = useState(false);

  return (
    <IdeContainer>
      {friend && <Modal setFriend={setFriend} />}
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
            <FileTree />
          </File>
        )}
        <Section>
          <Code />
          {terminal && <Terminal />}
        </Section>
        {chat && (
          <IdeChat>
            <IdeChat_Top>
              <div>채팅</div>
            </IdeChat_Top>
          </IdeChat>
        )}
      </IdeCenter>
    </IdeContainer>
  );
};

export default Ide;
