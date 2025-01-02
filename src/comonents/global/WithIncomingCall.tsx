import { FC, useEffect, useRef, useState } from 'react';
import { Image, NativeEventEmitter, StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import React from 'react';
import UserAvatar from '../ui/UserAvatar';
import { Colors, formatPhoneNumber } from '../../utils/Constants';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { findUser } from '../../redux/service/Auth';
import { getAbbrName } from '../../utils/miscUtils';

const callScreeningEvents = new NativeEventEmitter();
export const withIncomingCall = <P extends object>(WrappedComponent: React.ComponentType<P>): FC<P> => {
    const WithIncomingCall: FC<P> = (props) => {
        const [incommingNumber, setIncomingNumber] = useState<string | undefined>('');
        const [userInfo, setUserInfo] = useState<any>();
        const slideAnim = useRef(new Animated.Value(300)).current;
        const backdropAnim = useRef(new Animated.Value(0)).current;

        useEffect(() => {
            const subscription = callScreeningEvents.addListener('CallScreeningEvent', (phoneNumber) => {
                console.log(phoneNumber);
                const cleanedNumber = phoneNumber.replace(/[^\d]/g, '');
                const lastDigits = cleanedNumber.slice(-10);
                setIncomingNumber(lastDigits);
                slideUp(lastDigits);
            });
            return () => {
                subscription.remove();
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        //slide Up
        const slideUp = async (phoneNumber: string) => {
            try {
                const data = await findUser(Number(phoneNumber));
                setUserInfo(data);
            } catch (err) {
                console.log(err, 'slideUpError');
            }
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 1200,
                    useNativeDriver: true,
                }),
                Animated.timing(backdropAnim, {
                    toValue: 0.9,
                    duration: 1200,
                    useNativeDriver: true,
                }),
            ]).start();
        };

        //slide Up
        const slideDown = async () => {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 300,
                    duration: 1200,
                    useNativeDriver: true,
                }),
                Animated.timing(backdropAnim, {
                    toValue: 0,
                    duration: 1200,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setIncomingNumber(undefined);
                setUserInfo(undefined);
            });
        };

        return (
            <View style={styles.container}>
                <WrappedComponent {...props} />
                {incommingNumber && <Animated.View style={[styles.backdrop, { opacity: backdropAnim }]} />}
                {incommingNumber && (
                    <Animated.View style={[styles.subContainer, { transform: [{ translateY: slideAnim }] }]}>
                        <Image
                            source={require('../../assets/logo/logo_text.png')}
                            className="w-20 my-2 h-4"
                            tintColor={'white'}
                        />
                        <View className="bg-[#202124] rounded-lg overflow-hidden">
                            <View className={`${userInfo?.isSpam ? 'bg-error' : 'bg-primary'}`}>
                                <View className="flex-row justify-between p-4">
                                    <View className="flex-1 items-center">
                                        <UserAvatar isSpam={userInfo.isSpam} text={getAbbrName(userInfo?.name ?? 'UN')} onPress={function (): void {
                                            throw new Error('Function not implemented.');
                                        }} />
                                        <View>
                                            <Text className="text-sm font-semibold text-white">Incoming Call...</Text>
                                            <Text className="text-lg font-semibold text-white">{userInfo?.name ?? 'Unknown'}</Text>
                                            <Text className="text-sm font-semibold text-white">{formatPhoneNumber(incommingNumber.slice(-10))}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={slideDown} className="p-1 items-center justify-center self-start rounded-full bg-white">
                                        <XMarkIcon size={16} color={Colors.primary} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                )}
            </View>
        );
    };
    return WithIncomingCall;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.9)',
        zIndex: 1,
    },
    subContainer: {
        position: 'absolute',
        bottom: '10%',
        width: '100%',
        padding: 10,
        zIndex: 2,
    },
});
