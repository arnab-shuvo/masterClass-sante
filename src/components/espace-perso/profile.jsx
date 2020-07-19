import React, { Component } from "react";
import axios from "axios";
import mcsConfig from "../../mcs-configuration";
import EditModal from "./edit-comment-modal";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import fr from 'moment/locale/fr';
import 'react-datepicker/dist/react-datepicker.css';
import Notification, { notifyInfo, notifyWarn } from '../common/notification';

class Profile extends Component {

  getUserData() {
    let user = mcsConfig.user;
    user.confirmEmail = "";
    user.password = "";
    user.confirmPassword = "";
    user.exercice = "L";
    return user;
  }

  getDate(){
    if (mcsConfig.user.date_naissance != null){
      return moment(mcsConfig.user.date_naissance);
    }else{
      return moment('1970-01-01');
    }
  }

  state = {
    commentData:{
      openModal: false,
      comment: {}
    },
    user: this.getUserData(),
    selected_date_naissance: this.getDate(),
    professions: [],
    specialities: [],
    comments: [],
    error: {firstName: '', confirmEmail: '', confirmPassword: ''}
  };
  

  componentWillMount() {
    if (!mcsConfig.user.isLoggedIn) {
      this.props.history.push(mcsConfig.route.login);
    }
    this.getMedicalProjessions();
    this.getMedicalSpecialities();
    this.getUserProfileComments();
  }

  componentDidMount(){
    const email = document.querySelector('input[type="email"]');
    email.addEventListener('invalid', function () {
      const text = this.value.trim();
      const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      // console.log(text)
      const found = text.match(regex);
      // console.log(found)
      if (found == null) {
        this.setCustomValidity("Ceci n'est pas une adresse email valide");
      }else{ 
        this.setCustomValidity("");
      }
    }, false);
  }

