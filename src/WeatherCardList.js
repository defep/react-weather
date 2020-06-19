import React, { Component } from 'react';
import WeatherCard from './WeatherCard';
import Axios from 'axios';
import './WeatherCardList.css'

class WeatherCardList extends Component {

    constructor() {
        super()
        this.state = {
            scale: "C",
            weatherCards: [
                { day: 'Mon', minTemp: this.getRandomMinTemp(), maxTemp: this.getRandomMaxTemp() },
                { day: 'Tue', minTemp: this.getRandomMinTemp(), maxTemp: this.getRandomMaxTemp() },
                { day: 'Wed', minTemp: this.getRandomMinTemp(), maxTemp: this.getRandomMaxTemp() },
                { day: 'Thu', minTemp: this.getRandomMinTemp(), maxTemp: this.getRandomMaxTemp() },
                { day: 'Fri', minTemp: this.getRandomMinTemp(), maxTemp: this.getRandomMaxTemp() },
            ],
            active: 0
        }
    }

    componentDidMount() {
        Axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=-34.603722&lon=-58.381592&appid=' + process.env.REACT_APP_API_KEY).then(res => {
            console.log(res.data);
        });
    }

    getRandomMinTemp() {
        return Math.floor(Math.random() * 4);
    }

    getRandomMaxTemp() {
        return Math.floor(Math.random() * 6 + 4);
    }

    toFarenheit(currentValue) {
        return Math.round(currentValue * (9 / 5) + 32);
    }

    toCelcius(currentValue) {
        return Math.round((currentValue - 32) * 5 / 9);
    }

    click(index) {
        let weatherCards = this.state.weatherCards.map(a => a + a);
        let scale = this.state.scale;

        if (scale === "C") {
            weatherCards = this.state.weatherCards.map(a => ({
                ...a,
                minTemp: this.toFarenheit(a.minTemp),
                maxTemp: this.toFarenheit(a.maxTemp)
            })
            );
            scale = "F";
        } else {
            weatherCards = this.state.weatherCards.map(a => ({
                ...a,
                minTemp: this.toCelcius(a.minTemp),
                maxTemp: this.toCelcius(a.maxTemp)
            })
            );
            scale = "C";
        }

        this.setState({ scale: scale, weatherCards: weatherCards });
    }

    createWeatherCard() {
        return <WeatherCard day="OK" />
    }

    render() {

        const weatherCards = this.state.weatherCards.map((item, index) => {
            return <WeatherCard key={index}
                day={item.day}
                minTemp={item.minTemp}
                maxTemp={item.maxTemp}
                scale={this.state.scale}
                onClick={this.click.bind(this, index)}
            />
        })

        return (
            <div>
                <h1 className="title">ReactJS Weather</h1>
                <div className="card-list">
                    {weatherCards}
                </div>
            </div>
        );
    }
}

export default WeatherCardList;