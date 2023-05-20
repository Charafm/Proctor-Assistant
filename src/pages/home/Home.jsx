import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Home() {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:3000/login', {
				username,
				password,
			});
			if (response.data.message === 'Login successful!') {
				localStorage.setItem('token', response.data.token);
				navigate('/dashboard');
			}
		} catch (err) {
			setError(err.response.data.message);
		} finally {
			setUsername('');
			setPassword('');
		}
	};
	return (
		<div className="container">
			{' '}
			<h1>Login</h1>{' '}
			<form onSubmit={handleSubmit}>
				{' '}
				<div className="form-group">
					{' '}
					<label htmlFor="username">Username</label>{' '}
					<input
						type="text"
						id="username"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>{' '}
				</div>{' '}
				<div className="form-group">
					{' '}
					<label htmlFor="password">Password</label>{' '}
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>{' '}
				</div>{' '}
				{error && <div className="error">{error}</div>}{' '}
				<button type="submit">Login</button>{' '}
			</form>{' '}
		</div>
	);
}
export default Home;
