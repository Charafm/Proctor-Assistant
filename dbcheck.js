const pg = require('pg');
const pool = new pg.Pool({
	user: 'moujahidc',
	host: 'localhost',
	database: 'moujahidc',
	password: 'YahyaMjhd2001',
	port: 5432,
});
pool.connect((err, client, release) => {
	if (err) {
		return console.error('Error acquiring client', err.stack);
	}
	console.log('Connected to database');
	client.query('SELECT NOW()', (err, result) => {
		release();
		if (err) {
			return console.error('Error executing query', err.stack);
		}
		console.log('Query result:', result.rows[0]);
	});
});
