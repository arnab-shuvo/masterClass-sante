import React, { Component } from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import mcsConfig from "../../mcs-configuration";
import Loader from "../../loader"

class FormationHistories extends Component {
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
    const type = 1; // here type is current or old formatons, 0=current & 1=old
    const compThis = this;
    this.loader('show');
    axios
      .get(mcsConfig.apiUrl.listMyFormations + `?ind=${ind}&type=${type}`)
      .then(function (response) {
        if (response.data.frm) {
          compThis.setState({ formations: response.data.frm });
        }else{
          compThis.setState({ formationEmptyMsg: "Aucune formation trouvée" });
        }
        compThis.loader('off');
      })
      .catch(function (error) {
        console.log(error);
        compThis.loader('off');
      });
  }

  getTableContent = () =>{
    if(this.state.formations.length){
      return (
          <table className="table table-striped ">
            <thead>
              <tr>
              <th>Formation</th>
              <th>Format</th>
                <th>Date</th>
              <th>Indemnisation</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.formations.map(formation => {
                return (
                  <tr key={formation.frm}>
                    <td width="40%">{formation.titre}</td>
                    <td width="15%">
                      {formation.type == 1 ? "Présentiel" : "En ligne"}
                    </td>
                    <td width="20%">
                      {formation.type == 1
                        ? `${formation.date1} * ${formation.ville}`
                        : ""}
                    </td>
                    <td width="10%" style={{textAlign:"right"}}>{formation.indemnisation_court}</td>
                    <td width="15%">
                      <NavLink to={`${mcsConfig.route.espacePersoFormationHistory}/${formation.frm}`} className="btn-solid fs-12 fw-normal">CONSULTER</NavLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
      )
    }else{
      return this.state.formationEmptyMsg;
    }
  }

  getMobileTableContent = () => {
    if (this.state.formations.length) {
      this.state.formations.map(formation => {
        return (
          <div key={formation.frm} className="history-wrap">
            <p className="history-title fs-20 t-color g-bold">
              {formation.titre}
            </p>
            <p className="history-des ">
              <label className="fw-bold">Format:</label>{" "}
              {formation.type == 1 ? "Présentiel" : "En ligne"}
            </p>
            {formation.type == 1 ? (
              <p className="history-des">
                <label className="fw-bold">Date:</label>
                {formation.date} * {formation.ville}
              </p>
            ) : (
                ""
              )}
            <p className="history-des">
              <label className="fw-bold">Indemnisation:</label>{" "}
              {formation.indemnisation_court}
            </p>

            <div className="history-btn-wrap">
              <NavLink to={`${mcsConfig.route.espacePersoFormationHistory}/${formation.frm}`} className="btn-solid w-100">CONSULTER</NavLink>
            </div>
          </div>
        );
      })
    } else {
      return this.state.formationEmptyMsg;
    }
  }

  render() {
    return (
      <React.Fragment>
        <Loader status={this.state.loaderStatus} />
        <div className="page-title">
          <div className="container">
            <div className="row clearfix">
              <div className="com-md -12 col-sm-12 col-xs-12">
                <p className="w-color fs-25 fw-bold">
                  Mon historique de formations
                </p>
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
                {/* start web table part */}
                <div className="table-responsive cs-table hidden-xs">
                {this.getTableContent()}
                </div>
                {/* end web table part */}

                {/* start mobile table part */}
                <div className="history-container visible-xs">
                  {this.getMobileTableContent()}
                </div>
                {/* end mobile table part */}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FormationHistories;
