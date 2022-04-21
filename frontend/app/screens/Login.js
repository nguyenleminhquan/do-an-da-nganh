import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../misc/colors';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../redux/authenRedux/authenActions'
import { getDoorStatus, getFanStatus, getLedStatus } from '../redux/deviceRedux/deviceAction';

const Login = () => {
    const dispatch = useDispatch()
    const loginSuccess = useSelector(state => state.authen.loginSuccess)
    const errorMsg = useSelector(state => state.authen.errorMsg)
    const navigation = useNavigation();
    const [required, setRequired] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hide, setHide] = useState(true)
    const updateSecureTextEntry = () => {
        setHide(!hide);
    }
    const loginAction = () => {
        if (username !== '' && password !== '') {
            const userInfo = {username, password}
            dispatch(login(userInfo))
            dispatch(getDoorStatus())
            dispatch(getLedStatus())
            dispatch(getFanStatus())
        } else setRequired('Required')
    }
    const navToSignUp = () => {
        navigation.navigate('Register');
    }
    const dismissKeyboard = () =>{
        Keyboard.dismiss();
    }

    useEffect(() => {
        if (loginSuccess) {
            navigation.navigate('Main');
        }
    }, [loginSuccess])

    return (
        // <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <SafeAreaView style={styles.container}>
            <Text style={styles.nameText}>SMART HOME</Text>
            <Text>{errorMsg && errorMsg}</Text>
            <Text style={styles.labelText}>Username:</Text>
            <View style={styles.inputbox}>
                <FontAwesome name="user" size={24} color={colors.MAIN}/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>{setUsername(text)}}
                    placeholder='Enter your username'
                />
            </View>
            <Text style={styles.errorMsg}>{username === '' && required}</Text>
            <Text style={styles.labelText}>Password:</Text>
            <View style={styles.inputbox}>
                <FontAwesome name="lock" size={24} color={colors.MAIN}/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>{setPassword(text)}}
                    placeholder='Enter your password'
                    secureTextEntry={hide}
                />
                <TouchableOpacity style={styles.hideBtn}
                    onPress={updateSecureTextEntry}
                    >
                    {hide ? 
                    <Feather name="eye-off" color="grey" size={20}/>
                    :
                    <Feather name="eye" color="grey" size={20}/>
                }
                </TouchableOpacity>
            </View>
            <Text style={styles.errorMsg}>{password === '' && required}</Text>
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={loginAction}
            >
                <Text style={styles.btnText}>LOGIN</Text>
            </TouchableOpacity>
            <Text style={styles.bottomText}>Don't have an acount?</Text>
            <TouchableOpacity onPress={navToSignUp}>
                <Text style={styles.registerText}>Register Now!</Text>
            </TouchableOpacity>
        </SafeAreaView>
        // </TouchableWithoutFeedback>
    );
}

export default Login;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.BLANK,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputbox:{
        width: '80%',
        height: 30,
        borderColor: colors.MAIN,
        borderRadius: 30,
        borderWidth: 1,
        flexDirection: 'row',
        marginBottom: 10,
        paddingLeft: 10
    },
    input:{
        width: '85%',
        marginLeft: 5,
        borderLeftColor: colors.MAIN,
        borderLeftWidth: 1,
        height: '90%',
        marginTop: 1.5
    },
    nameText:{
        fontSize:40,
        fontWeight: 'bold',
        color: colors.MAIN,
        marginBottom: 100
    },
    labelText:{
        fontSize: 18,
        color: colors.MAIN,
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginBottom: 5
    },
    hideBtn:{
        marginBottom: 3.5,
        marginRight: 5,
        width: 25,
        marginLeft: '10%'
    },
    loginBtn:{
        width: '80%',
        height: 40,
        backgroundColor: colors.MAIN,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText:{
        color: colors.BRIGHTTEXT,
        fontSize: 28,
        fontWeight: 'bold'
    },
    registerText:{
        color: colors.MAIN,
        fontWeight: 'bold',
        fontSize: 20
    },
    bottomText:{
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    errorMsg: {
        color: 'red',
    }
});
