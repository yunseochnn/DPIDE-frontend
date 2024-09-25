import styled from 'styled-components';

export const InputWrapper = styled.span``;

export const Inputbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 398px;
  height: 60px;
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid #e8e8e8;
  padding: 20px 10px 20px 16px;
  box-sizing: border-box;
  img {
    width: 30px;
    cursor: pointer;
  }
`;

export const InputContent = styled.input`
  flex: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  height: 19px;
  width: 398px;
  &::placeholder {
    color: #bdbdbd;
  }
`;

export const ErrorMessage = styled.span`
  font-size: 12px;
  color: red;
  margin-bottom: 3px;
`;
