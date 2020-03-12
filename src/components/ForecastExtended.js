import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import ForecastItem from './ForecastItem'
import transformForecast from './../services/transformForecast';
import './styles.css';

/*
const days = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes'
];

const data = {
    temperature: 10,
    humidity: 10,
    weatherState: 'normal',
    wind:'normal'
}
*/

export const api_key = "16283c2e92b725fb6c4995f4cce9f84d";
export const url_base_weather = "https://api.openweathermap.org/data/2.5/forecast";

export class ForecastExtended extends Component {
    
    constructor(){
        super();
        this.state = { forecastData: null}
    }

    componentDidMount() {
        this.updateCity(this.props.city);
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.city !== this.props.city){
            this.setState( { forecastData: null})
            this.updateCity(nextProps.city);    
        }
    }

    updateCity = city => {
        //fetch or axios
        const url_forecast = `${url_base_weather}?q=${city}&appid=${api_key}`;
        fetch(url_forecast).then(
            data => (data.json())
        ).then(
            weather_data => {
                console.log(weather_data);
                const forecastData = transformForecast(weather_data);
                console.log(forecastData);
                this.setState({ forecastData }); 
            }
        );
    }

    // array with every dahy
    renderForecastItemDays(forecastData) {
        //return "items";
        return forecastData.map( forecast => (
            <ForecastItem 
                key={`${forecast.weekDay}${forecast.hour}`}
                weekDay={forecast.weekDay} 
                hour={forecast.hour} 
                data={forecast.data}>
            </ForecastItem> 
        ));
    }

    renderProgress = () => {
        return "Cargando Pronostico Extendido";
    }

    render() {
        //like this:
        // /const city = this.props.city;
        // or with destructuring:
        const {city} = this.props;
        // like state, because is from the component, not from the parent
        const { forecastData } = this.state;

        return (
            <div>
                <h2 className="forecast-title">Pronóstico extendido Para </h2>{city}
                { forecastData ?
                    this.renderForecastItemDays(forecastData) :
                    this.renderProgress()
                }
            </div>
        )
    }
}

ForecastExtended.propTypes = {
    city: PropTypes.string.isRequired,
}


export default ForecastExtended
