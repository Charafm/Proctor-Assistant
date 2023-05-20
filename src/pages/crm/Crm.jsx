import React from 'react';
import './crm.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
const crm = () => {
	return (
		<div className="crm">
			{' '}
			<Sidebar />{' '}
			<div className="crmContainer">
				{' '}
				<Navbar />{' '}
			</div>{' '}
		</div>
	);
};
export default crm;
