import React, { useState, useRef } from 'react';
import './dragdropfile.scss';
function DragDropFile() {
	const [dragActive, setDragActive] = useState(false);
	const [error, setError] = useState(null);
	const inputRef = useRef(null);
	const handleDrag = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	};
	const handleDrop = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			const file = e.dataTransfer.files[0];
			const fileType = file.type;
			if (
				fileType === 'application/vnd.ms-excel' ||
				fileType ===
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			) {
				await uploadFile(file);
			} else {
				setError('Only Excel files are allowed!');
			}
		}
	};
	const handleChange = async (e) => {
		e.preventDefault();
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const fileType = file.type;
			if (
				fileType === 'application/vnd.ms-excel' ||
				fileType ===
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			) {
				setError('File added successfully!');
				await uploadFile(file);
			} else {
				setError('Only Excel files are allowed!');
			}
		}
	};
	const onButtonClick = () => {
		inputRef.current.click();
	};
	const uploadFile = async (file) => {
		try {
			const formData = new FormData();
			formData.append('file', file);
			const response = await fetch('http://localhost:5000/upload', {
				method: 'POST',
				body: formData,
			});
			if (response.ok) {
				console.log('File uploaded successfully');
			} else {
				console.error('File upload failed');
			}
		} catch (error) {
			console.error('File upload error:', error);
		}
	};
	return (
		<form
			id="form-file-upload"
			onDragEnter={handleDrag}
			onSubmit={(e) => e.preventDefault()}>
			{' '}
			<input
				ref={inputRef}
				type="file"
				id="input-file-upload"
				accept=".xls,.xlsx"
				onChange={handleChange}
			/>{' '}
			<label
				id="label-file-upload"
				htmlFor="input-file-upload"
				className={dragActive ? 'drag-active' : ''}>
				{' '}
				<div>
					{' '}
					<p>Drag and drop your Excel file here or</p>{' '}
					<button
						className="upload-button"
						onClick={onButtonClick}>
						{' '}
						Upload a file{' '}
					</button>{' '}
				</div>{' '}
			</label>{' '}
			{dragActive && (
				<div
					id="drag-file-element"
					onDragEnter={handleDrag}
					onDragLeave={handleDrag}
					onDragOver={handleDrag}
					onDrop={handleDrop}></div>
			)}{' '}
			{error && <p>{error}</p>}{' '}
		</form>
	);
}
export default DragDropFile;
