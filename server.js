const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const app = express();
const upload = multer({ dest: 'uploads/' }); // Set the destination folder to store uploaded files
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.post('/upload', upload.single('file'), (req, res) => {
	try {
		const workbook = xlsx.readFile(req.file.path); // Read the uploaded file
		// Process the Excel file and save the data to the database or perform any required operations
		res
			.status(200)
			.json({ message: 'File uploaded and processed successfully' });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: 'An error occurred while processing the file' });
	}
});
