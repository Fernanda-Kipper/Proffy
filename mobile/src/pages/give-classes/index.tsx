import React from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';

import giveClassesBack from '../../assets/images/give-classes-background.png';

import styles from './style';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function giveClassesPage(){
    const {goBack} = useNavigation();

    function handleNavigateBack(){
        goBack();
    }
    return(
        <View style={styles.container}>
            <ImageBackground source={giveClassesBack} style={styles.content} resizeMode='contain'>
                <Text style={styles.title}>
                    Quer ser um Proffy?
                </Text>
                <Text style={styles.p}>
                    Que bom! Primeiro você precisa se cadastrar na nossa plataforma via web :)
                </Text>
            </ImageBackground>
            <RectButton style={styles.okButton} onPress={handleNavigateBack}>
                <Text style={styles.okButtonText}>Tudo bem</Text>
            </RectButton>
        </View>
    );
};

export default giveClassesPage;