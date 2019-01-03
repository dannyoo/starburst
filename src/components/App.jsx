import React, {Component} from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import firebase from './firebase';
import * as ROUTES from '../constants/routes';

import Navigation from "./Navigation.jsx";
import Listing from "./Listing.jsx";
import Details from "./Details.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";

class App extends Component{
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
      }
    });
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
      });
    });
  };

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        // navigate('/login');
      });
  }

  render() {
    return (
      <>
      <Router>
        <>
          <Navigation
            user={this.state.user}
            logOutUser={this.logOutUser}
          />
          {/* <Redirect exact from="/" to="/listing" /> */}

          <Route exact path="/listing" component={Listing} />
          <Route path="/listing/:id" component={Details} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup"  render={props => <Signup {...props} registerUser={this.registerUser} />} />
        </>
      </Router>
      </>
    );
  }
}


export default App;