import React from 'react';
import {Router, Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import AdminRegister from "../registerAdmin/registerAdmin";
import Header from '../mainPage/mainPage';
import Home from '../homePage/homePage';
import Login from '../loginPage/login';

const SecurityRoute = (props) => {
    if(props.auth.isAuthenticated) {
        switch (props.auth.user.role) {
            case 'manager':
                return (
                  <div>
                        <Header/>
                        <Route  path="/manager1" exact component={AdminRegister}/>
                        <Route  path="/manager2" exact component={AdminRegister}/>
                        <Route  path="/manager3" exact component={AdminRegister}/>
                        <Route  exact path="/" component={Home}/>
                  </div>
                );
            case 'operator':
                return (
                    <div>
                        <Header/>
                        <Route  from='/' to="/" />
                        <Route exact path="/operator1" component={AdminRegister}/>
                        <Route exact path="/operator2" component={AdminRegister}/>
                        <Route exact path="/operator3" component={AdminRegister}/>
                        <Route  exact path="/" component={Home}/>
                    </div>
                );
            case 'controller':
                return (
                    <div>
                        <Header/>
                        <Route  from='/' to="/" />
                        <Route exact path="/controller1" component={AdminRegister}/>
                        <Route exact path="/controller2" component={AdminRegister}/>
                        <Route exact path="/controller3" component={AdminRegister}/>
                        <Route  exact path="/" component={Home}/>
                    </div>
                );
            case 'mainAdmin':
                return (
                    <div>
                        <Header/>
                        <Route  from='/' to="/" />
                        <Route exact path="/mainAdmin1" component={AdminRegister}/>
                        <Route exact path="/mainAdmin2" component={AdminRegister}/>
                        <Route exact path="/mainAdmin3" component={AdminRegister}/>
                        <Route  exact path="/" component={Home}/>
                    </div>
                );
            case 'companyAdmin':
                return (
                    <div>
                        <Header/>
                        <Route  exact path="/companyAdmin1" component={AdminRegister}/>
                        <Route  exact path="/companyAdmin2" component={AdminRegister}/>
                        <Route  exact path="/companyAdmin3" component={AdminRegister}/>
                        <Route  exact path="/" component={Home}/>
                    </div>
                );
            default:
                return <Redirect to={{pathname: '/'}}/>
        }
    }
    else {
        return (
            <Router>
                <Redirect from='*' to="/" component={Login}/>
            </Router>
        );
    }




}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(SecurityRoute)