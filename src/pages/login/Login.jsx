import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';
const Login = () => {
	const navigate = useNavigate();
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch('http://localhost:5000/api/login', {
				method: 'POST',
				body: JSON.stringify({ username, password }),
				headers: { 'Content-Type': 'application/json' },
			});
			if (response.ok) {
				setIsSubmitted(true);
				console.log('User is successfully logged in');
				navigate('/dashboard');
			} else {
				setError('Invalid credentials');
			}
		} catch (error) {
			console.error('Error during login:', error);
		}
	};
	return (
		<div className="login-container">
			{' '}
			<div className="login-card">
				{' '}
				<h1 className="login-title">Log In</h1>{' '}
				{isSubmitted ? (
					<p className="login-message">User is successfully logged in</p>
				) : (
					<form onSubmit={handleSubmit}>
						{' '}
						<input
							type="text"
							placeholder="Username"
							value={username}
							onChange={handleUsernameChange}
							className="login-input"
							required
						/>{' '}
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={handlePasswordChange}
							className="login-input"
							required
						/>{' '}
						<button
							type="submit"
							className="login-button">
							{' '}
							Submit{' '}
						</button>{' '}
						{error && <p className="login-error">{error}</p>}{' '}
					</form>
				)}{' '}
			</div>{' '}
		</div>
	);
};
export default Login;
