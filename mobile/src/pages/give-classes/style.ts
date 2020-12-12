import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#8257e5',
        padding: 40
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        fontFamily: 'Archivo_700Bold',
        fontSize: 32,
        color: '#FFF',
        lineHeight: 37,
        maxWidth: 180
    },

    p:{
        fontFamily: 'Poppins_400Regular',
        marginTop: 24,
        fontSize: 18,
        color: '#d4c2ff',
        lineHeight: 26,
        maxWidth: 240
    },
    
    okButton:{
        marginVertical: 40,
        backgroundColor: '#04d361',
        height: 68,
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },

    okButtonText:{
        fontFamily: 'Archivo_700Bold',
        fontSize: 16,
        color: '#FFF',
        alignSelf: 'center'
    }
})

export default styles;