import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

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
  }
`;
