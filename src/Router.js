import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NewOrderStep1 from "./components/orders/NewOrderStep1";
import Summary from './components/summary/Summary'
import Orders from "./components/orders/Orders";
import Login from "./components/login/Login";

const Router = () => {
    return (
        <div className='router'>
            <Switch>
                <Route path={`/`} exact component={NewOrderStep1} />
                <Route path={`/step2`} exact component={Orders} />
                <Route path={`/summary`} exact component={Summary} />
                <Route path={`/login`} exact component={Login} />
            </Switch>
            <p id='copyright'> &copy; Kuba Wasilewski, 2020 </p>
        </div>
    );
};

export default Router;