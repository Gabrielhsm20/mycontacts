import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.primary.main};
  box-shadow:
    0 2px 0 rgba(0,0,0,.04)
    inset 0 -4px 0 ${({ theme }) => theme.colors.primary.light}
  ;
  border-radius: 4px;
  font-size: 14px;
  color: #FFF;

  &.success {
    background-color: ${({ theme }) => theme.colors.success.main};
    box-shadow:
      0 2px 0 rgba(0,0,0,.04),
      inset 0 -4px 0 ${({ theme }) => theme.colors.success.light}
    ;
  }

  &.warning {
    background-color: ${({ theme }) => theme.colors.warning.main};
    box-shadow:
      0 2px 0 rgba(0,0,0,.04),
      inset 0 -4px 0 ${({ theme }) => theme.colors.warning.light}
    ;
  }

  &.danger {
    background-color: ${({ theme }) => theme.colors.danger.main};
    box-shadow:
      0 2px 0 rgba(0,0,0,.04),
      inset 0 -4px 0 ${({ theme }) => theme.colors.danger.light}
    ;
  }

  button {
    width: 25px;
    height: 25px;
    margin-right: 12px;
    background-color: rgba(255,255,255,0.15);
    border-radius: 50%;
    border: none;
    outline: none;
    text-align: center;
    font-weight: bold;
    color: #FFF;
    transition: background-color 0.2s ease-in;

    &:hover {
      background-color: rgba(255,255,255,0.25)
    }
  }
`;
