import styled from 'styled-components';

export const InputSearch = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background-color: #FFF;
  outline: none;
  border: none;
  border-radius: 25px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.04);

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[200]}
  }
`;

export const Header = styled.header`
  margin-top: 32px;
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[100]};

  strong {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.gray[900]}
  }

  a {
    padding: 11px 14px;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary.main};
    transition: all 0.2s ease-in;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary.main};
      color: #FFF;
    }
  }
`;

export const ErrorContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;

  .details {
    margin-left: 16px;

    strong {
      margin-bottom: 8px;
      display: block;
      font-size: 22px;
      color: ${({ theme }) => theme.colors.danger.main};
    }
  }
`;

export const Content = styled.div`
  margin-top: 24px;

  header {
    margin-bottom: 8px;

    button {
      background-color: transparent;
      border: none;
      outline: none;
      display: flex;
      align-items: center;

      span {
        margin-right: 8px;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary.main}
      }

      img {
        transform: ${({ orderBy }) => (orderBy === 'asc' ? 'rotate(180deg)' : 'none')};
        transition: transform 0.2s ease-in;
      }
    }
  }
`;

export const Card = styled.div`
  padding: 16px;
  background-color: #FFF;
  box-shadow: 0 4px 10px rgba(0,0,0,0.04);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 16px;
  }

  .infos {
    .main {
      display: flex;
      align-items: center;

      small {
        margin-left: 8px;
        padding: 4px;
        background-color: ${({ theme }) => theme.colors.primary.lighter};
        border-radius: 4px;
        text-transform: uppercase;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary.main}
      }
    }

    span {
      display: block;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }

  .actions {
    display: flex;
    align-items: center;

    button {
      margin-left: 8px;
      background-color: transparent;
      border: none;
    }
  }
`;

export const EmptyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-top: 8px;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[200]};

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

export const SearchNotFoundContainer = styled.div`
  display: flex;
  align-items: flex-start;

  span {
    margin-top: 16px;
    margin-left: 24px;
    color: ${({ theme }) => theme.colors.gray[200]};
    word-break: break-word;
  }
`;
