import React, { Component } from "react";
import axios from "axios";
import mcsConfig from "../../mcs-configuration";
import { NavLink } from "react-router-dom";
import Notification, { notifyInfo, notifyWarn } from '../common/notification';

class Registration extends Component {
  state = {
    user: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobile: ""
    },
    error: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobile: '',
      registrationFaild: '',
    }
  };

  componentWillMount(){
    if (mcsConfig.user.isLoggedIn) {
      this.props.history.push(mcsConfig.route.espacePersoMyFormations);
    }
  }

  componentDidMount(){
    const email = document.querySelector('input[type="email"]');
    email.addEventListener('invalid', function () {
      const text = this.value.trim();
      const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      const found = text.match(regex);
      if (found == null) {
        this.setCustomValidity("Ceci n'est pas une adresse email valide");
      }else{ 
        this.setCustomValidity('');
      }
    }, false);
  }

  setFirstName = (e) => {
    this.state.user.firstName = e.target.value.trim();
  }

  setLastName = (e) => {
    this.state.user.lastName = e.target.value.trim();
  }

  setEmail = (e) => {
    this.state.user.email = e.target.value.trim();
  }

  setPassword = (e) => {
    this.state.user.password = e.target.value.trim();
  }

  setConfirmPassword = (e) => {
    this.state.user.confirmPassword = e.target.value.trim();
  }

  // setMobile = (e) => {
  //   this.state.user.mobile = e.target.value.trim();
  // }

  resetError() {
    this.state.error = { firstName: "", lastName: "", email: "", password: "", mobile: "", registrationFaild: "" };
  }

  onRegistrationSubmit = (e) => {
    e.preventDefault();
    this.resetError();

    let error = this.state.error;
    if (this.state.user.firstName == "" || this.state.user.email == "" || this.state.user.password == "" || this.state.user.confirmPassword == "" || this.state.user.password.length < 6) {
      if (this.state.user.firstName == "") {
        error.firstName = "Prénom requis";
      }
      if (this.state.user.email == "") {
        error.email = "Email requis";
      }
      if (this.state.user.password == "") {
        error.password = "Mot de passe requis";
      }
      if (this.state.user.password.length < 6) {
        error.password = "Votre mot de passe doit contenir au moins 6 caractères";
      }
      if (this.state.user.confirmPassword == "") {
        error.confirmPassword = "Retaper le mot de passe requis";
      }
      this.setState({ error });
      return;
    } else {
      this.setState({ error });
    }

    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const found = this.state.user.email.match(regex);
    if (found == null) {
      error.email = "Ceci n'est pas une adresse email valide";
      this.setState({ error });
      return;
    }

    if (this.state.user.confirmPassword != this.state.user.password) {
      error.confirmPassword = "Confirmer que le mot de passe ne correspond pas";
      this.setState({ error });
      return;
    }
    
    let comp_this = this;
    let regPerams = new URLSearchParams();
    regPerams.append('ind', 0);
    regPerams.append('mode', 1);
    regPerams.append('prenom', this.state.user.firstName);
    regPerams.append('nom', this.state.user.lastName);
    regPerams.append('email', this.state.user.email);
    regPerams.append('pwd', this.state.user.password);
    // regPerams.append('tel_mobile', this.state.user.mobile);
    // alert('ok')
    // return;
    axios
      .post(mcsConfig.apiUrl.registerUser, regPerams)
      .then(function (response) {
        if (response.data) {
          if (response.data.erreur == 0) {
            notifyInfo("Enregistré avec succès");
            setTimeout(function () {
              comp_this.props.history.push({ pathname: mcsConfig.route.login, state: { email: comp_this.state.user.email } });
            }, 1500);
          } else {
            let error_log = { ...comp_this.state.error };
            error_log.registrationFaild = "Échec de l'enregistrement";
            comp_this.setState({ error: error_log });
            notifyWarn(response.data.message);
          }

        }
      })
      .catch(function (error, response) {
        console.log(error);
      });

  }

  render() {
    return <React.Fragment>
      <Notification />
      <div className="body-content">
        <div className="container">
          <div className="row clearfix">
            <div className="col-md-8 col-sm-8 col-xs-12 col-md-offset-2 col-sm-offset-2">
              <div className="cs-card">
                <div className="cs-card-body">

                  <div className="row clearfix">
                    <div className="col-sm-6 col-sm-offset-4 col-xs-12">
                      <p className="fw-bold reg-title fs-25 g-bold t-color text-xs-left">
                        M'inscrire
                    </p>
                    </div>
                  </div>
                  <form className="form-horizontal" onSubmit={this.onRegistrationSubmit}>
                    <div className="form-group">
                      <label className="control-label col-sm-4 text-right">
                        Prénom
                        </label>
                      <div className="col-sm-6">
                        <input type="text" onChange={this.setFirstName} className="form-control" required />
                      </div>
                    </div>
                    <div className="row clearfix">
                      <p className="error-text col-sm-8 col-sm-offset-4 col-xs-12">
                        {this.state.error.firstName}
                      </p>
                    </div>

                    <div className="form-group">
                      <label className="control-label col-sm-4 text-right">
                        Nom
                        </label>
                      <div className="col-sm-6">
                        <input type="text" onChange={this.setLastName} className="form-control" required/>
                      </div>
                    </div>
                    <div className="row clearfix">
                      <p className="error-text col-sm-8 col-sm-offset-4 col-xs-12">
                        {this.state.error.firstName}
                      </p>
                    </div>

                    <div className="form-group">
                      <label className="control-label col-sm-4 text-right">
                        Email
                        </label>
                      <div className="col-sm-6">
                        <input type="email" onChange={this.setEmail} className="form-control" required />
                      </div>
                    </div>
                    <div className="row clearfix">
                      <p className="error-text col-sm-8 col-sm-offset-4 col-xs-12">
                        {this.state.error.email}
                      </p>
                    </div>

                    <div className="form-group">
                      <label className="control-label col-sm-4 text-right">
                        Mot de passe
                        </label>
                      <div className="col-sm-6">
                        <input type="password" onChange={this.setPassword} className="form-control" required />
                      </div>
                    </div>
                    <div className="row clearfix">
                      <p className="error-text col-sm-8 col-sm-offset-4 col-xs-12">
                        {this.state.error.password}
                      </p>
                    </div>

                    <div className="form-group">
                      <label className="control-label col-sm-4 text-right">
                        Retaper le mot de passe
                        </label>
                      <div className="col-sm-6">
                        <input type="password" onChange={this.setConfirmPassword} className="form-control" required />
                      </div>
                    </div>
                    <div className="row clearfix">
                      <p className="error-text col-sm-8 col-sm-offset-4 col-xs-12">
                        {this.state.error.confirmPassword}
                      </p>
                    </div>

                    {/* <div className="form-group">
                      <label className="control-label col-sm-4 text-right">
                        Mon N° de téléphone
                        </label>
                      <div className="col-sm-6">
                        <input type="text" onChange={this.setMobile} className="form-control" />
                      </div>
                    </div> */}
                    <div className="row clearfix">
                      <p className="error-text col-sm-8 col-sm-offset-4 col-xs-12">
                        {this.state.error.mobile}
                      </p>
                    </div>

                    <div className="form-group">
                      <label className="control-label col-sm-4 text-right" />
                      <div className="col-sm-6">
                        <input type="submit" className="btn-solid  w-xs-100" value="M'inscrire" />
                        <p className="error-text ultimate-error fs-10">
                          {this.state.error.registrationFaild}
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="cs-card-footer">
                  <div className="row clearfix">
                    <div className="col-sm-12">
                      <p className="text-center">
                        J'ai deja un compte ? <NavLink to={mcsConfig.route.login} className="fw-bold log-to-reg">
                          Me Connecter
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
    </React.Fragment>;
  }
}

export default Registration;
