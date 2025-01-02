import { Image, RefreshControl, View, FlatList, Text } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import CustomSafeAreaView from '../comonents/global/CustomSafeAreaView';
import { getAbbrName } from '../utils/miscUtils';
import UserAvatar from '../comonents/ui/UserAvatar';
import { mmkvStorage } from '../redux/store/mmkvStorage';
import { Colors, MMKVStorage } from '../utils/Constants';
import CallLogs from '../utils/CallLogs';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import CallerItem from '../comonents/ui/CallerItem';
import DashboardHeader from '../comonents/dashboard/DashboardHeader';
import ContactList from '../comonents/dashboard/ContactList';

const Dashboard = () => {
    const [callLogs, setCallLogs] = useState([]);
    const [isRefresh, setIsRefresh] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const userData = mmkvStorage.getItem(MMKVStorage.USER) as string;
    const data = userData ? JSON.parse(userData) : null;
    // console.log(data?.name, 'data');

    //fetching Logs
    const fetchRecentLogs = () => {
        CallLogs.getRecentLogs().then((logs: any) => {
            setCallLogs(logs);
            setIsRefreshing(false);
        }).catch(err => console.log(err, 'fetch Call logs'));
    };

    //call fetchLogs
    useEffect(() => {
        fetchRecentLogs();
    }, []);

    //refresh Handler
    const refreshHandler = async () => {
        setIsRefresh(true);
        setIsRefresh(!isRefresh);
        fetchRecentLogs();
    };

    //render calls
    const renderCallers = useCallback(({ item }: any) => {
        return (<CallerItem item={item} />);
    }, []);
    console.log(callLogs, 'calllgongs');
    return (
        <CustomSafeAreaView classStyle="px-2 py-2">
            <View className="flex-row items-center justify-between ">
                <Image source={require('../assets/logo/logo_text.png')}
                    className="h-10 w-32 resize self-center"
                />
                <UserAvatar onPress={() => { }} text={getAbbrName(data?.name || 'U N') || 'UN'} />
            </View>
            <View className="mt-3 ">
                <FlatList
                    keyExtractor={(item: any) => item.id}
                    renderItem={renderCallers}
                    data={callLogs}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={refreshHandler}
                        />
                    }
                    initialNumToRender={5}
                    ListEmptyComponent={
                        <View className="mt-5 items-center">
                            <View className="rounded-full bg-backgroundLight self-center p-5">
                                <MagnifyingGlassIcon size={26} color={Colors.text} />
                            </View>
                            <Text>No Recent Call logs</Text>
                        </View>
                    }
                    windowSize={5}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={<DashboardHeader />}
                    ListFooterComponent={<ContactList isRefresh={isRefresh} />}
                />
            </View>

        </CustomSafeAreaView>
    );
};

export default Dashboard;
