import React, { useState } from "react";
// import { useEffect } from "react";
import Navbar from "./Navbar";
import '../styles/Home.css'
import Home1 from "../assets/Screenshot from 2024-11-11 13-58-05.png";
import Todo from "../assets/to-do-list.png";

function Home() {
    const [index, setIndex] = useState(0);
    var images = [Home1, Todo];

    const turn = () => {
        if (index < images.length - 1) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    }

    return (
        <div className="Home-container" style={{
            // display: 'flex',
            position: 'absolute',
            // left: '0',
            // backgroundImage: `url('../assets/Screenshot from 2024-11-11 13-58-05.png')`,
            // backgroundRepeat: 'no-repeat',
            // backgroundSize: 'cover'
        }}>
            <Navbar/>
            <div className="Hold-page">
                <p className="slogan">Be organised and planify correctly your day with To-do App</p>
                {/* <p>Show examples of calendar</p> */}
            </div>
        </div>
    )
}

export default Home;
