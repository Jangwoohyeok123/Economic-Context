import clsx from 'clsx';
import ProfileImage from '@/components/common/profileImage/ProfileImage';
import { Journal, JournalWrapper } from '@/styles/Journal.style';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { RiMoreLine, RiDeleteBin6Line } from 'react-icons/ri';
import { MdModeEdit } from 'react-icons/md';
import { useState } from 'react';
import { getAllJournal } from '@/api/journal';
import const_queryKey from '@/const/queryKey';
import { useQuery } from '@tanstack/react-query';
import { JournalData_Type } from '@/types/journal';
import JournalForm from '../journalForm/JournalForm';
import { changeDateToRelativeTime } from '@/utils/changeDate';
import NoDataJournal from './NoDataJournal';

interface JournalList_Props {
	type?: string;
}

export default function JournalList({ type }: JournalList_Props) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const { data: AllJournal_List, isLoading } = useQuery<JournalData_Type[]>({
		queryKey: [const_queryKey.journal, 'journal'],
		queryFn: () => getAllJournal()
	});

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	// id: number;
	// title: string;
	// body: string;
	// createdAt: string;
	// updatedAt: string;
	return (
		<JournalWrapper>
			{!isLoading && AllJournal_List && AllJournal_List.length > 0 ? (
				AllJournal_List.map((journal, idx) => {
					return (
						<Journal $type={type} key={idx}>
							{type !== 'myContext' && <ProfileImage width={30} height={30} />}
							<div className='journalBox'>
								<header>
									<div className='headerData'>
										{type === 'myContext' && <ProfileImage width={30} height={30} />}
										<span className='id'>{journal.id}</span>
										<span className='date'>{changeDateToRelativeTime(journal.createdAt)}</span>
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
								<div className='body'>{journal.body}</div>
								{/*TODO:: <div className='icon'>아이콘 선택 menu</div> */}
							</div>
						</Journal>
					);
				})
			) : (
				<NoDataJournal />
			)}

			{type === 'currentContext' && <JournalForm contextId={17} />}
		</JournalWrapper>
	);
}
