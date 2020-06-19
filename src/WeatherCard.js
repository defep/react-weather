import React, { Component } from 'react';
import './WeatherCard.css';

class WeatherCard extends Component {

    weather_icon = "/icons/weather_" + Math.floor(Math.random() * 7) + ".png";

    constructor(props) {
        super(props);
        this.state = {
            day: props.day,
            minTemp: Math.floor(Math.random() * 4),
            maxTemp: Math.floor(Math.random() * 6 + 4),
            scale: "C"
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.onClick(this.props.value);
    }

    render() {
        return (
            <div className="weather-card">
                <p className="weather-day">{this.props.day}</p>
                <img className="weather-icon" alt="weather" src={this.weather_icon}></img>
                <p className="temperature">
                    {this.props.minTemp}°
                    / {this.props.maxTemp}
                    ° <span onClick={this.onClick}>{this.props.scale}</span>
                </p>
            </div>
        );
    }
}

export default WeatherCard;