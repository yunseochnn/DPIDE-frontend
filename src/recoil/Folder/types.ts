export interface IFolder {
  id: string;
  name: string;
  children?: IFolder[];
  extension: string;
  path: string;
  // parentId: string;
}
