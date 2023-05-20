import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Fem from '../../pages/fem';
import Crm from '../../pages/crm';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
function Routes() {
	return (
		<BrowserRouter>
			{' '}
			<Switch>
				{' '}
				<Route
					path="/"
					exact
					component={Dashboard}
				/>{' '}
				<Route
					path="/crm"
					component={Fem}
				/>{' '}
				<Route
					path="/crm"
					component={Crm}
				/>{' '}
				<Route component={NotFound} />{' '}
			</Switch>{' '}
		</BrowserRouter>
	);
}
export default Routes;
