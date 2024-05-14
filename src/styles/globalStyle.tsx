import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
	  --bgColor-light: #fefefe;
	  --bgColor-light-code: 254, 254, 254;
  	--bgColor-dark: #111;
  	--bgColor: #efefef;
  	--bgColor2: #dedede;
  	--bgColor-code: 239, 239, 239;
  	--fontColor: #333;
  	--fontColor-code: 34, 34, 34;
  	--pointColor: crimson; // primeColor => root 찾아보고 convention 맞춰보기
  	--pointColor2: #014f97;
  	--chartColor: #c9d0d2;
  	--dashMenuWidth: 250px;
  	--chartHeaderColor: #cecece;
  	--headerSize: 60px;
  	--chartHeaderSize: 28px;
	  --chartPadding: 20px;
	  --yellowColor: #f7e704;
		--mobile: 768;
		--tablet: 1024px;
		--laptop: 1400px;
  }

	* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-size: 16px;
  }

  body {
	background-color: var(--bgColor);
	color: var(--fontColor);
	overflow-x: hidden;
}

main {
	padding-top: 100px;
	width: 80%;
	margin: 0 auto;
	color: var(--fontColor);
}

ul,
ol,
li {
	list-style: none;
}
a {
	color: inherit;
	text-decoration: none;
	outline: 0;
}

  .myTooltipStyle {
	position: absolute;
	visibility: hidden;
	padding: 10px;
	background: white;
	border: 1px solid;
	border-color: var(--chartColor);
	border-radius: 5px;
	width: 150px;
	transform: translateX(-100);

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -10px;
		border-width: 10px;
		border-style: solid;
		border-color: var(--chartColor) transparent transparent transparent;
	}
}

`;

/*
$tablet: 1024px; // 769px ~ 1024px
$mobile: 768px; // ~ 768px
$dashMenuWidth: 250px;
$dashMenuWidth-mobile: 180px;
$headerSize: 60px;
$tabPagePadding: 30px;


*/
