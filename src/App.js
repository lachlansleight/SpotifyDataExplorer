import React from 'react';
import {Route, Switch} from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Home from './components/layout/Home'
import LachlanHistory from './components/pages/LachlanHistory'
import AubreyHistory from './components/pages/AubreyHistory'

function App() {
    return (
        <div className="App">
            <Navbar />

            <Switch>
                <Route exact path="/"><Home /></Route>
                <Route path="/lachlan"><LachlanHistory /></Route>
                <Route path="/aubrey"><AubreyHistory /></Route>
            </Switch>
        </div>
    );
}

export default App;
