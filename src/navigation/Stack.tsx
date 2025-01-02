import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../utils/Constants';
import { Auth, Caller, Dashboard, Register, Search, Splash } from '../screens';
import { withIncomingCall } from '../comonents/global/WithIncomingCall';

const StackNav = createNativeStackNavigator();
const Stack: FC = () => {
    return (
        <StackNav.Navigator initialRouteName={Routes.SPALASH} screenOptions={{ headerShown: false }}>
            <StackNav.Screen name={Routes.SPALASH} component={Splash} />
            <StackNav.Screen name={Routes.AUTH} component={Auth} />
            <StackNav.Screen name={Routes.REGISTER} component={Register} />
            <StackNav.Screen name={Routes.DASH} component={withIncomingCall(Dashboard)} />
            <StackNav.Screen name={Routes.CALLER} component={withIncomingCall(Caller)} />
            <StackNav.Screen name={Routes.SEARCH} component={withIncomingCall(Search)} />
        </StackNav.Navigator>
    );
};

export default Stack;
