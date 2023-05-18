const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const app = express();
const port = 5000;
// Middleware
app.use(fileUpload()); // Route to handle file upload
app.post('/upload', (req, res) => {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).json({ message: 'No files were uploaded.' });
	}
	const file = req.files.file;
	const uploadPath = path.join(__dirname, 'uploads', file.name);
	file.mv(uploadPath, (err) => {
		if (err) {
			console.error(err);
			return res
				.status(500)
				.json({ message: 'Error occurred while uploading the file.' });
		}
		res.json({ message: 'File uploaded successfully.' });
	});
});
