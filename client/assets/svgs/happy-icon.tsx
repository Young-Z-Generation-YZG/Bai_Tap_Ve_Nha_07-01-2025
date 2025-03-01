import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg
    width={41}
    height={41}
    viewBox="0 0 41 41"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M20.3955 5.9165C12.124 5.9165 5.39551 12.645 5.39551 20.9165C5.39551 29.188 12.124 35.9165 20.3955 35.9165C28.667 35.9165 35.3955 29.188 35.3955 20.9165C35.3955 12.645 28.667 5.9165 20.3955 5.9165ZM20.3955 8.4165C27.3145 8.4165 32.8955 13.9976 32.8955 20.9165C32.8955 27.8354 27.3145 33.4165 20.3955 33.4165C13.4766 33.4165 7.89551 27.8354 7.89551 20.9165C7.89551 13.9976 13.4766 8.4165 20.3955 8.4165ZM14.7705 15.9165C13.7354 15.9165 12.8955 16.7563 12.8955 17.7915C12.8955 18.8267 13.7354 19.6665 14.7705 19.6665C15.8057 19.6665 16.6455 18.8267 16.6455 17.7915C16.6455 16.7563 15.8057 15.9165 14.7705 15.9165ZM26.0205 15.9165C24.9854 15.9165 24.1455 16.7563 24.1455 17.7915C24.1455 18.8267 24.9854 19.6665 26.0205 19.6665C27.0557 19.6665 27.8955 18.8267 27.8955 17.7915C27.8955 16.7563 27.0557 15.9165 26.0205 15.9165ZM13.9111 24.6665L11.7627 25.9165C13.4912 28.8999 16.7041 30.9165 20.3955 30.9165C24.0869 30.9165 27.2998 28.8999 29.0283 25.9165L26.8799 24.6665C25.5811 26.9077 23.1787 28.4165 20.3955 28.4165C17.6123 28.4165 15.21 26.9077 13.9111 24.6665Z"
      fill="#E0CFBA"
    />
  </Svg>
);
export default SVGComponent;
