import styled from 'styled-components';

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.6);
  backdrop-filter: blur(5px);
`;

export const Container = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 24px;
  background-color: #FFF;
  box-shadow: 0 4px 10px rgba(0,0,0,0.04);
  border-radius: 4px;

  h1 {
    font-size: 22px;
    color: ${({ theme, danger }) => (
    danger
      ? theme.colors.danger.main
      : theme.colors.gray[900]
  )}
  }

  p {
    margin-top: 8px;
  }

  .actions {
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .cancel {
      background-color: transparent;
      border: none;
      font-size: 16px;
      margin-right: 16px;
      color: ${({ theme }) => theme.colors.gray[200]}
    }
  }
`;
