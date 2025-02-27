import { View, Text, StyleSheet } from "react-native";
import React from "react";
import DashboardLayout from "~/components/layouts/Dashboard.layout";
import { Card } from "~/components/ui/card";
import FeatherIcon from "react-native-vector-icons/Feather";
import AreaChart from "~/components/charts/Test";

const OverviewScreen = () => {
  const sampleData = [
    { x: "Jan", y: 10 },
    { x: "Feb", y: 20 },
    { x: "Mar", y: 15 },
    { x: "Apr", y: 25 },
    { x: "May", y: 30 },
  ];

  return (
    <DashboardLayout>
      <View className="flex flex-row flex-wrap justify-between px-3 py-5">
        {/* Row 1, Column 1 */}
        <Card className="w-[49%] mb-4 rounded-3xl bg-white shadow-[0_15px_30px_-15px_rgba(0,0,0,0.2)] p-4">
          <View className="flex flex-row items-center justify-between mb-3">
            <Text className="mb-2 text-lg font-medium text-gray-600">
              Views
            </Text>
            <Card className="p-3 rounded-2xl">
              <FeatherIcon name="trending-up" size={20} color="#7c3aed" />
            </Card>
          </View>
          <View className="flex flex-row items-center justify-between mt-2 mb-1">
            <Text className="text-2xl font-bold text-[#7c3aed]">7,265</Text>
            <Text className="text-sm font-bold text-[#7c3aed]">+11.01%</Text>
          </View>
        </Card>

        <Card className="w-[49%] mb-4 rounded-3xl bg-white shadow-[0_15px_30px_-15px_rgba(0,0,0,0.2)] p-4">
          <View className="flex flex-row items-center justify-between mb-3">
            <Text className="mb-2 text-lg font-medium text-gray-600">
              Visits
            </Text>
            <Card className="p-3 rounded-2xl">
              <FeatherIcon name="trending-down" size={20} color="#e76e50" />
            </Card>
          </View>
          <View className="flex flex-row items-center justify-between mt-2 mb-1">
            <Text className="text-2xl font-bold text-[#e76e50]">3,671</Text>
            <Text className="text-sm font-bold text-[#e76e50]">-2.3%</Text>
          </View>
        </Card>

        <Card className="w-[49%] mb-4 rounded-3xl bg-white shadow-[0_15px_30px_-15px_rgba(0,0,0,0.2)] p-4">
          <View className="flex flex-row items-center justify-between mb-3">
            <Text className="mb-2 text-lg font-medium text-gray-600">
              New Users
            </Text>
            <Card className="p-3 rounded-2xl">
              <FeatherIcon name="trending-up" size={20} color="#7c3aed" />
            </Card>
          </View>
          <View className="flex flex-row items-center justify-between mt-2 mb-1">
            <Text className="text-2xl font-bold text-[#7c3aed]">256</Text>
            <Text className="text-sm font-bold text-[#7c3aed]">+15.03%</Text>
          </View>
        </Card>

        <Card className="w-[49%] mb-4 rounded-3xl bg-white shadow-[0_15px_30px_-15px_rgba(0,0,0,0.2)] p-4">
          <View className="flex flex-row items-center justify-between mb-3">
            <Text className="mb-2 text-lg font-medium text-gray-600">
              Active Users
            </Text>
            <Card className="p-3 rounded-2xl">
              <FeatherIcon name="trending-down" size={20} color="#e76e50" />
            </Card>
          </View>
          <View className="flex flex-row items-center justify-between mt-2 mb-1">
            <Text className="text-2xl font-bold text-[#e76e50]">1,232</Text>
            <Text className="text-sm font-bold text-[#e76e50]">-4.03%</Text>
          </View>
        </Card>
      </View>

      <View>
        <View className="flex-1 p-4">
          <AreaChart data={sampleData} color="blue-500" />
        </View>
      </View>
    </DashboardLayout>
  );
};

export default OverviewScreen;
