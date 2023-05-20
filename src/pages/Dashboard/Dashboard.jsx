import React from 'react';
import './dashboard.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import FileUploader from '../../components/dragdrop/FileUploader';
const Dashboard = () => {
	return (
		<div className="dashboard">
			{' '}
			<Sidebar />{' '}
			<div className="dashboardContainer">
				{' '}
				<Navbar />{' '}
				{
					<div className="FileUploader">
						{' '}
						<FileUploader />{' '}
					</div>
				}{' '}
			</div>{' '}
		</div>
	);
};
export default Dashboard;
