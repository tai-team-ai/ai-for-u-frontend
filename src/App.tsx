import LandingPage from './components/LandingPage';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import { useState } from 'react';

function App() {

	return (
		<Container fluid="sm">
			<Header />
			<LandingPage />
		</Container>
	);
}

export default App;
