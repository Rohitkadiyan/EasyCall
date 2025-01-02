import { View, Text, Platform, PermissionsAndroid, FlatList } from 'react-native';
import React, { FC, useCallback, useEffect, useState } from 'react';
import CallerItem from '../ui/CallerItem';
import Contacts from 'react-native-contacts';
import { addMultipleContacts } from '../../redux/service/Auth';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const ContactList: FC<{ isRefresh: boolean; }> = ({ isRefresh }) => {
    const [contacts, setContacts] = useState<any>([]);

    //fetch Contacts
    const fetchContacts = () => {
        Contacts.getAll().then(async (c) => {
            console.log(c);
            const contactSet = new Set();
            if (c?.length > 0) {
                const formatContacts = c.map((contact) => {
                    return contact?.phoneNumbers.map((phone, index) => {
                        const cleanedNumber = phone.number.replace(/[^\d]/g, '');
                        const last10Digit = cleanedNumber.slice(-10);
                        if (!contactSet.has(last10Digit)) {
                            contactSet.add(last10Digit);
                            return {
                                index,
                                phoneNumber: last10Digit,
                                name: contact?.givenName + ' ' + (contact?.familyName ?? ''),
                                isSpam: false,
                                fraudCount: 0,
                            };
                        }
                        return null;
                    }).filter(Boolean);
                }).flat();
                setContacts(formatContacts);
                await addMultipleContacts(formatContacts);
            }
        });
    };

    //fetch permission
    const fetchPermission = async () => {
        if (Platform.OS === 'android') {
            const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
                title: 'Contacts',
                message: 'This app would like to view your contacts',
                buttonPositive: 'Please accept bare mortal',
            });

            if (permission === PermissionsAndroid.RESULTS.GRANTED) {
                fetchContacts();
            } else {
                console.log('Permission is denied for contacts');
            }
        } else {
            const permission = await Contacts.requestPermission();
            if (permission === 'authorized') {
                fetchContacts();
            }
        }
    };

    //render Callers
    const renderCallers = useCallback(({ item }: any) => (<CallerItem isContacts item={item} />), []);

    useEffect(() => {
        fetchPermission();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRefresh]);

    return (
        <View>
            <Text className="my-4 text-base text-text font-semibold">Contacts</Text>
            <FlatList
                initialNumToRender={5}
                windowSize={5}
                data={contacts?.slice(0, 10) || []}
                keyExtractor={(item: any) => item.phoneNumber}
                renderItem={renderCallers}
                ListEmptyComponent={
                    <View className="mt-5 items-center">
                        <View className="rounded-full bg-backgroundLight self-center p-5">
                            <MagnifyingGlassIcon size={26} color={Colors.text} />
                        </View>
                        <Text>No Contacts </Text>
                    </View>
                }
            />
        </View>
    );
};

export default ContactList;
