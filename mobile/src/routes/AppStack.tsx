import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LandingPage from '../pages/landing';
import giveClassesPage from '../pages/give-classes';
import StudyTabs from './StudyTabs';

const { Navigator, Screen } = createStackNavigator();

function AppStack(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name='LandingPage' component={LandingPage}></Screen>
                <Screen name='giveClassesPage' component={giveClassesPage}></Screen>
                <Screen name='Study' component={StudyTabs}></Screen>
            </Navigator>
        </NavigationContainer>
    );
};

export default AppStack;