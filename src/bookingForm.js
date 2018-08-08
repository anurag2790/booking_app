



import React, { Component } from 'react';
import Select from 'react-select';
import Loading from 'react-loading-animation' ;
import axios from 'axios' ;
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.css';

const options = [
  { value: 'Bengaluru International', label: 'Bengaluru International (BLR)' },
  { value: 'London Heathrow', label: 'London Heathrow (LHR)' },
  { value: 'La Garenne Airport ', label: 'La Garenne Airport (AGF)' },
  { value: 'John F Kennedy International Airport ', label: 'John F Kennedy International Airport (JFK)' },
  { value: 'Hyderabad Airport', label: 'Hyderabad Airport (HDD)' },
  { value: 'Indira Gandhi International Airport', label: 'Indira Gandhi International Airport (DEL)' },
  { value: 'Chhatrapati Shivaji International Airport ', label: 'Chhatrapati Shivaji International Airport (BOM)' }

];



export default class BookingForm extends Component {

    constructor (props){
        super(props);

        

        this.state = {

            
            
            tripType: 'round',
            originAirport: '',
            departureAirport: '',
            originDate:'',
            returnDate:'',
            travellers : '' ,
            tripClass: 'Economy',

            minArrival : '',

            isFetching : false ,
            
            options1 : []
            
            
    }
}
    changeTripType = (event) => {

        this.setState({ tripType : event.target.value });
       
    }

   originAirportChange = (optionSelected) => {

        const name = this.name;
        const value = optionSelected.value;
        const label = optionSelected.label;

        this.setState({ 
            originAirport : value ,
        });
        

        document.querySelector("#originAirport").removeAttribute("required");
             
      }


    departureAirportChange = (optionSelected) => {


        const name = this.name;
        const value = optionSelected.value;
        const label = optionSelected.label;
    
        this.setState({ departureAirport : value });
        
        if(this.state.originAirport == value){
            alert('Departure airport cant be same as Origin Airport');
        }{

        document.querySelector("#departureAirport").removeAttribute("required");
        }
        
      }

    originDateChange = (event) => {
       
        let _minDatearrival = parseInt(event.target.value.slice(-2)) ;
        let _minMontharrival = parseInt(event.target.value.slice(-5,-3) );
        let _minYeararrival = parseInt(event.target.value.slice(0,4)) ;

        let dayNum = 30 ;

        //setting minimum return date
        // return date is more than origin date by one day

        _minDatearrival = _minDatearrival + 1 ;

        if(_minMontharrival === 1 || _minMontharrival === 3 || _minMontharrival === 5 || _minMontharrival === 7 || _minMontharrival === 8 || _minMontharrival === 10 || _minMontharrival === 12) {
            dayNum = 31;
          } else if(_minMontharrival === 4 || _minMontharrival === 6 || _minMontharrival === 9 || _minMontharrival === 11 ) {
            dayNum = 30;
          } else {

          // If month is February, calculate whether it is a leap year or not
            
            var leap = (_minYeararrival % 4 === 0 && _minYeararrival % 100 !== 0) || _minYeararrival % 400 === 0;
            dayNum = leap ? 29 : 28;
          }
 
            if ( _minDatearrival > dayNum) {
            
                _minDatearrival = ( _minDatearrival - dayNum) ;
            
                    if ( _minMontharrival = 12){
                        _minMontharrival =  1 ;
                        _minYeararrival = _minYeararrival + 1 ;
                    }
                    
               }
   
          
            _minDatearrival =    ("0" + _minDatearrival).slice(-2);
            _minMontharrival =    ("0" + (_minMontharrival)).slice(-2);
 
           // convert to YYYY-MM-DD  format
 
          let _minArrival = (_minYeararrival)+"-"+(_minMontharrival)+"-"+ (_minDatearrival);

          
        this.setState({ 
            originDate : event.target.value ,
            minArrival : _minArrival
        
        });

      }


    returnDateChange = (event) => {
        this.setState({ returnDate : event.target.value });
    
      }
      
    travellersChange = (event) => {

        
        this.setState({ travellers : event.target.value });
       
    }

    // trip class selection
    tripClassChange = (event) => {
        
        
        this.setState({ tripClass: event.target.value });
      
    }

