import { ImFilesEmpty } from 'react-icons/im';
import { IdeSideBarIcon, IdeSideBarIcons } from './Sidebar.style';
import { BsTerminal } from 'react-icons/bs';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { PiUserPlus } from 'react-icons/pi';

interface SidebarProps {
  files: boolean;
  setFiles: React.Dispatch<React.SetStateAction<boolean>>;
  terminal: boolean;
  setTerminal: React.Dispatch<React.SetStateAction<boolean>>;
  chat: boolean;
  setChat: React.Dispatch<React.SetStateAction<boolean>>;
}
const Sidebar = ({ files, setFiles, terminal, setTerminal, chat, setChat }: SidebarProps) => {
  return (
    <div>
      <IdeSideBarIcons>
        <IdeSideBarIcon onClick={() => setFiles(!files)}>
          <ImFilesEmpty size="24" color="white" />
        </IdeSideBarIcon>
        <IdeSideBarIcon onClick={() => setTerminal(!terminal)}>
          <BsTerminal size="24" color="white" />
        </IdeSideBarIcon>
        <IdeSideBarIcon onClick={() => setChat(!chat)}>
          <IoChatbubbleOutline size="24" color="white" />
        </IdeSideBarIcon>
        <IdeSideBarIcon>
          <PiUserPlus size="30" color="white" />
        </IdeSideBarIcon>
      </IdeSideBarIcons>
    </div>
  );
};

export default Sidebar;
