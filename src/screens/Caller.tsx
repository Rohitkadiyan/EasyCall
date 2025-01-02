/* eslint-disable react-native/no-inline-styles */
import { View, Text, TouchableOpacity, ScrollView, Linking, Image } from 'react-native';
import React, { FC, useEffect } from 'react';
import { Colors, formatPhoneNumber, Routes } from '../utils/Constants';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getAbbrName } from '../utils/miscUtils';
import { addMultipleContacts, reportSpam } from '../redux/service/Auth';
import CustomSafeAreaView from '../comonents/global/CustomSafeAreaView';
import { goBack } from '../utils/NavigationUtils';
import { ChatBubbleOvalLeftEllipsisIcon, ChevronLeftIcon, EllipsisHorizontalCircleIcon, NoSymbolIcon, PhoneArrowUpRightIcon, ShieldExclamationIcon } from 'react-native-heroicons/outline';
import ActionButton from '../comonents/ui/ActionButton';


interface callerScreenRouteParams {
    item: {
        name: string;
        isSpam: boolean;
        phoneNumber: number;
    };
}
type callerScreenRouteProp = RouteProp<{ Caller: callerScreenRouteParams; }, Routes.CALLER>;

const Caller: FC = () => {
    const route = useRoute<callerScreenRouteProp>();
    const item = route?.params?.item ?? {};
    console.log(item);

    const border = `${item?.isSpam ? 'border-error' : 'border-primary'}`;
    const bg = `${item?.isSpam ? 'bg-red-100' : 'bg-backgroundLight'}`;
    const textColor = `${item?.isSpam ? 'text-red-500' : 'text-primary'}`;

    const abbrName = getAbbrName(item?.name || 'UN');



    useEffect(() => {
        //add Contact
        const addContact = () => {
            try {
                addMultipleContacts([route?.params?.item]);
            } catch (err) {
                console.log(err, 'add contact error');
            }
        };
        addContact();

    }, [route?.params?.item]);

    return (
        <CustomSafeAreaView>
            <View className="flex-row mt-4 px-2 items-center justify-between">
                <TouchableOpacity onPress={goBack} className="flex-row items-center">
                    <ChevronLeftIcon size={20} color={Colors.primary} />
                    <Text className="font-medium text-primary text-md">Back</Text>
                </TouchableOpacity>
                <Text className="font-medium text-gray-400 text-xs">IDENTIFIED BY TRUECALLER</Text>
                <EllipsisHorizontalCircleIcon size={22} color={Colors.primary} />
            </View>
            <ScrollView style={{ flex: 1, marginTop: 5 }} showsVerticalScrollIndicator={false}>
                <View className="items-center m-4">
                    <View className={`${bg} ${border} border-2 rounded-full h-32 w-32 justify-center items-center`}>
                        <Text className={`${textColor} text-3xl font-semibold`}>{abbrName}</Text>
                    </View>
                    <Text className="text-2xl font-normal mt-2 text-text">{item?.name ?? 'Unknown'}</Text>
                    <View className="my-4 w-full flex-row items-center justify-around">
                        <ActionButton
                            onPress={() => Linking.openURL(`tel:${item?.phoneNumber}`)}
                            icon={<PhoneArrowUpRightIcon size={25} color={Colors.primary} />}
                            label="Call"
                        />
                        <ActionButton
                            onPress={() => Linking.openURL(`sms:${item?.phoneNumber}`)}
                            icon={<ChatBubbleOvalLeftEllipsisIcon size={25} color={Colors.primary} />}
                            label="Message"
                        />
                        <ActionButton
                            onPress={async () => {
                                try {
                                    await reportSpam(item?.phoneNumber);
                                } catch (err) {
                                    console.log(err);
                                }
                            }}
                            icon={<ShieldExclamationIcon size={25} color={'red'} />}
                            label="Report Spam"
                        />
                        <ActionButton
                            onPress={() => { }}
                            icon={<NoSymbolIcon size={25} color={Colors.primary} />}
                            label="Block"
                        />
                    </View>
                    <View className="rounded-xl w-full   border-1  border-border p-3">
                        <Text className="text-md font-normal text-gray-500">Mobile - SIM </Text>
                        <Text className="text-text text-base font-normal">{formatPhoneNumber(item?.phoneNumber?.toString())}</Text>
                    </View>
                    <View className="rounded-xl w-full   border-1  border-border p-3">
                        <Text className="text-md font-normal text-gray-500">Address </Text>
                        <Text className="text-text text-base font-normal">Karnal, Assandh, Haryana 132001</Text>
                    </View>
                    {/* <Text className="font-semibold text-center my-2 text-primary">ADVERTISEMENT</Text> */}
                    <TouchableOpacity className="my-4 w-full">
                        <Image source={require('../assets/images/banner.jpg')} className="w-full h-18 " resizeMode="contain" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </CustomSafeAreaView>
    );
};

export default Caller;
