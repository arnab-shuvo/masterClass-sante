import React, { Component } from 'react';
import resources from "../resources";
import axios from "axios";
import mcsConfig from "../../mcs-configuration";

class PresentielFormation extends Component {

  state = { formations: [] }

  componentWillMount() {
    const type = 1;
    const ind = 0;
    const compThis = this;
    axios
      .get(mcsConfig.apiUrl.listFormations + `?type=${type}&ind=${ind}`)
      .then(function(response) {
        if (response.data.frm) {
          compThis.setState({ formations: response.data.frm });
        }
      })
      .catch(function(error, response) {
        console.log(error);
      });
  }

  render() {
    let mapper = 0;
    let mapper_indicator = 0;
    const divClassName = "tab-pane active tab2";
    return <div className={divClassName} id="2a">
      <span id="id-to-navigate-meeting"></span>
        <p className="th-image-wrap">
          <img src={resources.iconInfinity} />
        </p>
        <p className="tab-small-head">Masterclass Santé Infinity</p>
        <p className="tab-sub-head">Vos soirées d’expert</p>
        <p className="tab-short-des">
          Rentrez dans le Cercle du DPC et participez à des soirées
          privilégiées
        </p>
        <div className="tab-farm-factor">
          <div className="row clearfix">
            <div className="col-md-4 col-sm-4 col-xs-12 tab-farm-factor-wrap text-center">
              <p>
                <span>
                  <img src={resources.iconImage11} />
                </span>
                <span> Soirée de 3H + 1H de contenu complémentaire </span>
              </p>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12 tab-farm-factor-wrap text-center">
              <p>
                <span>
                  <img src={resources.iconImage10} />{" "}
                </span>
                <span>
                  {" "}
                  UN lieu et des intervenants Formateurs de prestige{" "}
                </span>
              </p>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12 tab-farm-factor-wrap text-center">
              <p>
                <span>
                  <img src={resources.iconImage9} />
                </span>
                <span>UNE PRESENTATION LUDIQUE ET INNOVANTE</span>
              </p>
            </div>
          </div>
        </div>

        <div className="tab-video-wrap">
          <p className="g-bold tv-head clearfix">
            <span className="tvh-span">
              Nos formations Masterclass Santé Infinity
            </span>
            <span className="pull-right hidden-xs">
              <button className="btn-transparent btn-sm">TOUT VOIR</button>
            </span>
          </p>

          <div className="row clearfix">
            {this.state.formations.map(formation => {
              return <div onClick={() => {
                    this.props.history.push(mcsConfig.route.detailFormation + "/meeting/" + formation.frm);
                  }} key={formation.frm} className="hidden-xs col-md-3 col-sm-3 col-xs-12">
                  <div className="tv-wrap">
                    <div className="video-holder">
                      {/* <img src={resources.video} className="img-responsive" /> */}
                      <img src={formation.image_s} className="img-responsive" />
                    </div>
                    <p className="video-head t-color g-bold">
                      {formation.theme}
                    </p>
                  <p className="video-sub  b-color g-bold">{mcsConfig.methods.textExcerpt(formation.titre, 40)}</p>
                  <p className="video-des  b-color g-bold">{mcsConfig.methods.textExcerpt(formation.extrait, 40)}</p>
                  </div>
                </div>;
            })}
          </div>

          <div id="secondtabCarousel" className="carousel slide visible-xs" data-ride="carousel">
            <ol className="carousel-indicators">
              {this.state.formations.map(formation => {
                mapper_indicator = mapper_indicator + 1;
                return <li key={formation.frm + 1} data-target="#tabCarousel" data-slide-to={mapper_indicator - 1} className={mapper_indicator - 1 === 0 ? "active" : ""} />;
              })}
            </ol>
            <div className="carousel-inner">
              {this.state.formations.map(formation => {
                mapper = mapper + 1;
                return <React.Fragment key={formation.frm + 2}>
                    <div className={"item " + (mapper === 1 ? "active" : "")}>
                      <div className="row clearfix">
                        <div onClick={() => {
                            this.props.history.push(mcsConfig.route.detailFormation + "/meeting/" + formation.frm);
                          }} key={formation.frm + 3} className="col-xs-12">
                          <div className="tv-wrap">
                            <div className="video-holder">
                              {/* <img src={resources.video} className="img-responsive" /> */}
                            <img src={ formation.image_s } className="img-responsive" />
                            </div>
                            <p className="video-head t-color g-bold">
                              {formation.theme}
                            </p>
                          <p className="video-sub  b-color g-bold">{mcsConfig.methods.textExcerpt(formation.titre, 40)}</p>
                          <p className="video-des  b-color g-bold">{mcsConfig.methods.textExcerpt(formation.titre, 40)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>;
              })}
              <a className="bs-control bcc-left" href="#secondtabCarousel" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left" />
                <span className="sr-only">Previous</span>
              </a>
              <a className="bs-control bcc-right" href="#secondtabCarousel" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right" />
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default PresentielFormation;