import React from 'react';
import './crm.scss';
import Sidebar from '../../components/sidebar/Sidebar';

const crm = () => {
	return (
		<div className="crm">
			{' '}
			<Sidebar /> <div className="crmContainer"> </div>{' '}
		</div>
	);
};
export default crm;
