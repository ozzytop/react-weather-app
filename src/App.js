import React, {Component} from 'react';
import { connect } from 'react-redux';
//import WeatherLocation from './components/WeatherLocation';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import {PropTypes} from 'prop-types';

import './App.css';
import LocationList from './components/LocationList';
import ForecastExtended from './components/ForecastExtended';
import { setCity } from './actions'


const cities = [
    'Buenos Aires,ar',
    'Washington,us',
    'Bogota,col',
    //'Ciudad de Mexico,mx',
    'Madrid,es',
    'Lima,pe',
]


class App extends Component {


    constructor(props){
        super();
        //this.state = . This state igual, solo en el constructor. En el resto set.state
        this.state = {city: null};
    }

    handleSelectedLocation  = city => {
        //this.state({ city:city });
        //or:
        this.setState({ city });
        console.log(`handle selected location ${city}`);

        /*
            Action is an object idetified by a type and value. 
            The type: setCity, value: city 
            it's not recommended to set the action here:
         */
        //const action =  {type: 'setCity', value: city};
        // We set a dispatch of the store

        this.props.setCity(city);
    }

    render(){
        return (
            <div className="App">
                <Grid fluid >
                    <Row>
                        <AppBar position="sticky">
                            <Toolbar>
                                <Typography variant="title" color="inherit">
                                    Weather App
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </Row>
                    <Row>
                        <Col xs={12} md={4}>
                            <LocationList 
                                cities={ cities }
                                onSelectedLocation={this.handleSelectedLocation}>
                            </LocationList>
                        </Col>
                        <Col xs={12} md={4}>
                            <Paper>
                                <div className="details">
                                    {
                                        (this.state.city === null) ? 
                                            <h1>No se selecciono ciudad</h1> :
                                            <ForecastExtended
                                                //we do it like this, or we set in the first line the state with destruturing
                                                city={this.state.city}
                                            ></ForecastExtended>
                                    }
                                </div>
                            </Paper>
                        </Col>
                    </Row>
                </Grid>
              
            </div>
        )
    }
    
}
// Una vez q implemente connect, quedo esto:
//export default App;

App.propTypes = {
    setCity: PropTypes.func.isRequired
}

/* 
    Connect espera como parametro, dos funciones,
    Ña segunda funcion retorna otra funcion, y esta otra funcion espera q le pasamos algo como parametro (nuestro componente)
    Aca inyectamos las propiedades al componente
*/
const mapDispatchToProps = dispatch => (
    {    
        // function as value
        // Inyectamos el dispatch a la propiedad
        setCity: value => dispatch(setCity(value))
    }
);

export default connect(null, mapDispatchToProps)(App);