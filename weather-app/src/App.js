import './App.css';
import Weather from './app_component/weather.component'
import WeatherF from './app_component/weatherF.component';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'weather-icons/css/weather-icons.css'
import Form from './app_component/form.component'

const API_KEY = '541a6fd6349d856e50d4aa778147f56f'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      fahrenheit: undefined,
      temp_max_c: undefined,
      temp_min_c: undefined,
      temp_max_f: undefined,
      temp_min_f: undefined,
      description:"",
      error: false,
    };
    this.weatherIcon = {
      Thunderstorm:'wi-thunderstorm',
      Drizzle: 'wi-sleet',
      Rain: 'wi-storm-shower',
      Snow: 'wi-snow',
      Atmosphere:'wi-fog',
      Clear: 'wi-day-sunny',
      Clouds: 'wi-day-fog',
    }
  }

  calCelsius(temp) {
    let cel = Math.floor(temp - 273.15)
    return cel
  }

  calFahrenheit(temp) {
    let fah = Math.floor((temp - 273.15) * 9/5 + 32)
    return fah
  }

  get_WeatherIcon(icons, rangeId) {
    switch(true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({icon:this.weatherIcon.Thunderstorm})
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({icon:this.weatherIcon.Drizzle})
        break;
      case rangeId >= 500 && rangeId <= 532:
        this.setState({icon:this.weatherIcon.Rain})
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({icon:this.weatherIcon.Snow})
        break;
      case rangeId >= 701 && rangeId <= 281:
        this.setState({icon:this.weatherIcon.Atmosphere})
      break;
      case rangeId === 800:
        this.setState({icon:this.weatherIcon.Clear})
      break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({icon:this.weatherIcon.Clouds})
      break;
      default:
        this.setState({icon:this.weatherIcon.Clouds})

    }
  }

  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)
      const response = await api_call.json();
      console.log(response)
      this.setState({
      city: `${response.name}, ${response.sys.country}`,
      celsius: this.calCelsius(response.main.temp),
      fahrenheit: this.calFahrenheit(response.main.temp),
      temp_max_c: this.calCelsius(response.main.temp_max),
      temp_min_c: this.calCelsius(response.main.temp_min),
      temp_max_f: this.calFahrenheit(response.main.temp_max),
      temp_min_f: this.calFahrenheit(response.main.temp_min),
      description: response.weather[0].description,
      
    })
    this.get_WeatherIcon(this.weatherIcon, response.weather[0].id)
    } else {
      this.setState({error:true})
    }
  }

  render() {
    return(
    <Router>
    <div className="App">
      <Form loadweather = {this.getWeather} error={this.state.error}/>
      <Switch>
        <Route exact path='/'>
          <WeatherF 
            city={this.state.city} 
            country={this.state.country} 
            temp_celsius={this.state.celsius}
            temp_fahrenheit={this.state.fahrenheit} 
            temp_max={this.state.temp_max_f}
            temp_min={this.state.temp_min_f}
            description={this.state.description}
            weatherIcon={this.state.icon}/>
        </Route>
        <Route exact path='/celsius'>
          <Weather 
            city={this.state.city} 
            country={this.state.country} 
            temp_celsius={this.state.celsius}
            temp_fahrenheit={this.state.fahrenheit} 
            temp_max={this.state.temp_max_c}
            temp_min={this.state.temp_min_c}
            description={this.state.description}
            weatherIcon={this.state.icon}/>
        </Route>
      </Switch>
    </div>
    </Router>
    );
  }
}


export default App;
