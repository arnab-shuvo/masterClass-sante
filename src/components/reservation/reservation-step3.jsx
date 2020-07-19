import React, { Component } from 'react';
import axios from "axios";
import { connect } from "react-redux";
import mcsConfig from "../../mcs-configuration";
import resources from "../resources";
import Loader from "../../loader";
import Notification, {notifyInfo, notifyWarn} from "../common/notification";

class ReservationStep3 extends Component {
    state = {
        loaderStatus: ''
    }

    componentWillMount() {
        let cart = localStorage.getItem('mcs-cart');
        if (cart != null && JSON.parse(cart).length === 0) {
            this.props.history.push(mcsConfig.route.homepage);
        }
    }

    loader(status) {
        let loaderStatus = { ...this.state.loaderStatus };
        loaderStatus = status;
        this.setState({ loaderStatus });

    }

    handleTransmettre = () => {
        let cart = localStorage.getItem('mcs-cart');
        if (cart != null) {
            cart = JSON.parse(cart);
            const compThis = this;
            const length = cart.length;
            let counter = 0;
            const user_id = mcsConfig.user.id;
            this.loader('show');
            cart.forEach(function (item) {
                axios
                    .get(mcsConfig.apiUrl.addToCart + `?ind=${user_id}&frm=${item.frm_id}`)
                    .then(function (response) {
                        counter += 1;
                        if(length == counter){
                            compThis.loader('off');
                            compThis.props.removeAllFromCart();
                            notifyInfo("Transmis avec succès");
                            setTimeout(function(){
                                compThis.props.history.push(mcsConfig.route.espacePersoMyFormations);
                            }, 1500);
                        }
                    })
                    .catch(function (error) {
                        notifyWarn("Échec de la transmission");
                        console.log(error);
                        compThis.loader('off');
                    });
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Loader status={this.state.loaderStatus} />
                <Notification />
                <div className="reservation-wrap">
                    <div className="container">
                        <div className="row clearfix">
                            <div className="col-sm-10 col-xs-12 col-sm-offset-1">
                                <div className="cs-card">
                                    <div className="cs-card-header">
                                        <ul className="reserv-ul">
                                            <li className="g-bold done">
                                                <span className="reserv-step number">1</span>
                                                <span className="reserv-step reserv-right"><img src={resources.iconRightSign} /></span>
                                                <span className="reserv-name hidden-xs">Inscriptions</span>
                                            </li>
                                            <li className="g-bold done">
                                                <span className="reserv-step reserv-right"><img src={resources.iconRightSign} /></span>
                                                <span className="reserv-step number">2</span>
                                                <span className="reserv-name hidden-xs ">Identification</span>
                                            </li>
                                            <li className="g-bold active">
                                                <span className="reserv-step">3</span>
                                                <span className="reserv-name hidden-xs ">Transmission</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="cs-card-body pb-0">
                                        <div className="row clearfix">
                                            <div className="col-sm-10 col-xs-12 col-sm-offset-1">

                                                {/* main content */}
                                                <p className="fs-25 g-bold g-color mob-head">Transmission de mes demandes d’inscription</p>
                                                <div className="row clearfix">
                                                    <div className="col-sm-12 col-xs-12">
                                                        <p className="">Vous pouvez maintenant nous transmettre vos demandes d’inscription. Dès réception, nous procéderons aux enregistrements correspondant à l’ANDPC.</p>
                                                        <p className="">Vous recevrez alors de la part de l’ANDPC un message de confirmation par inscription. Pour les valider et vous assurer ainsi de votre indemnisation, il vous suffira de cliquer sur le bouton “OUI” qui sera contenu dans le message.</p>
                                                    </div>
                                                </div>
                                                <div className="text-right text-xs-center btm-btn">
                                                    <button onClick={() => this.props.changeStep(1)} className="btn-solid-border btn-big retour-btn"><span className="btn-img"><img
                                                        src={resources.iconArrowLeft} /></span> RETOUR</button>
                                                    <button className="btn-solid w-xs-100" onClick={this.handleTransmettre}>TRANSMETTRE</button>
                                                </div>

                                                {/* end content */}

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}


function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        removeAllFromCart: () => {
            const action = { type: "remove-all-from-cart" }
            console.log('remove all @ method');
            dispatch(action);
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationStep3);