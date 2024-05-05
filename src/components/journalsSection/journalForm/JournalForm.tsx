import { addJournal } from '@/api/journal';
import const_queryKey from '@/const/queryKey';
import { JournalParams_Type } from '@/types/journal';
import { Store_Type } from '@/types/redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { FcIdea, FcApproval, FcCloseUpMode, FcClock } from 'react-icons/fc';
import { DropDownMenu, Dropdown, Form, JournalFormWrap } from '@/styles/Journal.style';
import 'react-quill/dist/quill.snow.css'; //
import ProfileImage from '@/components/common/profileImage/ProfileImage';
import QuillEditor from './QuillEditor';

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
	const titleInputRef = useRef<HTMLInputElement>(null);
	const [body, setBody] = useState('');
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

		if (journalDataParams.title.length > 0 && journalDataParams.body.length > 0) {
			addJournalMutation.mutate({ userId, contextId, journalDataParams });
		} else {
			if (!journalDataParams.title.length) {
				return alert('제목을 작성해주세요.');
			}
			if (!body.length) {
				return alert('본문을 작성해주세요.');
			} else {
				setJournalDataParams(prevParams => {
					let newParams = { ...prevParams };
					newParams = {
						...newParams,
						body: body
					};
					return newParams;
				});
			}
		}
	};
	const onChangeJournalData = (type: string, content?: string) => {
		setJournalDataParams(prevParams => {
			let newParams = { ...prevParams };

			// icon 업데이트
			if (type === 'icon' && content) {
				newParams = {
					...newParams,
					icon: content
				};
				setIconButtonText(content);
				blurDropdown();
			}

			// title 업데이트
			if (type === 'title' && titleInputRef?.current) {
				newParams = {
					...newParams,
					title: titleInputRef.current.value
				};
			}

			return newParams;
		});
	};
	const toggleDropBox = (e: React.FormEvent<HTMLSpanElement>) => {
		e.preventDefault();
		setIsIconPopVisible(prev => !prev);
	};
	const blurDropdown = () => {
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
						<DropDownMenu tabIndex={0} onBlur={() => blurDropdown()}>
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
												onClick={() => {
													onChangeJournalData('icon', icon);
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
						<input ref={titleInputRef} type='text' name='title' placeholder='Write a journal title' onChange={() => onChangeJournalData('title')} />
						<label htmlFor='title'>Add a body</label>
						<QuillEditor setBody={setBody} />
					</div>
					<div className='formButton'>
						<button>등록</button>
					</div>
				</Form>
			</div>
		</JournalFormWrap>
	);
}
