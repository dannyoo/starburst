import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import firebase from "./firebase";

import Search from './Search.jsx';


// const app = firebase.app();
const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

const collection = db.collection('list');

class Listing extends Component {
    constructor(props) {
        super(props);
        this.state = {data: null, userDidTextSearch: false}; // set state
        
        this.initList(); // initalizes data through firebase Promise
        
        this.dateReader = this.dateReader.bind(this);
        this.userDidTextSearch = this.userDidTextSearch.bind(this);
        
}

    initList() {
        collection.limit(15).orderBy("date").get().then(querySnapshot => {
            let listItems = []; // define empty array of docs on requeset
            querySnapshot.forEach(doc => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                listItems.push(doc); // push the doc to array
            });
            this.setState({data : listItems, userDidTextSearch: false}) // set state to the array of docs
        })
        //if anything has errors, .forEach() stops.
        .catch(
            // Log the rejection reason
            (reason) => {
                console.log('Handle rejected promise ('+reason+') here.');
            })
    }

    userDidTextSearch = query => {
        const self = this;
        if (query == "nada"){
            this.initList();
            return;
        }
        db.collection('search').add({
            request: {
                index: 'list',
                type: 'list',
                q: `${query}`
            },
            response: null
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            docRef.onSnapshot(doc => {
                if (doc.data().response !== null) {
                let listItems = []; // define empty array of docs on requeset
                console.log("response = ", doc.data().response.hits.hits)

                for (let key in doc.data().response.hits.hits) {
                    // skip loop if the property is from prototype
                    if (!doc.data().response.hits.hits.hasOwnProperty(key)) continue;
                
                    var obj = doc.data().response.hits.hits[key];
                    listItems.push(obj); // push the doc to array
                    console.log(obj)
                }
                
                self.setState({data : listItems, userDidTextSearch: true});
                }
            })
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    } 

    dateReader(docDate) {
        if (typeof docDate === "string"){
            var date = new Date(docDate);
        } else {
            var date = new Date(docDate.toDate());
        }
        let output = date.toDateString() + " - " + date.toLocaleTimeString().replace(":00","");
        return output
    };    

    render() {
        return (
        <div className="container">
            {/* <h1 className="m-2">Starbust Opportunity</h1> */}
            <Search userDidTextSearch={this.userDidTextSearch} /> 
            <ul id="list" className="list-group">
            {this.state && this.state.data &&
            this.state.data.map((doc) => 
                <Link 
                key={this.state.userDidTextSearch ? doc._id : doc.id} 
                className={`list-group-item-action list-group-item`} 
                to={`/listing/${this.state.userDidTextSearch ? doc._id : doc.id}`}
                > 
                        <h3>
                            {this.state.userDidTextSearch ? doc._source.title : doc.data().title}
                        </h3>
                        <i className={`fa fa-user-circle d-inline-block`}></i>
                        <h5 className={`d-inline-block px-2`}>
                            {this.state.userDidTextSearch ? doc._source.owner :
                            doc.data().owner}
                        </h5>
                        <br/>
                        <i className={`d-inline-block fa fa-calendar`}></i>
                        <span className={`d-inline-block px-2 mr-1`}>
                            {this.state.userDidTextSearch ? this.dateReader(doc._source.date) :
                                this.dateReader(doc.data().date)}
                        </span>
                        <div className={`d-inline-block`}>
                            <i className={`d-inline-block fa fa-users`}></i>
                            <span className={`px-2 text-truncate`}>
                                {this.state.userDidTextSearch ? doc._source.spots : doc.data().spots + " spots left!"}
                            </span>
                        </div>
                </Link>
                )
            }     
            </ul>
        </div>
        );
    }
}

export default Listing;