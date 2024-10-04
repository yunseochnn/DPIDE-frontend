import { NodeApi, Tree, TreeApi } from 'react-arborist';
import Node from './Node';
import { useRecoilState } from 'recoil';

import { SetStateAction, useEffect } from 'react';
import { IFolder } from '../../../../recoil/Folder/types';
import FolderState from '../../../../recoil/Folder/atoms';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import FolderRequest from '../../../../apis/IDE/File/FolderReqeust';

import axios from 'axios';

interface Props {
  treeRef: React.MutableRefObject<TreeApi<IFolder> | null>;
  selectedNode: NodeApi<IFolder> | null;
  setSelectedNode: React.Dispatch<SetStateAction<NodeApi<IFolder> | null>>;
  term: string;
}

const TreeView: React.FC<Props> = ({ treeRef, selectedNode, setSelectedNode, term }) => {
  const [initalFolder, setInitalFolder] = useRecoilState(FolderState);
  const { projectId } = useParams();
  const [cookies] = useCookies(['Authorization', 'userId']);
  const Authorization = cookies['Authorization'];
  const id = Number(projectId);

  const FolderResponse = async () => {
    console.log('파일 불러 오는 중');
    try {
      const response = await FolderRequest(id, Authorization);
      if (!response) {
        alert('네트워크 이상');
        return;
      }

      const { status } = response;
      const { files } = response.data;

      if (status === 200) {
        setInitalFolder(files);
        console.log('폴더 불러오기 완료');
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log(`서버 응답 오류: ${error.response.status}`);
        }
      }
    } finally {
      console.log('파일 불러오기 끝');
    }
  };

  useEffect(() => {
    const fetchFolderData = async () => {
      await FolderResponse();
    };

    fetchFolderData();
  }, []);

  return (
    <div>
      <Tree<IFolder>
        data={initalFolder}
        ref={treeRef}
        openByDefault={false}
        searchTerm={term}
        searchMatch={(node, term) => node.data.name.toLowerCase().includes(term.toLowerCase())}
        width={'100%'}
      >
        {props => <Node {...props} selectedNode={selectedNode} setSelectedNode={setSelectedNode} />}
      </Tree>
    </div>
  );
};

export default TreeView;
