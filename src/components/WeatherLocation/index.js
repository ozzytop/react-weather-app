import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'
import { PropTypes } from 'prop-types'
import getUrlWeatherByCity from './../../services/getUrlWeatherByCity'
import tranformWeather from './../../services/transformWeather'
import Location from './Location'
import WeatherData from './WeatherData'

// IMPORTANT
// When you don't use export DEFAULT, you have to put the brackets
import { api_weather } from './../../constans/api_url'
import {
    SUN
} from './../../constans/weathers';
import './styles.css'


/*
const data = {
    temperature: 10,
    weatherState: SUN,
    humidity: 50,
    wind: '10 m/s'
}
*/

class WeatherLocation extends Component {


    // this is the contructor class, when the class it's intanciated it execute it. 
    // Always call the super(), constructor of parent
    constructor(props){
        super(props);
        const { city } = props;
        // this.state, es el estado local del colmponente, ayuda a q el componente se renderice
        this.state = {
            city,
            data: null
        }
        console.log('constructor');
    };

    componentDidMount() {
        console.log('did mount');
        this.handleUpdateClick();
    }
    
    componentDidUpdate(prevProps, prevState) {
        console.log('did update');
    }

    /* NOT SAFE
    componentWillMount() {
        console.log('will mount');
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('will update');
    }
    */
    
    
    

    handleUpdateClick = () => {

        // Here we are using fetch, but we should use Axios. Check that we have to 2 two calls
        // to get the data
        const api_weather = getUrlWeatherByCity(this.state.city);

        fetch(api_weather).then( resolver => {

            return resolver.json();
        }).then(data => {

            const newWeather = tranformWeather(data);
            console.log("Result Handle Update click");
            console.log(newWeather);
            //IMportante, para actualizar el state se usa setState:
            //passar solo los datos q se estan modificando
            this.setState({
                city: this.state.city,
                data: newWeather
            })
        });

    }

    render() {
        const { onWeatherLocationClick } = this.props;
        const {city, data} = this.state;
        return (
            <div className="weatherLocationCOnt" onClick={ onWeatherLocationClick }>
                <Location city={this.state.city}></Location>
                { data ? 
                    <WeatherData data={this.state.data}></WeatherData> :
                    <CircularProgress size={50} />
                }
            </div>
        );
    }
}
WeatherLocation.propTypes = {
    city: PropTypes.string.isRequired,
    onWeatherLocationClick: PropTypes.func,
}
export default WeatherLocation;