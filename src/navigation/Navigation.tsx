import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './Stack';
import { navigationRef } from '../utils/NavigationUtils';


const Navigation: FC = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack />
        </NavigationContainer>
    );
};

export default Navigation;
