import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
	Scheduler,
	Appointments,
	AppointmentForm,
	AppointmentTooltip,
	WeekView,
	EditRecurrenceMenu,
	AllDayPanel,
	ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import finalExamSchedule from './final-exam-schedule.json';

import Modal from 'react-modal';
import htmlToImage from 'html-to-image';
export default class Demo extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			data: finalExamSchedule,

			currentDate: '2023-05-19',
			addedAppointment: {},
			appointmentChanges: {},
			editingAppointment: undefined,
			isModalOpen: false,
		};
		this.commitChanges = this.commitChanges.bind(this);
		this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
		this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
		this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.downloadImage = this.downloadImage.bind(this);
	}
	changeAddedAppointment(addedAppointment) {
		this.setState({ addedAppointment });
	}
	changeAppointmentChanges(appointmentChanges) {
		this.setState({ appointmentChanges });
	}
	changeEditingAppointment(editingAppointment) {
		this.setState({ editingAppointment });
	}
	commitChanges({ added, changed, deleted }) {
		this.setState((state) => {
			let { data } = state;
			if (added) {
				const startingAddedId =
					data.length > 0 ? data[data.length - 1].id + 1 : 0;
				data = [...data, { id: startingAddedId, ...added }];
			}
			if (changed) {
				data = data.map((appointment) =>
					changed[appointment.id]
						? { ...appointment, ...changed[appointment.id] }
						: appointment
				);
			}
			if (deleted !== undefined) {
				data = data.filter((appointment) => appointment.id !== deleted);
			}
			return { data };
		});
	}
	openModal() {
		this.setState({ isModalOpen: true });
	}
	closeModal() {
		this.setState({ isModalOpen: false });
	}
	downloadImage() {
		const scheduleDiv = document.getElementById('schedule');
		htmlToImage.toPng(scheduleDiv).then(function (dataUrl) {
			const link = document.createElement('a');
			link.download = 'schedule.png';
			link.href = dataUrl;
			link.click();
		});
	}
	render() {
		const {
			currentDate,
			data,
			addedAppointment,
			appointmentChanges,
			editingAppointment,
			isModalOpen,
		} = this.state;
		return (
			<Paper>
				{' '}
				<button onClick={this.openModal}>View Schedule</button>{' '}
				<Modal
					isOpen={isModalOpen}
					onRequestClose={this.closeModal}>
					{' '}
					<div id="schedule">
						{' '}
						<Scheduler
							data={data}
							height={660}>
							{' '}
							<ViewState currentDate={currentDate} />{' '}
							<EditingState
								onCommitChanges={this.commitChanges}
								addedAppointment={addedAppointment}
								onAddedAppointmentChange={this.changeAddedAppointment}
								appointmentChanges={appointmentChanges}
								onAppointmentChangesChange={this.changeAppointmentChanges}
								editingAppointment={editingAppointment}
								onEditingAppointmentChange={this.changeEditingAppointment}
							/>{' '}
							<WeekView
								startDayHour={9}
								endDayHour={17}
							/>{' '}
							<AllDayPanel /> <EditRecurrenceMenu /> <ConfirmationDialog />{' '}
							<Appointments />{' '}
							<AppointmentTooltip
								showOpenButton
								showDeleteButton
							/>{' '}
							<AppointmentForm />{' '}
						</Scheduler>{' '}
					</div>{' '}
					<button onClick={this.downloadImage}>Download Schedule</button>{' '}
				</Modal>{' '}
			</Paper>
		);
	}
}
