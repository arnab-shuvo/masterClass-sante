import React, { Component } from "react";
import resources from "../resources";
import axios from "axios";
import { connect } from "react-redux";
import mcsConfig from "../../mcs-configuration";
import Loader from "../../loader"
import Notification, { notifyInfo } from '../common/notification';

class FormationDetail extends Component {
  state = {
    formation: { experts: [[]], avis: [[]] },
    toggle: {
      programme: "display-block",
      expert: "display-none",
      avis: "display-none"
    },
    loaderStatus: ''
  };

  loader(status) {
    let loaderStatus = { ...this.state.loaderStatus };
    loaderStatus = status;
    this.setState({ loaderStatus });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const formation_id = this.props.match.params.id;
    const apiUrl =
      this.props.match.params.type === "online"
        ? mcsConfig.apiUrl.detailOnlineFormation
        : mcsConfig.apiUrl.detailMeetingFormation;
    const ind = 0;
    const compThis = this;
    this.loader('show');
    axios
      .get(apiUrl + `?frm=${formation_id}&ind=${ind}`,
      )
      .then(function (response) {
        if (response.data) {
          compThis.setState({ formation: response.data });
          compThis.loader('off');
        }
      })
      .catch(function (error, response) {
        console.log(error);
        compThis.loader('off');
      });
  }

  resetToggle() {
    this.state.toggle = {
      programme: "display-none",
      expert: "display-none",
      avis: "display-none"
    };
  }

  toggleTab = type => {
    this.resetToggle();
    let toggleTab = { ...this.state.toggle };
    switch (type) {
      case "programme":
        toggleTab.programme = "display-block";
        break;
      case "experts":
        toggleTab.expert = "display-block";
        break;
      case "avis":
        toggleTab.avis = "display-block";
        break;
    }
    this.setState({ toggle: toggleTab });
  };

