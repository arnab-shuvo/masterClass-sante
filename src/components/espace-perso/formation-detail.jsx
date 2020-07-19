import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import mcsConfig from "../../mcs-configuration";
import resources from "../resources";
import Loader from "../../loader"

class FormationDetail extends Component {
    state = {
        frm_id: 0,
        formation: {},
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
        const frm_id = this.props.match.params.frm_id;
        this.state.frm_id = frm_id;
        const compThis = this;
        this.loader('show');
        axios
            .get(mcsConfig.apiUrl.userFormationDetail + `?ind=${ind}&frm=${frm_id}`)
            .then(function (response) {
                if (response.data) {
                    compThis.setState({ formation: response.data });
                }
                compThis.loader('off');
            })
            .catch(function (error) {
                console.log(error);
                compThis.loader('off');
            });
    }

    render() {
        let retourLink =  mcsConfig.route.espacePersoFormationHistory;
        let retourText =  "Historique de formations";
        if (this.props.match.path.includes("mes-formations")){
            retourLink = mcsConfig.route.espacePersoMyFormations;
            retourText = "Mes formations";
        }
        const formation = this.state.formation;
        return (
            <React.Fragment>
                <Loader status={this.state.loaderStatus} />
                <div className="page-title">
                    <div className="container">
                        <div className="row clearfix">
                            <div className="com-md -12 col-sm-12 col-xs-12">
                                <p className="w-color fs-30 fw-bold"><NavLink to={retourLink} className="visible-xs mf-back" href=""><img src={resources.iconRetour} /></NavLink>{retourText}</p>
                                <p className="fs-18 g-light hidden-xs clearfix">Mes formations à venir ou en cours
                                    <NavLink to={retourLink} className="btn-solid-border btn-black-border pull-right"><span className="btn-image"><img src={resources.iconRetourAsh} /></span>RETOUR</NavLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mes-formation-container">
                    <div className="mes-formation-header"></div>
                    <div className="mfh-head-info">
                        <div className="container">
                            <div className="row clearfix">
                                <div className="col-md-12">
                                    <p className="fs-36 w-color gara fw-bold mfh-title">{formation.titre}</p>
                                    <p className="visible-xs"><label className="label-custom">
                                        {formation.type == 1 ? "Formation présentielle" : "Formation en ligne"}
                                    </label></p>
                                    <p className={formation.type != 1 ? "display-none" : "visible-xs"}><label className="label-custom">
                                        {`${formation.date} * ${formation.ville}`}
                                    </label></p>
                                    <p className={formation.type == 1 ? "fs-18 w-color g-regular text-uppurcase no-margin hidden-xs " : "fs-18 w-color g-regular text-uppurcase no-margin hidden-xs pb-20"} >
                                        
                                        {formation.type == 1 ? "Formation présentielle" : "Formation en ligne"}
                                    </p>
                                    {/* <p className="fs-16 w-color g-regular text-uppurcase pb-10 no-margin hidden-xs"> */}
                                    <p className={formation.type != 1 ? "display-none" : "fs-16 w-color g-regular text-uppurcase pb-20 no-margin hidden-xs"}>
                                        {`${formation.date} * ${formation.ville}`}
                                    </p>
                                    <p className="g-color fs-18 g-bold visible-xs">Lorem Ipsum doler sit amed</p>
                                    <p className=" fs-15 visible-xs" dangerouslySetInnerHTML={{__html: formation.resume}}></p>
                                </div>
                            </div>

                        </div>
                        <div className="mfh-des hidden-xs">
                            <div className="container">
                                <div className="row clearfix">
                                    <div className="col-md-8 col-sm-8 col-xs-12 mfh-des-wrap">
                                        <p className="w-color text-justify" dangerouslySetInnerHTML={{__html: formation.resume}}></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="body-content">
                    <div className="container accord-body">
                        <div className="row clearfix">
                            <div className="col-md-10 col-sm-10 col-xs-12 col-md-offset-1 col-sm-offset-1">
                               
                                <div className="accordio-wrap hidden-xs">
                                    <div id="accordion" className="panel-group">
                                        <div className={formation.quizz == 1 ? "panel" : "panel hidden"}>
                                            <div className="panel-heading">
                                                <h4 className="panel-title">
                                                    <a href="#panelBodyOne" className="accordion-toggle t-color g-bold" data-toggle="collapse" data-parent="#accordion">
                                                        <span className="act-image">
                                                            <img src={resources.iconQuestion} className="img-responsive" />
                                                        </span>{formation.quizz_title}<span className="arrow-accord"></span>
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="panelBodyOne" className="panel-collapse collapse in">
                                                <div className="panel-body">
                                                    <div className="accor-content">
                                                        <div className="row clearfix">
                                                            <div className="col-md-9 col-sm-9 col-xs-12">
                                                                <p dangerouslySetInnerHTML={{__html: formation.quizz_text}}></p>
                                                            </div>
                                                        </div>
                                                        {/* <button className="btn-solid accord-btn">{formation.quizz_btn}</button> */}
                                                        <a href={formation.quizz_url} target="_blank" className="btn-solid accord-btn">{formation.quizz_btn}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={formation.cc == 1 ? "panel" : "panel hidden"}>
                                            <div className="panel-heading">
                                                <h4 className="panel-title">
                                                    <a href="#panelBodyCc" className="t-color g-bold accordion-toggle collapsed"
                                                        data-toggle="collapse" data-parent="#accordion"><span className="act-image">
                                                            <img src={resources.iconStethoscope} className="img-responsive" /></span>{formation.cc_title}<span className="arrow-accord"></span>
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="panelBodyCc" className="panel-collapse collapse">
                                                <div className="panel-body">
                                                    <div className="accor-content">
                                                        <div className="row clearfix">
                                                            <div className="col-md-9 col-sm-9 col-xs-12">
                                                                <p dangerouslySetInnerHTML={{__html: formation.cc_text}}></p>
                                                            </div>
                                                        </div>
                                                        {/* <button className="btn-solid accord-btn">{formation.cc_btn}</button> */}
                                                        <a href={formation.cc_url} target="_blank" className="btn-solid accord-btn">{formation.cc_btn}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={formation.mod == 4 ? "panel" : "panel hidden"}>
                                            <div className="panel-heading">
                                                <h4 className="panel-title">
                                                    <a href="#panelBodyMod" className="t-color g-bold accordion-toggle collapsed"
                                                        data-toggle="collapse" data-parent="#accordion"><span className="act-image">
                                                            <img src={resources.iconLive3} className="img-responsive" /></span>{formation.mod_title}<span className="arrow-accord"></span>
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="panelBodyMod" className="panel-collapse collapse">
                                                <div className="panel-body">
                                                    <div className="accor-content">
                                                        <div className="row clearfix">
                                                            <div className="col-md-9 col-sm-9 col-xs-12">
                                                                <p dangerouslySetInnerHTML={{__html: formation.mod_text}}></p>
                                                            </div>
                                                        </div>
                                                        <button className="btn-solid accord-btn" onClick={() => window.open(`/mes-formations/${this.state.frm_id}/video`, "_self")}>{formation.mod_btn}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={formation.biblio == 1 ? "panel" : "panel hidden"}>
                                            <div className="panel-heading">
                                                <h4 className="panel-title">
                                                    <a href="#panelBodyTwo" className="t-color g-bold accordion-toggle collapsed"
                                                        data-toggle="collapse" data-parent="#accordion"><span className="act-image">
                                                            <img src={resources.iconBiblio} className="img-responsive" /></span>{formation.biblio_title}<span className="arrow-accord"></span>
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="panelBodyTwo" className="panel-collapse collapse">
                                                <div className="panel-body">
                                                    <div className="accor-content">
                                                        <div className="row clearfix">
                                                            <div className="col-md-9 col-sm-9 col-xs-12">
                                                                <p dangerouslySetInnerHTML={{__html: formation.biblio_text}}></p>
                                                            </div>
                                                        </div>
                                                        {/* <button className="btn-solid accord-btn">{formation.biblio_btn}</button> */}
                                                        <a href={formation.biblio_url} target="_blank" className="btn-solid accord-btn">{formation.biblio_btn}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={formation.conv == 1 ? "panel" : "panel hidden"}>
                                            <div className="panel-heading">
                                                <h4 className="panel-title">
                                                    <a href="#panelBodyThree" className="t-color g-bold accordion-toggle collapsed"
                                                        data-toggle="collapse" data-parent="#accordion"><span className="act-image">
                                                            <img src={resources.iconLettre} className="img-responsive" /></span>{formation.conv_title} <span className="arrow-accord"></span>
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="panelBodyThree" className="panel-collapse collapse">
                                                <div className="panel-body">
                                                    <div className="accor-content">
                                                        <div className="row clearfix">
                                                            <div className="col-md-9 col-sm-9 col-xs-12">
                                                                <p dangerouslySetInnerHTML={{__html: formation.conv_text}}></p>
                                                            </div>
                                                        </div>
                                                        {/* <button className="btn-solid accord-btn">{formation.conv_btn}</button> */}
                                                        <a href={formation.conv_url} target="_blank" className="btn-solid accord-btn">{formation.conv_btn}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={formation.att == 1 ? "panel" : "panel hidden"}>
                                            <div className="panel-heading">
                                                <h4 className="panel-title">
                                                    <a href="#panelBodyfour" className="t-color g-bold accordion-toggle collapsed"
                                                        data-toggle="collapse" data-parent="#accordion"><span className="act-image">
                                                            <img src={resources.iconAttestation} className="img-responsive" /></span>{formation.att_title}<span className="arrow-accord"></span>
                                                    </a>
                                                </h4>
                                            </div>
                                            <div id="panelBodyfour" className="panel-collapse collapse">
                                                <div className="panel-body">
                                                    <div className="accor-content">
                                                        <div className="row clearfix">
                                                            <div className="col-md-9 col-sm-9 col-xs-12">
                                                                <p dangerouslySetInnerHTML={{__html: formation.att_text}}></p>
                                                            </div>
                                                        </div>
                                                        {/* <button className="btn-solid accord-btn">{formation.att_btn}</button> */}
                                                        <a href={formation.att_url} target="_blank" className="btn-solid accord-btn">{formation.att_btn}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="accord-block visible-xs">
                                    <div className="row clearfix">
                                        <div className={formation.quizz == 1 ? "col-xs-6" : "col-xs-6 hidden"}>
                                            <div className="ab-wrap">
                                                <p className="fs-15 g-color g-bold">{formation.quizz_title}</p>
                                                <p className=" t-color" onClick={() => window.open(formation.quizz_url, "_blank")}>
                                                <span className="act-image"><img src={resources.iconQuestion} className="img-responsive" /></span>{formation.quizz_btn}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={formation.cc == 1 ? "col-xs-6" : "col-xs-6 hidden"}>
                                            <div className="ab-wrap">
                                                <p className="fs-15 g-color g-bold">{formation.cc_title}</p>
                                                <p className=" t-color" onClick={() => window.open(formation.cc_url, "_blank")}>
                                                <span className="act-image"><img src={resources.iconStethoscope} className="img-responsive" /></span>{formation.cc_btn}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={formation.mod == 4 ? "col-xs-6" : "col-xs-6 hidden"}>
                                            <div className="ab-wrap">
                                                <p className="fs-15 g-color g-bold">{formation.mod_title}</p>
                                                <p className=" t-color" onClick={() => window.open(`/mes-formations/${this.state.frm_id}/video`, "_self")}>
                                                    <span className="act-image"><img src={resources.iconLive3} className="img-responsive" /></span>
                                                    {formation.mod_btn}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={formation.biblio == 1 ? "col-xs-6" : "col-xs-6 hidden"}>
                                            <div className="ab-wrap">
                                                <p className="fs-15 g-color g-bold">{formation.biblio_title}</p>
                                                <p className=" t-color" onClick={() => window.open(formation.biblio_url, "_blank")}>
                                                <span className="act-image"><img src={resources.iconBiblio} className="img-responsive" /></span>{formation.biblio_btn}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={formation.conv == 1 ? "col-xs-6" : "col-xs-6 hidden"}>
                                            <div className="ab-wrap">
                                                <p className="fs-15 g-color g-bold">{formation.conv_title}</p>
                                                <p className=" t-color" onClick={() => window.open(formation.conv_url, "_blank")}>
                                                <span className="act-image"><img src={resources.iconLettre} className="img-responsive" /></span>{formation.conv_btn}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={formation.att == 1 ? "col-xs-6" : "col-xs-6 hidden"}>
                                            <div className="ab-wrap">
                                                <p className="fs-15 g-color g-bold">{formation.att_title}</p>
                                                <p className=" t-color" onClick={() => window.open(formation.att_url, "_blank")}>
                                                <span className="act-image"><img src={resources.iconAttestation} className="img-responsive" /></span>{formation.att_btn}
                                                </p>
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

export default FormationDetail;
