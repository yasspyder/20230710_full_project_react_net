import { Spinner } from 'react-bootstrap';

function Loader({ width, height, variant }) {
  return (
    <Spinner
      style={
        width && height
          ? { width, height }
          : { width: '150px', height: '150px' }
      }
      animation="border"
      variant={variant ? variant : 'primary'}
      role="status"
    />
  );
}

export default Loader;
