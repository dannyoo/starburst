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

    // Reference the document
    const collection = db.collection('list');

// check if list page
if (document.getElementById("list")){

    //lists events on page
    function listEvents(doc) {
        //create elems
        let list = document.getElementById("list");
        let newLi = document.createElement("li");
        let title = document.createElement("h3");
        let owner = document.createElement("h5");
        let desc = document.createElement("p");

        //create content

        let newContent = document.createTextNode(doc.data().title); 
        let newContent1 = document.createTextNode(doc.data().owner); 
        let newContent2 = document.createTextNode(doc.data().desc); 
        title.appendChild(newContent);  
        owner.appendChild(newContent1);  
        desc.appendChild(newContent2);  

        list.appendChild(newLi);
        newLi.appendChild(title);
        newLi.appendChild(owner);
        newLi.appendChild(desc);
    }

    // Get limited documents
    collection.limit(25).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            listEvents(doc);
        });
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