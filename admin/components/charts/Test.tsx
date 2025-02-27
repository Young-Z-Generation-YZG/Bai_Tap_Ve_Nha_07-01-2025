import React from "react";
import { View, Text } from "react-native";
import {
  VictoryArea,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";

interface AreaChartProps {
  data: { x: string | number; y: number }[];
  height?: number;
  color?: string;
}

const AreaChart: React.FC<AreaChartProps> = ({
  data,
  height = 300,
  color = "blue-500",
}) => {
  // Map Tailwind color to RGB for semi-transparent fill
  const getColorRGBA = (tailwindColor: string) => {
    const colorMap: { [key: string]: string } = {
      "blue-500": "59, 130, 246", // RGB for blue-500
      "gray-800": "31, 41, 55", // RGB for gray-800 (optional for other colors)
      // Add more Tailwind colors as needed
    };
    const rgb = colorMap[tailwindColor] || "59, 130, 246"; // Default to blue-500
    return `rgba(${rgb}, 0.3)`; // Semi-transparent fill
  };

  const strokeColor =
    `#${color.replace("blue-", "").replace("gray-", "")}` || "#3b82f6"; // Default to blue-500 hex

  return (
    <View className="p-4 bg-white shadow-md rounded-3xl" style={{ height }}>
      <Text className="mb-4 text-lg font-bold text-gray-800">
        Sales Over Time
      </Text>
      <VictoryChart
        theme={VictoryTheme.material}
        height={height - 60} // Adjust height for padding and title
        padding={{ top: 20, bottom: 40, left: 50, right: 50 }}
      >
        <VictoryAxis
          style={{
            axis: { stroke: "#a1a1aa" }, // gray-400
            tickLabels: { fill: "#4b5563", fontSize: 12 }, // gray-600
            grid: { stroke: "#e5e7eb", strokeDasharray: "5,5" }, // gray-200
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: "#a1a1aa" }, // gray-400
            tickLabels: { fill: "#4b5563", fontSize: 12 }, // gray-600
            grid: { stroke: "#e5e7eb", strokeDasharray: "5,5" }, // gray-200
          }}
        />
        <VictoryArea
          data={data}
          x="x"
          y="y"
          style={{
            data: {
              fill: getColorRGBA(color), // Semi-transparent fill
              stroke: strokeColor, // Line color
              strokeWidth: 2,
            },
          }}
          interpolation="natural" // Smooth curve
          animate={{
            duration: 2000,
            easing: "bounce", // Optional: Adds a bounce effect to animations
          }}
        />
      </VictoryChart>
    </View>
  );
};

export default AreaChart;
