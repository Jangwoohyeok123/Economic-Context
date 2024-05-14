import clsx from 'clsx';
import styles from './AllContexts.module.scss';
import Image from 'next/image';
import noContext from '@/public/noContext.png';
import Button from '@mui/material/Button';
import { Dispatch, SetStateAction } from 'react';
interface NoDataContext_Props {
	setSelectedContext: Dispatch<SetStateAction<string>>;
}

export default function NoDataContext({ setSelectedContext }: NoDataContext_Props) {
	return (
		<div className={clsx(styles.NoDataContext)}>
			<div className={clsx(styles.imgs)}>
				<Image src={noContext} alt={'folder Image'} priority />
			</div>
			<h3>Interest Contexts</h3>
			<p>
				Let&apos;s save indicators of interesting topics
				<br />
				to create our own convenient context folders!
			</p>
			<Button
				variant='contained'
				sx={{ backgroundColor: '#333', '&:hover, &:focus': { backgroundColor: '#222' } }}
				onClick={() => setSelectedContext('Indicators')}>
				Create Context
			</Button>
		</div>
	);
}