  render() {
    let breadcrumbBack_image = "";
    if (this.state.formation.image_l != null || this.state.formation.image_l != ""){
      breadcrumbBack_image = this.state.formation.image_l;
    }else{
      breadcrumbBack_image = resources.breadcrumbBack;
    }
    return <React.Fragment>
      <Notification />
      <Loader status={this.state.loaderStatus} />
      <div className="breakcrumb-wrap hidden-xs" style={{ background: `url(${breadcrumbBack_image})`}}>
        <div className="container">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12 col-xs-12">
              {/* <ol className="breadcrumb">
                <li>
                  <a href="#">Level 1</a>
                </li>
                <li>
                  <a href="#">level 2</a>
                </li>
                <li className="active">level 3</li>
              </ol> */}
            </div>
          </div>
        </div>
      </div>
      <div className="breadcrumb-xs visible-xs">
        <div className="container">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <ol className="breadcrumb">
                <li>
                  <a href="#">Level 1</a>
                </li>
                <li>
                  <a href="#">level 2</a>
                </li>
                <li className="active">level 3</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="body-content">
        <div className="container">
          <div className="row clearfix">
            <div className="col-md-8 col-sm-8 col-xs-12">
              <div className="cs-card hidden-xs">
                <div className="cs-card-header">
                  <p className="no-margin gara fs-25 fw-bold">
                    {this.state.formation.theme}
                  </p>
                  <p className="t-color g-bold cs-card-sub-head">
                    {this.state.formation.titre}
                  </p>
                  <DayTimeDetail formation={this.state.formation} />
                </div>

                <div className="cs-card-body">
                  {/* <p className="card-title g-bold fs-normal t-color fs-18">
                    Le programme de cette formation
                    </p>
                  <ul className="cd-list">
                    <li className="g-bold">
                      <span className="g-light">01</span>
                      19h30 - accueil des médecins autour d’un cocktail dinatoire
                      </li>
                    <li className="g-bold">
                      <span className="g-light">02</span>
                      20h - début de la formation
                      </li>
                    <li className="g-bold">
                      <span className="g-light">03</span>
                      présentation de l’expert
                      </li>
                    <li className="g-bold">
                      <span className="g-light">04</span>
                      présentation du cas clinique
                      </li>
                    <li className="g-bold">
                      <span className="g-light">05</span>
                      etude du cas clinique
                      </li>
                    <li className="g-bold">
                      <span className="g-light">06</span>
                      tour de table - résolution du cas
                      </li>
                    <li className="g-bold">
                      <span className="g-light">07</span>
                      pause (15 min)
                      </li>
                    <li className="g-bold">
                      <span className="g-light">08</span>
                      conseils de l’expert
                      </li>
                    <li className="g-bold">
                      <span className="g-light">09</span>
                      23h - fin de la formation
                      </li>
                  </ul> */}
                  <p className="card-title g-bold fs-normal t-color fs-18">
                    Description du programme
                    </p>
                  <p className="text-justify" dangerouslySetInnerHTML={{__html: this.state.formation.programme}}></p>
                </div>
              </div>

              <div className="cs-card card-xs visible-xs">
                <div className="cs-card-body pb-0">
                  <p className="no-margin fs-25 t-color gara">{this.state.formation.theme}</p>
                  <p className=" g-bold cs-card-sub-head fs-18">
                    {this.state.formation.titre}
                  </p>
                  <DayTimeDetail formation={this.state.formation} />
                  <ul className="cd-sidebar-list">
                    <li className="">
                      <span className="g-light">
                        <img src={resources.iconPerson} className="img-responsive" />
                      </span>
                      {this.state.formation.public}
                    </li>
                    <li className="">
                      <span className="g-light">
                        <img src={resources.iconTime} className="img-responsive" />
                      </span>
                      {this.state.formation.libelle_duree}
                    </li>
                    <li className="">
                      <span className="g-light">
                        <img src={resources.iconEuro} className="img-responsive" />
                      </span>
                      {this.state.formation.indemnisation}
                    </li>
                  </ul>
                  <button onClick={() => this.props.addItemToCart(
                    {
                      frm_id: this.props.match.params.id, titre: this.state.formation.titre,
                      date: this.state.formation.date, indemnisation: this.state.formation.indemnisation,
                      type: this.state.formation.type, duree: this.state.formation.duree,
                      ville: this.state.formation.ville, mnt_indem: this.state.formation.mnt_indem
                    }
                  )} className="btn-solid fs-12 w-100">
                    JE m’inscris
                    </button>
                  <p className="sidebar-btm-text">
                    <span className="t-color fs-15 g-bold">
                      En toute confiance avec
                      </span>
                    <span className="clearfix">
                      <img src={resources.image3} className="img-responsive" />
                    </span>
                  </p>
                </div>
              </div>
              <div className="mobile-cat-nav visible-xs">
                <ul>
                  <li className={((this.state.toggle.programme === 'display-block') ? 'active' : '')} onClick={() => this.toggleTab("programme")}>
                    <a>Programme</a>
                  </li>
                  <li className={((this.state.toggle.expert === 'display-block') ? 'active' : '')} onClick={() => this.toggleTab("experts")}>
                    <a>Expert(s)</a>
                  </li>
                  <li className={((this.state.toggle.avis === 'display-block') ? 'active' : '')} onClick={() => this.toggleTab("avis")}>
                    <a>L'avis de vos confrères</a>
                  </li>
                </ul>
              </div>

              <div className="mcn-content visible-xs">
                <div className={"mobile-programme " + this.state.toggle.programme}>
                  <p className="card-title g-bold fs-normal t-color fs-18">
                    Description du programme
                    </p>
                  <p className="text-justify" dangerouslySetInnerHTML={{__html: this.state.formation.programme}}></p>
                </div>

                <div className={"mobile-experts " + this.state.toggle.expert}>
                  {this.state.formation.experts[0].map(exp => {
                    return (
                      <ExpDetail exp={exp} />
                    );
                  })}
                </div>

                {this.state.formation.avis[0].length === 0 ? "" :
                  <div className={"mobile-avis " + this.state.toggle.avis}>
                    {this.state.formation.avis[0].map(avis => {
                      return (
                        <AvisDetail key={avis.prenom} avis={avis} view="mobile" />
                      );
                    })}
                    <nav aria-label="Page navigation" className="text-right">
                      <ul className="pagination">
                        <li>
                          <a href="#">1</a>
                        </li>
                        <li>
                          <a href="#">2</a>
                        </li>
                        <li>
                          <a href="#">3</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                }

              </div>

              <div className="cs-card hidden-xs">
                <div className="cs-card-body">
                  <p className="card-title g-bold fs-normal t-color fs-18">
                    Expert(s)
                    </p>
                  {this.state.formation.experts[0].map(exp => {
                    return (
                      <ExpDetail exp={exp} />
                    );
                  })}
                </div>
              </div>
              
              {this.state.formation.avis[0].length === 0 ? "" :
                <div className="cs-card hidden-xs">
                  <div className="cs-card-body hidden-xs">
                    <p className="card-title g-bold fs-normal t-color fs-18">
                      L'avis de vos confrères
                      </p>

                    {this.state.formation.avis[0].map(avis => {
                      return (
                        <AvisDetail key={avis.prenom} avis={avis} view="web" />
                      )
                    })}

                    <nav aria-label="Page navigation" className="text-right">
                      <ul className="pagination">
                        <li>
                          <a href="#">1</a>
                        </li>
                        <li>
                          <a href="#">2</a>
                        </li>
                        <li>
                          <a href="#">3</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              }
            </div>

            <div className="col-md-4 col-sm-4 col-xs-12 hidden-xs">
              <div className="cs-card card-xs">
                <div className="cs-card-body">
                  <ul className="cd-sidebar-list">
                    <li className="">
                      <span className="g-light">
                        <img src={resources.iconPerson} className="img-responsive" />
                      </span>
                      {this.state.formation.public}
                    </li>

                    <li className="">
                      <span className="g-light">
                        <img src={resources.iconTime} className="img-responsive" />
                      </span>
                      {this.state.formation.libelle_duree}
                    </li>
                    <li className="">
                      <span className="g-light">
                        <img src={resources.iconEuro} className="img-responsive" />
                      </span>
                      {this.state.formation.indemnisation}
                    </li>
                  </ul>
                  <button onClick={() => this.props.addItemToCart(
                    {
                      frm_id: this.props.match.params.id, titre: this.state.formation.titre,
                      date: this.state.formation.date, indemnisation: this.state.formation.indemnisation,
                      type: this.state.formation.type, duree: this.state.formation.duree,
                      ville: this.state.formation.ville, mnt_indem: this.state.formation.mnt_indem
                    }
                  )} className="btn-solid fs-12 w-100"> JE m’inscris
                    </button>
                  <p className="sidebar-btm-text">
                    <span className="t-color fs-15 g-bold">
                      En toute confiance avec
                      </span>
                    <span className="clearfix">
                      <img src={resources.image3} className="img-responsive" />
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xs-12">
              <button onClick={() => this.props.addItemToCart(
                {
                  frm_id: this.props.match.params.id, titre: this.state.formation.titre,
                  date: this.state.formation.date, indemnisation: this.state.formation.indemnisation,
                  type: this.state.formation.type, duree: this.state.formation.duree,
                  ville: this.state.formation.ville, mnt_indem: this.state.formation.mnt_indem
                }
              )} className="btn-solid fs-12 w-100 visible-xs mt-10"> JE m’inscris
              </button>
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>;
  }
}

