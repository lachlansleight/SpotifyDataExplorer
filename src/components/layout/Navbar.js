import React from 'react'
import {Link} from 'react-router-dom'

import './css/Navbar.css'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="container">
                <Link to={process.env.PUBLIC_URL}>SpotifyDataVis</Link>
                <ul>
                    <li><Link to={`${process.env.PUBLIC_URL}/lachlan`}>Lachlan's Data</Link></li>
                    <li><Link to={`${process.env.PUBLIC_URL}/aubrey`}>Aubrey's Data</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;