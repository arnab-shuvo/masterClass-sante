import React, { Component } from "react";
import resources from "../resources";
import axios from "axios";
import mcsConfig from "../../mcs-configuration";

class OnlineFormation extends Component {
  state = {
    formations: []
  };

  componentWillMount() {
    const type = 4;
    const ind = 0;
    const compThis = this;
    axios
      .get(mcsConfig.apiUrl.listFormations + `?type=${type}&ind=${ind}`,
      )
      .then(function (response) {
        if (response.data.frm) {
          compThis.setState({ formations: response.data.frm })
        }
      })
      .catch(function (error, response) {
        console.log(error)
      });
  }

  render() {
    let mapper = 0;
    let mapper_indicator = 0;
    const divClassName = "tab-pane active";
    return (
      <div className={divClassName} id="1a">
        <span id="id-to-navigate-online"></span>
        <p className="th-image-wrap">
          <img src={resources.iconPanel} />
        </p>
        <p className="tab-small-head">Masterclass Santé Tv</p>
        <p className="tab-sub-head">
          La 1ère chaîne TV spécialisée dans la formation DPC
        </p>
        <p className="tab-short-des">
          Suivez vos formations DPC où que vous soyez et à votre rythme !
        </p>
        <div className="tab-farm-factor">
          <div className="row clearfix">
            <div className="col-md-4 col-sm-4 col-xs-12 tab-farm-factor-wrap text-center">
              <p>
                <span>
                  <img src={resources.iconImage13} />
                </span>
                <span> 2 HEURES DE FORMATION</span>
              </p>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12 tab-farm-factor-wrap text-center">
              <p>
                <span>
                  <img src={resources.iconImage12} />
                </span>
                <span>FORMAT VIDEO ET CONTENU TELECHARGEABLE</span>
              </p>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12 tab-farm-factor-wrap text-center">
              <p>
                <span>
                  <img src={resources.iconImage14} />
                </span>
                <span>ACCESSIBLE PARTOUT, TOUT LE TEMPS</span>
              </p>
            </div>
          </div>
        </div>
        <div className="tab-video-wrap">
          <p className="g-bold tv-head clearfix">
            <span className="tvh-span">
              Nos formations Masterclass Santé Tv
            </span>
            <span className="pull-right hidden-xs">
              <button className="btn-transparent btn-sm">TOUT VOIR</button>
            </span>
          </p>

          <div className="row clearfix">
            {this.state.formations.map(formation => {
              return (
                <div onClick={() => {
                  this.props.history.push(mcsConfig.route.detailFormation + "/online/" + formation.frm);
                }} key={formation.frm} className="hidden-xs col-md-3 col-sm-3 col-xs-12">
                  <div className="tv-wrap">
                    <div className="video-holder">
                      <img
                        // src={resources.video}
                        src={formation.image_s}
                        className="img-responsive" />
                    </div>
                    <p className="video-head t-color g-bold">{formation.theme}</p>
                    <p className="video-sub b-color g-bold">{mcsConfig.methods.textExcerpt(formation.titre, 40)}</p>
                    <p className="video-des b-color g-bold">{mcsConfig.methods.textExcerpt(formation.experts.nom, 40)}</p>
                  </div>
                </div>

              );
            })}
          </div>
          <div id="tabCarousel" className="carousel slide visible-xs" data-ride="carousel">
            <ol className="carousel-indicators">
              {this.state.formations.map(formation => {
                mapper_indicator = mapper_indicator + 1;
                return (
                  <li key={formation.frm} data-target="#tabCarousel" data-slide-to={mapper_indicator - 1} className={(((mapper_indicator - 1) === 0) ? 'active' : '')}></li>
                )
                
              })
              }
            </ol>
            <div className="carousel-inner">

              {this.state.formations.map(formation => {
                mapper = mapper + 1;
                return (
                  <React.Fragment key={formation.frm}>
                    <div className={"item " + ((mapper === 1) ? 'active' : '')}>
                      <div className="row clearfix">
                        <div onClick={() => {
                          this.props.history.push(mcsConfig.route.detailFormation + "/online/" + formation.frm);
                        }} key={formation.frm} className="col-xs-12">
                          <div className="tv-wrap">
                            <div className="video-holder">
                              <img
                                // src={resources.video}
                                src={formation.image_s}
                                className="img-responsive" />
                            </div>
                            <p className="video-head t-color g-bold">{formation.theme}</p>
                            <p className="video-sub b-color g-bold">{formation.titre}</p>
                            <p className="video-des b-color g-bold">{formation.experts.nom}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>

                );
              })}
              <a
                className="bs-control bcc-left"
                href="#tabCarousel"
                data-slide="prev"
              >
                <span className="glyphicon glyphicon-chevron-left" />
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="bs-control bcc-right"
                href="#tabCarousel"
                data-slide="next"
              >
                <span className="glyphicon glyphicon-chevron-right" />
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default OnlineFormation;
