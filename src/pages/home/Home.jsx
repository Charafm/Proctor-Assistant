import './home.scss';
import Login from '../../api/login/Login';
const Home = () => {
	return (
		<div className="home">
			{' '}
			<Login />{' '}
		</div>
	);
};
export default Home;
