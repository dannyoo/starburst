import React, {Component} from 'react';
import {
    Formik,
    FormikProps,
    Form,
    Field,
    ErrorMessage
} from 'formik';



import firebase from "./firebase";

const app = firebase.app();
const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

const collection = db.collection('list');

import * as yup from 'yup';

//define my schema using Yup
const formSchema = yup.object().shape({
    // insert
    title: yup.string().required(),
    date: yup.date().required(),
    location: yup.string().required(),
    type: yup.string().matches(/(online|in-person)/).required("Please select an option."),
    spots: yup.number().positive("Should be positive").required(),
    keyname: yup.string().required(),
    keyemail: yup.string().email().required(),
    desc: yup.string().max(10000, "That's a bit too much text. It exceeds 10000 characters!").min(500, "Please write a bit more for the event. (Minumum: 500 characters)").required()
});

class Creator extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    redirect(e) {
        e.preventDefault();
        this.props.history.push('/login');
    }
    
    handleSubmit = (values, { 
    props = this.props, 
    setSubmitting 
    }) => {

    //process form submission here

    // Add a new document with a generated id.
    this.props.firebase.firestore().collection("list").add({
        title: `${values.title}`,
        owner: `${this.props.user.displayName}`,
        date: firebase.firestore.Timestamp.fromDate(new Date(`${values.date}`)),
        location: `${values.location}`,
        type: `${values.type}`,
        spots: values.spots,
        contact: {
            name: `${values.keyname}`,
            email: `${values.keyemail}`
        },
        desc: `${values.desc}`,
        requests: ["comming soon"]
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    //done submitting, set submitting to false
    setSubmitting(false);
    this.props.history.push('/listing');
    return;
}

    render() {
const {user} = this.props;
return(
    <Formik
    initialValues={{
        title: '',
        date: '',
        location: '',
        spots: '',
        type: '',
        keyname:'',
        keyemail: '',
        desc:''
    }}
    
    validationSchema={formSchema}
    onSubmit={this.handleSubmit}
        render={formProps => {
            return(
                <>
                <img src="https://source.unsplash.com/1100x500/?fun,people" className={`bg-gradient-info img-fluid`} />
                <div className="container create">
                <h2 className="py-3">Event Creation</h2>
            { user ?
            <Form>
                <section className="form-group">
                <label htmlFor="title" className="form-control-label">Title</label>
                <Field  
                    type="text" 
                    name="title" 
                    placeholder="Title" 
                    className="form-control"
                    /> 
                    <ErrorMessage name="email" />
                <label htmlFor="date" className="form-control-label">Date &amp; Time</label>
                <Field  
                    type="datetime-local" 
                    name="date" 
                    placeholder="Date &amp; Time" 
                    className="form-control"
                    /> 
                    <ErrorMessage name="date" />
                <label htmlFor="location" className="form-control-label">Location</label>
                <Field  
                    type="text" 
                    name="location" 
                    placeholder="Location Name, City, Area Code" 
                    className="form-control"
                    /> 
                    <ErrorMessage name="location" />
                <label htmlFor="spots" className="form-control-label">Spots - How many people?</label>
                <Field  
                    type="number"
                    min="1"
                    max="100"
                    name="spots" 
                    placeholder="1-100" 
                    className="form-control"
                    /> 
                    <ErrorMessage name="spots" />
                <label htmlFor="type" className="form-control-label">Type</label>
                <Field  
                    component="select"
                    min="1"
                    max="100"
                    name="type"
                    placeholder="1-100" 
                    className="form-control"
                    > 
                    <option value="">--Please choose an option--</option>
                    <option value="online">Online</option>
                    <option value="in-person">In-Person</option>
                </Field>
                    <ErrorMessage name="type" />
                    <div className="card my-2">
                        <h5 className="card-header">Key Contact</h5>
                        <div className="card-body">
                            {/* <h5 className="card-title">Special title treatment</h5> */}
                            <p className="card-text">This contact is responsible for event inqueries.</p>
                            <label htmlFor="keyname" className="form-control-label">Name</label>
                                <Field  
                                    type="text"
                                    name="keyname"
                                    placeholder="Name" 
                                    className="form-control"
                                    /> 
                                    <ErrorMessage name="keyname" />
                            <label htmlFor="keyemail" className="form-control-label">Email</label>
                                <Field  
                                    type="email"
                                    name="keyemail"
                                    placeholder="Email" 
                                    className="form-control"
                                    /> 
                                    <ErrorMessage name="keyemail" />
                            
                        </div>
                    </div>
                    <label htmlFor="desc" className="form-control-label">Description</label>
                                <Field  
                                    component="textarea"
                                    rows="5" cols="33"
                                    type="email"
                                    name="desc"
                                    placeholder="Why should you be there? Give as much detail as possible. " 
                                    className="form-control"
                                    /> 
                                    <ErrorMessage name="desc" />
                </section>
                <button 
                type="submit" 
                disabled={formProps.isSubmitting}
                className="btn btn-primary mb-3">
                    Submit Form
                </button>
            </Form>
            : <button type="button" className="btn btn-primary btn-lg mx-auto" onClick={(e)=> this.redirect(e)}>Login To Create</button>}
                </div>
            </>);
        }}
    />);
    }
}
export default Creator;