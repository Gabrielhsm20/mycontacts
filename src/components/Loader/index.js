import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay } from './styles';

export default function Loader({ isLoading }) {
  return !isLoading
    ? null
    : ReactDOM.createPortal(
      <Overlay>
        <div className="loader" />
      </Overlay>,
      document.getElementById('fixed-elements'),
    );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
