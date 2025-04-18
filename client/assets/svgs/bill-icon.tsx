import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SVGComponent = (props:any) => (
  <Svg
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M28.5 15.04C28.5 11.01 27.56 10 23.78 10H16.22C12.44 10 11.5 11.01 11.5 15.04V26.3C11.5 28.96 12.96 29.59 14.73 27.69L14.74 27.68C15.56 26.81 16.81 26.88 17.52 27.83L18.53 29.18C19.34 30.25 20.65 30.25 21.46 29.18L22.47 27.83C23.19 26.87 24.44 26.8 25.26 27.68C27.04 29.58 28.49 28.95 28.49 26.29V19M16 15H24M17 19H23"
      stroke="#272727"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SVGComponent;
