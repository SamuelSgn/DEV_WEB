import React from "react";
import {Link} from "react-router-dom";
import Logo from '../assets/to-do-list.png';
import '../styles/Navbar.css';

function Navbar () {
    return (
        <div className="Navbar">
            <div className="leftSide">
                <img src={Logo} alt="Logo"/>
                <p>TO DO LIST APP</p>
            </div>
            <div className="rightSide">
                <Link to="/Register">Register</Link>
                <Link to="/Login">Login</Link>
                <Link to="/Avis">Vos avis</Link>
                <Link to="/Apropos">A PROPOS</Link>
            </div>
        </div>
    )
}

export default Navbar;
