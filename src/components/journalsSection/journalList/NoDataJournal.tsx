import clsx from 'clsx';
import styles from '../JournalSection.module.scss';
import Image from 'next/image';
import noJournal from '@/public/noJournal.png';

export default function NoDataJournal() {
	console.log('no data journal');
	return (
		<div className={clsx(styles.NoDataJournal)}>
			<div className={clsx(styles.img)}>
				<Image src={noJournal} alt={'NoDataJournal Image'} priority />
			</div>
			<h3>Interest Contexts</h3>
			<p>
				Let&apos;s save indicators of interesting topics
				<br />
				to create our own convenient context folders!
			</p>
		</div>
	);
}
