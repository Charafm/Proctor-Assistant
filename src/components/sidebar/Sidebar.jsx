import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.scss';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EngineeringIcon from '@mui/icons-material/Engineering';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
const Sidebar = () => {
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
				<div className="colorOption"></div> <div className="colorOption"></div>{' '}
			</div>{' '}
		</div>
	);
};
export default Sidebar;
