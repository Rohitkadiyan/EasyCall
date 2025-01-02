/* eslint-disable react-native/no-inline-styles */
import { Image, Text, View, Keyboard, Alert, ScrollView } from 'react-native';
import React, { FC, useState } from 'react';
import CustomSafeAreaView from '../comonents/global/CustomSafeAreaView';
import CustomInput from '../comonents/ui/CustomInput';
import CustomButton from '../comonents/ui/CustomButton';
import { resetAndNavigate } from '../utils/NavigationUtils';
import { Routes } from '../utils/Constants';
import { signUp } from '../redux/service/Auth';
import { useDispatch } from 'react-redux';
import { RouteProp, useRoute } from '@react-navigation/native';

type RegisterRoute = {
    phone: number;
};

type RegisterRouteProp = RouteProp<{ Register: RegisterRoute; }, Routes.REGISTER>;
const Register: FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmial] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const route = useRoute<RegisterRouteProp>();
    console.log(route?.params?.phone);

    //handler Singup
    const handleSignup = async () => {
        console.log('auth');
        Keyboard.dismiss();
        setLoading(true);
        try {
            const res = await signUp(Number(route?.params?.phone), email, `${firstName} ${lastName}`);
            const result = await res(dispatch);
            console.log(res, 'response', result);
            resetAndNavigate(Routes.DASH);
        } catch (err) {
            console.log(err, 'Signup Error');
            Alert.alert('Something went wronge');
            resetAndNavigate(Routes.AUTH);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CustomSafeAreaView classStyle="py-3 px-2 absoulte">
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <Image source={require('../assets/logo/logo_text.png')} className="h-10 w-32 resize self-center" />
                <Text className="mt-6 font-semibold text-lg ">Create Profile </Text>
                <Text className="mb-8 text-md mt-2">
                    Your name and profile picture will be user for caller Id.
                </Text>
                <CustomInput
                    label="Email"
                    value={email}
                    placeholder="Your email "
                    onChangeText={setEmial}
                />
                <CustomInput
                    label="First Name"
                    value={firstName}
                    placeholder="Your first name"
                    onChangeText={setFirstName}
                />
                <CustomInput
                    label="Last Name"
                    value={lastName}
                    placeholder="Your last name"
                    onChangeText={setLastName}
                />
                <View style={{ position: 'absolute', bottom: 2, width: '100%' }}>
                    <CustomButton
                        title="Sign Up"
                        onPress={handleSignup}
                        loading={loading}
                    />
                </View>
            </ScrollView>
        </CustomSafeAreaView>
    );
};

export default React.memo(Register);