    handleSubmit = (event) => {
        
        this.setState({ isFetching : true });
        setTimeout(() => {
            this.setState({ isFetching : false });
          }, 10000);
        
    }


// rest api with axios to get airports names
    componentDidMount() {
        axios.get('/airports')
        .then((res) => {
            const airports = [
                { value: 'BLR', label: 'Bengaluru International (BLR)' },
                { value: 'LHR', label: 'London Heathrow (LHR)' },
                { value: 'AGF', label: 'La Garenne Airport (AGF)' },
                { value: 'JFK', label: 'John F Kennedy International Airport (JFK)' },
                { value: 'HDD', label: 'Hyderabad Airport (HDD)' },
                { value: 'DEL', label: 'Indira Gandhi International Airport (DEL)' },
                { value: 'BOM', label: 'Chhatrapati Shivaji International Airport (BOM)' }
            
            ];
        
                this.setState({ options1 : airports });

        })
            .catch((error) => {
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

    }

  

       


    render() {

       // var dateString = (new Date()).toISOString().split("T")[0];

      // minimum date shown must be further than tomorrow in origin date
        // today + 2
      
       let now = new Date();

       let dayNum = 30;
       let _day = now.getDate();
       let _month = now.getMonth();
       let _year = now.getFullYear();
       let _minDateorigin = _day + 2; 
       let _minMonthorigin = _month ;
       let _minYearorigin = _year ;

        let _minDatearrival = moment(this.state.originDate).format('DD');
        let _minMontharrival = moment(this.state.originDate).format('MM');
        let _minYeararrival = moment(this.state.originDate).format('YYYY');

        _minDatearrival = _minDatearrival + 1;


       if(_month === 0 || _month === 2 || _month === 4 || _month === 6 || _month === 7 || _month === 9 || _month === 11) {
           dayNum = 31;
         } else if(_month === 3 || _month === 5 || _month === 7 || _month === 10 ) {
           dayNum = 30;
         } else {
         // If month is February, calculate whether it is a leap year or not
           
           var leap = (_year % 4 === 0 && _year % 100 !== 0) || _year % 400 === 0;
           dayNum = leap ? 29 : 28;
         }

         if ( _minDateorigin > dayNum) {
           
                   _minDateorigin = ( _minDateorigin - dayNum) ;
           
                   if (_month = 11){
                   _minMonthorigin =  0 ;
                   _minYearorigin = _year + 1 ;
                   }
              }

              
         
           _minDateorigin =    ("0" + _minDateorigin).slice(-2);
           
           _minMonthorigin =    ("0" + (_minMonthorigin + 1)).slice(-2);
              

         let  _minOrigin = (_minYearorigin)+"-"+(_minMonthorigin)+"-"+ (_minDateorigin);

         
         ///////////////////////////
         // To show Date of departure and return date in DD-MM-YYYY format     
         
         let Odate = moment(this.state.originDate).format('DD-MM-YYYY') ;
         let Rdate = moment(this.state.returnDate).format('DD-MM-YYYY') ;

         
            

        return (
    

        this.state.isFetching ? (
    
    
            <div className = "container-fluid visible-lg-inline col-md-8 col-md-offset-2  w-100 "  >
        
     
                <h1>Search in Progress...</h1>
                <br/>
                <br/>
                <Loading />
                <br/>
                <br/>
                <hr/>
                
                <p><strong>TripType</strong>: {this.state.tripType} </p>
                <p> <strong>OriginAirport </strong>: {this.state.originAirport} </p>
                <p> <strong>DepartureAirport</strong>: {this.state.departureAirport} </p>
                <p><strong>OriginDate</strong>: {Odate} </p>
                <p id = 'showReturnDate' > <strong>ReturnDate</strong>: {Rdate} </p>
                <p><strong>Number of Travellers</strong> : {this.state.travellers}</p>
                <p><strong>TripClass</strong>: {this.state.tripClass} </p>
           
    
        </div>
    
    )
        
        : 
  

         ( <div className = "container-fluid border border-dark  col-md-4 col-md-offset-4"  >
           
           <form className = "border border-dark bg-light" onSubmit = {this.handleSubmit.bind(this)} >
               
                <div className = "row border border-primary">
                    <div className= "col-md-6 border border-primary w-50 form-group active  ">           
                        <input type="radio" value='round' id = "roundtrip" checked={this.state.tripType === 'round'} name="triptype" 
                        onChange = {this.changeTripType.bind(this)} />
                        <label for='roundtrip'>Round trip</label>
                    </div> 

                    <div class= "col-md-6 w-50 form-group ">                     
                        <input type="radio" value = 'oneway' id = "oneway" checked={this.state.tripType === 'oneway'} name="triptype" 
                        onChange = {this.changeTripType.bind(this)} />
                        <label for='oneway'>One way</label>
                     </div>
                </div>


                <hr />
            
            
                <div>
                    <div className= "form-group border border-primary ">
                        
                        <label for='Origin'>Departure Airport</label>
                        <Select id= "Origin"
                            
                            name="originAirport"
                            
                            options={options}
                            
                            ref={(ref) => { this.select1 = ref; }}
                            
                            onChange={this.originAirportChange.bind(this)}
                            
                         />

                         <input id= 'originAirport'
                            tabIndex={-1}
                            
                            style={{
                                opacity: 0,
                                width: 0,
                                height: 0,
                                position: 'absolute',
                            }}
                            onFocus={() => this.select1.focus()}
                            required
                        />
                        
                    </div>
            
                    <div className= "form-group border border-primary ">
                        <label for='Arrival'>Arrival Airport</label>
                        <Select id= 'Arrival'
                            
                            name="departureAirport"
                            options={options}
                            onChange={this.departureAirportChange.bind(this)}
                            
                            ref={(ref) => { this.select = ref; }}
                         />

                         <input id= 'departureAirport'
                            tabIndex={-1}
                            
                            
                            
                            required 
                            
                            style={{
                                opacity: 0,
                                width: 0,
                                height: 0,
                                position: 'absolute',
                            }}
                            onFocus={() => this.select.focus()}
                        />
                        
                    </div>

                </div>


                
                <br/>
            
                <div className=  "form-group ">
                       
                    <div className= " w-50  border border-primary">
                        <label for="Departure_date">Date of Journey</label>
                        <input className = "form-control" type="date" required id = "Departure_date"  min = {_minOrigin}
                        onChange = {this.originDateChange.bind(this)} max = '2019-12-31'/>
                        
                    </div>
                        
                     <div className= " w-50  border border-primary "> 
                        <label for="Returning_date"> Return Journey Date</label>
                        <input className = "form-control" type="date" required id = "Returning_date" min = {this.state.minArrival} disabled = {this.state.tripType === 'oneway'} 
                        onChange = {this.returnDateChange.bind(this)} max = '2019-12-31'/>
                        
                    </div>  
                </div>


            <br />

             <div>
                 <div className = "form-group">
                    <label for = "Travellers">Number of Travellers</label>

                      
                       <input type="number" min="1" id= "Travellers" className = "form-control "  required 
                       onChange = {this.travellersChange.bind(this)} />    

                    
                    </div>
                </div>


                <br/>

                <div className = "row border border-primary form-group" >
                      <div className = "col-md-4 border border-primary  form-group "> 
                        <label for = "Economy" >Economy &nbsp; </label>
                         <input id =  "Economy" type="radio" value = 'Economy' checked={this.state.tripClass === 'Economy'} name="flight_type" 
                         onChange = {this.tripClassChange.bind(this)} />
                      </div>
                      <div className = "col-md-4 border border-primary  form-group  ">
                        <label for = "First"> First &nbsp; </label>
                        <input id = "First" type="radio" value = 'First' checked={this.state.tripClass === 'First'} name="flight_type" 
                        onChange = {this.tripClassChange.bind(this)} />
                        </div>
                      <div className = "col-md-4 border border-primary  form-group ">
                        <label for = "Business">Business &nbsp;</label>
                        <input id="Business" type="radio" value = "Business" checked={this.state.tripClass === 'Business'}  name="flight_type" 
                        onChange = {this.tripClassChange.bind(this)} />
                       </div>

                </div>

                
                <div className = "col-md-4 col-md-offset-4">
                <input type="submit" class="btn btn-primary"  value = "Submit" />
                </div>

            </form>
    
    
         </div>)
    
    
        );
      }
    }
    
