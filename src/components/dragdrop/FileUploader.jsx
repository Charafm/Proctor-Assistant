import React from 'react';
import './fileuploader.scss';
function FileUploader() {
	const [selectedFile, setSelectedFile] = React.useState(null);
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
	};
	const handleChooseFile = () => {
		const fileInput = document.getElementById('file-input');
		fileInput.click();
	};
	const handleUpload = () => {
		if (selectedFile) {
			const formData = new FormData();
			formData.append('file', selectedFile, 'data.xlsx');
			fetch('http://localhost:5000/upload', { method: 'POST', body: formData })
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};
	return (
		<div className="file-uploader">
			{' '}
			<div className="file-input">
				{' '}
				<input
					type="file"
					id="file-input"
					onChange={handleFileChange}
					accept=".xls,.xlsx"
					style={{ display: 'none' }}
				/>{' '}
				<button onClick={handleChooseFile}>Choose File</button>{' '}
				{selectedFile && <button onClick={handleUpload}>Upload</button>}{' '}
			</div>{' '}
			{selectedFile && (
				<div className="selected-file">
					{' '}
					<p>Selected File:</p> <p>{selectedFile.name}</p>{' '}
				</div>
			)}{' '}
		</div>
	);
}
export default FileUploader;
