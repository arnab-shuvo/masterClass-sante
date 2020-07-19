import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import resources from "../resources";
import ScrollIntoView from 'react-scroll-into-view'
import mcsConfig from "../../mcs-configuration";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  state = {
    isLandingPage: false,
    scrollNav: 'display-none',
    mainMenuOpen: false,
    userMenuOpen: false,
    cartMenuOpen: false,
  };

  handleLogout = () => {
    mcsConfig.methods.destroyLoginSession();
    this.props.history.push(mcsConfig.route.login);
    this.props.removeAllFromCart();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    let lastScrollY = window.scrollY;

    if (lastScrollY > 260) {
      let scrollNav = this.state.scrollNav;
      scrollNav = 'display-block';
      this.setState({ scrollNav });
    }
    else {
      let scrollNav = this.state.scrollNav;
      scrollNav = 'display-none';
      this.setState({ scrollNav });
    }
  }

  collaplseOtherMenu = (menu) => {    
    // console.log('Menu -> ', menu)
    switch (menu) {
      case "main-btn":
        this.state.mainMenuOpen = !this.state.mainMenuOpen;
        if(this.state.userMenuOpen){
          this.state.userMenuOpen = !this.state.userMenuOpen;
          document.getElementById("user-menu-mobile-btn").click();
        }
        if (this.state.cartMenuOpen){
          this.state.cartMenuOpen = !this.state.cartMenuOpen;
          document.getElementById("cart-menu-mobile-btn").click();
        }
        break;
      case "user-btn":
        this.state.userMenuOpen = !this.state.userMenuOpen;
        if(this.state.mainMenuOpen){
          this.state.mainMenuOpen = !this.state.mainMenuOpen;
          document.getElementById("main-menu-mobile-btn").click();
        }
        if (this.state.cartMenuOpen) {
          this.state.cartMenuOpen = !this.state.cartMenuOpen;
          document.getElementById("cart-menu-mobile-btn").click();
        }
        break;
      case "cart-btn":
        this.state.cartMenuOpen = !this.state.cartMenuOpen;
        if(this.state.mainMenuOpen){
          this.state.mainMenuOpen = !this.state.mainMenuOpen;
          document.getElementById("main-menu-mobile-btn").click();
        }
        if (this.state.userMenuOpen){
          this.state.userMenuOpen = !this.state.userMenuOpen;
          document.getElementById("user-menu-mobile-btn").click();
        }
        break;
      case "toggle-main-menu":
        this.state.mainMenuOpen = !this.state.mainMenuOpen;
        document.getElementById("main-menu-mobile-btn").click();
        break;
      case "toggle-user-menu":
        this.state.userMenuOpen = !this.state.userMenuOpen;
        document.getElementById("user-menu-mobile-btn").click();
        break;
      case "toggle-cart-menu":
        this.state.cartMenuOpen = !this.state.cartMenuOpen;
        document.getElementById("cart-menu-mobile-btn").click();
        break;
    }
  }

  renderLandingNav() {
    if (this.props.location && this.props.location.pathname === "/") {
      this.state.isLandingPage = true
    } else {
      this.state.isLandingPage = false;
    }
    if (this.state.isLandingPage) {
      return <React.Fragment>
        <div className="landing-nav">
          <div className="top_nav">
            <div className="container">
              <div className="row clearfix">
                <div className="col-md-12 col-sm-12 clearfix">
                  <div className="pull-right">
                    {/* <div className="wraper-div">
                      <a className="header-search" />
                    </div> */}
                    <div className="wraper-div ">
                      <div className="dropdown">
                        <button className="header-login-btn header-cart-btn dropdown-toggle"
                          type="button" data-toggle="dropdown"><span className="cart-icon" />
                          <span className="cart-text">Mes Formations</span>
                          {this.props.cartCounter > 0 ? <span className="counter">{this.props.cartCounter}</span> : ""}
                        </button>
                        <span className="dropdown-ico"><img src={resources.dropico} /></span>
                        <CartDropdown cart={this.props.cart} />
                      </div>
                    </div>
                    <UserMenuWebLanding handleLogout={this.handleLogout} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="logo-wrap">
            <div className="container">
              <div className="row clearfix">
                <div className="col-md-12 col-sm-12 text-center">
                  <div className="logo-holer">
                    <img src={resources.logo} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-link-wrap">
            <ul>
              <ScrollIntoView style={{ display: "inline-block" }} alignToTop={true} selector="#id-to-navigate-online">
                <li onClick={this.props.showOnlineTabDispatch}>
                  <a href="javascript:void(0)">FORMAT EN LIGNE</a>
                </li>
              </ScrollIntoView>
              <ScrollIntoView style={{ display: "inline-block" }} alignToTop={true} selector="#id-to-navigate-meeting">
                <li onClick={this.props.showMeetingTabDispatch}>
                  <a href="javascript:void(0)">FORMAT PRESENTIEL</a>
                </li>
              </ScrollIntoView>
              <ScrollIntoView style={{ display: "inline-block" }} alignToTop={true} selector="#id-to-navigate-votre">
                <li>
                  <a href="javascript:void(0)">VOTRE PARTENAIRE DPC</a>
                </li>
              </ScrollIntoView>
              <ScrollIntoView style={{ display: "inline-block" }} alignToTop={true} selector="#section-expert-notre">
                <li>
                  <a href="javascript:void(0)">NOTRE EXPERTISE</a>
                </li>
              </ScrollIntoView>
            </ul>
          </div>
          <div className="container">
            <div className="row clearfix">
              <div className="col-md-12 pos-relative">
                <div className="banner-icon-wrap pos-absolute">
                  <img src={resources.image3} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"scroll-nav-wrap hidden-xs " + this.state.scrollNav}>
          <div className="container">
            <div className="row clearfix">
              <div className="col-md-2">
                <ScrollIntoView style={{ display: "inline-block" }} alignToTop={true} selector="#section-home">
                  <a href="javascript:void(0)">
                    <img className="sn-logo" src={resources.mobileLogo} />
                  </a>
                </ScrollIntoView>
              </div>
              <div className="col-md-7 scroll-nav clearfix">
                <ul className="tetx-center">
                  <ScrollIntoView style={{ display: "inline-block" }} alignToTop={true} selector="#id-to-navigate-online">
                    <li onClick={this.props.showOnlineTabDispatch}>
                      <a className="link" href="javascript:void(0)">
                        FORMAT EN LIGNE
                        </a>
                    </li>
                  </ScrollIntoView>
                  <ScrollIntoView style={{ display: "inline-block" }} alignToTop={true} selector="#id-to-navigate-meeting">
                    <li onClick={this.props.showMeetingTabDispatch}>
                      <a className="link" href="javascript:void(0)">
                        FORMAT PRESENTIEL
                        </a>
                    </li>
                  </ScrollIntoView>
                  <ScrollIntoView style={{ display: "inline-block" }} alignToTop={true} selector="#id-to-navigate-votre">
                    <li>
                      <a className="link" href="javascript:void(0)">
                        VOTRE PARTENAIRE DPC
                        </a>
                    </li>
                  </ScrollIntoView>
                  <ScrollIntoView style={{ display: "inline-block" }} alignToTop={true} selector="#section-expert-notre">
                    <li>
                      <a className="link" href="javascript:void(0)">
                        NOTRE EXPERTISE
                        </a>
                    </li>
                  </ScrollIntoView>
                </ul>
              </div>
              <div className="col-md-3 scroll-nav clearfix">
                <ul className="pull-right">
                  {/* <li>
                    
                    <a className="icon-link link">
                      <img src={resources.iconImage25} />
                    </a>
                  </li> */}
                  <li>
                    <div className="wraper-div ">
                      <div className="dropdown">
                        <button className="header-login-btn header-cart-btn dropdown-toggle floating-cart"
                          type="button" data-toggle="dropdown"><span className="cart-icon" />
                          {this.props.cartCounter > 0 ? <span className="counter">{this.props.cartCounter}</span> : ""}
                        </button>
                        <span className="dropdown-ico"><img src={resources.dropico} /></span>
                        <CartDropdown cart={this.props.cart} />
                      </div>
                    </div>
                  </li>
                  <UserMenuWeb handleLogout={this.handleLogout} />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>;
    }
    else {
      return (
        <div className="scroll-nav-wrap hidden-xs">
          <div className="container">
            <div className="row clearfix">
              <div className="col-md-2">
                <Link to="/">
                  <img className="sn-logo" src={resources.mobileLogo} />
                </Link>
              </div>
              <div className="col-md-7 scroll-nav clearfix">
                <ul className="text-center">
                  <li onClick={this.props.showOnlineTabDispatch}><NavLink to={{ pathname: "/", state: { section: "online" } }} className="link">FORMAT EN LIGNE</NavLink></li>
                  <li onClick={this.props.showMeetingTabDispatch}><NavLink to={{ pathname: "/", state: { section: "meeting" } }} className="link">FORMAT PRESENTIEL</NavLink></li>
                  <li><NavLink to={{ pathname: "/", state: { section: "votre" } }} className="link">VOTRE PARTENAIRE DPC</NavLink></li>
                  <li><NavLink to={{ pathname: "/", state: { section: "notre" } }} className="link">NOTRE EXPERTISE</NavLink></li>
                </ul>
              </div>
              <div className="col-md-3 scroll-nav clearfix">
                <ul className="pull-right">

                  {/* <li><a className="icon-link link"><img src={resources.iconImage25} /></a></li> */}
                  <li>
                    <div className="wraper-div ">
                      <div className="dropdown">
                        <button className="header-login-btn header-cart-btn dropdown-toggle floating-cart"
                          type="button" data-toggle="dropdown"><span className="cart-icon" />
                          {this.props.cartCounter > 0 ? <span className="counter">{this.props.cartCounter}</span> : ""}
                        </button>
                        <span className="dropdown-ico"><img src={resources.dropico} /></span>
                        <CartDropdown cart={this.props.cart} />
                      </div>
                    </div>
                  </li>
                  <UserMenuWeb handleLogout={this.handleLogout} />
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="nav_wrap hidden-xs">
          {this.renderLandingNav()}
        </div>

        <div className="mobile-nav visible-xs">
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button
                  type="button" onMouseDown={() => this.collaplseOtherMenu('main-btn')}
                  className="navbar-toggle collapsed pull-left"
                  data-toggle="collapse" id="main-menu-mobile-btn"
                  data-target="#collapseLeft"
                  aria-expanded="false"
                >
                  <img
                    src={resources.iconBugerMobile}
                    className="img-responsive closed-menu"
                  />
                  <img
                    src={resources.hamToggle}
                    className="img-responsive open-menu"
                  />
                </button>
                <button onMouseDown={() => this.collaplseOtherMenu('user-btn')}
                  type="button" id="user-menu-mobile-btn"
                  className="navbar-toggle collapsed right-menu pull-right"
                  data-toggle="collapse"
                  data-target="#collapseRight"
                  aria-expanded="false"
                >
                  <img src={resources.iconImage4} className="img-responsive" />
                </button>
                <NavLink to={mcsConfig.route.homepage} className="navbar-brand"><img src={resources.mobileLogo} /></NavLink>

                <div className="pull-right nav-icon">
                  <ul>
                    {/* <li>
                      <a className="navbar-brand">
                        <img src={resources.iconImage6} />
                      </a>
                    </li> */}
                    <li>
                      <a className="navbar-brand" id="cart-menu-mobile-btn" onMouseDown={() => this.collaplseOtherMenu('cart-btn')}
                        
                        data-toggle="collapse"
                        data-target="#collapsecart"
                        aria-expanded="false"
                      >
                        <img src={resources.iconImage5} />
                        {this.props.cartCounter > 0 ? <span className="counter">{this.props.cartCounter}</span> : ""}
                      </a>
                      
                    </li>
                  </ul>
                </div>
              </div>

              <div className="collapse navbar-collapse pull-sm-left" id="collapseLeft">
                <MobileMenu history={this} showOnlineTabDispatch={this.props.showOnlineTabDispatch} showMeetingTabDispatch={this.props.showMeetingTabDispatch} hideMenu={this.collaplseOtherMenu} />
              </div>
              <div className="collapse navbar-collapse" id="collapseRight">
                <UserMenuMobile handleLogout={this.handleLogout} hideMenu={this.collaplseOtherMenu} />
              </div>
              <div className="collapse navbar-collapse cart-col" id="collapsecart">
                <CartMenuMobile cart={this.props.cart} hideMenu={this.collaplseOtherMenu} />
              </div>
            </div>
          </nav>
        </div>

      </React.Fragment>
    );
  }
}

