import styled from 'styled-components';
import { roboto, poppins } from '@/pages/_app';
import clsx from 'clsx';
import Image from 'next/image';

export default function MainImage() {
	return (
		<MainImageContainer className={clsx(poppins.variable, roboto.variable)}>
			<Image alt='mainpage_Image' src='/mainImage.jpg' fill />
			<article>
				<h2>Create your economic context</h2>
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
		top: 60px;
		left: 0px;
		height: 100%;
	}

	> article {
		position: relative;
		width: 80%;
		margin: 0 auto;

		h2 {
			padding-top: 100px;
			width: 450px;
			color: #fff;
			font-size: 3rem;
			font-weight: 400;
		}
	}
`;
