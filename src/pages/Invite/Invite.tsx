import { useCookies } from 'react-cookie';
import Chat from '../../components/Chat';
import Code from './Code/Code';
import Header from './Header/Header';
import { InviteChat, InviteContainer, InviteContent } from './invite.style';
import { useParams } from 'react-router-dom';
import { wideState } from '../../recoil/Chat/atoms';
import React from 'react';
import { useSetRecoilState } from 'recoil';

const Invite = () => {
  const setWide = useSetRecoilState(wideState);
  const [cookies] = useCookies(['nickname', 'Authorization']);
  const Authorization = cookies['Authorization'];
  const { projectId } = useParams();
  const id = Number(projectId);
  const userName = cookies['nickname'];

  React.useEffect(() => {
    setWide(true);
  }, [setWide]);

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
