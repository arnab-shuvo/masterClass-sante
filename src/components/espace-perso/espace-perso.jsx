import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Profile from "./profile";
import MyFormations from "./my-formations";
import FormationHistories from "./formation-histories";
import FormationDetail from "./formation-detail";
import mcsConfig from "../../mcs-configuration";
import VideoQuizz from "./video-quizz";

class EspacePerso extends Component {
    state = {  }
    
    render() { 
        return ( 
            <React.Fragment>
                <Switch>
                    <Route path={mcsConfig.route.espacePersoProfile} component={Profile} />
                    <Route exact path={mcsConfig.route.espacePersoMyFormations} component={MyFormations} />
                    <Route exact path={mcsConfig.route.espacePersoFormationHistory} component={FormationHistories} />
                    <Route exact path={mcsConfig.route.espacePersoMyFormations + "/:frm_id"} component={FormationDetail} />
                    <Route path={mcsConfig.route.espacePersoFormationHistory + "/:frm_id"} component={FormationDetail} />
                    <Route path={mcsConfig.route.espacePersoMyFormations + "/:frm_id/video"} component={VideoQuizz} />
                    
                </Switch>
            </React.Fragment>
         );
    }
}
 
export default EspacePerso;