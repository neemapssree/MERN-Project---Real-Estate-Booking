import React from 'react'
import Modal from 'react-bootstrap/Modal';


const ModalView = ({children, setShowModal,showModal,propname}) => {
  
  
  
  const closeModal = () => setShowModal(false);

  return (
    <Modal show={showModal} onHide={closeModal} className='modalShow'>
        <Modal.Header closeButton>
          <Modal.Title>Set Time Slots for Viewing {propname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>        
      </Modal>
  )
}

export default ModalView