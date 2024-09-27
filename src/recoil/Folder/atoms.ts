import { atom } from 'recoil';
import { IFolder } from './types';

const FolderState = atom<IFolder[]>({
  key: 'FolderState',
  default: [
    {
      id: '1',
      name: 'src',
      extension: 'java',
      // parentId: '-1',
      path: '/src',
      children: [
        { id: '2', name: 'main.js', extension: 'java', /*parentId: '1',*/ path: '/src/main.js' },
        {
          id: '3',
          name: 'utils',
          extension: 'java',
          // parentId: '1',
          path: '/src/utils',
          children: [
            { id: '4', name: 'ajj', extension: 'java', /*parentId: 'f2',*/ path: '/src/f2/ajj', children: [] },
          ],
        },
      ],
    },
    {
      id: '5',
      name: 'assets',
      extension: 'java',
      // parentId: '-1',
      path: '/assets',
      children: [
        { id: '6', name: 'logo.png', extension: 'java', /*parentId: '2',*/ path: '/assets/logo.png' },
        { id: '7', name: 'style.css', extension: 'java', /*parentId: '2',*/ path: '/assets/style.css' },
      ],
    },
    {
      id: '8',
      name: 'README.md',
      extension: 'java',
      /*parentId: '-1',*/
      path: '/README.md',
    },
  ],
});

export default FolderState;
