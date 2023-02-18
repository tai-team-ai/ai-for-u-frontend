import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Auth from './auth/Auth';
import ProtectedRoute from './utils/ProtectedRoute';
import { routes } from './utils/constants';
import LandingPage from './pages/LandingPage';
import HeroPage from './pages/Hero/HeroPage';
import { NextUIProvider } from '@nextui-org/react';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<NextUIProvider>
			<BrowserRouter basename={'/'}>
				<Routes>
					{/* <Route path={routes.LOGIN} element={
						<Auth>
							<Login />
						</Auth>
					}>
					</Route> */}
					<Route path={routes.APP} element={<App />}>
						<Route path='' element={
							<ProtectedRoute>
								<LandingPage />
							</ProtectedRoute>
						} />
					</Route>
					<Route path={'/'} element={<HeroPage />}></Route>
					{/* Todo: this fallback route should be a 404, or redirect to the hero/landing */}
					<Route path="*" element={<Navigate to={routes.LOGIN} />} />
				</Routes>
			</BrowserRouter>
		</NextUIProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
