import React from 'react';
import { Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp'
import Route from './Route'

// OBS: O + no final do parametro :repository -> significa que tudo que vier depois do /repositories vai ser passado como parametro.
const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path='/' exact component={Login}/>
            <Route path='/cadastro' component={SignUp}/>
            <Route path='/dashboard' component={Dashboard} isPrivate/>
        </Switch>
    )
}

export default Routes;