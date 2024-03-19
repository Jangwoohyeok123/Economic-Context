import clsx from 'clsx';
import styles from './Journal.module.scss';
import { useEffect, useState } from 'react';
import { Journal } from '@/types/userType';

interface JournalProps {
	contextId: number;
}

export default function Journal({ contextId }: JournalProps) {
	const [journal, setJournal] = useState([]);
	const [isWrite, setIsWrite] = useState(false);

	const [journalDataParams, setJournalDataParams] = useState({ title: '', body: '' });

	const handleOpenInput = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setIsWrite(prev => !prev);
	};
	const handleJournalInputData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
		const { name, value } = e.target; // e.target에서 name과 value를 추출
		const newParams: Journal = {
			...journalDataParams,
			[name]: value
		};
		setJournalDataParams(newParams);
	};
	const registJournal = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('journalDataParams: ', journalDataParams);
	};

	useEffect(() => {}, []);

	return (
		<div className={clsx(styles.Journal)}>
			<section className={clsx(styles.JournalHeader)}>
				<h3>Journal</h3>
				<button onClick={e => handleOpenInput(e)}>작성</button>
			</section>

			{isWrite && (
				<form onSubmit={registJournal}>
					<input type='text' name='title' onChange={e => handleJournalInputData(e)} />
					<textarea name='body' rows={5} onChange={e => handleJournalInputData(e)} />
					<div>
						<button>등록</button>
					</div>
				</form>
			)}
			<table>
				<tbody>
					{journal?.map((item, index) => (
						<tr key={index}>
							{/* 메모 */}
							<td>
								<div>
									<span>{item.title}</span>
								</div>
								<div>
									<span>{item.body}</span>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
