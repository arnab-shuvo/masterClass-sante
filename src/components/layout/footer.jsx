import React, { Component } from "react";
import resources from "../resources";

class Footer extends Component {
  state = {};
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="row clearfix">
            <div className="col-md-6 col-sm-6 col-xs-12">
              <img src={resources.logo} className="img-responsive" />
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12">
              <ul>
                <li>
                  <a className="footer-a-tag">Nous contacter</a>
                </li>
                <li>
                  <a className="footer-a-tag">Qui sommes-nous ?</a>
                </li>
                <li>
                  <a className="footer-a-tag">Questions fréquentes</a>
                </li>
                <li>
                  <a className="footer-a-tag">Conditions générales</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
