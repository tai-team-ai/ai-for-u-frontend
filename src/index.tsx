import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Auth from './auth/Auth';
import ProtectedRoute from './util/ProtectedRoute';
import { constants } from './util/constants';
import LandingPage from './pages/LandingPage';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<BrowserRouter basename={'/'}>
			<Routes>
				<Route path={constants.LOGIN_ROUTE} element={<Auth />}>
					<Route path='login' element={<Login />} />
				</Route>
				<Route path="/" element={<App />}>
					<Route path='' element={
						<ProtectedRoute>
							<LandingPage />
						</ProtectedRoute>
					} />
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
