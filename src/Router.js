import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NewOrder from './components/NewOrder'
import Summary from './components/Summary'

const Router = () => {
    return (
        <div className='router'>
            <Switch>
                <Route path={`/`} exact component={NewOrder} />
                <Route path={`/summary`} exact component={Summary} />
            </Switch>
        </div>
    );
}

export default Router;