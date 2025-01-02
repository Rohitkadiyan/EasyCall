import { View, Text, TextInput } from 'react-native';
import React, { ComponentProps, FC, useState } from 'react';
import { Colors } from '../../utils/Constants';

interface CustomInputProps {
    value: string;
    label: string;
    placeholder: string;
    onFocus?: () => void;
    onChangeText: (text: string) => void;
}

const CustomInput: FC<CustomInputProps & ComponentProps<typeof TextInput>> = ({ value, onChangeText, placeholder, ...props }) => {
    const [isFocused, setIsFocused] = useState<Boolean>(false);

    //handler Focused
    const handlerFocus = () => {
        setIsFocused(true);
        if (props.onFocus) {
            props.onFocus();
        }
    };

    //handlerBlur
    const handlerBlur = () => {
        setIsFocused(false);
    };

    return (
        <View className="my-2">
            <Text className={`text-md font-semibold ${isFocused ? 'text-primary' : 'text-gray-400'}`}>{props.label}</Text>
            <View className={`mt-2 border-2 text-lg rounded-2xl h-14 w-auto ${isFocused ? 'border-primary' : 'border-gray-300'}`}>
                <TextInput
                    value={value}
                    onFocus={handlerFocus}
                    onBlur={handlerBlur}
                    onChangeText={onChangeText}
                    placeholderTextColor={Colors.lightText}
                    placeholder={placeholder}
                    {...props}
                />
            </View>
        </View>
    );
};

export default CustomInput;
