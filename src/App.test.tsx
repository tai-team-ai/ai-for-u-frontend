import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

test('renders learn react link', () => {
	render(
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />}>
				</Route>
			</Routes>
		</BrowserRouter>
	);
	// const linkElement = screen.getByText(/learn react/i);
	// expect(linkElement).toBeInTheDocument();
});