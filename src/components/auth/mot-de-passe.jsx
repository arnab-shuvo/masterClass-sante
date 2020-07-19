import React, { Component } from 'react';
import Modal  from 'react-bootstrap-modal';


class MotDePasseModal extends Component {

    state = {}

    render() { 
        return ( 
            <Modal
                show={this.props.openModal}
                onHide={this.props.toggleModal}
                aria-labelledby="ModalHeader"
            >
                
                <Modal.Header closeButton>
                    <Modal.Title id='ModalHeader'><p className="text-center no-margin">Mot de passe oublié ?</p></Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <div class="form-group">
                        <p className="form-control resize-none" rows="5">
                            Vous pouvez trouver votre mot de passe dans l'email de bienvenue MCS que vous avez reçu lors de la création de votre compte. Si vous l'avez perdu, veuillez nous envoyer un email: contact@mcsante.fr et nous vous en enverrons un nouveau.
                        </p>
                    </div>

                    <Modal.Dismiss className='center-block fw-bold w-xs-100 btn-anchor t-color log-to-reg'>Fermer</Modal.Dismiss>
                </Modal.Body>
                
            </Modal>
         );
    }
}
 
export default MotDePasseModal;