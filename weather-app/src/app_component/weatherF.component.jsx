import React from 'react';
import { Link } from 'react-router-dom';

const WeatherF = (props) =>{
  return (
    <div className="container">
      <div className="cards pt-4">
        <h1>{props.city}</h1>
        <h5 className="py-4">
          <i className={`wi ${props.weatherIcon} display-1`}></i>
        </h5>
        {props.temp_fahrenheit ? (<h1 className="py-2">{props.temp_fahrenheit}&deg;</h1>) : null}

        {/** show max and min temp */}
        {minmaxTemp(props.temp_min,props.temp_max)}

        <h4 className="py-3">{props.description}</h4>
        <div className="col-md-3 mt-md-0 text-md-left">
          <Link to='/'><button className="btn btn-warning">F&deg;</button></Link>
          <Link to='/celsius'><button className="btn btn-warning">C&deg;</button></Link>
        </div>
      </div>
    </div>
  )
}

function minmaxTemp(min,max) {
  if (min && max) {
    return (
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    )
  }
}

export default WeatherF