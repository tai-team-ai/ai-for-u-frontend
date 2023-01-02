import LandingPage from './components/form';
import { Container } from 'react-bootstrap';
import Header from './components/header';

function App() {
	return (
		<Container fluid="sm">
			<Header />
			<LandingPage />
		</Container>
	);
}

export default App;
