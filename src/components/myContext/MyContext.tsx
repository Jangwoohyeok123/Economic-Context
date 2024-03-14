import clsx from 'clsx';
import styles from './MyContext.module.scss';
import { changeNameToCategoryId } from '@/utils/changeNameToCategoryId';
import { useState } from 'react';

export default function MyContextTab() {
	return <section className={clsx(styles.MyContext)}></section>;
}
