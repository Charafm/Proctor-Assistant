const xlsx = require('xlsx');
const { Pool } = require('pg');
// Function to import the Excel file to the tables
async function importExcelFileToTables(filePath) {
	try {
		// Read the Excel file
		const workbook = xlsx.readFile(filePath);
		const worksheet = workbook.Sheets[workbook.SheetNames[0]];
		const excelData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
		// Create a connection pool to the PostgreSQL database
		const pool = new Pool({
			user: 'your_username',
			host: 'your_host',
			database: 'your_database',
			password: 'your_password',
			port: 5432, // Change the port if necessary
		});
		// Truncate the existing tables
		await pool.query('BEGIN');
		await pool.query('TRUNCATE TABLE course');
		await pool.query('TRUNCATE TABLE classroom');
		await pool.query('TRUNCATE TABLE instructor');
		// Iterate over the Excel data to populate the tables
		const queries = [];
		for (let i = 1; i < excelData.length; i++) {
			const row = excelData[i];
			const course_id = row[0];
			const course_code = row[1];
			const title = row[2];
			const begin_time = row[3];
			const end_time = row[4];
			const duration = row[5];
			const classroom_id = row[6];
			const building_code = row[7];
			const room_code = row[8];
			const instructor_id = row[9];
			const name = row[10];
			// Insert data into the tables using parameterized queries
			const courseQuery = {
				text: `           INSERT INTO course (course_id, course_code, title, begin_time, end_time, duration)           VALUES ($1, $2, $3, $4, $5, $6)         `,
				values: [course_id, course_code, title, begin_time, end_time, duration],
			};
			queries.push(pool.query(courseQuery));
			const classroomQuery = {
				text: `           INSERT INTO classroom (classroom_id, building_code, room_code)           VALUES ($1, $2, $3)         `,
				values: [classroom_id, building_code, room_code],
			};
			queries.push(pool.query(classroomQuery));
			const instructorQuery = {
				text: `           INSERT INTO instructor (instructor_id, name)           VALUES ($1, $2)         `,
				values: [instructor_id, name],
			};
			queries.push(pool.query(instructorQuery));
		}
		// Execute all the queries in parallel
		await Promise.all(queries);
		// Commit the transaction
		await pool.query('COMMIT');
		// Release the connection pool
		await pool.end();
		console.log('Excel file imported successfully.');
		// Generate some data using the inserted data
		await generate();
	} catch (error) {
		console.error('Error occurred while importing the Excel file:', error);
	}
} // Function to generate some data using the inserted data
async function generate() {
	try {
		// Create a connection pool to the PostgreSQL database
		const pool = new Pool({
			user: 'your_username',
			host: 'your_host',
			database: 'your_database',
			password: 'your_password',
			port: 5432, // Change the port if necessary
		}); // Select some data from the tables using parameterized queries
		const courseQuery = {
			text: `         SELECT *         FROM course         LIMIT 10       `,
		};
		const courseResult = await pool.query(courseQuery);
		console.log('Courses:', courseResult.rows);
		const classroomQuery = {
			text: `         SELECT *         FROM classroom         LIMIT 10       `,
		};
		const classroomResult = await pool.query(classroomQuery);
		console.log('Classrooms:', classroomResult.rows);
		const instructorQuery = {
			text: `         SELECT *         FROM instructor         LIMIT 10       `,
		};
		const instructorResult = await pool.query(instructorQuery);
		console.log('Instructors:', instructorResult.rows);
		// Release the connection pool
		await pool.end();
	} catch (error) {
		console.error('Error occurred while generating data:', error);
	}
}
// Usage
const excelFilePath = 'path/to/excel/file.xlsx';
// Call the function
importExcelFileToTables(excelFilePath);
