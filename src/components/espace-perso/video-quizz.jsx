import React, { Component } from "react";
import axios from "axios";
import Loader from "../../loader"
import mcsConfig from "../../mcs-configuration";
import moment from 'moment';

class VideoQuizz extends Component {
    state = {
        frm_id: 0,
        formation: {},
        url: '',
        loaderStatus: ''
    }

    loader(status) {
        let loaderStatus = { ...this.state.loaderStatus };
        loaderStatus = status;
        this.setState({ loaderStatus });
    }

    componentWillMount() {
        if (!mcsConfig.user.isLoggedIn) {
            this.props.history.push(mcsConfig.route.login);
        }
        this.loader('show');
        const frm_id = this.props.match.params.frm_id;
        this.state.frm_id = frm_id;
    }

    componentDidMount() {
        const ind = mcsConfig.user.id;
        const compThis = this;
        const frm_id = this.state.frm_id;
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

        axios
            .get(mcsConfig.apiUrl.getFormationVideo + `?frm=${frm_id}&mode=0`)
            .then(function (response) {
                if (response.data.erreur) {
                    let url = "https://www.youtube.com/embed/" + response.data.url.split("/").pop();
                    compThis.setState({ url });
                }
                compThis.loader('off');
            })
            .catch(function (error) {
                console.log(error);
                compThis.loader('off');
            });

        setInterval(this.trackSpendingTime, 60000);
    }

    trackSpendingTime = () => {
        const datetime = moment().format('DD-MM-YYYY h:mm:ss');
        axios
            .post(mcsConfig.apiUrl.log_time_video_page + `?frm=${this.state.frm_id}&ind=${mcsConfig.user.id}&time=${datetime}`)
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const formation = this.state.formation;
        return (
            <React.Fragment>
                <Loader status={this.state.loaderStatus} />
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

                {
                    formation == {} ? "" :
                        (
                            <React.Fragment>
                                <div className="container">
                                    <div className="row">
                                        <div style={{ marginTop: "40px" }} className="col-md-10  col-md-offset-1 col-xs-12 video-wrap">
                                            <iframe className="" src={this.state.url} allowFullScreen></iframe>
                                        </div>
                                    </div>
                                </div>

                                <center style={{ marginBottom: "5px" }}>
                                    <button className="btn-solid-border btn-black-border" onClick={() => window.history.back()}>RETOUR</button>
                                </center>
                            </React.Fragment>
                        )
                }
            </React.Fragment>
        )
    }
}

export default VideoQuizz;