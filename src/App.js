import React from 'react';
import {Route, Switch} from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Home from './components/layout/Home'

function App() {
    return (
        <div className="App">
            <Navbar />

            <Switch>
                <Route exact path="/"><Home /></Route>
            </Switch>
        </div>
    );
}

export default App;
