import * as React from "react";
import Svg, { Path } from "react-native-svg";
const InstagramIcon = (props:any) => (
  <Svg
    width="800px"
    height="800px"
    viewBox="0 -3 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M7.5 5C6.11929 5 5 6.11929 5 7.5C5 8.88071 6.11929 10 7.5 10C8.88071 10 10 8.88071 10 7.5C10 6.11929 8.88071 5 7.5 5Z"
      fill="#000000"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.5 0C2.01472 0 0 2.01472 0 4.5V10.5C0 12.9853 2.01472 15 4.5 15H10.5C12.9853 15 15 12.9853 15 10.5V4.5C15 2.01472 12.9853 0 10.5 0H4.5ZM4 7.5C4 5.567 5.567 4 7.5 4C9.433 4 11 5.567 11 7.5C11 9.433 9.433 11 7.5 11C5.567 11 4 9.433 4 7.5ZM11 4H12V3H11V4Z"
      fill="#000000"
    />
  </Svg>
);
export default InstagramIcon;