const MobileMenu = (props) => {
  let menu = "";
  if (window.location.pathname === "/") {
    menu = <ul className="nav navbar-nav" onClick={() => props.hideMenu('toggle-main-menu')}>
      <ScrollIntoView style={{ display: "block" }} alignToTop={true} selector="#section-tab">
        <li onClick={props.showOnlineTabDispatch}>
          <a className="link display-block fs-15 mobile-link" href="javascript:void(0)">
            FORMAT EN LIGNE
            </a>
        </li>
      </ScrollIntoView>
      <ScrollIntoView style={{ display: "block" }} alignToTop={true} selector="#section-tab">
        <li onClick={props.showMeetingTabDispatch}>
          <a className="link display-block fs-15 mobile-link" href="javascript:void(0)">
            FORMAT PRESENTIEL
            </a>
        </li>
      </ScrollIntoView>
      <ScrollIntoView style={{ display: "block" }} alignToTop={true} selector="#section-master">
        <li>
          <a className="link display-block fs-15 mobile-link" href="javascript:void(0)">
            VOTRE PARTENAIRE DPC
            </a>
        </li>
      </ScrollIntoView>
      <ScrollIntoView style={{ display: "block" }} alignToTop={true} selector="#section-expert-notre">
        <li>
          <a className="link display-block fs-15 mobile-link" href="javascript:void(0)">
            NOTRE EXPERTISE
            </a>
        </li>
      </ScrollIntoView>
    </ul>;
  } else {
    menu = (
      <ul className="nav navbar-nav" onClick={() => props.hideMenu('toggle-main-menu')}>
        <li>
          {/* <NavLink onClick={props.showOnlineTabDispatch} to={{ pathname: "/", state: { section: "online" } }} className="link display-block fs-15 mobile-link">FORMAT EN LIGNE</NavLink> */}
          <NavLink to={{ pathname: "/", state: { section: "online" } }} className="link display-block fs-15 mobile-link">FORMAT EN LIGNE</NavLink>
        </li>
        <li>
          {/* <NavLink onClick={props.showMeetingTabDispatch} to={{ pathname: "/", state: { section: "meeting" } }} className="link display-block fs-15 mobile-link">FORMAT PRESENTIEL</NavLink> */}
          <NavLink to={{ pathname: "/", state: { section: "meeting" } }} className="link display-block fs-15 mobile-link">FORMAT PRESENTIEL</NavLink>
        </li>
        <li>
          <NavLink to={{ pathname: "/", state: { section: "votre" } }} className="link display-block fs-15 mobile-link">VOTRE PARTENAIRE DPC</NavLink>
        </li>
        <li>
          <NavLink to={{ pathname: "/", state: { section: "notre" } }} className="link display-block fs-15 mobile-link">NOTRE EXPERTISE</NavLink>
        </li>
      </ul>
    );
  }
  return menu;
}

