/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { FC } from 'react';
import { mmkvStorage } from '../../redux/store/mmkvStorage';
import { Colors, MMKVStorage, Routes } from '../../utils/Constants';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { navigate } from '../../utils/NavigationUtils';

const DashboardHeader: FC = () => {
    const userData = mmkvStorage.getItem(MMKVStorage.USER) as string;
    const data = userData ? JSON.parse(userData) : null;
    console.log(data?.name, 'data');

    return (
        <View className="mb-4">
            <View className="mb-4">
                <Text className="text-text font-semibold text-lg ">! Welcome, {data?.name || 'Unknown'}</Text>
            </View>
            <TouchableOpacity className=" h-40">
                <Image
                    source={require('../../assets/images/banner.jpg')}
                    style={{ resizeMode: 'contain', height: '100%', width: '100%' }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigate(Routes.SEARCH)}
                className=" flex-row items-center  rounded-full  bg-backgroundLight"
                style={{ paddingVertical: 4, paddingHorizontal: 12, marginVertical: 15 }}
            >
                <MagnifyingGlassIcon size={24} color={Colors.text} />
                <Text className="text-gray-700 w-full">Search  number </Text>
            </TouchableOpacity>
            <View>
                <Text className=" text-base font-semibold text-text">Recents</Text>
            </View>

        </View>
    );
};

export default DashboardHeader;
