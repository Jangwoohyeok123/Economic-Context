import { addJournal } from '@/api/journal';
import const_queryKey from '@/const/queryKey';
import { JournalParams_Type } from '@/types/journal';
import { Store_Type } from '@/types/redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { FcIdea, FcApproval, FcCloseUpMode, FcClock } from 'react-icons/fc';
import { DropDownMenu, Dropdown, Form, JournalFormWrap } from '@/styles/Journal.style';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; //
import ProfileImage from '@/components/common/profileImage/ProfileImage';

const ReactQuill = dynamic(import('react-quill'), {
	ssr: false,
	loading: () => <p>Loading ...</p>
});
interface JournalForm_Props {
	contextId: number;
}
export default function JournalForm({ contextId }: JournalForm_Props) {
	const userId = useSelector((state: Store_Type) => state.user.id);
	const [journalDataParams, setJournalDataParams] = useState({ icon: 'idea', title: '', body: '' });
	const [isIconPopVisible, setIsIconPopVisible] = useState(false);
	const [IconButtonText, setIconButtonText] = useState('icon');
	const queryClient = useQueryClient();
	const iconList = ['idea', 'approval', 'flower', 'clock'];
	const [content, setContent] = useState('');
	const addJournalMutation = useMutation({
		mutationFn: ({ userId, contextId, journalDataParams }: { userId: number; contextId: number; journalDataParams: JournalParams_Type }) =>
			addJournal(userId, contextId, journalDataParams),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [const_queryKey.journal, contextId]
			});
		},
		onError(error) {
			console.error(error);
		}
	});

	const requestAddJournal = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (journalDataParams.body) {
			addJournalMutation.mutate({ userId, contextId, journalDataParams });
		} else {
			// alert('모두 작성해주세요.');
		}
	};
	const changeJournalInputData = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLLIElement>,
		icon?: string
	) => {
		e.preventDefault();
		let newParams = { ...journalDataParams };
		const target = e.target as HTMLInputElement | HTMLTextAreaElement;
		if (target.value) {
			const { name, value } = target; // e.target에서 name과 value를 추출
			newParams = {
				...journalDataParams,
				[name]: value
			};
			setJournalDataParams(newParams);
		} else if ((e.target instanceof SVGElement && icon) || (e.target instanceof HTMLLIElement && icon)) {
			newParams = {
				...journalDataParams,
				icon: icon
			};
			setJournalDataParams(newParams);
			setIconButtonText(icon);
			setIsIconPopVisible(false);
		}
		console.log('newParams', newParams);
	};
	const toggleDropBox = (e: React.FormEvent<HTMLSpanElement>) => {
		e.preventDefault();
		setIsIconPopVisible(prev => !prev);
	};
	const blurDropdown = (e: React.FormEvent<HTMLDivElement>) => {
		e.stopPropagation();
		setIsIconPopVisible(false);
	};
	const showTextToIcon = (icon: string) => {
		let iconElement = <FcIdea />;
		switch (icon) {
			case 'idea':
				iconElement = <FcIdea />;
				break;
			case 'approval':
				iconElement = <FcApproval />;
				break;
			case 'flower':
				iconElement = <FcCloseUpMode />;
				break;
			case 'clock':
				iconElement = <FcClock />;
				break;
			default:
				return iconElement;
		}
		return iconElement;
	};
	return (
		<JournalFormWrap>
			<ProfileImage width={30} height={30} />
			<div className='formSection'>
				<h2>Try Add a Journal!</h2>
				<Form onSubmit={requestAddJournal}>
					<div className='formHeader'>
						<span>journal</span>
						<DropDownMenu tabIndex={0} onBlur={e => blurDropdown(e)}>
							<span className='dropdown' onClick={e => toggleDropBox(e)}>
								<em>{showTextToIcon(IconButtonText)}</em>
								{isIconPopVisible ? <BsChevronUp /> : <BsChevronDown />}
							</span>
							{isIconPopVisible && (
								<Dropdown $isDrop={isIconPopVisible}>
									{iconList.map((icon, index) => {
										return (
											<li
												key={icon + index}
												onClick={e => {
													changeJournalInputData(e, icon);
												}}>
												{showTextToIcon(icon)}
											</li>
										);
									})}
								</Dropdown>
							)}
						</DropDownMenu>
					</div>
					<div className='formBody'>
						<label htmlFor='title'>Add a title</label>
						<input type='text' name='title' placeholder='Write a journal title' onChange={e => changeJournalInputData(e)} />
						<label htmlFor='title'>Add a body</label>
						<ReactQuill
							theme={'snow'}
							value={content}
							onChange={setContent}
							placeholder='Write a journal entry'
							style={{
								width: '100%'
							}}
						/>
					</div>
					<div className='formButton'>
						<button>등록</button>
					</div>
				</Form>
			</div>
		</JournalFormWrap>
	);
}
