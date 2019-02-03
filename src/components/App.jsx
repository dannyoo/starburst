import React, {Component} from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import firebase from './firebase';

import Navigation from "./Navigation.jsx";
import Listing from "./Listing.jsx";
import Details from "./Details.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Creator from "./Creator.jsx";

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
      });

  }

  requestToVolunteer = doc => {
    var docRef = firebase.firestore().collection("list").doc(`${doc}`);
    // Atomically add a new region to the "requests" array field.
    docRef.update({
      requests: firebase.firestore.FieldValue.arrayUnion(this.state.user.uid)
    }).then()
    .catch(function(error) {
      console.log(error);
    });
  }

  cancel = doc => {
    var docRef = firebase.firestore().collection("list").doc(`${doc}`);
    docRef.update({
      requests: firebase.firestore.FieldValue.arrayRemove(this.state.user.uid)
    }).then()
    .catch(function(error) {
      console.log(error);
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
          <Route exact path="/create" render={props => 
            <Creator {...props} firebase={firebase} requestToVolunteer={this.requestToVolunteer} user={this.state.user} />} />
          <Route exact path="/listing" component={Listing} />
          <Route path="/listing/:id" render={props => 
            <Details {...props} cancel={this.cancel} requestToVolunteer={this.requestToVolunteer} user={this.state.user} />} 
          />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup"  render={props => 
            <Signup {...props} registerUser={this.registerUser} />} 
          />
        </>
      </Router>
      </>
    );
  }
}


export default App;