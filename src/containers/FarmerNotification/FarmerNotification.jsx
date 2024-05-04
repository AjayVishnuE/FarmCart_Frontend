import React , { useState } from 'react';
import './FarmerNotification.css';
import { FarmerHeader, FarmerNavbar} from '../../components';
import { Link } from 'react-router-dom';
import cart from '../../Images/shopping-cart.svg';
import bar from '../../Images/Bar.png';

function FarmerNotification(props) {
    const [isHidden, setIsHidden] = useState(false);

    const handleClearClick = () => {
        setIsHidden(true);
    };
    return (
        <div className='notification-overall-container'>
            <FarmerHeader/>
            <div className="overallframe">
                
                <div className='notihead'>
                    <div className='notitext'>Notifications</div>
                    <div className='clear' onClick={handleClearClick}>Clear all</div>
            </div>
            {!isHidden && (
                <div className='notification-overall'>
                    <div className="Notificationcell">
                        <div className="Avatarandsubjectcontainer">
                            <div className="Subjectlinecontainer">
                                Account Sign-in Detected
                            </div>
                            <div className="Timestampcontainer">
                                Today at 9:42 AM
                            </div>
                        </div>
                    </div>
                    <div className="Notificationcell">
                        <div className="Avatarandsubjectcontainer">
                            <div className="Subjectlinecontainer">
                                Account Sign-in Detected
                            </div>
                            <div className="Timestampcontainer">
                                Today at 9:42 AM
                            </div>
                        </div>
                    </div>
                </div>
            )}
     
     </div>
    <FarmerNavbar/>
      
    </div>
    );
}

export default FarmerNotification;