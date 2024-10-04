import { useCookies } from 'react-cookie';
import Chat from '../../components/Chat';
import Code from './Code/Code';
import Header from './Header/Header';
import { InviteChat, InviteContainer, InviteContent } from './invite.style';
import { useParams } from 'react-router-dom';

const Invite = () => {
  const [cookies] = useCookies(['nickname', 'Authorization']);
  const Authorization = cookies['Authorization'];
  const { projectId } = useParams();
  const id = Number(projectId);
  const userName = cookies['nickname'];
  return (
    <InviteContainer>
      <Header />
      <InviteContent>
        <Code></Code>
        <InviteChat>
          <Chat userName={userName} projectId={id} token={Authorization} />
        </InviteChat>
      </InviteContent>
    </InviteContainer>
  );
};

export default Invite;
