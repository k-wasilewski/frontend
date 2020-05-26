import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NewOrderStep1 from "./components/orders/NewOrderStep1";
import Summary from './components/Summary'
import Orders from "./components/orders/Orders";

const Router = () => {
    return (
        <div className='router'>
            <Switch>
                <Route path={`/`} exact component={NewOrderStep1} />
                <Route path={`/step2`} exact component={Orders} />
                <Route path={`/summary`} exact component={Summary} />
            </Switch>
        </div>
    );
}

export default Router;