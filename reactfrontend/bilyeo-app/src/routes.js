import React from "react";
import {Route} from "react-router-dom";
import LoginForm from "./containers/LoginForm"
import SignupForm from "./containers/SignupForm"
const BaseRouter =() =>(
    <div>
        <Route path ="/login" component={LoginForm} />
        <Route path ="/signup" component={SignupForm}/> 
    </div>

);

export default BaseRouter;