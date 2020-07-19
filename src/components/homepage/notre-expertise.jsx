import React, { Component } from "react";
import resources from "../resources";

class NotreExpertise extends Component {
  state = {};
  render() {
    return (
      <div className="notre-expertise" ref={(section) => { this.notre = section; }} id="section-expert-notre">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-md-6 col-sm-6 col-xs-12 notre-image">
              <img src={resources.notreImage} className="img-responsive" alt=""/>
            </div>
            <div className="col-md-5 col-sm-5 col-xs-12">
              <div className="notre-content">
                <p className="gara nc-head"><span className="text-uppercase">à</span> propos</p>
                <p className="g-bold t-color nc-sub-head">Notre expertise</p>
                <p className="g-regular g-color text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  ac tempus ex, at ornare nunc. Aliquam iaculis nec velit nec
                  interdum. In ullamcorper est justo, tincidunt molestie libero
                  lacinia eu. Ut sit amet felis sed odio gravida consectetur.
                  Curabitur facilisis dui vel tincidunt euismod.Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Sed ac tempus ex,
                  at ornare nunc. Aliquam iaculis nec velit nec interdum. In
                  ullamcorper est justo, tincidunt molestie libero lacinia eu.
                  Ut sit amet felis sed odio gravida consectetur. Curabitur
                  facilisis dui vel tincidunt euismod.Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Sed ac tempus ex, at ornare
                  nunc. Aliquam iaculis nec velit nec interdum. In ullamcorper
                  est justo, tincidunt molestie libero lacinia eu. Ut sit amet
                  felis sed odio gravida consectetur. Curabitur facilisis dui
                  vel tincidunt euismod.
                </p>
                <p className="g-regular g-color text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  ac tempus ex, at ornare nunc. Aliquam iaculis nec velit nec
                  interdum. In ullamcorper est justo, tincidunt molestie libero
                  lacinia eu. Ut sit amet felis sed odio gravida consectetur.
                  Curabitur facilisis dui vel tincidunt euismod.
                </p>
                <div className="notre-btn text-left  text-xs-center">
                  <button className="btn-solid">
                    Rechercher une formation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotreExpertise;
