import React, { Component } from 'react';
import ReservationStep1 from "./reservation-step1";
import ReservationStep2 from "./reservation-step2";
import ReservationStep3 from "./reservation-step3";
import mcsConfig from "../../mcs-configuration";
import store from "../../store/store";

class Reservation extends Component {
    state = {
        step: 1
    }

    componentWillMount() {
        let cart = localStorage.getItem('mcs-cart');
        if (cart != null && JSON.parse(cart).length === 0){
            this.props.history.push(mcsConfig.route.homepage);
        }
    }

    changeStep = (step) => {
        this.setState({ step });
    }

    render() {
        return (
            <React.Fragment>
                <div className="breakcrumb-wrap reservation-back ">
                    <div className="container">
                        <div className="row clearfix">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                {/* <ol className="breadcrumb">
                                    <li><a href="#">Level 1</a></li>
                                    <li><a href="#">level 2</a></li>
                                    <li className="active">level 3</li>
                                </ol> */}
                            </div>
                        </div>
                    </div>
                </div>
                
                <GetReservationStep step={this.state.step} changeStep={this.changeStep} store={store} history={this.props.history} />

            </React.Fragment>
        );
    }
}

const GetReservationStep = (props) => {
    switch (props.step) {
        case 1:
            return <ReservationStep1 step={props.step} changeStep={props.changeStep} store={props.store} />;
        case 2:
            return <ReservationStep2 step={props.step} changeStep={props.changeStep} />;
        case 3:
            return <ReservationStep3 step={props.step} changeStep={props.changeStep} store={props.store} history={props.history} />;
    }
}


export default Reservation;