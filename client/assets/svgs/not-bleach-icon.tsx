import * as React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";
const SVGComponent = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G opacity={0.5}>
      <Path
        d="M7.65113 11.4464L3.84082 18.5406H19.9807L11.9882 3.54688L8.73539 9.33988"
        stroke="black"
      />
      <Path d="M3.77881 6.95447L21.8083 16.0002" stroke="black" />
    </G>
  </Svg>
);
export default SVGComponent;
