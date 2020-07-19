import React, { Component } from 'react';
import resources from "../resources";
import axios from "axios";
import mcsConfig from "../../mcs-configuration";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import fr from 'moment/locale/fr';
import 'react-datepicker/dist/react-datepicker.css';
import Notification, { notifyInfo, notifyWarn } from '../common/notification';

var Modal = require('react-bootstrap-modal');


class ReservationStep2 extends Component {
    state = {
        open: true,
        loggedEmail: '',
        redirect: false,
        user:{
            email: '',
            password: ''
        },
        professions: [],
        specialities: [],
        selected_date_naissance: moment('1970-01-01'),
        error: {
            email: '',
            password: '',
            invalidCred: ''
        },
        registration:{
            titre: '1',
            firstName: '',
            lastName: '',
            email: '',
            confirmEmail: '',
            pass: '',
            confirmPass: '',
            ville: '',
            telephone: '',
            profession: '1',
            specialite: '62',
            codePostal: '',
            prps: '',
            date_naissance: moment('1970-01-01').format("D/M/Y"),
            modexercise: 'L',
            cgv: '',
            add1: '',
            add2: ''
        },
        regError: {
            firstName: '',
            email: '',
            confirmEmail: '',
            Pass: '',
            confirmPass: '',
        }
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

    resetErrorMessages() {
        
        let regError = { ...this.state.regError };
        regError.firstName = '';
        regError.email = '';
        regError.confirmEmail = '';
        regError.Pass = '';
        regError.confirmPass = '';
        this.setState({ regError });
    }
    setUserTitre = (e) => {
        let registration = { ...this.state.registration };
        registration.titre = e.target.value.trim();
        this.setState({ registration });
    }
    setfirstName = (e) => {
        let registration = { ...this.state.registration };
        registration.firstName = e.target.value.trim();
        this.setState({ registration });
    }
    setCGV = (e) => {
        let registration = { ...this.state.registration };
        registration.cgv = e.target.checked === true ? 1 : 0;
        this.setState({ registration });
    }

    setlastName = (e) => {
        let registration = { ...this.state.registration };
        registration.lastName = e.target.value.trim();
        this.setState({ registration });
    }
    setRegEmail = (e) => {
        let registration = { ...this.state.registration };
        registration.email = e.target.value.trim();
        this.setState({ registration });
    }
    setRegConfirmEmail = (e) => {
        let registration = { ...this.state.registration };
        registration.confirmEmail = e.target.value.trim();
        this.setState({ registration });
    }
    setRegPass = (e) => {
        let registration = { ...this.state.registration };
        registration.pass = e.target.value.trim();
        this.setState({ registration });
    }
    setConfirmPass = (e) => {
        let registration = { ...this.state.registration };
        registration.confirmPass = e.target.value.trim();
        this.setState({ registration });
    }

    setVille = (e) => {
        let registration = { ...this.state.registration };
        registration.ville = e.target.value.trim();
        this.setState({ registration });
    }

    setUserProfession = (e) => {
        let registration= { ...this.state.registration};
        registration.profession = e.target.value.trim();
        this.setState({ registration });
    }

    setUserSpecialite = (e) => {
        let registration= { ...this.state.registration};
        registration.specialite = e.target.value.trim();
        this.setState({ registration });
    }

    setRPPS = (e) => {
        let registration= { ...this.state.registration};
        registration.prps = e.target.value.trim();
        this.setState({ registration });
    }

    setTelephone = (e) => {
        let registration= { ...this.state.registration};
        registration.telephone = e.target.value.trim();
        this.setState({ registration });
    }

    setTelephone = (e) => {
        let registration= { ...this.state.registration};
        registration.telephone = e.target.value.trim();
        this.setState({ registration });
    }
    setAddOne = (e) => {
        let registration= { ...this.state.registration};
        registration.add1 = e.target.value.trim();
        this.setState({ registration });
        console.log('addone',this.state.registration);
        
    }
    setAddTwo = (e) => {
        let registration= { ...this.state.registration};
        registration.add2 = e.target.value.trim();
        this.setState({ registration });
        console.log('addtwo', this.state.registration);
    }

    setModDe = (e) => {
        let registration= { ...this.state.registration};
        registration.modexercise = e.target.value.trim();
        this.setState({ registration });
    }

    setDOB = (date) => {
        let registration= { ...this.state.registration};
        try{
            registration.date_naissance = date.format("D/M/Y");
            this.setState({ registration});
            this.setState({ selected_date_naissance: date})
        }catch(exception){}
    }
    setCode = (e) => {
        let registration= { ...this.state.registration};
        registration.codePostal = e.target.value.trim();
        this.setState({ registration});
    }
    checkConfirmEmailError(){
        let regError = { ...this.state.regError };
        let registration = { ...this.state.registration };

        const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        const found = registration.email.match(regex);
        if (found == null) {
            regError.email = "Ceci n'est pas une adresse email valide";
            this.setState({ regError });
            return true;
        }
        if (registration.email !== registration.confirmEmail) {
            regError.confirmEmail = "Email ne correspond pas";
            this.setState({ regError });
            return true;
        }
        return false;
    }
    checkEmail(){
        let regError = { ...this.state.regError };
        let registration = { ...this.state.registration };
        if (registration.email === "") {
            regError.email = 'Email requis'
            this.setState({ regError });
            return true;
        }
        return false;
    }
    checkPass(){
        let regError = { ...this.state.regError };
        let registration = { ...this.state.registration };
        if (registration.pass === "") {
            regError.Pass = 'Mot de passe requis'
            this.setState({ regError });
            return true;
        }
        if (registration.pass < 6) {
            regError.Pass = "Votre mot de passe doit contenir au moins 6 caractères";
            this.setState({ regError });
            return true;
        }
        return false;
    }
    checkConfirmPass(){
        let regError = { ...this.state.regError };
        let registration = { ...this.state.registration };
        if (registration.pass !== registration.confirmPass) {
            regError.confirmPass = "Confirmer que le mot de passe ne correspond pas"
            this.setState({ regError });
            return true;
        }
        return false;
    }
    checkFirstname(){
        let regError = { ...this.state.regError };
        let registration = { ...this.state.registration };
        if (registration.firstName === "") {
            regError.firstName = 'Prénom requis'
            this.setState({ regError });
            return true;
        }
        return false;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.resetErrorMessages();
        if (this.checkEmail() || this.checkConfirmEmailError() || 
        this.checkFirstname() || this.checkPass() || this.checkConfirmPass() ) {
            this.forceUpdate();
            return;
        } else {
            let open = { ...this.state.open };
            let loggedEmail = {...this.state.loggedEmail};
            let comp_this = this;
            let regPerams = new URLSearchParams();
            regPerams.append('ind', 0);
            regPerams.append('mode', 1);
            regPerams.append('titre', this.state.registration.titre);
            regPerams.append('prenom', this.state.registration.firstName);
            regPerams.append('nom', this.state.registration.lastName);
            regPerams.append('pwd', this.state.registration.pass);
            regPerams.append('email', this.state.registration.email);
            regPerams.append('adresse_1', 'test123213');
            regPerams.append('adresse_2', 'testsdasas');
            regPerams.append('cp', this.state.registration.codePostal);
            regPerams.append('ville', this.state.registration.ville);
            regPerams.append('profession', this.state.registration.profession);
            regPerams.append('specialite', this.state.registration.specialite);
            regPerams.append('rpps', this.state.registration.prps);
            regPerams.append('exercice', this.state.registration.modexercise);
            regPerams.append('date_naissance', this.state.registration.date_naissance);
            regPerams.append('sexe', "1");
            regPerams.append('tel_fixe', this.state.registration.telephone);
            regPerams.append('tel_mobile', '324234');
            regPerams.append('freq_mail', 0);
            regPerams.append('compte_dpc', 0);
            regPerams.append('assist_dpc', 0);
            regPerams.append('cgv', this.state.registration.cgv);
            axios
                .post(mcsConfig.apiBaseUrl + '/edition_compte.php?ind=0&mode=1 ', regPerams)
                .then(function (response) {
                    if (response.data) {
                        if (response.data.erreur == 0) {
                            open = true;
                            loggedEmail = comp_this.state.registration.email                   
                            comp_this.setState({ open: open, loggedEmail: loggedEmail });                            
                            notifyInfo("Enregistré avec succès");
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



    

    componentWillMount() {
        // if (!mcsConfig.user.isLoggedIn) {
        //     this.props.history.push(mcsConfig.route.login);
        // }
        this.getMedicalProjessions();
        this.getMedicalSpecialities();
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








    setEmail = (e) => {
        this.state.registration.email = e.target.value.trim();
    }
    setPassword = (e) => {
        this.state.registration.password = e.target.value.trim();
    }
    
    closeModal = () => this.setState({ open: false })

    checkLogin() {
        if (mcsConfig.user.isLoggedIn) {
            this.props.changeStep(3);
        }
    }
    resetError() {
        this.state.error = { email: "", password: "", invalidCred: "" };
    }

    loginForReservation = (e) =>{
        e.preventDefault();
        this.resetError();
        let error = this.state.error;
        if (this.state.registration.email == "" || this.state.registration.password == '') {
            if (this.state.registration.email == "") {
                error.email = 'Email required';
            }
            if (this.state.registration.password == "") {
                error.password = "password required";
            }
            this.setState({ error })
            return;
        }
        let usermail = this.state.registration.email;
        let userpass = this.state.registration.password;
        let comp_this = this;
        const apiUrl = mcsConfig.apiUrl.loginUser;
        axios
            .get(apiUrl + `?login=${usermail}&pwd=${userpass}`)
            .then(function (response) {
                if (response.data) {
                    if (response.data.erreur === 0) {
                        mcsConfig.user = response.data;
                        mcsConfig.user.isLoggedIn = true;
                        mcsConfig.user.expire = new Date().setDate(new Date().getDate() + mcsConfig.rememerMeExpiration);
                        localStorage.setItem("mcs-auth-user-data", JSON.stringify(mcsConfig.user));
                        window.scrollBy(0, 1);
                        comp_this.props.changeStep(3);
                    } 
                    else {
                        let error_log = { ...comp_this.state.error };
                        error_log.invalidCred = "Identifiants incorrects";
                        comp_this.setState({ error: error_log });
                    }

                }
            })
            .catch(function (error, response) {
                console.log(error);
            });
    }

    render() {
        
        this.checkLogin();
        return (
            <React.Fragment>
                <Notification />                
                <GetLoginModal email={this.state.loggedEmail} open={this.state.open} 
                login={this.loginForReservation} setEmail={this.setEmail} 
                setPassword={this.setPassword} closeModal={this.closeModal} 
                error = {this.state.error}
                />
                <div className="reservation-wrap">
                    <div className="container">
                        <div className="row clearfix">
                            <div className="col-sm-10 col-xs-12 col-sm-offset-1">
                                <div className="cs-card">
                                    <div className="cs-card-header">
                                        <ul className="reserv-ul">
                                            <li className="g-bold done">
                                                <span className="reserv-step reserv-right"><img src={resources.iconRightSign} /></span>
                                                <span className="reserv-step number">1</span>
                                                <span className="reserv-name hidden-xs">Inscription</span>
                                            </li>
                                            <li className="g-bold active">
                                                <span className="reserv-step reserv-right"><img src={resources.iconRightSign} /></span>
                                                <span className="reserv-step number">2</span>
                                                <span className="reserv-name hidden-xs">Identification</span>
                                            </li>
                                            <li className="g-bold">
                                                <span className="reserv-step">3</span>
                                                <span className="reserv-name hidden-xs unwatched">Transmission</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="cs-card-body pb-0">
                                        <div className="row clearfix">
                                            <div className="col-sm-10 col-xs-12 col-sm-offset-1 ">

                                                {/* main content */}
                                                <p className="fs-25 g-bold g-color mob-head ">Identification</p>
                                                <div className="row clearfix">
                                                    <div className="col-sm-10">
                                                        <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac tempus ex, at ornare nunc. Aliquam iaculis
                                                            nec velit nec interdum. In ullamcorper est justo, tincidunt molestie
                                                            libero lacinia eu. Ut sit amet felis sed odio gravida consectetur. Curabitur facilisis dui vel tincidunt euismod.
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="row clearfix">
                                                    <div className="col-md-12 col-xs-12">
                                                        <form onSubmit={this.handleSubmit} className="reservation-form">
                                                            <div className="row clearfix">
                                                                <div className="col-sm-2 col-xs-12">
                                                                    <div className="form-group">
                                                                        <div className="row clearfix">
                                                                            <label className="col-sm-12 col-xs-12" htmlFor="titre">Titre:</label>
                                                                            <div className="col-sm-12 col-xs-6">
                                                                                <select value={this.state.registration.titre} onChange={this.setUserTitre} className="form-control" id="titre-select">
                                                                                    <option value="1">Dr</option>
                                                                                    <option value="2">Mlle</option>
                                                                                    <option value="3">Mme</option>
                                                                                    <option value="4">M</option>
                                                                                    <option value="5">Pr</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-3 col-xs-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="prenom">Prénom</label>
                                                                        <input id="prenom" onChange={this.setfirstName} type="text" className="form-control" required />
                                                                    </div>
                                                                    <div className="row clearfix">
                                                                        <p className="error-text col-sm-6 col-xs-12">
                                                                            {this.state.regError.firstName}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-7 col-xs-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="famille">Nom de famille</label>
                                                                        <input id="famille" onChange={this.setlastName} type="text" className="form-control" required />
                                                                    </div>
                                                                    <div className="row clearfix">
                                                                        <p className="error-text col-sm-6 col-xs-12">

                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4 col-xs-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="profession">Profession:</label>
                                                                        <select value={this.state.registration.profession} onChange={this.setUserProfession} className="form-control" id="profession">
                                                                            {this.state.professions.map(p => {
                                                                                return (<option key={p.pro_id} value={p.pro_id}>{p.pro_libelle}</option>);
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4 col-xs-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="speciallte">Spécialité:</label>
                                                                        <select value={this.state.registration.specialite} className="form-control" id="speciallte" onChange={this.setUserSpecialite} >
                                                                            {this.state.specialities.map(s => {
                                                                                return (<option key={s.spe_id} value={s.spe_id}>{s.spe_libelle}</option>);
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4 col-xs-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="exercise">Mode d’exercice:</label>
                                                                        <select value={this.state.registration.modexercise} onChange={this.setModDe} id="exercise" className="form-control">
                                                                            <option value="">Select</option>
                                                                            <option value="L">libéral</option>
                                                                            <option value="S">salarié</option>
                                                                            <option value="M">mixte </option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12 col-sm-12 col-xs-12">
                                                                    <div className="row clearfix">
                                                                        <div className="col-sm-6 col-xs-12">
                                                                            <div className="form-group">
                                                                                <label htmlFor="email">Email</label>
                                                                                <input id="email" type="email" onChange={this.setRegEmail} className="form-control" required />
                                                                            </div>
                                                                            <div className="row clearfix">
                                                                                <p className="error-text col-sm-12 col-xs-12">
                                                                                    {this.state.regError.email}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6 col-xs-12">
                                                                            <div className="form-group">
                                                                                <label htmlFor="confirm-email">Confirmer l'email</label>
                                                                                <input id="confirm-email" onChange={this.setRegConfirmEmail} type="email" className="form-control" required />
                                                                            </div>
                                                                            <div className="row clearfix">
                                                                                <p className="error-text col-sm-12 col-xs-12">
                                                                                    {this.state.regError.confirmEmail}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12 col-sm-12 col-xs-12">
                                                                    <div className="row clearfix">
                                                                        <div className="col-sm-6 col-xs-12">
                                                                            <div className="form-group">
                                                                                <label htmlFor="email">Mot de passe</label>
                                                                                <input id="regpass" type="password" onChange={this.setRegPass} className="form-control" required />
                                                                            </div>
                                                                            <div className="row clearfix">
                                                                                <p className="error-text col-sm-6 col-xs-12">
                                                                                    {this.state.regError.Pass}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6 col-xs-12">
                                                                            <div className="form-group">
                                                                                <label htmlFor="confirm-email">Confirmer le mot de passe</label>
                                                                                <input id="confirm-pass" onChange={this.setConfirmPass} type="password" className="form-control" required />
                                                                            </div>
                                                                            <div className="row clearfix">
                                                                                <p className="error-text col-sm-6 col-xs-12">
                                                                                    {this.state.regError.confirmPass}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12 col-sm-12 col-xs-12">
                                                                    <div className="row clearfix">
                                                                        <div className="col-sm-6 col-xs-12">
                                                                            <div className="form-group">
                                                                                <label htmlFor="email">Address 1</label>
                                                                                <input id="add1" type="text" onChange={this.setAddOne} className="form-control" required />
                                                                            </div>
                                                                            <div className="row clearfix">
                                                                                <p className="error-text col-sm-6 col-xs-12">
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6 col-xs-12">
                                                                            <div className="form-group">
                                                                                <label htmlFor="email">Address 2</label>
                                                                                <input id="add2" type="text" onChange={this.setAddTwo} className="form-control" />
                                                                            </div>
                                                                            <div className="row clearfix">
                                                                                <p className="error-text col-sm-6 col-xs-12">
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="col-sm-6 col-xs-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="code-post">Code Postal</label>
                                                                        <input id="code-post" type="text" onChange={this.setCode} className="form-control" required />
                                                                    </div>
                                                                    <div className="row clearfix">
                                                                        <p className="error-text col-sm-6 col-xs-12">

                                                                        </p>
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <label htmlFor="telephone">Téléphone</label>
                                                                        <input id="telephone" type="text" onChange={this.setTelephone} className="form-control"  required/>
                                                                    </div>
                                                                    <div className="row clearfix">
                                                                        <p className="error-text col-sm-6 col-xs-12">

                                                                        </p>
                                                                    </div>
                                                                    
                                                                    
                                                                </div>
                                                                <div className="col-sm-6 col-xs-12">

                                                                    <div className="form-group">
                                                                        <label htmlFor="ville">Ville</label>
                                                                        <input id="ville" type="text" onChange={this.setVille} className="form-control" required />
                                                                    </div>
                                                                    <div className="row clearfix">
                                                                        <p className="error-text col-sm-6 col-xs-12">

                                                                        </p>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="nadele-prps">N° ADELI / RPPS :</label>
                                                                        <input onChange={this.setRPPS} id="nadele-prps" type="text" className="form-control" required />
                                                                    </div>
                                                                    <div className="row clearfix">
                                                                        <p className="error-text col-sm-6 col-xs-12">

                                                                        </p>
                                                                    </div>
                                                                    
                                                                </div>
                                                                
                                                                <div className="col-sm-4 col-xs-12">
                                                                    <div className="form-group">
                                                                        <label htmlFor="dat-naissence">Date de naissance:</label>
                                                                        <DatePicker className="form-control" selected={this.state.selected_date_naissance}
                                                                            onChange={this.setDOB}
                                                                            locale='fr'
                                                                            dateFormat="D/MM/YYYY"
                                                                            showYearDropdown
                                                                            scrollableYearDropdown
                                                                            yearDropdownItemNumber={40}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-12  col-xs-12">
                                                                    <div className="checkbox">
                                                                        <label><input type="checkbox" onChange={this.setCGV}/>
                                                                            En cochant cette case je reconnais avoir pris connaissance des 
                                                                            <a className="step-2-checkbox g-bold"> Conditions Générales de Vente </a>
                                                                             Masterclass Santé.
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                <div className="col-sm-12 col-xs-12 text-right text-xs-center">
                                                                    <button onClick={() => this.props.changeStep(1)} className="btn-solid-border btn-big retour-btn">
                                                                        <span className="btn-img"><img src={resources.iconArrowLeft} /></span> RETOUR
                                                                    </button>
                                                                    <button type="submit" className="btn-solid w-xs-100">JE M'INSCRIS</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>

                                                {/* end content */}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </React.Fragment>
        );
    }
}

const GetLoginModal = (props) => {  
    return (
        <Modal
            show={props.open}
            onHide={props.closeModal}
            aria-labelledby="ModalHeader"
            backdrop="static" 
            keyboard= {false}
        >

            <Modal.Body>
                <p className="fw-bold reg-title fs-25 text-center gara t-color">Me connecter</p>
                <form className="form-horizontal" onSubmit={props.login}>
                    <div className="form-group">
                        <label className="control-label col-sm-4 text-right">Email</label>
                        <div className="col-sm-6">
                            <input type="email" className="form-control" onChange={props.setEmail} id="logemail" required/>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <p className="error-text col-sm-6 col-xs-12">
                            {props.error.email}
                        </p>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-4 text-right">Mot de passe</label>
                        <div className="col-sm-6">
                            <input type="password" className="form-control" onChange={props.setPassword} id="pass" required/>
                        </div>
                    </div>
                    
                    <div className="row clearfix">
                        <p className="error-text col-sm-6 col-xs-12">
                            {props.error.password}
                        </p>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-4 text-right"></label>
                        <div className="col-sm-6">
                            <a className="fw-bold">Mot de passe oublié ?</a>
                            <div className="checkbox">
                                <label><input type="checkbox" /> Se souvenir de moi</label>
                            </div>
                        </div>
                    </div>

                    

                    <div className="form-group">
                        <label className="control-label col-sm-4 text-right"></label>
                        <div className="col-sm-6">
                            <input type="submit" className="btn-solid w-xs-100" value="CONNEXION" />
                            <p className="error-text ultimate-error fs-10">
                                {props.error.invalidCred}
                            </p>
                        </div>
                    </div>

                </form>
            </Modal.Body>
            <Modal.Footer>
                <p className="text-center">Vous n'avez pas de compte ?<Modal.Dismiss className='fw-bold w-xs-100 btn-anchor t-color log-to-reg'>Créer  un compte</Modal.Dismiss></p>
            </Modal.Footer>
        </Modal>
    )
}



export default ReservationStep2;