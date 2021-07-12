import React from 'react';
import Modal from 'react-bootstrap/Modal';

function AppModal({
    children,
    title,
    onHide,
    show,
    FooterActions,

    ...props
}) {
    return (
        <Modal
            onHide={onHide}
            show={show}
            size="lg"
            centered
            {...props}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {children}
            </Modal.Body>

            <Modal.Footer>

                <button
                    type="button"
                    className="text-white button button-primary2 py-2 mt-3 mx-3"
                    onClick={onHide}
                >
                    Close
                </button>
                
                {FooterActions}
            </Modal.Footer>
        </Modal>
    );
}

export default AppModal;