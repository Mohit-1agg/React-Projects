import Alert from 'react-bootstrap/Alert';

function AlertLayout ({ variant }) {
  return (
    <>
      <Alert key={variant} variant={variant}>
        This is a {variant} alert—check it out!
      </Alert>
    </>
  );
}

export default AlertLayout;
