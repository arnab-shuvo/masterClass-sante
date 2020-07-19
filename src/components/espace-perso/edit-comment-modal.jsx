import React, { Component } from 'react';
import Modal  from 'react-bootstrap-modal';
import axios from "axios";
import mcsConfig from "../../mcs-configuration";
import Notification, { notifyInfo, notifyWarn } from '../common/notification';



class EditModal extends Component {
    state = { 
        id: '',
        comment: '',
        submitComment:{
            ind:  parseInt(mcsConfig.user.id),
            frm: parseInt(this.props.comment.frm),
            id: parseInt(this.props.comment.com_id),
            comment: '',
            mode : 1
        }

     }
     componentDidMount(){
         
        this.setState({
            id: parseInt(this.props.comment.frm),
            comment: this.props.comment.avis
        });
        
        
     }
     saveData = (e) => {
         e.preventDefault();
        
         let comp_this = this;
         let params = this.state.submitComment;
         axios
             .post(mcsConfig.apiUrl.userCommentUpdate, params)
             .then(function (response) {
                 if (response.data) {
                     if (response.data.erreur == 0) {                         
                         notifyInfo("Commentaire mis à jour");
                     } else {
                         notifyInfo("Mise à jour a échoué");
                     }
                 }
             })
             .catch(function (error, response) {
                 console.log(error);
             });
             this.props.toggle();
     }
    setComment = (e) =>{

        let submitComment = {...this.state.submitComment}
        submitComment.comment = e.target.value;
        this.setState({ submitComment});        
    }
    render() { 
        return ( 
            <Modal
                show={this.props.openModal}
                onHide={this.props.toggle}
                aria-labelledby="ModalHeader"
            >
                
                <Modal.Header closeButton>
                    <Modal.Title id='ModalHeader'><p className="text-center no-margin">Update Comment</p></Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <form onSubmit={this.saveData}>
                        <div class="form-group">
                            <label htmlFor="comment">Comment:</label>
                            <textarea onChange={this.setComment} className="form-control resize-none" rows="5" id="comment">{this.state.comment}</textarea>
                        </div>

                        {/* <Modal.Dismiss className='fw-bold w-xs-100 btn-anchor t-color log-to-reg'>Cancel</Modal.Dismiss> */}
                        <button className='fw-bold w-xs-100 btn-anchor t-color log-to-reg'>Save</button>
                    </form>
                </Modal.Body>
                
            </Modal>
         );
    }
}
 
export default EditModal;