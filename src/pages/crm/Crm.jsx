import React, { useState, useEffect } from 'react';
import './crm.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';
import { Select, Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { Option } = Select;
const CRM = () => {
	const [courses, setCourses] = useState([]);
	const [selectedCourse, setSelectedCourse] = useState(null);
	const [buildings, setBuildings] = useState([]);
	const [selectedBuilding, setSelectedBuilding] = useState(null);
	const [rooms, setRooms] = useState([]);
	const [selectedRoom, setSelectedRoom] = useState(null);
	const [showBuildingRoom, setShowBuildingRoom] = useState(false);
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
		setShowBuildingRoom(true);
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
					toast.success('Location updated successfully');
					setSelectedCourse(null);
					setSelectedBuilding(null);
					setSelectedRoom(null);
					setShowBuildingRoom(false);
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
					<Select
						id="courseSelect"
						value={selectedCourse ? selectedCourse.courseid : ''}
						onChange={(value) => handleCourseSelect(Number(value))}>
						{' '}
						<Option value="">-- Select Course --</Option>{' '}
						{courses.map((course) => (
							<Option
								key={course.courseid}
								value={course.courseid}>
								{' '}
								{course.coursename}{' '}
							</Option>
						))}{' '}
					</Select>{' '}
					{showBuildingRoom && (
						<div className="buildingRoomContainer">
							{' '}
							<label htmlFor="buildingSelect">Select Building:</label>{' '}
							<Select
								id="buildingSelect"
								value={selectedBuilding || ''}
								onChange={(value) => handleBuildingSelect(Number(value))}>
								{' '}
								<Option value="">-- Select Building --</Option>{' '}
								{buildings.map((building) => (
									<Option
										key={building.locationid}
										value={building.locationid}>
										{' '}
										{building.building}{' '}
									</Option>
								))}{' '}
							</Select>{' '}
							<label htmlFor="roomSelect">Select Room:</label>{' '}
							<Select
								id="roomSelect"
								value={selectedRoom || ''}
								onChange={(value) => handleRoomSelect(Number(value))}>
								{' '}
								<Option value="">-- Select Room --</Option>{' '}
								{rooms.map((room) => (
									<Option
										key={room.locationid}
										value={room.locationid}>
										{' '}
										{room.classroom}{' '}
									</Option>
								))}{' '}
							</Select>{' '}
							<Button
								type="primary"
								onClick={handleLocationUpdate}>
								{' '}
								Update Location{' '}
							</Button>{' '}
						</div>
					)}{' '}
				</div>{' '}
			</div>{' '}
			<ToastContainer />{' '}
		</div>
	);
};
export default CRM;
