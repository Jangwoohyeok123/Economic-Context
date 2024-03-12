import clsx from 'clsx';
import styles from './Footer.module.scss';
import { poppins, roboto } from '@/pages/_app';

export default function Footer() {
	return (
		<footer className={clsx(styles.Footer, poppins.variable, roboto.variable)}>
			<div className={clsx(styles.wrap)}>asdasd</div>
		</footer>
	);
}
