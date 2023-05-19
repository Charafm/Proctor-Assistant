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
		await pool.query('TRUNCATE TABLE course');
		await pool.query('TRUNCATE TABLE classroom');
		await pool.query('TRUNCATE TABLE instructor');
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
		await Promise.all(queries);
		await pool.query('COMMIT');
		await pool.end();
		console.log('Excel file imported successfully.');
		await generate();
	} catch (error) {
		console.error('Error occurred while importing the Excel file:', error);
	}
}
function generateFinalExamSchedule(courses) {
	// Create a list of exam slots for each day
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
	// Create a map of courses by department
	const coursesByDepartment = new Map();
	for (const course of courses) {
		if (!coursesByDepartment.has(course.department)) {
			coursesByDepartment.set(course.department, []);
		}
		coursesByDepartment.get(course.department).push(course);
	}
	// Create a schedule object to store the final exam schedule
	const schedule = {};
	// Assign exam slots to courses in each department
	for (const [department, courses] of coursesByDepartment) {
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
	return schedule;
}
async function generate() {
	try {
		const pool = new Pool({
			user: 'moujahidc',
			host: 'localhost',
			database: 'moujahidc',
			password: 'YahyaMjhd2001',
			port: 5432,
		});
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
		await pool.end();
	} catch (error) {
		console.error('Error occurred while generating data:', error);
	}
}
const excelFilePath = './uploads/data.xlsx';
importExcelFileToTables(excelFilePath);
