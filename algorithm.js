const xlsx = require('xlsx');
const pg = require('pg');
async function importExcelFileToSubtable(filePath) {
	try {
		const workbook = xlsx.readFile(filePath);
		const worksheet = workbook.Sheets[workbook.SheetNames[0]];
		const excelData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
		const client = new pg.Client({
			user: 'moujahidc',
			host: 'localhost',
			database: 'moujahidc',
			password: 'YahyaMjhd2001',
			port: 5432,
		});
		await client.connect();
		await client.query('TRUNCATE TABLE subtable');
		for (let i = 1; i < excelData.length; i++) {
			const row = excelData[i];
			const query = {
				text: 'INSERT INTO subtable (column1, column2, column3) VALUES ($1, $2, $3)',
				values: [row[0], row[1], row[2]],
			};
			await client.query(query);
		}
		await client.end();
		console.log('Excel file imported to subtable successfully.');
	} catch (error) {
		console.error(
			'Error occurred while importing the Excel file to subtable:',
			error
		);
	}
}
async function generateFinalExamSchedule() {
	try {
		const client = new pg.Client({
			user: 'your_username',
			host: 'your_host',
			database: 'your_database',
			password: 'your_password',
			port: 5432,
		});
		await client.connect();

		// Perform the necessary logic to generate the final exam schedule
		// ...

		const query = {
			text: 'UPDATE subtable SET final_exam_schedule = $1',
			values: ['final_exam_schedule_data'],
		};
		await client.query(query);
		await client.end();
		console.log('Final exam schedule generated and stored successfully.');
	} catch (error) {
		console.error(
			'Error occurred while generating the final exam schedule:',
			error
		);
	}
}
const excelFilePath = 'path/to/excel/file.xlsx';
importExcelFileToSubtable(excelFilePath)
	.then(() => generateFinalExamSchedule())
	.catch((error) => console.error('Error occurred:', error));
