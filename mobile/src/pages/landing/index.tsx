import React, { useState, useEffect } from 'react';
import { View, Image, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../../services/api';

import styles from './style'
import landingImg from '../../assets/images/landing.png';
import studyImg from '../../assets/images/icons/study.png';
import classesImg from '../../assets/images/icons/give-classes.png';
import heartImg from '../../assets/images/icons/heart.png';


function LandingPage(){
    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(()=> {
        api.get('connections').then(response => {
            const { total } = response.data;
            setTotalConnections(total)
        })
        }, [])


    const {navigate} = useNavigation();

    function handleNavigateToGiveClassesPage(){
        navigate('giveClassesPage');
    }

    function handleNavigateToStudy(){
        navigate('Study');
    }

    return(
        <View style={styles.container}>
            <Image source={landingImg} style={styles.banner}/>
            <Text style={styles.title}>
                Seja bem-vindo :){'\n'}
                <Text style={styles.titleBold}>
                    O que deseja fazer?
                </Text>
            </Text>
            <View style={styles.buttonContainer}>
                <RectButton onPress={handleNavigateToStudy} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyImg}></Image>
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton onPress={handleNavigateToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
                    <Image source={classesImg}></Image>
                    <Text style={styles.buttonText}>Dar aulas</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas {' '}
                <Image source={heartImg}></Image>
            </Text>
        </View>

    );
};

export default LandingPage;