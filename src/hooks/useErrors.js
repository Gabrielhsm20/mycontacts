import { useState } from 'react';

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  function setError({ fieldName, message }) {
    const errorAlreadyExists = errors.find(
      (error) => error.fieldName === fieldName,
    );

    if (errorAlreadyExists) {
      return;
    }

    setErrors((prevState) => [
      ...prevState,
      { fieldName, message },
    ]);
  }

  function removeError(fieldName) {
    setErrors((prevState) => prevState.filter(
      (error) => error.fieldName !== fieldName,
    ));
  }

  function getErrorMessageByFieldName(fieldname) {
    return errors.find((error) => error.fieldName === fieldname)?.message;
  }

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  };
}
