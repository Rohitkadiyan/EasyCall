/* eslint-disable react-native/no-inline-styles */
import { KeyboardAvoidingView, Image, Text, View, Keyboard } from 'react-native';
import React, { FC, useState } from 'react';
import CustomSafeAreaView from '../comonents/global/CustomSafeAreaView';
import CustomInput from '../comonents/ui/CustomInput';
import CustomButton from '../comonents/ui/CustomButton';
import { navigate, resetAndNavigate } from '../utils/NavigationUtils';
import { Routes } from '../utils/Constants';
import { login } from '../redux/service/Auth';
import { useDispatch } from 'react-redux';

const Auth: FC = () => {
    const [phone, setPhone] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();


    //handlerLogin
    const handleAuth = async () => {
        Keyboard.dismiss();
        setLoading(true);
        try {
            const res = await login(Number(phone));
            const result = await res(dispatch);
            console.log(res, 'response', result);
            resetAndNavigate(Routes.DASH);
        } catch (err) {
            console.log(err, 'Login Error');
            navigate(Routes.REGISTER, { phone: phone });

        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView className="flex-1" keyboardVerticalOffset={10} behavior="padding">
            <CustomSafeAreaView classStyle="py-3 px-2 absoulte">
                <Image source={require('../assets/logo/logo.png')} className="h-28 w-28 resize self-center " />
                <Text className="mt-6 font-semibold text-lg ">Enter Your phone number </Text>
                <Text className="mb-8 text-md mt-2">
                    Truecaller will send you a one-time password via SMS to verify your phone number.
                </Text>
                <CustomInput
                    label="Phone number (+91)"
                    value={phone}
                    maxLength={10}
                    keyboardType="phone-pad"
                    placeholder="Your phone number"
                    onChangeText={setPhone}
                />
                <View style={{ position: 'absolute', bottom: 2, width: '100%' }}>
                    <CustomButton
                        title="Continue"
                        onPress={handleAuth}
                        loading={loading}
                    />
                </View>
            </CustomSafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default Auth;
