import React, { useState, useEffect } from 'react';
import './crm.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';
const CRM = () => {
	const [courses, setCourses] = useState([]);
	const [selectedCourse, setSelectedCourse] = useState(null);
	const [buildings, setBuildings] = useState([]);
	const [selectedBuilding, setSelectedBuilding] = useState(null);
	const [rooms, setRooms] = useState([]);
	const [selectedRoom, setSelectedRoom] = useState(null);
	useEffect(() => {
		axios
			.get('http://localhost:3002/api/courses')
			.then((response) => {
				setCourses(response.data);
			})
			.catch((error) => {
				console.error('Failed to fetch courses:', error);
			});
	}, []);
	useEffect(() => {
		axios
			.get('http://localhost:3002/api/buildings')
			.then((response) => {
				setBuildings(response.data);
			})
			.catch((error) => {
				console.error('Failed to fetch buildings:', error);
			});
	}, []);
	useEffect(() => {
		if (selectedBuilding) {
			axios
				.get(`http://localhost:3002/api/buildings/${selectedBuilding}/rooms`)
				.then((response) => {
					setRooms(response.data);
				})
				.catch((error) => {
					console.error('Failed to fetch rooms:', error);
				});
		}
	}, [selectedBuilding]);
	const handleCourseSelect = (courseId) => {
		const selectedCourse = courses.find(
			(course) => course.courseid === courseId
		);
		setSelectedCourse(selectedCourse);
	};
	const handleBuildingSelect = (buildingId) => {
		setSelectedBuilding(buildingId);
		setSelectedRoom(null);
	};
	const handleRoomSelect = (roomId) => {
		setSelectedRoom(roomId);
	};
	const handleLocationUpdate = () => {
		if (selectedCourse && selectedBuilding && selectedRoom) {
			axios
				.put(
					`http://localhost:3002/api/courses/${selectedCourse.courseid}/location`,
					{ buildingId: selectedBuilding, roomId: selectedRoom }
				)
				.then((response) => {
					console.log('Location updated successfully');
					setSelectedCourse(null);
					setSelectedBuilding(null);
					setSelectedRoom(null);
				})
				.catch((error) => {
					console.error('Failed to update location:', error);
				});
		}
	};
	return (
		<div className="crm">
			{' '}
			<Sidebar />{' '}
			<div className="crmContainer">
				{' '}
				<h1>Classroom Manager</h1>{' '}
				<div className="formContainer">
					{' '}
					<label htmlFor="courseSelect">Select Course:</label>{' '}
					<select
						id="courseSelect"
						value={selectedCourse ? selectedCourse.courseid : ''}
						onChange={(e) => handleCourseSelect(Number(e.target.value))}>
						{' '}
						<option value="">-- Select Course --</option>{' '}
						{courses.map((course) => (
							<option
								key={course.courseid}
								value={course.courseid}>
								{' '}
								{course.coursename}{' '}
							</option>
						))}{' '}
					</select>{' '}
					{selectedCourse && (
						<div>
							{' '}
							<label htmlFor="buildingSelect">Select Building:</label>{' '}
							<select
								id="buildingSelect"
								value={selectedBuilding || ''}
								onChange={(e) => handleBuildingSelect(Number(e.target.value))}>
								{' '}
								<option value="">-- Select Building --</option>{' '}
								{buildings.map((building) => (
									<option
										key={building.locationid}
										value={building.locationid}>
										{' '}
										{building.building}{' '}
									</option>
								))}{' '}
							</select>{' '}
							<label htmlFor="roomSelect">Select Room:</label>{' '}
							<select
								id="roomSelect"
								value={selectedRoom || ''}
								onChange={(e) => handleRoomSelect(Number(e.target.value))}>
								{' '}
								<option value="">-- Select Room --</option>{' '}
								{rooms.map((room) => (
									<option
										key={room.locationid}
										value={room.locationid}>
										{' '}
										{room.classroom}{' '}
									</option>
								))}{' '}
							</select>{' '}
							<button onClick={handleLocationUpdate}>Update Location</button>{' '}
						</div>
					)}{' '}
				</div>{' '}
			</div>{' '}
		</div>
	);
};
export default CRM;
