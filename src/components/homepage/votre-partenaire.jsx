import React, { Component } from "react";
import resources from "../resources";

class VotrePartenaire extends Component {
  state = {};
  render() {
    return (
      <div className="master-sante" ref={(section) => { this.master = section; }} id="section-master">
        <div className="container">
          <div className="row clearfix ms-first-row">
            <div className="col-md-6 col-sm-6 col-xs-12 master-sante-wrap">
              <div className="master-sante-content">
                <div className="row clearfix">
                  <div className="col-md-10 col-sm-10 col-xs-12">
                    <p className="gara ms-header">
                      Masterclass Santé XXXXX
                    </p>
                    <p className="g-bold ms-sub-header t-color">
                      Votre partenaire DPC
                    </p>
                    <p className="g-light ms-des ">
                      Un accompagnement sur-mesure pour permettre à vos
                      participants de valider leur DPC dans le cadre de vos
                      évènements
                    </p>
                    <div className="row clearfix">
                      <div className="col-md-6 col-sm-6 col-xs-6 ms-icons">
                        <img src={resources.masterIcon1} className="img-responsive" />
                        <p className="g-bold icon-text text-justify">
                          Une expertise de 10 ans en ingénierie de formation
                          médicale
                        </p>
                      </div>
                      <div className="col-md-6 col-sm-6 col-xs-6 ms-icons">
                      <img src={resources.iconImage31} className="img-responsive" />
                        <p className="g-bold icon-text text-justify">
                          Une équipe dédiée à la certification DPC des
                          congrès et journées scientifiques
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="liner hidden-xs" />
                <div className="text-right text-xs-center">
                  <button className="btn-solid ms-btn w-xs-100">
                    EN SAVOIR PLUS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VotrePartenaire;
