import React from 'react';
import {Link} from 'react-router-dom';


function Landing(props) {
    return (

      <div className= "front">

        <div class="card border-0 text-center text-black mb-5" style={{backgroundImage:'linear-gradient(to bottom right, #87ceeb, white)'}}>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col- align-self-center mt-5 border rounded shadow-sm px-3 py-1 bg-light">
                <p className="h1">Change The World</p>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col- align-self-center mt-3 px-3 border rounded shadow-sm mx-3 bg-light">
                <p>Pair people who want to change the world and have fun doing it!</p>
              </div>
            </div>
          </div>
          <div className= "button text-center m-3">
            <Link to="/listing"><button type="button" className="btn btn-primary btn-lg shadow-lg">Search Listings</button></Link> 
          </div>
          <img className="img-fluid" src="https://www.communitymissionfinancial.com/img/happy_town.svg"></img>
        </div>
       
        <div className="card-deck">

          <div className="card border-0 mx-5 mb-5 shadow">
            <img class="card-img-top" src="https://source.unsplash.com/S5DEUg2yUVU" alt="Card image cap"></img>
            <div class="card-body">
              <h5 className="card-title text-center">Organizers</h5>
              <p className="card-text text-center">
              <Link to="/create"> Create events </Link> for others to volunteer at. Help others by giving them the opportunities to succeed. </p>
            </div>
          </div>
          <div className="card border-0 mx-5 mb-5 shadow">
            <img class="card-img-top" src="https://source.unsplash.com/-Xv7k95vOFA" alt="Card image cap"></img>
            <div className="card-body">
              <h5 className="card-title text-center">Volunteers</h5>
              <p className="card-text text-center">On Starburst you can sign up to volunteer for many types of events. You can start your journey to <Link to="/listing" > change the world. </Link></p>
            </div>
          </div>
        </div>

      </div>
        
        );
}
export default Landing;