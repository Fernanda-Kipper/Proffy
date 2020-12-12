import React, { useState} from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import styles from './style';
import PageHeader from '../../components/PageHeader';
import { ScrollView } from 'react-native-gesture-handler';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';

function FavoritesPage(){
    const [favorites, setFavorites] = useState([]);
    
    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response =>{
            if(response){
                const favoritedTeachers = JSON.parse(response);
                setFavorites(favoritedTeachers);
            }
        })
    }

    useFocusEffect(()=> {
        loadFavorites();
    });
    
    return(
        <View style={styles.container}>
            <PageHeader title="Meus Proffys preferidos"></PageHeader>
            <ScrollView 
            style={styles.teacherList}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16,
            }}
            >
                {favorites.map((teacher: Teacher) => {return(
                <TeacherItem 
                key={teacher.id}
                favorited
                teacher={teacher}/>
                )})}
            </ScrollView>
        </View>
    );
};

export default FavoritesPage;