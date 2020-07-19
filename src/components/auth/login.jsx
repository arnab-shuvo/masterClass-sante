import React, { Component } from "react";
import axios from "axios";
import mcsConfig from "../../mcs-configuration";
import { NavLink } from "react-router-dom";
import Loader from "../../loader";
import MotDePasseModal from "./mot-de-passe";

class Login extends Component {
  state = {
    user: {
      email: '',
      password: '',
      rememberMe: false
    },
    error: {
      email: '',
      password: '',
      invalidCred: ''
    },
    openModal: false,
    loaderStatus: ''
  };
  loader(status) {
    let loaderStatus = { ...this.state.loaderStatus };
    loaderStatus = status;
    this.setState({ loaderStatus });
  }

  componentWillMount(){
    if(mcsConfig.user.isLoggedIn){
      this.props.history.push(mcsConfig.route.espacePersoMyFormations);
    }
    if (this.props.location.state != undefined && this.props.location.state.email != undefined){
      this.state.user.email = this.props.location.state.email;
    }
  }

  componentDidMount(){
    const email = document.querySelector('input[type="email"]');
    email.addEventListener('invalid', function () {
      if (!this.value.trim().includes('@') || !this.value.trim().includes('.')) {
        this.setCustomValidity("Ceci n'est pas une adresse email valide");
      }else{ 
        this.setCustomValidity("");
      }
    }, false);
  }

  setEmail = (e) => {
    let user = { ...this.state.user };
    user.email = e.target.value.trim();
    this.setState({ user  });
  }

  setPassword = (e) => {
    let user = { ...this.state.user };
    user.password = e.target.value.trim();
    this.setState({ user });
  }

  rememberMe = (e) => {
    this.state.user.rememberMe = e.target.checked;
  }

  resetError() {
    this.state.error = { email: "", password: "", invalidCred: "" };
  }

  loginHandler = (e) => {
    e.preventDefault();
    this.resetError();
    let error = this.state.error;
    if (this.state.user.email == "" || this.state.user.password == '') {
      if (this.state.user.email == "") {
        error.email = 'Email required';
      }
      if (this.state.user.password == "") {
        error.password = "password required";
      }
      this.setState({ error })
      return;
    }
    let usermail = this.state.user.email;
    let userpass = this.state.user.password;
    let comp_this = this;
    const apiUrl = mcsConfig.apiUrl.loginUser;
    localStorage.setItem("mcs-user-remember-me-expiration", this.state.user.rememberMe ? mcsConfig.rememerMeDayNumber : 1);
    this.loader('show');
    axios
      .post(apiUrl + `?login=${usermail}&pwd=${userpass}`)
      .then(function (response) {
        if (response.data) {
          comp_this.loader('off');
          if (response.data.erreur === 0) {
            mcsConfig.user = response.data;
            mcsConfig.user.isLoggedIn = true;
            mcsConfig.user.expire = new Date().setDate(new Date().getDate() + mcsConfig.rememerMeExpiration);
            localStorage.setItem("mcs-auth-user-data",JSON.stringify(mcsConfig.user));
            comp_this.props.history.push(mcsConfig.route.espacePersoMyFormations);
          }else{
            let error_log = { ...comp_this.state.error };
            error_log.invalidCred = "Identifiants incorrects";
            comp_this.setState({ error: error_log });
          }
          

        }
      })
      .catch(function (error, response) {
        console.log(error);
        comp_this.loader('off');
      });

  }

  toggleModal = () => {
    this.setState({openModal: !this.state.openModal});
  }

  render() {
    return <React.Fragment>
      <Loader status={this.state.loaderStatus} />
      <div className="body-content">
        <div className="container">
          <div className="row clearfix">
            <div className="col-md-8 col-sm-8 col-xs-12 col-md-offset-2 col-sm-offset-2">
              <div className="cs-card">
                <div className="cs-card-body login-body">
                  <div className="row clearfix">
                    <div className="col-sm-6 col-sm-offset-4 col-xs-12">
                      <p className="fw-bold reg-title fs-25 g-bold t-color text-xs-left">
                        Me connecter
                    </p>
                    </div>
                  </div>
                  <form className="form-horizontal" onSubmit={this.loginHandler}>
                    <div className="form-group">
                      <label className="control-label col-sm-4 text-right">
                        Email
                        </label>
                      <div className="col-sm-6">
                        <input type="email" className="form-control" onChange={this.setEmail} value={this.state.user.email} required />
                      </div>
                    </div>
                    <div className="row clearfix">
                      <p className="error-text col-sm-6 col-sm-offset-4 col-xs-12">
                        {this.state.error.email}
                      </p>
                    </div>
                    <div className="form-group">
                      <label className="control-label col-sm-4 text-right">
                        Mot de passe
                        </label>
                      <div className="col-sm-6">
                        <input type="password" required className="form-control" onChange={this.setPassword} value={this.state.user.password} />
                      </div>
                    </div>
                    <div className="row clearfix">
                      <p className="error-text col-sm-6 col-sm-offset-4 col-xs-12">
                        {this.state.error.password}
                      </p>
                    </div>
                    <div className="form-group">
                      <label className="control-label col-sm-4 text-right" />
                      <div className="col-sm-6">
                        <a className="fw-bold" onClick={this.toggleModal} style={{cursor: 'pointer'}} >Mot de passe oublié ?</a>
                        <div className="checkbox">
                          <label>
                            <input onChange={this.rememberMe} type="checkbox" /> Se souvenir de moi
                            </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      {/* <label className="control-label col-sm-4 text-right" /> */}
                      <div className="col-sm-8 col-sm-offset-4">
                        <input type="submit" className="btn-solid w-xs-100" value="CONNEXION" />
                        <p className="error-text ultimate-error fs-10">
                          {this.state.error.invalidCred}
                        </p>
                      </div>
                      
                    </div>
                  </form>
                </div>
                <div className="cs-card-footer">
                  <div className="row clearfix">
                    <div className="col-sm-12">
                      <p className="text-center">
                        Vous n'avez pas de compte ? <NavLink to={mcsConfig.route.registration} className="fw-bold log-to-reg">
                          Créer un compte
                      </NavLink>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {this.state.openModal && <MotDePasseModal openModal={this.state.openModal} toggleModal={this.toggleModal} />}
    </React.Fragment>;
  }
}

export default Login;
