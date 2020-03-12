import React from 'react';
import PropTypes from 'prop-types'
import WeatherLocation from './WeatherLocation'
//stateless component or functional component

// una unica linea parentesis, mas de una linea llaves
const LocationList = ({ cities, onSelectedLocation }) => {

    const handleWeatherLocationCLick = city => {
        console.log('handle weather location click');
        onSelectedLocation(city);
    }

    const strToComponents = ( cities ) => (
        cities.map( city =>
            (
                <WeatherLocation 
                    key={city} 
                    city={city} 
                    onWeatherLocationClick={ () => handleWeatherLocationCLick(city) } /> ))
    );

    return(
        <div className="locationList">
            { strToComponents(cities) }
        </div>
    );
};

LocationList.protoTypes = {
    cities: PropTypes.array.isRequired,
    onSelectedLocation: PropTypes.func,
}

export default LocationList;