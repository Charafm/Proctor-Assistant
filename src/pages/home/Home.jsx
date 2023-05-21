import React from 'react';
import './home.scss';
import { useNavigate } from 'react-router-dom';
const Home = () => {
	const navigate = useNavigate();
	const onButtonClick = () => {
		navigate('/login');
	};
	return (
		<div className="mainContainer">
			{' '}
			<div className="titleContainer">
				{' '}
				<div>Welcome To Proctor Assistant!</div>{' '}
			</div>{' '}
			<div className="contentContainer">
				{' '}
				<div>This is the home page.</div>{' '}
				<div className="buttonContainer">
					{' '}
					<input
						className="inputButton"
						type="button"
						value="Go to Login"
						onClick={onButtonClick}
					/>{' '}
				</div>{' '}
			</div>{' '}
		</div>
	);
};
export default Home;
