import { View, Text, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';

interface ActionButtonProp {
    onPress?: () => void;
    icon: JSX.Element;
    label: string;
}

const ActionButton: FC<ActionButtonProp> = ({ icon, label, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} className="items-center space-y-1">
            <View className=" p-4 border-2  border-border rounded-full ">
                {icon}
            </View>
            <Text>{label}</Text>
        </TouchableOpacity>
    );
};

export default ActionButton;
