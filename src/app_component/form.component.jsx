import React from "react";
import './form.style.css'

const Form = props => {
  return(
    <div className="container">
      <div>{props.error? error() : null}</div>
      <form onSubmit={props.loadweather} className="text-center">
        <div className="row">
          <div className="col-lg-6">
            <input type="text" className="form-control " name='city' autoComplete='off' placeholder="City"/>
          </div>
          <div className="col-lg-6">
            <input type="text" className="form-control " name='country' autoComplete="off" placeholder="Country"/>
          </div>
        </div>
        <div className="mt-4">
          <button className="btn btn-warning">Get Weather</button>
        </div>
      </form>
    </div>
  )
}

function error () {
  return (
    <div className="alert alert-danger mx-5">Please Enter City and Country</div>
  )
}

export default Form