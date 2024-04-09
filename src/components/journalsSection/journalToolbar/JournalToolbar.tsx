import styled from 'styled-components';

export default function JournalToolbar() {
	const JournalToolbar = styled.div`
		width: var(--buttonSize);
		height: var(--buttonSize);
		border-radius: calc(var(--buttonSize) / 2);
		background-color: red;
	`;
	const Button = styled.button``;
	const toggleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
	};
	return (
		<JournalToolbar>
			<Button onClick={e => toggleOpen(e)}>icon</Button>
		</JournalToolbar>
	);
}
