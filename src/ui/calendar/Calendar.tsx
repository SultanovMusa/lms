import scss from './Calendar.module.scss';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const Calendar = () => {
	return (
		<div className={scss.calendarWrapper}>
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				headerToolbar={{
					start: 'today prev,next',
					center: 'title',
					end: 'dayGridMonth,timeGridWeek,timeGridDay'
				}}
				height="85vh"
			/>
		</div>
	);
};

export default Calendar;
