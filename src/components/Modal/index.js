import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import { Overlay, Container } from './styles';

import Button from '../Button';

export default function Modal({
  type, title, description, buttonLabel = 'OK', callback,
}) {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setShowModal(true);
  }, [title, callback]);

  return (!showModal || !title || !callback)
    ? null
    : ReactDOM.createPortal(
      <Overlay>
        <Container className={type}>
          <h1>{title}</h1>
          <p>{description}</p>

          <div className="actions">
            <button
              type="button"
              className="cancel"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
            <Button
              type="button"
              className={type}
              onClick={() => {
                callback();
                setShowModal(false);
              }}
            >
              {buttonLabel}
            </Button>
          </div>
        </Container>
      </Overlay>,
      document.getElementById('fixed-elements'),
    );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
