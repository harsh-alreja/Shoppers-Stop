import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      variant='success'
      style={{
        width: '100px',
        hieght: '100px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>

    //   <Button variant="primary" disabled>
    //   <Spinner
    //     as="span"
    //     animation="border"
    //     size="sm"
    //     role="status"
    //     aria-hidden="true"
    //   />
    //   <span className="visually-hidden">Loading...</span>
    // </Button>
  );
};

export default Loader;
