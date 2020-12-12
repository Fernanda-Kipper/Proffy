import React, { useState} from 'react';
import { View, ScrollView, Text,  TextInput} from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'

import PageHeader from '../../components/PageHeader';

import styles from './style';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

function StudyPage(){
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isFiltersVisable, setFiltersVisable] = useState(false);

    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState("");
    const [time, setTime] = useState("");
    const [week_day, setWeek_day] = useState("");

    function handleToggleFiltersVisible(){
        setFiltersVisable(!isFiltersVisable);
    }

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response =>{
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const ids = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                });
                setFavorites(ids);
            }
        })
    }

    useFocusEffect(()=>{
        loadFavorites();
    })

    async function handleFiltersSubmit(){
        loadFavorites();

        const response = await api.get('/classes',{
            params:{
                subject,
                week_day,
                time,
            }
        });

        console.log(response.data);
        setTeachers(response.data);
    }

    return(
        <View style={styles.container}>
            <PageHeader title="Esses são os Proffys disponíveis" 
            headerRight={(
                <BorderlessButton onPress={handleToggleFiltersVisible}>
                    <Feather name="filter" size={20} color="#FFF"/>
                </BorderlessButton>
            )}>

                {isFiltersVisable && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria:</Text>
                        <TextInput 
                        value={subject}
                        onChangeText={text => setSubject(text)}
                        placeholderTextColor="#c1bccc" 
                        style={styles.input}
                        placeholder="Qual a matéria?"/>

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana:</Text>
                                <TextInput 
                                value={week_day}
                                onChangeText={text => setWeek_day(text)}
                                style={styles.input}
                                placeholder="ex:Segunda= 1"
                                placeholderTextColor="#c1bccc" />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário:</Text>
                                <TextInput
                                value={time}
                                onChangeText={text => setTime(text)}
                                placeholderTextColor="#c1bccc" 
                                style={styles.input}
                                placeholder="10:00"/>
                            </View>
                        </View>
                        <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                            <Text style={styles.submitButtonText}>
                                Buscar
                            </Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>
            <ScrollView 
            style={styles.teacherList}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16,
            }}
            >
                {teachers.map((teacher: Teacher) => {return (
                <TeacherItem 
                key={teacher.id} 
                teacher={teacher}
                favorited={favorites.includes(teacher.id)}
                />

                )}
                )}
            </ScrollView>
        </View>
    );
};

export default StudyPage;