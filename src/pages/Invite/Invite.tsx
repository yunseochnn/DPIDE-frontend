import Code from './Code/Code';
import Header from './Header/Header';
import { InviteChat, InviteContainer, InviteContent } from './invite.style';

const Invite = () => {
  return (
    <InviteContainer>
      <Header />
      <InviteContent>
        <Code></Code>
        <InviteChat></InviteChat>
      </InviteContent>
    </InviteContainer>
  );
};

export default Invite;
