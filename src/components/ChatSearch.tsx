import { useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { FaAngleUp } from 'react-icons/fa6';
import { FaAngleDown } from 'react-icons/fa6';

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

const THRESHOLD = 7;

const ChatSearch = ({ messages, onSearch, onHighlightChange }: ChatSearchProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [highlightIndexes, setHighlightIndexes] = useState<number[]>([]);
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState<number>(0);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);
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
      scrollToMessage(indexes[lastIndex]);
    }

    onSearch(searchKeyword);
  }, [messages, searchKeyword, onSearch, onHighlightChange]);

  useEffect(() => {
    if (highlightIndexes.length > 0) {
      onHighlightChange(highlightIndexes[currentHighlightIndex]);
      scrollToMessage(highlightIndexes[currentHighlightIndex]);
    }
  }, [currentHighlightIndex, highlightIndexes, onHighlightChange]);

  const scrollToMessage = (index: number) => {
    const targetMessage = messageRefs.current[index];
    if (targetMessage) {
      targetMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchChat();
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
    setSearchKeyword('');
    setHighlightIndexes([]);
    onSearch('');
  };

  return (
    <>
      {isSearchOpen ? (
        <SearchContainer>
          <SearchInput
            type="text"
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            placeholder="키워드를 입력하세요..."
            onKeyDown={handleKeyDown}
          />
          <SearchButton onClick={searchChat}>검색</SearchButton>
          <NavButton onClick={goToPreviousMessage}>
            <FaAngleUp />
          </NavButton>
          <NavButton onClick={goToNextMessage}>
            <FaAngleDown />
          </NavButton>
          <CloseButton onClick={handleCloseSearch}>
            <FaTimes />
          </CloseButton>
        </SearchContainer>
      ) : (
        <>
          <OpenSearchButton onClick={() => setIsSearchOpen(true)}>
            <StyledFaSearch />
          </OpenSearchButton>
        </>
      )}
    </>
  );
};

export default ChatSearch;

const StyledFaSearch = styled(FaSearch)`
  margin-left: 225px;
  font-size: 15px;
`;

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
  color: white;
  padding: 4px 5px;
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
