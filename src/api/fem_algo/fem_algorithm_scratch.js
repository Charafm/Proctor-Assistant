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
			password: '*****',
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
async function generateFinalExamSchedule() {
	const pool = new Pool({
		user: 'moujahidc',
		host: 'localhost',
		database: 'moujahidc',
		password: 'YahyaMjhd2001',
		port: 5432,
	});
	const examSlots = [
		{ day: 'Monday', time: '9:00 AM' },
		{ day: 'Monday', time: '1:00 PM' },
		{ day: 'Tuesday', time: '9:00 AM' },
		{ day: 'Tuesday', time: '1:00 PM' },
		{ day: 'Wednesday', time: '9:00 AM' },
		{ day: 'Wednesday', time: '1:00 PM' },
		{ day: 'Thursday', time: '9:00 AM' },
		{ day: 'Thursday', time: '1:00 PM' },
		{ day: 'Friday', time: '9:00 AM' },
		{ day: 'Friday', time: '1:00 PM' },
	];
	const courses = await pool.query('SELECT * FROM course');
	const instructors = await pool.query('SELECT * FROM instructor');
	const classrooms = await pool.query('SELECT * FROM classroom');
	const schedule = {};
	for (const course of courses) {
		const department = course.department;
		const courseId = course.course_id;
		const instructorId = course.instructor_id;
		const classroomId = course.classroom_id;
		// Sort courses by enrollment size in descending order
		courses.sort((a, b) => b.enrollment - a.enrollment);
		// Assign exam slots to courses
		for (const course of courses) {
			let assigned = false;
			for (const slot of examSlots) {
				if (!schedule[slot.day] || !schedule[slot.day][slot.time]) {
					schedule[slot.day] = schedule[slot.day] || {};
					schedule[slot.day][slot.time] = course;
					assigned = true;
					break;
				}
			}
			if (!assigned) {
				throw new Error(
					`Cannot assign exam slot to ${course.department} ${course.number}`
				);
			}
		}
	}
	// Save schedule as JSON file
	const scheduleData = JSON.stringify(schedule);
	fs.writeFile('final-exam-schedule.json', scheduleData, (err) => {
		if (err) throw err;
		console.log('Final exam schedule saved to final-exam-schedule.json');
	});
	// Insert the final exam schedule into the finalExam table
	for (const day in schedule) {
		for (const time in schedule[day]) {
			const course = schedule[day][time];
			await pool.query(
				`         INSERT INTO finalExam (course_id, classroom_id, instructor_id, day, time)         VALUES ($1, $2, $3, $4, $5)       `,
				[course.course_id, course.classroom_id, course.instructor_id, day, time]
			);
		}
	}
	await pool.end();
}
const excelFilePath = './uploads/data.xlsx';
importExcelFileToTables(excelFilePath);
generateFinalExamSchedule();
