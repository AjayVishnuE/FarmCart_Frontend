import React from 'react';
import './LocationPage.css';
function LocationPage() {
    return (
        <div className='LocationPage'>
            
            <div className="locationbox">
                <div className='Sharelocation'>
                    Share your location
                </div>
                <div className='Locationdesc'>
                If we have your location, we can <br>
                </br>provide the nearest farms and delivery points so as to ease your distance.
                </div>
                <div className='continuebutton'>
                    Continue
                </div>
                <div className='Nomessage'>
                     No, Choose location manually
                </div>
            </div>

        </div>
    );
}

export default LocationPage;