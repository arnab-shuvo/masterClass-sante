import React, { Component } from "react";
import Formations from "./formations";
import VotrePartenaire from "./votre-partenaire";
import NotreExpertise from "./notre-expertise";
import resources from "../resources";
import store from '../../store/store';
import Loader from "../../loader"

class Homepage extends Component {

  state = {
    loaderStatus: ''
  };
  loader(status) {
    let loaderStatus = { ...this.state.loaderStatus };
    loaderStatus = status;
    this.setState({ loaderStatus });

  }

  componentWillMount(){
    this.loader('show');
  }  
  componentDidMount(){    
    if(this.props.location.state && this.props.location.state.section){
      switch(this.props.location.state.section){
        case 'online':
          document.getElementById('1a').scrollIntoView();
          break;
        case 'meeting':
          document.getElementById('2a').scrollIntoView();
          break;
        case 'votre':
          document.getElementById('section-master').scrollIntoView();
          break;
        case 'notre':
          document.getElementById('section-expert-notre').scrollIntoView();
          break;
      }
    }
    this.loader('off');
  }

  render() {
    return (
      <React.Fragment>
        <Loader status={this.state.loaderStatus} />
        <div className="banner-wrap" id="section-home">
          <div className="container pos-relative">
            
            <div className="row clearfix">
              <div className="col-md-6 col-sm-6 text-xs-center">
                <p className="banner-text text-xs-center">
                  La nouvelle approche de la formation DPC des médecins
                </p>
                <div className="visible-xs fx-mobile-banner-icon">
                  <div className="banner-icon-wrap pos-relative">
                    <img src={resources.image3} />

                  </div>
                  <div className="down-arrow-wrap">
                    <img src={resources.mobiledownarrow} />
                  </div>
                </div>
                <button className="btn-transparent hidden-xs btn-border-bold">
                  Le DPC, en savoir plus
                </button>
              </div>
            </div>
          </div>
          <div className="banner-carousel hidden-xs">
            <div className="bc-inner">
              <div id="myCarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="item active">
                    <p className="bc-header">Actu</p>
                    <p className="bc-sub-des no-margin">
                      Lorem Ipsum doler Sit
                    </p>
                    <p className="bc-des no-margin">
                      Lorem Ipsum doler Sit Amed constique analisto
                    </p>

                    <div className="text-right">
                      <button className="btn-solid-border">Je m'inscris</button>
                    </div>
                  </div>
                  <div className="item">
                    <p className="bc-header">Actu</p>
                    <p className="bc-sub-des no-margin">
                      Lorem Ipsum doler Sit
                    </p>
                    <p className="bc-des no-margin">
                      Lorem Ipsum doler Sit Amed constique analisto
                    </p>
                    <div className="text-right">
                      <button className="btn-solid-border">Je m'inscris</button>
                    </div>
                  </div>
                </div>

                {/* <span id="id-to-navigate-formation"></span> */}
                <a className="bs-control bcc-left"
                  href="#myCarousel"
                  data-slide="prev">
                  <span className="glyphicon glyphicon-chevron-left" />
                  <span className="sr-only">Previous</span>
                </a>
                <a className="bs-control bcc-right"
                  href="#myCarousel"
                  data-slide="next">
                  <span className="glyphicon glyphicon-chevron-right" />
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <Formations store={store} history={this.props.history}/>
        <div className="banner-carousel visible-xs">
          <div className="bc-inner">
            <div id="phoneCarousel" className="carousel slide" data-ride="carousel">              
                <div className="carousel-inner">
                <div className="item active">
                  <p className="bc-header">Actu</p>
                  <p className="bc-sub-des no-margin">Lorem Ipsum doler Sit </p>
                  <p className="bc-des no-margin">Lorem Ipsum doler Sit Amed constique analisto</p>

                  <div className="text-right text-xs-center"><button className="btn-solid-border">Je m'inscris</button></div>

                </div>
                <div className="item">
                  <p className="bc-header">Acto</p>
                  <p className="bc-sub-des no-margin">Lorem Ipsum doler Sit </p>
                  <p className="bc-des no-margin">Lorem Ipsum doler Sit Amed constique analisto</p>
                  <div className="text-right text-xs-center"><button className="btn-solid-border">Je m'inscris</button></div>
                </div>
              </div>

                <a className="bs-control bcc-left" href="#phoneCarousel" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="bs-control bcc-right" href="#phoneCarousel" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
        <VotrePartenaire />
        <NotreExpertise />
      </React.Fragment>
    );
  }
}

export default Homepage;
