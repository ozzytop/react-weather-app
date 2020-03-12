import React from 'react';
import PropTypes from 'prop-types';
import WeatherExtraInfo from './WeatherExtraInfo';
import WeatherTemperature from './WeatherTemperature';
import {
    CLOUD,
    CLOUDY,
    SUN,
    RAIN,
    SNOW,
    WINDY
} from './../../../constans/weathers';
import './styles.css'


// If you have just one line, you use parenthesis, if not, you use brackets:
// First example as it was in just one line, second multiple lines
/*
const WeatherData = () => (
    <div className="weatherDataCont">
        <WeatherTemperature temperature={20} 
                            weatherState={SNOW} />
        <WeatherExtraInfo 
                            humidity={80} 
                            wind={"10 m/s"} />
    </div>
);
*/

// Like this method, you have to say explicitly that is going to return sth
const WeatherData = ({data}) => {
    //destructuring
    const { temperature, weatherState, humidity, wind} = data;
    return (<div className="weatherDataCont" >
        <WeatherTemperature temperature={temperature} 
                            weatherState={weatherState} />
        <WeatherExtraInfo 
                            humidity={humidity} 
                            wind={wind} />
    </div>);
};

// shape is a way to expect certain object type 
WeatherData.propTypes = {
    data: PropTypes.shape({
        temperature: PropTypes.number.isRequired,

        //temporary as commented
        //weatherState: PropTypes.string.isRequired,
        humidity: PropTypes.number.isRequired,
        wind: PropTypes.string.isRequired
    })
};

export default WeatherData;

