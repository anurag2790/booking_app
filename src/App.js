import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BookingForm  from "./bookingForm.js" ;
export default class App extends Component {
  render() {
    return (
      <div>
       
        <h1 className = "text-center"><b> Flight Quick Search </b> </h1>
        
        <br/>

        <div>
        <BookingForm />
        </div>


      </div>
    );
  }
}


