import styled from 'styled-components';
import { roboto, poppins } from '@/pages/_app';
import clsx from 'clsx';
import Image from 'next/image';

export default function MainImage() {
	return (
		<MainImageContainer className={clsx(poppins.variable, roboto.variable)}>
			<Image alt='mainpage Image' src='/public/mainImage-2.jpg' fill />
			<article>
				<h2>Create my own collection of economic indicators</h2>
			</article>
		</MainImageContainer>
	);
}

const MainImageContainer = styled.div`
	font-family: var(--baseFont);
	height: calc(var(--headerSize) + 40vh);
	padding-top: var(--headerSize);
	background: #333;
	width: 100%;
	position: relative;

	img {
		position: absolute;
	}

	> article {
		position: relative;
		width: 80%;
		margin: 0 auto;

		h2 {
			width: 400px;
			color: #fff;
			font-size: 2rem;
			font-weight: 400;
		}
	}
`;
