import React from 'react';
import { Link } from 'react-router';

const Home = () => {

  return (
    <div className="home">
        <div className="mdl-grid ">
            <div className="mdl-cell mdl-cell--12-col mdl-typography--text-center hero">
                <span className="herotext">FIND THE PERFECT SWIM WORKOUT </span>
            </div>
            <div className="mdl-cell mdl-cell--12-col mdl-typography--text-center">
                <span className="herotext-supporting">Curated workouts from leading swim coaches</span>
            </div>
            <div className="mdl-cell mdl-cell--12-col mdl-typography--text-center">
                <Link className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" to="workouts">
                    SEE WORKOUTS
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Home;
