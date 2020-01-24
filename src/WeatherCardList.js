import React, {Component} from 'react';
import WeatherCard from './WeatherCard';
import './WeatherCardList.css'

class WeatherCardList extends Component {
    render() {
        return (
            <div>
                <h1 className="title">ReactJS Weather</h1>
                <div className="card-list">
                    <WeatherCard
                        day="Mon"
                    />
                    <WeatherCard
                        day="Tue"
                    />
                    <WeatherCard
                        day="Wed"
                    />
                    <WeatherCard
                        day="Thu"
                    />
                    <WeatherCard
                        day="Fri"
                    />
                </div>
            </div>
        );
    }
}

export default WeatherCardList;