import React from 'react';
import PropTypes from 'prop-types';

// si el arrow function is more thatn one line, with brackets
const Location = ({ city }) => {

        // 1) way to do it
        // const city = props.city;

        // 2) way to do it. Way of above code destructing 
        //const { city } = props;

        // 3) way is directly in the parameter
        
        return (
            <div className="location"> 
                <h1>
                    {city}
                </h1> 
            </div>  
        );
    }

Location.propTypes = {
    city: PropTypes.string.isRequired,
}
export default Location;