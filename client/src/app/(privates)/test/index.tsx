import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetProfileAsyncQuery } from "~/src/infrastructure/redux/apis/user.api";
import { useAppSelector } from "~/src/infrastructure/redux/store";
import LoadingOverlay from '@components/ui/LoadingOverlay';
import { useRouter } from "expo-router";

const AuthTestScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { accessToken, isAuthenticated } = useAppSelector(state => state.auth)
    const { data, isFetching, isError } = useGetProfileAsyncQuery();
    const router = useRouter();

    useEffect(() => {
        if (accessToken && isAuthenticated) {
            setIsLoading(false);
        } else {
            router.replace('/sign-in');
        }
    }, [accessToken, isAuthenticated]);

    return (
        <View className="flex-1">
            <SafeAreaView>
                <View className="">
                    <Text>{JSON.stringify(data)}</Text>
                </View>
            </SafeAreaView>
            <LoadingOverlay isLoading={isLoading || isFetching} />
        </View>
    );
};

export default AuthTestScreen;
