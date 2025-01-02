import { View, Image, ActivityIndicator } from 'react-native';
import React, { FC, useEffect } from 'react';
import { Colors, MMKVStorage, Routes } from '../utils/Constants';
import { resetAndNavigate } from '../utils/NavigationUtils';
import { storage } from '../redux/store/mmkvStorage';
import { jwtDecode } from 'jwt-decode';

interface DecodeToken {
    exp: number;
}

const Splash: FC = () => {

    //checkAuthentication
    const checkAuthentication = async () => {
        try {
            const accessToken = storage.getString(MMKVStorage.ACCESS_TOKEN) as string;
            if (accessToken) {
                const decodedAccessToken = jwtDecode<DecodeToken>(accessToken);
                const current = Date.now() / 1000;
                if (decodedAccessToken?.exp >= current) {
                    resetAndNavigate(Routes.DASH);
                    return;
                }
            }
            resetAndNavigate(Routes.AUTH);
        } catch (err) {
            console.log('authentication Error', err);
            resetAndNavigate(Routes.AUTH);
        }
    };

    //initial load
    useEffect(() => {
        setTimeout(() => {
            checkAuthentication();
        }, 1000);
    }, []);

    return (
        <View className="bg-white justify-center items-center flex-1">
            <Image source={require('../assets/logo/logo.png')} className="h-40 w-40 rounded-full" />
            <View className="absolute bottom-20">
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        </View>
    );
};

export default React.memo(Splash);
