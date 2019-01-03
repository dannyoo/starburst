import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from "./firebase";

const app = firebase.app();
const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

const collection = db.collection('list');

class Details extends Component  {

    constructor(props){
        super(props);
        const self = this;
        this.state = {data: null}; // set state
        const docRef = collection.doc(`${props.match.params.id}`);
        docRef.onSnapshot(function(doc) {
            console.log("Current data: ", doc.data());
            self.setState({data : doc})
        });

        this.dateReader = this.dateReader.bind(this)
    }

    dateReader(doc) {
        let date = new Date(doc.data().date.toDate());
        return date.toDateString() + " - " + date.toLocaleTimeString().replace(":00","");
    };

    render() {
        return (
            <>
                
                <img src="https://source.unsplash.com/1300x600/?scenery" className={`bg-gradient-info img-fluid`} />
                {this.state && this.state.data &&
                <div className="container details">
                            <h1 className={`pt-1`}>
                                {this.state.data.data().title}
                            </h1>
                            <i className={`fa fa-user-circle d-inline-block`}></i>
                            <h5 className={`d-inline-block px-2`}>
                                by {this.state.data.data().owner}
                            </h5>
                            <br/>
                            <i className={`d-inline-block fa fa-calendar`}></i>
                            <span className={`d-inline-block px-2 mr-1`}>
                                {this.dateReader(this.state.data)}
                            </span>
                            <div className={`d-inline-block`}>
                                <i className={`d-inline-block fa fa-users`}></i>
                                <span className={`px-2 text-truncate`}>
                                    {this.state.data.data().spots + ` spot${this.state.data.data().spots == 1 ? '' : 's'} left!`}
                                </span>
                            </div>
                            <div className="d-inline-block py-2">
                                <i className={`d-inline-block fa fa-map-marker`}></i>
                                <a target="_blank" href={`https://maps.google.com/?q=${this.state.data.data().location}`} className={`px-2 text-truncate`}>
                                    <span>{this.state.data.data().location}</span>
                                </a>
                            </div>
                            <div>
                                <h3>Description</h3>
                                <p>{this.state.data.data().desc}</p>
                            </div>
                            <div>
                                <h3>Photos</h3>
                                <div className="d-flex justify-content-between">
                                    <img src="https://source.unsplash.com/100x100/?friend" alt="fun" className={`img-thumbnail img-fluid`}/>
                                    <img src="https://source.unsplash.com/100x100/?charity" alt="fun" className={`img-thumbnail img-fluid`}/>
                                    <img src="https://source.unsplash.com/100x100/?team" alt="fun" className={`img-thumbnail img-fluid`}/>
                                </div>
                            </div>
                            <div>
                                <h3>Key Contact</h3>
                                <div className={`d-flex justify-content-center`}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{this.state.data.data().contact.name}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{this.state.data.data().contact.email}</h6>
                                        <p className="card-text">Feel free to ask questions before you request to volunteer!</p>
                                        <a href={`mailto:${this.state.data.data().contact.email}`} className="card-link">Send Email</a>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                            {
                                this.state.data.data().spots == 0 ? 
                                    <button type="button" className="btn btn-secondary btn-lg" disabled>No Spots Left</button> 
                                    : <button type="button" className="btn btn-primary btn-lg">Request to Volunteer</button>
                                }
                            </div>
                            
                </div>
                
                    }
            </>
            )

    }

        
    }

export default Details;