  getMedicalProjessions() {
    const comThis = this;
    axios
      .get(mcsConfig.apiUrl.medicalProfessions)
      .then(function (response) {
        if (response.data.erreur === 0) {
          comThis.setState({ professions: response.data.professions });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getMedicalSpecialities() {
    const comThis = this;
    axios
      .get(mcsConfig.apiUrl.medicalSpecialities)
      .then(function (response) {
        if (response.data.erreur === 0) {
          comThis.setState({ specialities: response.data.specialites });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUserProfileComments(){
    const comThis = this;
    axios
      .get(mcsConfig.apiUrl.userProfileComments + `?ind=${mcsConfig.user.id}`)
      .then(function (response) {
        if (response.data.erreur == 0) {
          comThis.setState({ comments: response.data.commentaires });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  toggleModal = (comment) => {
    let commentData = { ...this.state.commentData };
    commentData.comment = comment;
    commentData.openModal = !commentData.openModal ;
    this.setState({ commentData });
  }
  closeModal = () =>{
    let commentData = { ...this.state.commentData };
    commentData.openModal = !commentData.openModal;
    this.setState({ commentData });
  }

  setUserEmail = (e) => {
    let user = {...this.state.user};
    user.mail = e.target.value.trim();
    this.setState({ user });
  }

  setUserConfirmEmail = (e) => {
    let user = {...this.state.user};
    user.confirmEmail = e.target.value.trim();
    this.setState({ user });
  }

  setUserPassword = (e) => {
    let user = {...this.state.user};
    user.password = e.target.value.trim();
    this.setState({ user });
  }

  setUserConfirmPassword = (e) => {
    let user = {...this.state.user};
    user.confirmPassword = e.target.value.trim();
    this.setState({ user });
  }

  setUserTitre = (e) => {
    let user = { ...this.state.user };
    user.titre = e.target.value.trim();
    this.setState({ user });
  }

  setUserPrenom = (e) => {
    let user = { ...this.state.user };
    user.prenom = e.target.value.trim().toUpperCase();
    this.setState({ user });
  }

  setUserNom = (e) => {
    let user = { ...this.state.user };
    user.nom = e.target.value.trim().toUpperCase();
    this.setState({ user });
  }

  setUserVille = (e) => {
    let user = { ...this.state.user };
    user.ville = e.target.value.trim().toUpperCase();
    this.setState({ user });
  }

  setUserProfession = (e) => {
    let user = { ...this.state.user };
    user.profession = e.target.value.trim();
    this.setState({ user });
  }

  setUserSpecialite = (e) => {
    let user = { ...this.state.user };
    user.specialite = e.target.value.trim();
    this.setState({ user });
  }

  setUserEmailRPPS = (e) => {
    let user = { ...this.state.user };
    user.rpps = e.target.value.trim();
    this.setState({ user });
  }

  setUserTelephone = (e) => {
    let user = { ...this.state.user };
    user.tel_fixe = e.target.value.trim();
    this.setState({ user });
  }

  setUserPostalCode = (e) => {
    let user = { ...this.state.user };
    user.cp = e.target.value.trim();
    this.setState({ user });
  }

  setUserDateNaissance = (date) => {
    let user = { ...this.state.user };
    try{
      user.date_naissance = date.format("D/M/Y"); 
      this.setState({
        selected_date_naissance: date, user: user
      });
    }catch(exception){}
  }

  setUserFrequenceEmail = (e) => {
    let user = { ...this.state.user };
    user.frequence_mail = e.target.checked === true ? 1 : 0;
    this.setState({ user });
  }

  setUserAssistanceDpc = (e) => {
    let user = { ...this.state.user };
    user.assistance_dpc = e.target.checked === true ? 1 : 0;
    this.setState({ user });
  }

  setUserExercice = (e) => {
    let user = { ...this.state.user };
    user.exercice = e.target.value;
    this.setState({ user });
  }

  setUserAdresse_1 = (e) => {
    let user = { ...this.state.user };
    user.adresse_1 = e.target.value;
    this.setState({ user });
  }

  setUserAdresse_2 = (e) => {
    let user = { ...this.state.user };
    user.adresse_2 = e.target.value;
    this.setState({ user });
  }

  resetErrorMessages(){
    this.state.error = { firstName: '', confirmEmail: '', confirmPassword: '' };
    this.forceUpdate();
  }

  checkConfirmEmailError(){
    if(this.state.user.confirmEmail.length > 0 && (this.state.user.mail != this.state.user.confirmEmail)){
      this.state.error.confirmEmail = "Confirmer l'email ne correspond pas";
      return true;
    }
    return false;
  }

  checkConfirmPasswordError(){
    if ((this.state.user.password.length > 0 || this.state.user.confirmPassword.length > 0) && (this.state.user.password != this.state.user.confirmPassword)){
      this.state.error.confirmPassword = "Confirmer que le mot de passe ne correspond pas";
      return true;
    }
    return false;
  }

  checkFirstnameError(){
    if (this.state.user.prenom.length === 0){
      this.state.error.firstName = "Require Prénom";
      return true;
    }
    return false;
  }

  handleSubmit = (e) => {
    this.resetErrorMessages();
    if (this.checkConfirmEmailError() || this.checkConfirmPasswordError() || this.checkFirstnameError()){
      this.forceUpdate();
      return;
    }else{
      let comp_this = this;
      let regPerams = new URLSearchParams();
      regPerams.append('ind', mcsConfig.user.id);
      regPerams.append('mode', 2);
      regPerams.append('titre', this.state.user.titre);
      regPerams.append('prenom', this.state.user.prenom);
      regPerams.append('nom', this.state.user.nom);
      regPerams.append('pwd', this.state.user.password);
      regPerams.append('email', this.state.user.mail);
      regPerams.append('adresse_1', this.state.user.adresse_1);
      regPerams.append('adresse_2', this.state.user.adresse_2);
      regPerams.append('cp', this.state.user.cp);
      regPerams.append('ville', this.state.user.ville);
      regPerams.append('profession', this.state.user.profession);
      regPerams.append('specialite', this.state.user.specialite);
      regPerams.append('rpps', this.state.user.rpps);
      regPerams.append('exercice', this.state.user.exercice);
      regPerams.append('date_naissance', this.state.user.date_naissance);
      regPerams.append('sexe', "1");
      regPerams.append('tel_fixe', this.state.user.tel_fixe);
      regPerams.append('tel_mobile', this.state.user.tel_mobile);
      regPerams.append('freq_mail', this.state.user.frequence_mail == null ? 0 : this.state.user.frequence_mail);
      regPerams.append('compte_dpc', this.state.user.compte_dpc);
      regPerams.append('assist_dpc', this.state.user.assistance_dpc);
      regPerams.append('cgv', "1");
      axios
        .post(mcsConfig.apiUrl.userProfileUpdate, regPerams)
        .then(function (response) {
          if (response.data) {
            if (response.data.erreur == 0) {
              mcsConfig.user = comp_this.state.user;
              mcsConfig.user.expire = new Date().setDate(new Date().getDate() + mcsConfig.rememerMeExpiration);
              localStorage.setItem("mcs-auth-user-data", JSON.stringify(mcsConfig.user));
              window.scrollBy(0, 1);
            } else {
              // console.log('else ok')
            }
          }
        })
        .catch(function (error, response) {
          console.log(error);
        });
    }
  }

  handleEmailPassForm = (e) => {
    e.preventDefault();
    this.resetErrorMessages();
    if (this.checkConfirmEmailError() || this.checkConfirmPasswordError()) {
      this.forceUpdate();
      return;
    } else {
      let comp_this = this;
      let regPerams = new URLSearchParams();
      regPerams.append('ind', mcsConfig.user.id);
      regPerams.append('email', this.state.user.mail);
      regPerams.append('pwd', this.state.user.password);
      axios
        .post(mcsConfig.apiUrl.userEmailPasswordUpdate, regPerams)
        .then(function (response) {
          if (response.data) {
            if (response.data.erreur == 0) {
              mcsConfig.user = comp_this.state.user;
              mcsConfig.user.expire = new Date().setDate(new Date().getDate() + mcsConfig.rememerMeExpiration);
              localStorage.setItem("mcs-auth-user-data", JSON.stringify(mcsConfig.user));
              window.scrollBy(0, 1);
              notifyInfo("Email et mot de passe mis à jour");
            } else {
              notifyWarn(response.data.message);
            }
          }
        })
        .catch(function (error, response) {
          console.log(error);
        });
    }
  }

  handleProfileForm = (e) => {
    e.preventDefault()
    let comp_this = this;
    let regPerams = new URLSearchParams();
    regPerams.append('ind', mcsConfig.user.id);
    regPerams.append('titre', this.state.user.titre);
    regPerams.append('prenom', this.state.user.prenom);
    regPerams.append('nom', this.state.user.nom);
    regPerams.append('adresse_1', this.state.user.adresse_1);
    regPerams.append('adresse_2', this.state.user.adresse_2);
    regPerams.append('cp', this.state.user.cp);
    regPerams.append('ville', this.state.user.ville);
    regPerams.append('profession', this.state.user.profession);
    regPerams.append('specialite', this.state.user.specialite);
    regPerams.append('rpps', this.state.user.rpps);
    regPerams.append('exercice', this.state.user.exercice);
    regPerams.append('date_naissance', this.state.user.date_naissance);
    regPerams.append('sexe', "1");
    regPerams.append('tel_fixe', this.state.user.tel_fixe);
    regPerams.append('tel_mobile', this.state.user.tel_mobile);
    regPerams.append('freq_mail', this.state.user.frequence_mail == null ? 0 : this.state.user.frequence_mail);
    regPerams.append('compte_dpc', this.state.user.compte_dpc);
    regPerams.append('assist_dpc', this.state.user.assistance_dpc);
    regPerams.append('cgv', "1");
    axios
      .post(mcsConfig.apiUrl.userOnlyProfileUpdate, regPerams)
      .then(function (response) {
        if (response.data) {
          if (response.data.erreur == 0) {
            mcsConfig.user = comp_this.state.user;
            mcsConfig.user.expire = new Date().setDate(new Date().getDate() + mcsConfig.rememerMeExpiration);
            localStorage.setItem("mcs-auth-user-data", JSON.stringify(mcsConfig.user));
            window.scrollBy(0, 1);
            notifyInfo("Profil mis à jour");
          } else {
            notifyWarn(response.data.message);
          }
        }
      })
      .catch(function (error, response) {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Notification />
        <div className="page-title">
          <div className="container">
            <div className="row clearfix">
              <div className="com-md -12 col-sm-12 col-xs-12">
                <p className="w-color fs-25 fw-bold">Mon espace personnel</p>
                <p className="g-light hidden-xs">
                  Modifier mes indentifiants et mes informations personnelles
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="body-content">
          <div className="container">
            <div className="row clearfix">
              <div className="col-md-12 col-sm-12 col-xs-12">
                  <div className="cs-card border-card">
                    <p className="g-bold fs-20 mb-15 t-color text-xs-center">
                      Mes identifiants pour me connecter à mon compte
                    </p>
                    <form onSubmit={this.handleEmailPassForm}>
                      <div className="row clearfix">
                        <div className="col-md-6 col-sm-6 col-xs-12 ">
                          <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email" value={this.state.user.mail} onChange={this.setUserEmail} required/>
                          </div>                        
                          <div className="form-group">
                            <label htmlFor="email-confirm"> Confirmer I'Email: </label>
                            <input type="email" className="form-control" id="email-confirm" value={this.state.user.confirmEmail} onChange={this.setUserConfirmEmail} required/>
                          </div>
                          <div className={this.state.error.confirmEmail != "" ? "row clearfix" : "row clearfix display-none"}>
                            <p className="error-text col-sm-12 col-xs-12">
                              {this.state.error.confirmEmail}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12 ">
                          <div className="form-group">
                            <label htmlFor="pwd">Mon nouveau mot de passe:</label>
                            <input type="password" className="form-control" id="pwd" value={this.state.user.password} onChange={this.setUserPassword} required/>
                          </div>
                          <div className="form-group">
                            <label htmlFor="pwd-confirm"> Retaper mon nouveau mot de passe: </label>
                            <input type="password" className="form-control" id="pwd-confirm" value={this.state.user.confirmPassword} onChange={this.setUserConfirmPassword} required/>
                          </div>
                          <div className={this.state.error.confirmPassword != "" ? "row clearfix" : "row clearfix display-none"}>
                            <p className="error-text col-sm-12 col-xs-12">
                              {this.state.error.confirmPassword}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                      <button className="btn-solid fs-12 msp-btn w-xs-100">VALIDER</button>
                    </div>
                    </form>
                  </div>

                  <div className="cs-card border-card form-horizontal custom-fh">
                    <p className="g-bold fs-20 mb-15 t-color text-xs-center">Mes informations</p>
                    <form onSubmit={this.handleProfileForm}>
                      <div className="row clearfix">
                        <div className="col-md-6 col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="titre-select" >Titre:</label>
                            <div className="col-sm-4">
                              <select value={this.state.user.titre} onChange={this.setUserTitre} className="form-control" id="titre-select" required>
                                <option value="1">Dr</option>
                                <option value="2">Mlle</option>
                                <option value="3">Mme</option>
                                <option value="4">M</option>
                                <option value="5">Pr</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="prenom">Prénom:</label>
                            <div className="col-sm-9">
                              <input type="text" className="form-control" id="prenom" value={this.state.user.prenom} onChange={this.setUserPrenom} required/>
                            </div>
                          </div>
                          <div className={this.state.error.firstName != "" ? "row clearfix" : "row clearfix display-none"}>
                            <p className="error-text col-sm-8 col-sm-offset-4 col-xs-12">
                              {this.state.error.firstName}
                            </p>
                          </div>
                          <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="femile">Nom de famille:</label>
                            <div className="col-sm-9">
                              <input type="text" className="form-control" id="femile" value={this.state.user.nom} onChange={this.setUserNom} required />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="ville">Ville:</label>
                            <div className="col-sm-9">
                              <input type="text" className="form-control" id="ville" value={this.state.user.ville} onChange={this.setUserVille} required />
                            </div>
                          </div>
                            <div className="form-group">
                              <label className="control-label col-sm-3" htmlFor="address-1">Address 1:</label>
                              <div className="col-sm-9">
                                <input type="text" className="form-control" id="address-1" value={this.state.user.adresse_1} onChange={this.setUserAdresse_1} required />
                              </div>
                            </div>
                          <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="profession">Profession:</label>
                            <div className="col-sm-9">
                              <select value={this.state.user.profession} onChange={this.setUserProfession} className="form-control" id="profession" required>
                                {this.state.professions.map(p => {
                                  return (<option key={p.pro_id} value={p.pro_id}>{p.pro_libelle}</option>);
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="nadeli-rpps">N°ADELI/RPPS:</label>
                            <div className="col-sm-9">
                              <input type="text" className="form-control" id="nadeli-rpps" value={this.state.user.rpps} onChange={this.setUserEmailRPPS} required />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                          <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="telephone">Tél. mobile:</label>
                            <div className="col-sm-9">
                              <input type="text" className="form-control" id="telephone" value={this.state.user.tel_fixe} onChange={this.setUserTelephone} required />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="postal-code">Code Postal:</label>
                            <div className="col-sm-9">
                              <input type="text" className="form-control" id="postal-code" value={this.state.user.cp} onChange={this.setUserPostalCode} required />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="speciallte">Spécialité:</label>
                            <div className="col-sm-9">
                              <select value={this.state.user.specialite} className="form-control" id="speciallte" onChange={this.setUserSpecialite} required >
                                {this.state.specialities.map(s => {
                                  return (<option key={s.spe_id} value={s.spe_id}>{s.spe_libelle}</option>);
                                })}
                              </select>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="date-naissance">Date de naissance:</label>
                            <div className="col-sm-9 cstm-dp">
                              <DatePicker className="form-control" selected={this.state.selected_date_naissance}
                                onChange={this.setUserDateNaissance}
                                locale='fr'
                                dateFormat="D/MM/YYYY"
                                showYearDropdown
                                scrollableYearDropdown
                                yearDropdownItemNumber={40}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="address-2">Address 2:</label>
                            <div className="col-sm-9">
                              <input type="text" className="form-control" id="address-2" value={this.state.user.adresse_2} onChange={this.setUserAdresse_2} />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label col-sm-3" htmlFor="mode-exercise">Mode d'exercice:</label>
                            <div className="col-sm-9">
                              <select className="form-control" id="mode-exercise" onChange={this.setUserExercice} required>
                                <option value="L">Libéral</option>
                                <option value="S">Salarié</option>
                                <option value="M">Mixte</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row clearfix">
                      <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                          <div className="col-md-12">
                            <div className="row clearfix">
                              <div className="col-sm-12">
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" name="remember" onChange={this.setUserFrequenceEmail} checked={this.state.user.frequence_mail === 1 ? true : false}/>
                                    Je possède déjà  un compte DPC(www.mondpc.fr)
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-md-12">
                            <div className="row clearfix">
                              <div className="col-sm-12">
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" name="remember" onChange={this.setUserAssistanceDpc} checked={this.state.user.assistance_dpc === 1 ? true : false} />
                                    Je n'ai pas de compte et je souhaite une assistance à sa création
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                      <div className="text-center">
                        <button className="btn-solid fs-12 msp-btn w-xs-100">VALIDER</button>
                      </div>
                    </form>
                  </div>
                  
                  <div className="cs-card border-card form-horizontal">
                    <p className="g-bold fs-20 mb-15 t-color">Mes Commentaires Envoyés</p>
                    {this.state.comments.map(comment => {
                      return (
                        <div key={comment.frm} className="comment-wrap">
                          <div className="row clearfix">
                            <div className="col-md-2 col-sm-2">
                              <img
                                src="https://mayhew.ca/wp-content/uploads/revslider/home1/us-placeholder-square-300x300.png"
                                className="img-responsive"
                              />
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-12 text-center cmnt-pad">
                              <p className="g-color g-bold fs-18 no-margin">
                                {comment.titre}
                          </p>
                              <p className="g-color g-light fs-12">
                                Le lundi 23 avril 2019
                                {/* {comment.date} */}
                          </p>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-12 text-center cmnt-pad">
                              <p>{mcsConfig.methods.textExcerpt(comment.avis, 180)}</p>
                              <a onClick={() => this.toggleModal(comment)} className=" fs-12 g-color underline-link fw-bold" href="javascript:void(0)">> Modifier mon commentaire</a>
                            </div>
                          </div>
                        </div>
                        
                      );
                    })}   
                  {this.state.commentData.openModal &&
                    <EditModal openModal={this.state.commentData.openModal} toggle={this.closeModal} comment={this.state.commentData.comment} />
                    }                                   
                  </div>

              </div>
            </div>
          </div>
        </div>

        
      </React.Fragment>
    );
  }
}

export default Profile;
