import React, { Component } from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import resources from "../resources";
import mcsConfig from "../../mcs-configuration";
import Loader from "../../loader"

class MyFormations extends Component {
  state = {
    formations: [],
    formationEmptyMsg: '',
    loaderStatus: ''
  };

  loader(status) {    
    let loaderStatus = { ...this.state.loaderStatus };
    loaderStatus = status;
    this.setState({ loaderStatus });

  }
  
  componentWillMount() {
    if (!mcsConfig.user.isLoggedIn) {
      this.props.history.push(mcsConfig.route.login);
    }
    const ind = mcsConfig.user.id;
    const type = 0; // here type is current or old formatons, 0=current & 1=old
    const compThis = this;
    this.loader('show');
    axios
      .get(mcsConfig.apiUrl.listMyFormations + `?ind=${ind}&type=${type}`)
      .then(function (response) {
        if (response.data.frm) {          
          compThis.setState({ formations: response.data.frm });
        }else{
          compThis.setState({ formationEmptyMsg: "Aucune formation à venir" });
        }
        compThis.loader('off');
      })
      .catch(function (error) {
        compThis.loader('off');
      });
  }

  render() {    
    return (
      <React.Fragment>
        <Loader status={this.state.loaderStatus} />
        <div className="page-title">
          <div className="container">
            <div className="row clearfix">
              <div className="com-md -12 col-sm-12 col-xs-12">
                <p className="w-color fs-25 fw-bold">Mes formations</p>
                <p className="g-light hidden-xs">
                  Mes formations à venir ou en cours
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="body-content">
          <div className="container">
            <div className="row clearfix">
              <div className="col-md-12 col-sm-12 col-xs-12">
                {this.state.formations.map(frm => {
                  return <FormationContent key={frm.frm} formation={frm} />;
                })}
                <p>
                  {this.state.formations.length === 0 ? this.state.formationEmptyMsg : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const FormationContent = props => {
  return (
    <div className="mes-formation-wrap">
      <div className="row clearfix">
        <div className="col-md-2 col-sm-2 col-xs-12">
          <img
            src="https://mayhew.ca/wp-content/uploads/revslider/home1/us-placeholder-square-300x300.png"
            className="img-responsive mdf-image"
          />
        </div>
        <div className="col-md-10 col-sm-10 col-xs-12">
          <p className="t-color fw-bold fs-18 pt-10">{props.formation.titre}</p>
          <p>
            <label className="label-custom">
              {props.formation.type == 1 ? "Présentiel" : "En ligne"}
            </label>
          </p>
          <div className="row clearfix">
            <div className="col-md-8 col-sm-8 col-xs-12">
              <ul className="icon-list">
                <li>
                  <span>
                    <img src={resources.iconTime} />
                  </span>
                  {props.formation.duree} heures
                </li>
                {props.formation.type == 1 ? (
                  <li>
                    <span>
                      <img src={resources.iconCalendier2} />
                    </span>
                    {props.formation.date} * {props.formation.ville}
                  </li>
                ) : (
                    ""
                  )}
                <li>
                  <span>
                    <img src={resources.iconEuro} />
                  </span>
                  {props.formation.indemnisaton}
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12">
              {/* <button className="btn-solid w-100 mdf-btn">ACCEDER</button> */}
              <NavLink to={`${mcsConfig.route.espacePersoMyFormations}/${props.formation.frm}`} className="btn-solid w-100 mdf-btn">ACCEDER</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFormations;
