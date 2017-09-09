import React, {Component} from 'react';

const Header = () => {
    return (<header className="Header">
        <div className="Header_brand" >
            <a href="/" title="Ikos" ><img src="data:image/png;base64,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" alt="Ikos" /></a>
        </div>
        <div className="Header_info">
            <div className="Header_left">
                <h1>IT-WATT - Docházkový terminál</h1>
                <p>10.0.0.114</p>
            </div>
            <div className="Header_right">
                <p>
                    <a href="/servis" className="active" >servis</a>
                    <a href="/napoveda" >Nápověda</a>
                    <a href="/odhlasit" >Odhlásit</a><br />
                </p>
                <p>Firmware: #############</p>
            </div>
        </div>
    </header>);
};

export default Header;