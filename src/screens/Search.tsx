/* eslint-disable react-native/no-inline-styles */
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import CustomSafeAreaView from '../comonents/global/CustomSafeAreaView';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { Colors } from '../utils/Constants';
import { goBack } from '../utils/NavigationUtils';
import CallerItem from '../comonents/ui/CallerItem';
import { findUser } from '../redux/service/Auth';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchData, setSearchData] = useState<any>([]);

    //render calls
    const renderCallers = useCallback(({ item }: any) => {
        return (<CallerItem isContacts item={item} />);
    }, []);



    useEffect(() => {
        console.log('search UseEffect');
        console.log(' searchQuery.length ', searchQuery.length);
        //fetch User
        const fetchUser = async () => {
            if (searchQuery.length === 10) {
                try {
                    const data = await findUser(Number(searchQuery));
                    setSearchData([data]);
                } catch (err) {
                    console.log(err, 'search error');
                }
            }
        };
        fetchUser();
    }, [searchQuery]);

    return (
        <CustomSafeAreaView>
            <View className="flex-row w-full items-center justify-between px-2 pt-6 ">
                <View
                    className=" w-4/5 flex-row items-center justify-between rounded-full   bg-backgroundLight "
                    style={{ paddingVertical: 1, borderRadius: 20, paddingHorizontal: 12 }}
                >
                    <MagnifyingGlassIcon size={22} color={Colors.text} />
                    <TextInput
                        placeholder="Search number"
                        placeholderTextColor="#aaa"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        maxLength={10}
                        keyboardType="number-pad"
                        className="h-12 w-full ml-2"
                    />
                </View>
                <TouchableOpacity
                    onPress={() => goBack()}
                    className="w-1/6 bg-red-500 rounded-full justify-center items-center"
                    style={{ paddingVertical: 10, borderRadius: 20 }}
                >
                    <Text className="text-white text-center">Cancel</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={searchData}
                renderItem={renderCallers}
                keyExtractor={(item: any) => item.phoneNumber}
                className="mt-5"
                ListEmptyComponent={
                    <View className="mt-5 items-center">
                        <View className="rounded-full bg-backgroundLight self-center p-4">
                            <MagnifyingGlassIcon size={26} color={Colors.text} />
                        </View>
                        <Text className=" mt-2 font-medium text-gray-500">No Search items found here !</Text>
                    </View>
                }
            />
        </CustomSafeAreaView>
    );
};

export default Search;
