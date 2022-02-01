import { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import PropTypes from 'prop-types';

import useErrors from '../../hooks/useErrors';

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import { Form, ButtonContainer } from './styles';

import CategoriesService from '../../services/CategoriesService';
import ContactsService from '../../services/ContactsService';

import Snackbar from '../Snackbar';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import Loader from '../Loader';

export default function ContactForm({ formType, buttonLabel }) {
  const history = useHistory();
  const { id } = useParams();

  const [alert, setAlert] = useState(false);
  const [disableForm, setDisableForm] = useState(false);

  const [categories, setCategories] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  const loadCategories = useCallback(async () => {
    try {
      setIsLoading(true);

      const categoriesList = await CategoriesService.listCategories();

      setCategories(categoriesList);
    } catch {
      setAlert({
        type: 'danger',
        timeout: 2500,
        message: 'Erro ao buscar lista de categorias.',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadContact = useCallback(async () => {
    try {
      setIsLoading(true);

      const contact = await ContactsService.getContact(id);

      setName(contact.name);
      setEmail(contact.email);
      setPhone(formatPhone(contact.phone));
      setCategory(contact.category_id);
    } catch {
      setAlert({
        type: 'danger',
        timeout: 2500,
        message: 'Erro ao buscar dados do contato.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (formType === 'edit') {
      loadContact();
    }

    loadCategories();
  }, [formType, loadContact, loadCategories]);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ fieldName: 'name', message: 'Nome é obrigatório.' });
    } else {
      removeError('name');
    }
  }

  function hangleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ fieldName: 'email', message: 'E-mail inválido.' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsLoading(true);
      setAlert(false);

      let formTypeFunction;
      let successMessage;

      if (formType === 'edit') {
        formTypeFunction = (data) => ContactsService.editContact(data);
        successMessage = 'Contato editado com sucesso';
      } else {
        formTypeFunction = (data) => ContactsService.newContact(data);
        successMessage = 'Contato criado com sucesso';
      }

      await formTypeFunction({
        id,
        name,
        email,
        phone: phone.replace(/\D/g, ''),
        category_id: category,
      });

      setDisableForm(true);

      setAlert({
        type: 'success',
        timeout: 1500,
        message: successMessage,
        callback: () => history.push('/'),
      });
    } catch (error) {
      setAlert({
        type: 'danger',
        message: error.message,
        timeout: 3000,
      });
    } finally {
      setIsLoading(false);
    }
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

      <Form onSubmit={handleSubmit} noValidate>
        <fieldset disabled={disableForm}>
          <FormGroup error={getErrorMessageByFieldName('name')}>
            <Input
              type="text"
              placeholder="Nome *"
              value={name}
              onChange={handleNameChange}
              error={getErrorMessageByFieldName('name')}
            />
          </FormGroup>

          <FormGroup error={getErrorMessageByFieldName('email')}>
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={hangleEmailChange}
              error={getErrorMessageByFieldName('email')}
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="tel"
              placeholder="Telefone"
              maxLength={15}
              value={phone}
              onChange={handlePhoneChange}
            />
          </FormGroup>

          <FormGroup>
            <Select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">Categoria</option>
              {categories.map((el) => (
                <option
                  key={el.id}
                  value={el.id}
                >
                  {el.name}
                </option>
              ))}
            </Select>
          </FormGroup>

          <ButtonContainer>
            <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
          </ButtonContainer>
        </fieldset>
      </Form>
    </>
  );
}

ContactForm.propTypes = {
  formType: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};
