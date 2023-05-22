const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'moujahidc',
	password: '****',
	port: 5432,
});
pool.connect((err, client, release) => {
	if (err) {
		console.error('Error acquiring client', err.stack);
		return;
	}
	console.log('Connected to database');

	release();
	app.post('/api/login', async (req, res) => {
		try {
			const { username, password } = req.body;
			const query =
				'SELECT * FROM userlogin WHERE loginname = $1 AND password = $2';
			const values = [username, password];
			const result = await pool.query(query, values);
			if (result.rows.length === 1) {
				res
					.status(200)
					.json({ success: true, message: 'User is successfully logged in' });
			} else {
				res
					.status(401)
					.json({ success: false, message: 'Invalid credentials' });
			}
		} catch (error) {
			console.error('Error during login:', error);
			res.sendStatus(500);
		}
	});
	app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});
});
