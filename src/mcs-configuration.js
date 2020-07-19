const apiBaseUrl = "http://ws.mcsante.fr";

function getLoginInfo(){
  let user = { isLoggedIn: false, expire: 0, erreur: 1, nom: "", prenom: "", mail: "", id: "",
  titre: "", adresse_1: "", adresse_2: "", cp: "", ville: "", pays: "", profession: "",
  libelle_pro_spe: "", libelle_pro: "", specialite: "", lib_specialite: "", rpps: "", adeli: "",
  tel_fixe: "", tel_mobile: "", statut: "", intervenant: "", frequence_mail: "", compte_dpc: "",
  assistance_dpc: "", date_naissance: "", adresse_1: "", adresse_2: "" };
  if(localStorage.getItem("mcs-auth-user-data") != null){
    let tempUser = JSON.parse(localStorage.getItem("mcs-auth-user-data"));
    if (tempUser.expire > new Date().getTime() ){
      user = tempUser;
      user.expire = new Date().setDate(new Date().getDate() + 1);
    }else{
      localStorage.setItem('mcs-cart', JSON.stringify([]));
    }
  }
  return user;
}

function rememerMeExpiration(){
  let expiration = 1;
  const data = localStorage.getItem("mcs-user-remember-me-expiration");
  if (data != null){
    expiration = parseInt(data);
  }
  return expiration;
}

const mcsConfig = {
  apiBaseUrl: apiBaseUrl,
  hompageTabToggle: "1",
  rememerMeDayNumber: 5,
  rememerMeExpiration: rememerMeExpiration(),
  route: {
    homepage: "/",
    detailFormation: "/formations",
    login: "/login",
    registration: "/registration",
    reservation: "/reservation",
    espacePersoProfile: "/profile",
    espacePersoMyFormations: "/mes-formations",
    espacePersoFormationHistory: "/formation-history",
  },
  apiUrl: {
    listFormations: apiBaseUrl + "/liste_formations.php",
    detailOnlineFormation: apiBaseUrl + "/fiche_formation.php",
    detailMeetingFormation: apiBaseUrl + "/fiche_formation.php",
    loginUser: apiBaseUrl + "/auth.php",
    registerUser: apiBaseUrl + "/edition_compte_demo.php",
    userProfileUpdate: apiBaseUrl + "/edition_compte.php",
    listMyFormations: apiBaseUrl + "/liste_mes_formations.php",
    medicalProfessions: apiBaseUrl + "/liste_professions.php",
    medicalSpecialities: apiBaseUrl + "/liste_specialites.php",
    userFormationDetail: apiBaseUrl + "/detail_formation_utilisateur.php",
    userProfileComments: apiBaseUrl + "/avis_utilisateur.php",
    addToCart: apiBaseUrl + "/ajoute_panier.php",
    userOnlyProfileUpdate: apiBaseUrl + "/edition_profile.php",
    userEmailPasswordUpdate: apiBaseUrl + "/edition_email_pwd.php",
    userCommentUpdate: apiBaseUrl + "/edition_comment.php",
    getFormationVideo: apiBaseUrl + "/get_video.php",
    log_time_video_page: apiBaseUrl + "/log_time.php",
  },
  user: getLoginInfo(),
  methods: {
    formatDate: function(date) {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    },
    destroyLoginSession: function() {
      localStorage.removeItem("mcs-auth-user-data");
      mcsConfig.user = getLoginInfo();
    },
    textExcerpt: function(text, number=30) {
      return text.length > number ? text.substr(0, number) + '...' : text;
    }
  }
};
  
  export default mcsConfig;