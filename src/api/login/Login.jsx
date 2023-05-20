import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import bcrypt from 'bcrypt';
const app = express();
app.use(bodyParser.json());
const pool = new pg.Pool({
	user: 'moujahidc',
	host: 'localhost',
	database: 'moujahidc',
	password: 'YahyaMjhd2001',
	port: 5432,
});
app.post('/login', async (req, res) => {
	const { loginname, password } = req.body;
	try {
		const client = await pool.connect();
		const result = await client.query(
			'SELECT * FROM userlogin WHERE loginname = $1',
			[loginname]
		);
		if (result.rows.length === 0) {
			res.status(401).json({ message: 'Invalid loginname or password' });
		} else {
			const hashedPassword = result.rows[0].password;
			const isValid = bcrypt.compareSync(password, hashedPassword);
			if (isValid && result.rows[0].loginname === loginname) {
				res.json({ message: 'Login successful!' });
			} else {
				res.status(401).json({ message: 'Invalid loginname or password' });
			}
		}
		client.release();
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	}
});
app.listen(3000, () => console.log('Server running on port 3000'));
