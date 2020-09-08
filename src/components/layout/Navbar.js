import React from 'react'
import {Link} from 'react-router-dom'

import './css/Navbar.css'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="container">
                <Link to={process.env.PUBLIC_URL}>SpotifyDataVis</Link>
                <ul>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;