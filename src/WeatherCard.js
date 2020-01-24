import React, {Component} from 'react'
import './WeatherCard.css';

class WeatherCard extends Component {

    weather_icon = "/icons/weather_" + Math.floor(Math.random()*7) + ".png";

    render() {
        return (
            <div className="weather-card">
                <p className="weather-day">{this.props.day}</p>
                <img className="weather-icon" src={this.weather_icon}></img>
                <p className="temperature">{Math.floor(Math.random() * 4)}° / {Math.floor(Math.random() * 6 + 4)}° C</p>
            </div>
        );
    }
}

export default WeatherCard;