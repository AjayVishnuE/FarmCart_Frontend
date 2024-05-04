import React from 'react';
import logo from '../../Images/logo.png';
import stars from '../../Images/bi_stars.svg';
import "./Emptychat.css";
function Emptychat(props) {
    return (
        <div>
            <div className="Frame48096279">
                <img src={logo} alt="logo"></img>
                <div className="chattitle">
                    <div className="ChatWithFarmcartAi">
                        <span style={{color: '#222222', fontSize: 17.50, fontFamily: 'SF Pro Rounded', fontWeight: '400', wordWrap: 'break-word'}}>Chat with </span>
                        <span style={{color: '#7519EB', fontSize: 17.50, fontFamily: 'SF Pro Rounded', fontWeight: '600', wordWrap: 'break-word'}}>Farm</span>
                        <span style={{color: '#0BCE83', fontSize: 17.50, fontFamily: 'SF Pro Rounded', fontWeight: '600', wordWrap: 'break-word'}}>Cart</span>
                       
                    </div>
                    <img  className="stars" src={stars} alt="stars"></img>
                </div>
                <p style={{textAlign:"center", fontSize:"small"}}>FarmCart  helps you in all your <br/> farming and healthy food habit needs.</p>
            </div>
        </div>
    );
}

export default Emptychat;

