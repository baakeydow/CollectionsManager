import React from 'react';
import { NavLink } from "react-router-dom";
import allegory from './images/allegory.png';

const Home = ({wording}) => {
    return (
    <div className="container Content">
            <div className="ContentCenter WelcomePage">
                <img className="picture" src={allegory} alt="allegory" />
            </div>
            <div className="ContentCenter">
                <NavLink to="home">
                    <button className="btn buttonWelcome">
                        {wording.cta}
                    </button>
                </NavLink>
            </div>
    </div>
    );
}

export default Home;
