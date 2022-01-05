import './App.css';
import Weather from './app_component/weather.component'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'weather-icons/css/weather-icons.css'

function App() {
  return (
    <div className="App">
      <Weather/>
    </div>
  );
}

export default App;
