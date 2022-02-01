/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import { Link } from 'react-router-dom';

import formatPhone from '../../utils/formatPhone';

import {
  InputSearch,
  Header,
  Content,
  Card,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

import ContactsService from '../../services/ContactsService';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Snackbar from '../../components/Snackbar';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [alert, setAlert] = useState(false);
  const [modal, setModal] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  const deleteContact = useCallback(async (id) => {
    try {
      setIsLoading(true);

      await ContactsService.deleteContact(id);

      setAlert({
        type: 'success',
        message: 'Contato deletado com sucesso.',
        timeout: 1500,
      });

      loadContacts();
    } catch (error) {
      setAlert({
        type: 'danger',
        message: error.message,
        timeout: 3000,
      });
    }
  }, [loadContacts]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleToggleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleDeleteContact(id) {
    setModal({
      type: 'danger',
      title: 'Atenção',
      description: 'Tem certeza que deseja excluir este contato?',
      buttonLabel: 'Sim',
      callback: () => deleteContact(id),
    });
  }

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      <Snackbar
        type={alert.type}
        timeout={alert.timeout}
        callback={alert.callback}
      >
        {alert.message}
      </Snackbar>

      <Modal
        type={modal.type}
        title={modal.title}
        description={modal.description}
        buttonLabel={modal.buttonLabel}
        callback={modal.callback}
      />

      {contacts.length > 0 && (
        <InputSearch
          type="text"
          placeholder="Pesquisar contato..."
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        justifyContent={
          hasError
            ? 'flex-end'
            : (
              contacts.length > 0
                ? 'space-between'
                : 'center'
            )
        }
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}

        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>
            <Button
              type="button"
              onClick={handleTryAgain}
            >
              Tente novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <Content orderBy={orderBy}>
          {(!contacts.length && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty box" />
              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <strong>”Novo contato”</strong> à cima
                para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier question" />
              <span>Nenhum resultado foi encontrado para <strong>”{searchTerm}”</strong>.</span>
            </SearchNotFoundContainer>
          )}

          {filteredContacts.length > 0 && (
            <header>
              <button type="button" onClick={handleToggleOrderBy}>
                <span>Nome</span>
                <img src={arrow} alt="Arrow" />
              </button>
            </header>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="infos">
                <div className="main">
                  <strong>{contact.name}</strong>
                  {contact.category_name && (
                    <small>{contact.category_name}</small>
                  )}
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone && formatPhone(contact.phone)}</span>
              </div>
              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>
                <button type="button" onClick={() => handleDeleteContact(contact.id)}>
                  <img src={trash} alt="Trash" />
                </button>
              </div>
            </Card>
          ))}
        </Content>
      )}
    </>
  );
}

export default Home;