const DayTimeDetail = (props) => {
  if (props.formation.type != undefined && props.formation.type != 4) {
    const start = props.formation.heure_debut.split(':');
    const end = props.formation.heure_fin.split(':');
    const date = props.formation.date1 != undefined ? props.formation.date1.split('/')[0] : "0";
    return (
      <ul className="cd-info-ul fs-normal">
        <li className="g-color calender">
          <span className="icon_number t-color g-bold"> {date} </span>
          <span className="info-text g-bold">{`${props.formation.ville} - ${props.formation.date}`}</span>
        </li>
        <li className="g-color waiter">
          <span className="info-text g-bold"> De {`${start[0]}:${start[1]}`} à {`${end[0]}:${end[1]}`}</span>
        </li>
      </ul>
    );
  } else {
    return ("");
  }
}

const ExpDetail = (props) => {
  const exp = props.exp;
  return (
    <div key={exp.nom} className="notre-wrap">
      <div className="row clearfix">
        <div className="col-md-3 col-sm-3 col-xs-12">
          <img src={exp.url} alt="photo" className="img-responsive" />
        </div>
        <div className="col-md-9 col-sm-9 col-xs-12">
          <p className="g-bold fs-18 notre-title">
            {`${exp.titre} ${exp.prenom} ${exp.nom}`}
          </p>
          <p className="notre-des">{exp.profession}</p>
          <p className="notre-des">{exp.ville}</p>
          <p className="notre-des">{exp.bio}</p>
        </div>
      </div>
    </div>
  );
}

const AvisDetail = (props) => {
  const avis = props.avis;
  const view = props.view;
  let firstDiv = "col-md-1 col-sm-1 col-xs-12";
  let secondDiv = "col-md-11 col-sm-11 col-xs-12";
  if (view === "mobile") {
    firstDiv = "col-md-1 col-sm-1 col-xs-1";
    secondDiv = "col-md-11 col-sm-11 col-xs-9";
  }
  return (
    <div className="avis-wrap">
      <div className="row clearfix">
        <div className={firstDiv}>
          {/* <div className="avis-img-wrap">
            <img src="http://www.ecots-group.com/images/testimonial-2.jpg" className="img-responsive" />
          </div> */}
        </div>
        <div className={secondDiv}>
          <p className="avis-title g-bold fs-18 no-margin">
            {avis.prenom} - {avis.profession}
          </p>
          <p className="avis-title g-light fs-10">
            {avis.ville} - {avis.date}
          </p>
          <p className="avis-des">
            {avis.detail}
          </p>
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
    addItemToCart: (item) => {
      const action = { type: "cart-add-item", item: item, notify: notifyInfo }
      dispatch(action);
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormationDetail);
