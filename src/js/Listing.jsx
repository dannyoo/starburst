import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import firebase from "./firebase";

import Search from './Search.jsx';


const app = firebase.app();
const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

const collection = db.collection('list');

class Listing extends Component {
    constructor(props) {
        super(props);
        const self = this;
        this.state = {data: null};
            collection.limit(25).get().then(querySnapshot => {
                let listItems = [];
                querySnapshot.forEach(doc => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    listItems.push(doc);
                    console.log(listItems);
                });
                self.setState({data : listItems})
            })
            //if anything has errors, .forEach() stops.
            .catch(
                // Log the rejection reason
                (reason) => {
                    console.log('Handle rejected promise ('+reason+') here.');
                })
        
}
    
    render() {
        function dateReader(doc) {
            let date = new Date(doc.data().date.toDate());
            return date.toDateString() + " - " + date.toLocaleTimeString().replace(":00","");
        };
        return (
        <>
            <Search /> 
            <ul id="list" className="list-group">
            {this.state && this.state.data && 
            this.state.data.map((doc) => 
                <Link key={doc.id} className={`list-group-item-action list-group-item`} to={`/listing/${doc.id}`}> 
                        <h3>
                            {doc.data().title}
                        </h3>
                        <i className={`fa fa-user-circle d-inline-block`}></i>
                        <h5 className={`d-inline-block px-2`}>
                            {doc.data().owner}
                        </h5>
                        <br/>
                        <i className={`d-inline-block fa fa-calendar`}></i>
                        <span className={`d-inline-block px-2 mr-1`}>
                            {dateReader(doc)}
                        </span>
                        <div className={`d-inline-block`}>
                            <i className={`d-inline-block fa fa-users`}></i>
                            <span className={`px-2 text-truncate`}>
                                {doc.data().spots + " spots left!"}
                            </span>
                        </div>
                </Link>
                )
            }     
            </ul>
        </>
        );
    }
}

export default Listing;