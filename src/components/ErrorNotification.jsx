import React from 'react'

const ErrorNotification = ({ error }) => {

  if (error) {
    return (
      <div style={{ position: 'fixed', paddingTop: '5rem', zIndex: '999', width: '60rem', top: '0' }}>
        {error && <div className='alert alert-danger'>{error}</div>}
      </div>
    )
  } else {
    return (
      <></>
    )
  }
}

export default ErrorNotification