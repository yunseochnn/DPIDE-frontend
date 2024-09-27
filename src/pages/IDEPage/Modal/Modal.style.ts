import styled from 'styled-components';

export const ModalContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(160, 160, 160, 0.5);
  z-index: 200;
`;

export const ModalPopup = styled.div`
  width: 540px;
  height: 250px;
  background-color: #ffffff;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
`;

export const ModalTop = styled.div`
  width: 100%;
  height: 30px;

  display: flex;
  justify-content: flex-end;

  svg {
    margin-top: 15px;
    margin-right: 25px;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const ModalTitle = styled.div`
  margin-top: 20px;
  font-size: 28px;
  font-weight: 600;
`;

export const ModalForm = styled.form`
  display: flex;
  gap: 25px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  div {
    display: flex;
    flex-direction: column;
  }
`;

export const ModalInputBox = styled.div`
  display: flex;
  align-items: center;

  width: 300px;
  height: 60px;
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid #e8e8e8;
  padding: 20px 10px 20px 16px;
  box-sizing: border-box;

  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    height: 19px;

    &::placeholder {
      color: #bdbdbd;
    }
  }
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  margin-top: 5px;
`;

export const ModalButton = styled.button`
  height: 60px;
  width: 75px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.green1};
  border: none;
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
`;

export const ModalInput = styled.div``;
