import clsx from 'clsx';
import styles from '../JournalSection.module.scss';
import ProfileImage from '@/components/common/profileImage/ProfileImage';
import { Journal, JournalWrapper } from '@/styles/Journal.style';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { RiMoreLine, RiDeleteBin6Line } from 'react-icons/ri';
import { MdModeEdit } from 'react-icons/md';
import { useState } from 'react';

interface JournalList_Props {
	type?: string;
}

export default function JournalList({ type }: JournalList_Props) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<JournalWrapper>
			<Journal $type={type}>
				{type !== 'myContext' && <ProfileImage width={30} height={30} />}
				<div className='journalBox'>
					<header>
						<div className='headerData'>
							{type === 'myContext' && <ProfileImage width={30} height={30} />}
							<span className='id'>userid</span>
							<span className='date'>commented yesterday function</span>
						</div>
						<IconButton
							aria-label='more'
							id='basic-button'
							aria-controls={open ? 'long-menu' : undefined}
							aria-expanded={open ? 'true' : undefined}
							aria-haspopup='false'
							disableRipple
							onClick={handleClick}>
							<RiMoreLine />
						</IconButton>
						<Menu
							id='basic-menu'
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button'
							}}>
							<MenuItem onClick={handleClose} disableRipple sx={{ display: 'flex', gap: '7px', fontSize: '0.8rem' }}>
								<MdModeEdit />
								Edit
							</MenuItem>
							<MenuItem onClick={handleClose} disableRipple sx={{ display: 'flex', gap: '7px', fontSize: '0.8rem' }}>
								<RiDeleteBin6Line />
								Delete
							</MenuItem>
						</Menu>
					</header>
					<div className='body'>{'text'}</div>
					<div className='icon'>아이콘 선택 mui menu</div>
				</div>
			</Journal>
		</JournalWrapper>
	);
}
