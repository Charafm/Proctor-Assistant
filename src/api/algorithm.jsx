const fs = require('fs');
const xlsx = require('xlsx');
const { Pool } = require('pg');

async function importExcelFileToTables(filePath) {
	try {
		const workbook = xlsx.readFile(filePath);
		const worksheet = workbook.Sheets[workbook.SheetNames[0]];
		const excelData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
		const pool = new Pool({
			user: 'moujahidc',
			host: 'localhost',
			database: 'moujahidc',
			password: 'YahyaMjhd2001',
			port: 5432,
		});
		await pool.query('BEGIN');
		// Create the finalExam table.
		await pool.query(
			`       CREATE TABLE finalExam (         id serial PRIMARY KEY,         course_id integer NOT NULL,         classroom_id integer NOT NULL,         instructor_id integer NOT NULL,         day text NOT NULL,         time text NOT NULL       )     `
		);
		// Insert the data from the Excel file into the finalExam table.
		for (const row of excelData) {
			const courseId = row[0];
			const classroomId = row[6];
			const instructorId = row[9];
			const day = row[3];
			const time = row[4];
			// Insert the final exam data into the database.
			await pool.query(
				`         INSERT INTO finalExam (course_id, classroom_id, instructor_id, day, time)         VALUES ($1, $2, $3, $4, $5)       `,
				[courseId, classroomId, instructorId, day, time]
			);
		}
		// Insert the data from the Excel file into the course table.
		for (const row of excelData) {
			const courseId = row[0];
			const courseCode = row[1];
			const title = row[2];
			const beginTime = row[3];
			const endTime = row[4];
			const duration = row[5];
			// Insert the course data into the database.
			await pool.query(
				`         INSERT INTO course (course_id, course_code, title, begin_time, end_time, duration)         VALUES ($1, $2, $3, $4, $5, $6)       `,
				[courseId, courseCode, title, beginTime, endTime, duration]
			);
		}
		// Insert the data from the Excel file into the instructor table.
		for (const row of excelData) {
			const instructorId = row[9];
			const name = row[10];
			// Insert the instructor data into the database.
			await pool.query(
				`         INSERT INTO instructor (instructor_id, name)         VALUES ($1, <span class="math-inline">2 )  `,
				[instructorId, name]
			);
		}
		// Insert the data from the Excel file into the classroom table
		for (const row of excelData) {
			const classroomId = row[6];
			const buildingCode = row[7];
			const roomCode = row[8];
			// Insert the classroom data into the database .
			await pool.query(
				` INSERT INTO classroom  (classroom _id, building _code, room _code ) VALUES  (</span>   `,
				[classroomId, buildingCode, roomCode]
			);
		}
		await pool.query('COMMIT');
		await pool.end();
		console.log('Excel file imported successfully.');
	} catch (error) {
		console.error('Error occurred while importing the Excel file:', error);
	}
}
const excelFilePath = './uploads/data.xlsx';
importExcelFileToTables(excelFilePath);
