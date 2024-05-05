import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';

interface QuillEditor_Props {
	setBody: React.Dispatch<React.SetStateAction<string>>;
}

export default function QuillEditor({ setBody }: QuillEditor_Props) {
	const [quillValue, setQuillValue] = useState('');
	const quillRef = useRef<ReactQuill>(null);

	const handleQuillValue = () => {
		if (quillRef.current && quillRef.current.value) {
			const newQuillValue = quillRef.current.value.toString(); //quillRef.current.value의 형태는 string이나 타입을 Quill의 Delta type으로 인식해서 문자열로 변경
			setQuillValue(newQuillValue);
			setBody(newQuillValue);
		}
	};
	return (
		<ReactQuill
			ref={quillRef}
			theme={'snow'}
			value={quillValue || ''}
			onChange={() => {
				handleQuillValue();
			}}
			placeholder='Write a journal entry'
			style={{
				width: '100%'
			}}
		/>
	);
}
