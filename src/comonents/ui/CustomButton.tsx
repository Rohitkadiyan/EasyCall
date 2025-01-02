/* eslint-disable react-native/no-inline-styles */
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { Colors } from '../../utils/Constants';

interface CustomButtonProps {
    title: string;
    loading: boolean;
    onPress: () => void;
}

const CustomButton: FC<CustomButtonProps> = ({ title, loading, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            disabled={loading}
            className="p-3 h-14 justify-center items-center "
            style={{ backgroundColor: Colors.primary, borderRadius: 8, borderWidth: 0.1 }}
        >
            {
                loading ? <ActivityIndicator color="#fff" size="small" /> : <Text className="text-lg font-semibold text-white">{title}</Text>
            }
        </TouchableOpacity>
    );
};

export default CustomButton;
