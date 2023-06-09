import Fem from './pages/fem/Fem';
import Home from './pages/home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/login/Login';
import Crm from './pages/crm/Crm';
import React from 'react';

import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			{' '}
			<Routes>
				{' '}
				<Route
					path="/"
					element={<Home />}
				/>{' '}
				<Route
					path="fem/*"
					element={<Fem />}
				/>{' '}
				<Route
					path="dashboard/*"
					element={<Dashboard />}
				/>{' '}
				<Route
					path="crm/*"
					element={<Crm />}
				/>{' '}
				<Route
					path="login/*"
					element={<Login />}
				/>{' '}
			</Routes>{' '}
		</BrowserRouter>
	);
}

export default App;
