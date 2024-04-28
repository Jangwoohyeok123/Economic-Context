import clsx from 'clsx';
import styles from './Footer.module.scss';
import { poppins, roboto } from '@/pages/_app';

export default function Footer() {
	return (
		<footer className={clsx(styles.Footer, poppins.variable, roboto.variable)}>
			<div className={clsx(styles.wrap)}>
				<div className={styles.heading}>
					<h3>EconomicContext</h3>
					<ul>
						<li>PRODUCTS</li>
						<li>BLOG</li>
						<li>SHOP</li>
						<li>CONTACTS</li>
					</ul>
				</div>
				<ul className={clsx(styles.description)}>
					<li>A website designed</li>
					<li>for user-friendly access</li>
					<li>to economic indicators</li>
					<li>
						<a href='http://icons8.com/icons' target='_blank' rel='noopener noreferrer'>
							icon8 icons
						</a>
					</li>
				</ul>
				<p className={clsx(styles.copyright)}>&copy; 2024 Economic-Context. All Rights Reserved.</p>
			</div>
		</footer>
	);
}
