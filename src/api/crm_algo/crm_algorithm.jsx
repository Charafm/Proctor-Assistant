const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'moujahidc',
	password: 'YahyaMjhd2001',
	port: 5432,
});
app.get('/api/courses', (req, res) => {
	pool.query('SELECT * FROM course', (error, result) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		} else {
			res.json(result.rows);
		}
	});
});
app.get('/api/courses/:courseId/buildings', (req, res) => {
	const { courseId } = req.params;
	pool.query(
		'SELECT DISTINCT c.locationid, l.building FROM course c INNER JOIN location l ON c.locationid = l.locationid WHERE c.courseid = $1',
		[courseId],
		(error, result) => {
			if (error) {
				console.error(error);
				res.status(500).json({ error: 'Internal Server Error' });
			} else {
				res.json(result.rows);
			}
		}
	);
});
app.get('/api/buildings', (req, res) => {
	pool.query('SELECT * FROM location', (error, result) => {
		if (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		} else {
			res.json(result.rows);
		}
	});
});
app.get('/api/buildings/:buildingId/rooms', (req, res) => {
	const { buildingId } = req.params;
	pool.query(
		'SELECT * FROM location WHERE locationid = $1;',
		[buildingId],
		(error, result) => {
			if (error) {
				console.error(error);
				res.status(500).json({ error: 'Internal Server Error' });
			} else {
				res.json(result.rows);
			}
		}
	);
});
app.put('/api/courses/:courseId/location', (req, res) => {
	const { courseId } = req.params;
	const { currentBuildingId, currentRoomId, newBuildingId, newRoomId } =
		req.body;
	pool.query(
		'SELECT * FROM course WHERE courseid = $1',
		[courseId],
		(error, result) => {
			if (error) {
				console.error(error);
				res.status(500).json({ error: 'Internal Server Error' });
			} else {
				const course = result.rows[0];
				if (!course) {
					res.status(404).json({ error: 'Course not found' });
				} else {
					const scheduleQuery = ` 						SELECT l.classroom 						FROM location l 						JOIN course c ON l.locationid = c.locationid 						LEFT JOIN classschedule cs ON c.courseid = cs.courseid 						WHERE c.courseid = $1 							AND l.locationid = $2 							AND (cs.day IS NULL OR cs.time IS NULL); 					`;
					pool.query(
						scheduleQuery,
						[currentBuildingId, courseId],
						(scheduleError, scheduleResult) => {
							if (scheduleError) {
								console.error(scheduleError);
								res.status(500).json({ error: 'Internal Server Error' });
							} else {
								const schedule = scheduleResult.rows[0];
								if (!schedule) {
									pool.query(
										'UPDATE course SET locationid = $1 WHERE courseid = $2',
										[newBuildingId, courseId],
										(updateError) => {
											if (updateError) {
												console.error(updateError);
												res
													.status(500)
													.json({ error: 'Internal Server Error' });
											} else {
												res.json({ message: 'Location updated successfully' });
											}
										}
									);
								} else {
									res
										.status(400)
										.json({ error: 'Invalid location or schedule conflict' });
								}
							}
						}
					);
				}
			}
		}
	);
});
app.listen(3002, () => {
	console.log('Server is running on port 3002');
});
