import React, { Component } from 'react';

class Loader extends Component {
    state = {  }
    render() { 
        return ( 
            <div className={'loader ' + this.props.status} >
                <div className="lds-css ng-scope">
                    <div className="lds-eclipse w-100 h-100">
                        <div>

                        </div>
                    </div>
                </div>
            </div>
         );
    }
    
}
 
export default Loader;