import Featured from "../../components/featured/Featured";
import React from "react";
import "./home.css"
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

const Home = () => { 
    return (
        <div>
            <Navbar />
            <Header />
            <div className="homeContainer">
            <Featured/>
            <h1 className="homeTitle">Browse by property type</h1>
            </div>
        </div>

    )
}

export default Home