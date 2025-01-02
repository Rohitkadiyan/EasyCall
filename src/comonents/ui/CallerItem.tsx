import { View, Text, TouchableOpacity } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { findUser } from '../../redux/service/Auth';
import { getAbbrName } from '../../utils/miscUtils';
import { navigate } from '../../utils/NavigationUtils';
import { formatPhoneNumber, Routes } from '../../utils/Constants';
import UserAvatar from './UserAvatar';
import { ChevronRightIcon } from 'react-native-heroicons/outline';

const CallerItem: FC<{ item: any, isContacts?: boolean; }> = ({ item, isContacts }) => {
    const [dbUser, setDbUser] = useState<any>();

    useEffect(() => {
        //fetchFromDB
        const fetchFromDb = async () => {
            try {
                const data = await findUser(item?.phoneNumber);
                setDbUser(data);
            } catch (err) {
                setDbUser(item);
                console.log(err, 'error');
            }
        };
        fetchFromDb();
    }, [item]);

    const name = getAbbrName(dbUser?.name ?? 'UN');

    return (
        <TouchableOpacity
            onPress={() => navigate(Routes.CALLER, { item: dbUser })}
            className="mb-2 flex-row items-center justify-between mt-1"
        >
            <View className="flex-row items-center space-x-2">
                <UserAvatar
                    isSpam={dbUser?.isSpam}
                    onPress={() => navigate(Routes.CALLER, { item: dbUser })}
                    text={name.toUpperCase()}
                />
                <View className="w-56 space-y-1 space-x-2 ms-3">
                    <Text className="text-md text-text font-semibold">{dbUser?.name || 'Unknown'}</Text>
                    <Text className="text-md text-text font-semibold">{formatPhoneNumber(item?.phoneNumber?.toString() ?? '')}{!isContacts && ' . ' + item?.formattedDate}</Text>
                </View>
            </View>
            <ChevronRightIcon size={20} />
        </TouchableOpacity>
    );
};

export default CallerItem;
