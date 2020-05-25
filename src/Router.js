import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Orders from './components/orders/Orders'
import Summary from './components/Summary'

const Router = () => {
    return (
        <div className='router'>
            <Switch>
                <Route path={`/`} exact component={Orders} />
                <Route path={`/summary`} exact component={Summary} />
            </Switch>
        </div>
    );
}

export default Router;