const UserMenuWebLanding = (props) => {
  if (mcsConfig.user.isLoggedIn) {
    return (
      <div className="wraper-div">
        <div className="dropdown">
          <button className="header-login-btn logged-user dropdown-toggle" type="button" data-toggle="dropdown"><span className="user-icon" /> <span className="uname-landing">{mcsConfig.user.prenom}</span></button>
          <span className="dropdown-ico"><img src={resources.dropico} /></span>
          <ul className="dropdown-menu user-drop-down nav navbar-nav">
            <li>
              <NavLink to={mcsConfig.route.espacePersoProfile} className="link display-block fs-15 mobile-link">Mes informations personnelles</NavLink>
            </li>
            <li>
              <NavLink to={mcsConfig.route.espacePersoMyFormations} className="link display-block fs-15 mobile-link">Mes formations du moment</NavLink>
            </li>
            <li>
              <NavLink to={mcsConfig.route.espacePersoFormationHistory} className="link display-block fs-15 mobile-link">Mon historique</NavLink>
            </li>
            <li>
              <a href="javascript:void(0)" onClick={props.handleLogout} className="link display-block fs-15 mobile-link">Déconnexion</a>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="wraper-div">
        {/* <li><NavLink to={mcsConfig.route.login} className="icon-link header-login-btn">AAASe connecter</NavLink></li> */}
        <NavLink to={mcsConfig.route.login} className="header-login-btn">Se connecter</NavLink>
      </div>
    );
  }
}

