import { View } from 'react-native';
import React, { FC, ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SafeAreaViewProps {
    children: ReactNode;
    classStyle?: String;
}

const CustomSafeAreaView: FC<SafeAreaViewProps> = ({ children, classStyle }) => {

    return (
        <SafeAreaView className={`flex-1 bg-white ${classStyle}`}>
            <View className={`flex-1 bg-white ${classStyle}`} >{children}</View>
        </SafeAreaView>
    );
};

export default CustomSafeAreaView;
