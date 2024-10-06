import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface ChatMessage {
  senderName: string;
  content: string;
  createdAt: string;
}

interface ChatSearchProps {
  messages: ChatMessage[];
  onSearch: (searchKeyword: string) => void;
  onHighlightChange: (index: number) => void;
}

const THRESHOLD = 7; // 인덱스 차이가 8 이상인 경우만 이동

const ChatSearch = ({ messages, onSearch, onHighlightChange }: ChatSearchProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [highlightIndexes, setHighlightIndexes] = useState<number[]>([]);
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState<number>(0);

  const searchChat = useCallback(() => {
    if (!searchKeyword) {
      return;
    }

    const indexes = messages
      .map((message, index) => (message.content.includes(searchKeyword) ? index : -1))
      .filter(index => index !== -1);

    setHighlightIndexes(indexes);

    if (indexes.length > 0) {
      const lastIndex = indexes.length - 1;
      setCurrentHighlightIndex(lastIndex);
      onHighlightChange(indexes[lastIndex]);
    }

    onSearch(searchKeyword);
  }, [messages, searchKeyword, onSearch, onHighlightChange]);

  useEffect(() => {
    if (highlightIndexes.length > 0) {
      onHighlightChange(highlightIndexes[currentHighlightIndex]);
    }
  }, [currentHighlightIndex, highlightIndexes, onHighlightChange]);

  const goToPreviousMessage = () => {
    let newIndex = currentHighlightIndex - 1;

    while (
      newIndex >= 0 &&
      Math.abs(highlightIndexes[currentHighlightIndex] - highlightIndexes[newIndex]) < THRESHOLD
    ) {
      newIndex--;
    }

    if (newIndex >= 0) {
      setCurrentHighlightIndex(newIndex);
    }
  };

  const goToNextMessage = () => {
    let newIndex = currentHighlightIndex + 1;

    while (
      newIndex < highlightIndexes.length &&
      Math.abs(highlightIndexes[currentHighlightIndex] - highlightIndexes[newIndex]) < THRESHOLD
    ) {
      newIndex++;
    }

    if (newIndex < highlightIndexes.length) {
      setCurrentHighlightIndex(newIndex);
    }
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchKeyword(''); // 검색어 초기화
    setHighlightIndexes([]); // 하이라이트 인덱스 초기화
    onSearch(''); // 검색 상태 초기화
  };

  return (
    <>
      {isSearchOpen ? (
        <SearchContainer>
          <SearchInput
            type="text"
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            placeholder="검색할 키워드를 입력하세요..."
          />
          <SearchButton onClick={searchChat}>검색</SearchButton>
          <NavButton onClick={goToPreviousMessage}>&uarr;</NavButton>
          <NavButton onClick={goToNextMessage}>&darr;</NavButton>
          <CloseButton onClick={handleCloseSearch}>
            <FaTimes />
          </CloseButton>
        </SearchContainer>
      ) : (
        <>
          <OpenSearchButton onClick={() => setIsSearchOpen(true)}>
            <FaSearch />
          </OpenSearchButton>
        </>
      )}
    </>
  );
};

export default ChatSearch;

const SearchContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const SearchInput = styled.input`
  padding: 4px;
  background-color: #3a3d41;
  color: white;
  border: none;
  flex-grow: 1;
  font-size: 12px;
`;

const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.green1};
  color: white;
  padding: 4px 8px;
  border: none;
  cursor: pointer;
  font-size: 12px;
`;

const NavButton = styled.button`
  background-color: ${({ theme }) => theme.colors.green1};
  color: white;
  padding: 4px 8px;
  border: none;
  cursor: pointer;
  font-size: 12px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

const OpenSearchButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
`;
