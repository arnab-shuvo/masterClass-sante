import React, { Component } from "react";
import resources from "../resources";
import OnlineFormation from "./online-formation";
import PresentielFormation from "./persentiel-formation";
import {connect} from "react-redux";

class Formations extends Component {
  state = {};
  render() {
    return <React.Fragment>
      <div className="tab-section" id="section-tab">

          {/* <div className="tab-header-wrap">
            <div className="container">
              <div className="row clearfix">
                <ul className="nav nav-pills">
                  <li className={this.props.selectedTab === "online" ? "active" : ""} onClick={this.props.showOnlineTabDispatch}>
                    <a href="#1a" className="g-bold fs-18 g-color" data-toggle="tab">
                      <div className="tab-head-image-wrap left">
                      <img src={resources.iconNumerique} className="img-responsive active" />
                      <img src={resources.iconNumeriqueClic} className="img-responsive inactive" />
                      </div>
                      Formations en ligne
                    </a>
                  </li>
                  <li className={this.props.selectedTab === "meeting" ? "active" : ""} onClick={this.props.showMeetingTabDispatch}>
                  <a href="#2a" className="g-bold fs-18 g-color" data-toggle="tab">
                      <div className="tab-head-image-wrap right">
                      <img src={resources.iconPresentiel} className="img-responsive active" />
                      <img src={resources.iconPresentielClic} className="img-responsive inactive" />
                      </div>
                      Formations en présentiel
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}

          <div className="tab-panel-wrap">
            <div className="container">
              <div className="row clearfix">
                <div className="com-md-12 com-sm-12 col-xs-12">
                  <div className="tab-content clearfix">

                  <OnlineFormation history={this.props.history} selectedTab={this.props.selectedTab} />
                  <PresentielFormation history={this.props.history} selectedTab={this.props.selectedTab} />
                  <span id="id-to-navigate-votre" />
                  </div>
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </React.Fragment>;
  }
}

function mapStateToProps(state){
  return state;
}

function mapDispatchToProps(dispatch){
  return{
    showOnlineTabDispatch: () => {
      const action = {type: "online"}
      dispatch(action);
    },
    showMeetingTabDispatch: () => {
      const action = {type: "meeting"}
      dispatch(action);
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Formations);