const UserMenuWeb = (props) => {
  // except landing
  if (mcsConfig.user.isLoggedIn) {
    return (
      <li>
        <div className="wraper-div">
          <div className="dropdown">
            <button className="header-login-btn user-menu dropdown-toggle" type="button" data-toggle="dropdown"><span className="user-icon" />{mcsConfig.user.prenom}</button>
            <span className="dropdown-ico"><img src={resources.dropico} /></span>
            <ul className="dropdown-menu user-drop-down nav navbar-nav">
              <li>
                <NavLink to={mcsConfig.route.espacePersoProfile} className="link display-block fs-15 mobile-link">Mes informations personnelles</NavLink>
              </li>
              <li>
                <NavLink to={mcsConfig.route.espacePersoMyFormations} className="link display-block fs-15 mobile-link">Mes formations du moment</NavLink>
              </li>
              <li>
                <NavLink to={mcsConfig.route.espacePersoFormationHistory} className="link display-block fs-15 mobile-link">Mon historique</NavLink>
              </li>
              <li>
                <a href="javascript:void(0)" onClick={props.handleLogout} className="link display-block fs-15 mobile-link">Déconnexion</a>
              </li>
            </ul>
          </div>
        </div>
      </li>
    );
  } else {
    return (
      <li><NavLink to={mcsConfig.route.login} className="icon-link header-login-btn">Se connecter</NavLink></li>
    );
  }
}

