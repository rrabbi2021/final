import React from 'react'

const MessageNotification = ({ message }) => {

  if (message) {
    return (
      <div style={{ position: 'fixed', paddingTop: '5rem', zIndex: '999', width: '60rem', top: '0' }}>
        {message && <div className='alert alert-success'>{message}</div>}
      </div>
    )
  } else {
    return (
      <></>
    )
  }
}

export default MessageNotification