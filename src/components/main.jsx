import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import mcsConfig from "../mcs-configuration";
import Header from './layout/header';
import Footer from './layout/footer';
import Homepage from './homepage/homepage';
import FormationDetail from "./formation/formation-detail";
import store from "../store/store";
import Registration from "./auth/registration";
import Login from "./auth/login";
import EspacePerso from "./espace-perso/espace-perso";
import Reservation from "./reservation/reservation";

class Main extends Component {
    state = {  }
    render() { 
        return <React.Fragment>
            <Header store={store} location={this.props.location} history={this.props.history} />
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path={mcsConfig.route.registration} component={Registration} />
                <Route exact path={mcsConfig.route.login} component={Login} />
                <Route path="/formations/:type/:id" render={(props) => <FormationDetail {...props} store={store} />} />
                <Route path={mcsConfig.route.reservation} component={Reservation} />
            </Switch>
            <EspacePerso history={this.props.history}/>
            <Footer />
          </React.Fragment>;
    }
}
 
export default Main;