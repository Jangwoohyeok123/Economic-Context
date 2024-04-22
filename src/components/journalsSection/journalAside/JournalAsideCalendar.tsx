import styles from '../JournalSection.module.scss';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import clsx from 'clsx';

export default function JournalAsideCalendar() {
	return (
		<div className={clsx(styles.JournalAsideCalendar)}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DateCalendar value={dayjs()} views={['day']} showDaysOutsideCurrentMonth readOnly />
			</LocalizationProvider>
		</div>
	);
}
