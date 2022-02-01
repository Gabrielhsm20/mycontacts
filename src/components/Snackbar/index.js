import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Container } from './styles';

export default function Snackbar({
  children, type, timeout, callback,
}) {
  const [showSnackBar, setShowSnackbar] = useState(true);

  useEffect(() => {
    setShowSnackbar(true);

    if (timeout) {
      setTimeout(() => {
        setShowSnackbar(false);

        if (callback) {
          callback();
        }
      }, timeout);
    }
  }, [children, timeout, callback]);

  return (!children || !showSnackBar)
    ? null
    : ReactDOM.createPortal(
      <Container className={type}>
        {!timeout && (
          <button
            type="button"
            onClick={() => setShowSnackbar(false)}
          >
            X
          </button>
        )}

        {children}
      </Container>,
      document.getElementById('fixed-elements'),
    );
}