const UserMenuMobile = (props) => {
  if (mcsConfig.user.isLoggedIn) {
    return (
      <ul className="nav navbar-nav" onClick={() => props.hideMenu('toggle-user-menu')}>
        <li><NavLink to={mcsConfig.route.espacePersoProfile} >Mes informations personnelles</NavLink></li>
        <li><NavLink to={mcsConfig.route.espacePersoMyFormations} >Mes formations du moment</NavLink></li>
        <li><NavLink to={mcsConfig.route.espacePersoFormationHistory}>Mon historique</NavLink></li>
        <li> <a href="javascript:void(0)" onClick={props.handleLogout}>Déconnexion</a></li>
      </ul>
    );
  } else {
    return (
      <ul className="nav navbar-nav">
        <li><NavLink to={mcsConfig.route.login}>Se connecter</NavLink></li>
      </ul>
    );
  }
}
const CartMenuMobile = (props) => {
  if (props.cart.length > 0) {
    let total = 0;
    return (
      <div className="cart-dropdown dropdown-menu user-drop-down">
        {props.cart.map(item => {
          total += item.mnt_indem;
          return (
            <div key={item.frm_id} className="cart-item">
              <p className="fs-15 g-bold">{item.titre}</p>
              <p className="fs-13 g-light no-margin">{item.type == 4 ? "En ligne" : "Présentiel"}</p>
              {item.type == 4 ? "" : <p className="fs-13 g-light no-margin">{item.date}</p>}
              <p className="fs-13 g-bold">{item.indemnisation}</p>
            </div>
          );
        })}
        <div className="row clearfix">
          <div className="col-xs-6">
            <p className="g-bold fs-15">Total indemnisation</p>
          </div>
          <div className="col-xs-5">
            <p className="g-bold fs-15 text-right">{total}€</p>
          </div>
        </div>
        <div className="cart-btn-wrap row clearfix">
          <div className="col-sm-12">
            <NavLink to={mcsConfig.route.reservation} className="btn-solid-cart-navlink w-100" onClick={() => props.hideMenu('toggle-cart-menu')}>FINALISER LA RESERVATION</NavLink>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="cart-dropdown dropdown-menu user-drop-down" onClick={() => props.hideMenu('toggle-cart-menu')} >
        Votre carnet de réservations est vide !
      </div>
    );
  }
}

const CartDropdown = (props) => {
  if(props.cart.length>0){
    let total = 0;
    return (
      <div className="cart-dropdown dropdown-menu user-drop-down ">
        {props.cart.map(item => {
          total += item.mnt_indem;
          return (
            <div key={item.frm_id} className="cart-item">
              <p className="fs-15 g-bold">{item.titre}</p>
              <p className="fs-13 g-light no-margin">{item.type == 4 ? "En ligne" : "Présentiel"}</p>
              {item.type == 4 ? "" : <p className="fs-13 g-light no-margin">{item.date}</p>}
              <p className="fs-13 g-bold">{item.indemnisation}</p>
            </div>
          );
        })}
        <div className="row clearfix">
          <div className="col-xs-12">
            <p className="g-bold fs-15">Total indemnisation&nbsp;&nbsp;{total}€</p>
          </div>
          {/* <div className="col-xs-2"> */}
            {/* <p className="g-bold fs-15 text-right">{total}€</p> */}
          {/* </div> */}
        </div>
        <div className="cart-btn-wrap row clearfix">
          <div className="col-sm-12">
            <NavLink to={mcsConfig.route.reservation} className="btn-solid-cart-navlink w-100">FINALISER LA RESERVATION</NavLink>
          </div>
        </div>
      </div>
    );
  }else{
    return(
      <div className="cart-dropdown dropdown-menu user-drop-down ">
        Votre carnet de réservations est vide !
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    showOnlineTabDispatch: () => {
      const action = { type: "online" }
      dispatch(action);
    },
    showMeetingTabDispatch: () => {
      const action = { type: "meeting" }
      dispatch(action);
    },
    removeAllFromCart: () => {
      const action = { type: "remove-all-from-cart" }
      dispatch(action);
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
