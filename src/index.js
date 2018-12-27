//
// PATH OF THIS FILE: ./src/index.js
//
import style from "./scss/app.scss";
import App from "./js/App.jsx";

const arr = [1, 2, 3];
const iAmJavascriptES6 = () => console.log(...arr);
window.iAmJavascriptES6 = iAmJavascriptES6;

document.addEventListener('DOMContentLoaded', event => {

    const app = firebase.app();
    const db = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    db.settings(settings);

    // Reference the document
    const collection = db.collection('list');

// check if list page
if (document.getElementById("list")){

    //lists events on page
    function listEvents(doc) {
        //find list
        let list = document.getElementById("list");
        //create list-items
        let newLi = document.createElement("a");
        //create internal elems
        let title = document.createElement("h3");
        let owner = document.createElement("h5");
        let ownerIcon = document.createElement("i");
        let date = document.createElement("span");
        let dateIcon = document.createElement("i");
        let spots = document.createElement("span");
        let spotsIcon = document.createElement("i");
        let div = document.createElement("div");
        let br = document.createElement("br");
        //add classes
        newLi.classList.add('list-group-item-action','list-group-item');
        owner.classList.add("d-inline-block", "px-2");
        ownerIcon.classList.add("fa", "fa-user-circle", "d-inline-block");
        date.classList.add("d-inline-block", "px-2", "mr-1");
        dateIcon.classList.add("d-inline-block", "fa", "fa-calendar");
        spots.classList.add("px-2", "text-truncate");
        spotsIcon.classList.add("d-inline-block", "fa", "fa-users");
        div.classList.add("d-inline-block");
        //Date Logic
        let dateReader = new Date(doc.data().date.toDate());
        let dateOut = dateReader.toDateString() + " - " + dateReader.toLocaleTimeString().replace(":00","");
        //create elems content text-nodes
        let titleT = document.createTextNode(doc.data().title); 
        let ownerT = document.createTextNode(doc.data().owner); 
        let dateT = document.createTextNode(dateOut); 
        let spotsT = document.createTextNode(doc.data().spots + " spots left!"); 
        //append content to elems
        title.appendChild(titleT);  
        owner.appendChild(ownerT); 
        date.appendChild(dateT);  
        spots.appendChild(spotsT);  
        //assign appropriate element heirarchy
        list.appendChild(newLi);
        newLi.appendChild(title);
        newLi.appendChild(ownerIcon);
        newLi.appendChild(owner);
        newLi.appendChild(br);
        newLi.appendChild(dateIcon);
        newLi.appendChild(date);
        newLi.appendChild(div);
        div.appendChild(spotsIcon);
        div.appendChild(spots);
    }

    // Get limited documents
    collection.limit(25).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            listEvents(doc);
        });
    })
    //if anything has errors, .forEach() stops.
    .catch(
        // Log the rejection reason
        (reason) => {
            console.log('Handle rejected promise ('+reason+') here.');
        });
};



});

// push events
function create () {
    //declare variables
    let title = document.getElementById("title").value;
    let spots = document.getElementById("spots").value;
    let desc = document.getElementById("description").value;
    // pushes to firebase
    firebase.firestore().collection('list').add({
        title: `${title}`,
        spots: `${spots}`,
        desc: `${desc}`,
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
};