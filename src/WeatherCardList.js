import React, { Component } from 'react';
import WeatherCard from './WeatherCard';
import Axios from 'axios';
import './WeatherCardList.css'

class WeatherCardList extends Component {

    weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    constructor() {
        super()
        this.state = {
            scale: "C",
            weatherCards: [],
            active: 0
        }
    }

    componentDidMount() {
        Axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=-34.603722&lon=-58.381592&appid=' + process.env.REACT_APP_API_KEY)
            .then(res => {
                let cards = [];
                let last_weekday = '';
                let day_min_temp = [];
                let day_max_temp = [];
                let last_item;
                res.data.list.forEach((item,i) => {
                    let datetime = new Date(item.dt*1000);
                    let weekday = datetime.getDay();

                    if (last_weekday === '') {
                        last_weekday = weekday;
                        last_item = item;
                    }
                    
                    if (weekday !== last_weekday || (res.data.list.length - 1) === i) {

                        if ((res.data.list.length - 1) === i) {
                            day_min_temp.push(item.main.temp_min);
                            day_max_temp.push(item.main.temp_max);
                        }
                        
                        last_item['temp_min'] = Math.round(Math.min(...day_min_temp) - 273.15);
                        last_item['temp_max'] = Math.round(Math.max(...day_max_temp) - 273.15);

                        cards.push(last_item);
                        day_min_temp = [];
                        day_max_temp = [];
                    }                   

                    day_min_temp.push(item.main.temp_min);
                    day_max_temp.push(item.main.temp_max);

                    last_weekday = weekday;
                    last_item = item;
                });

                cards = cards.slice(1, 6);

                cards.forEach(card => {
                    let date = new Date(card.dt * 1000);
                    card['day'] = this.weekdays[date.getDay()];
                    card['minTemp'] = card.temp_min;
                    card['maxTemp'] = card.temp_max;
                })

                this.setState({
                    weatherCards: cards
                })
            })
            .catch(function (e) {
                console.log("Error ", e);
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

    render() {
        let weatherCards = this.state.weatherCards.map((item, index) => {
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