import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.scss';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EngineeringIcon from '@mui/icons-material/Engineering';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
const Sidebar = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		// Perform logout logic here
		// For example, clear any user authentication toens, session data, etc.
		// Then navigate back to the home page
		navigate('/');
	};
	return (
		<div className="sidebar">
			{' '}
			<div className="top">
				{' '}
				<span className="logo">Proctor Assistant</span>{' '}
			</div>{' '}
			<hr />{' '}
			<div className="center">
				{' '}
				<ul>
					{' '}
					<p className="title">MAIN</p>{' '}
					<li>
						{' '}
						<Link to="/dashboard">
							{' '}
							<DashboardIcon className="icon" /> <span> Dashboard</span>{' '}
						</Link>{' '}
					</li>{' '}
					<p className="title">STAFF</p>{' '}
					<li>
						{' '}
						<Link to="/fem">
							{' '}
							<EditCalendarIcon className="icon" />{' '}
							<span> Final Exam Scheduler</span>{' '}
						</Link>{' '}
					</li>{' '}
					<li>
						{' '}
						<Link to="/crm">
							{' '}
							<EngineeringIcon className="icon" />{' '}
							<span> Classroom Manager</span>{' '}
						</Link>{' '}
					</li>{' '}
					<p className="title">STUDENT</p>{' '}
					<li>
						{' '}
						<Link to="/calendar">
							{' '}
							<CalendarMonthIcon className="icon" /> <span> Calendar</span>{' '}
						</Link>{' '}
					</li>{' '}
					<li>
						{' '}
						<Link to="/classroom-finder">
							{' '}
							<EngineeringIcon className="icon" />{' '}
							<span> Classroom Finder</span>{' '}
						</Link>{' '}
					</li>{' '}
				</ul>{' '}
			</div>{' '}
			<div className="bottom">
				{' '}
				<button onClick={handleLogout}>Logout</button>{' '}
			</div>{' '}
		</div>
	);
};
export default Sidebar;
