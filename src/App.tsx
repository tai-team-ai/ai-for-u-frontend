import RequestForm from './components/RequestForm';
import { Container } from 'react-bootstrap';
import Header from './components/Header';

function App() {

	return (
		<Container fluid="sm">
			<Header />
			<RequestForm />
		</Container>
	);
}

export default App;
