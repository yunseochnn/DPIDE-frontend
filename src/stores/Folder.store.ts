import { atom } from 'recoil';

const FolderState = atom({
  key: 'FolderState',
  default: [
    { id: '1', name: 'Unread' },
    { id: '2', name: 'Threads' },
    {
      id: '3',
      name: 'Chat Rooms',
      children: [
        { id: 'c1', name: 'General' },
        { id: 'c2', name: 'Random' },
        { id: 'c3', name: 'Open Source Projects', children: [] },
      ],
    },
  ],
});

export default FolderState;
