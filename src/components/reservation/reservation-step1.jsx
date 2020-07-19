import React, { Component } from 'react';
import resources from "../resources";
import { connect } from "react-redux";
import Notification, { notifyInfo } from '../common/notification';

class ReservationStep1 extends Component {
    state = {
        jeMinscrisBtnHide: ""
    }

    removeItemFromCart = async (frm_id) => {
        await this.props.removeItemFromCart(frm_id);
        if (this.props.cartCounter === 0){
            this.setState({ jeMinscrisBtnHide: "hidden" });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Notification />
                <div className="reservation-wrap">
                    <div className="container">
                        <div className="row clearfix">
                            <div className="col-sm-10 col-xs-12 col-sm-offset-1">
                                <div className="cs-card">
                                    <div className="cs-card-header">
                                        <ul className="reserv-ul">
                                            <li className="g-bold active">
                                                <span className="reserv-step reserv-right"><img src={resources.iconRightSign} /></span>
                                                <span className="reserv-step  number">1</span>
                                                <span className="reserv-name hidden-xs t-color">Inscription</span>
                                            </li>
                                            <li className="g-bold">
                                                <span className="reserv-step reserv-right"> <img src={resources.iconRightSign} /></span>
                                                <span className="reserv-step number">2</span>
                                                <span className="reserv-name hidden-xs unwatched">Identification</span>
                                            </li>
                                            <li className="g-bold">
                                                <span className="reserv-step">3</span>
                                                <span className="reserv-name hidden-xs unwatched">Transmission</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="cs-card-body pb-0">
                                        <div className="row clearfix">
                                            <div className="col-sm-10 col-xs-12 col-sm-offset-1">

                                                {/* main content */}

                                                <p className="fs-25 g-bold g-color mob-head ">Mes demandes d'inscription</p>
                                                <div className="row clearfix">
                                                    <div className="col-sm-10">
                                                        <p className="">Vous trouverez ci-dessous le récapitulatif de vos demandes d’inscriptions.</p>
                                                        <p>Après vérification, merci de cliquer sur le bouton “Suivant” pour passer à l’étape suivante.</p>
                                                    </div>
                                                </div>

                                                {this.props.cart.map(item => <RenderItem key={item.frm_id} item={item} removeItemFromCart={this.removeItemFromCart} />)}

                                                <div className="text-right text-xs-center">
                                                    <button onClick={() => this.props.changeStep(2)} className={this.state.jeMinscrisBtnHide + " btn-solid w-xs-100"}>JE M'INSCRIS</button>
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

const RenderItem = (props) => {
    return (
        <div className="rs-formation-info-wrap">
            <div className="row clearfix">
                <div className="col-sm-12">
                    <p className="t-color fs-20 g-bold clearfix">{props.item.titre}
                        <a onClick={() => props.removeItemFromCart(props.item.frm_id)} className="pull-right dlt-formation"><img src={resources.iconTrash} /></a>
                    </p>
                </div>
            </div>
            <div className="row clearfix">
                <div className="col-sm-4 left-lbl">
                    <div className="lbl-up">{props.item.duree}h<span className="dot-fot">
                        <ul>
                            <li></li>
                        </ul>
                        </span>
                        {props.item.type == 4 ? "Programme en ligne" : "Programme présentiel"}
                    </div>
                    {props.item.type == 4 ? "" : <p>{props.item.date} - {props.item.ville}</p>}
                </div>
                <div className="col-sm-8">
                    <form className="form-horizontal" action="/action_page.php">
                        <div className="form-group">
                            <p className="col-sm-3 fx-select-lavel">Financement:</p>
                            <div className="col-sm-6">
                                <select className="form-control" id="sel1">
                                    <option value="1">ANDPC</option>
                                    <option value="2">Financement personnel</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        removeItemFromCart: (frm_id) => {
            const action = { type: "cart-remove-item", frm_id: frm_id}
            dispatch(action);
            notifyInfo("Formation retirée du panier");
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationStep1);