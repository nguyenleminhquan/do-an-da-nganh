import { Feather, FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../misc/colors';
import { login } from '../redux/authenRedux/authenAction';
import { getDoorStatus, getFanStatus, getHumiStatus, getLedStatus, getTempStatus } from '../redux/deviceRedux/deviceAction';


const Login = ({ navigation }) => {
    const dispatch = useDispatch()
    const authenState = useSelector(state => state.authen)
    const [required, setRequired] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hide, setHide] = useState(true)
    const updateSecureTextEntry = () => {
        setHide(!hide);
    }
    const loginAction = () => {
        if (email !== '' && password !== '') {
            const userInfo = { username: email, password }
            dispatch(login(userInfo))
        } else setRequired('Required')
    }
    const navToSignUp = () => {
        navigation.navigate('Register')
    }
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    }

    useLayoutEffect(() => {
        if (authenState.userToken !== '') {
            setEmail('')
            setPassword('')
            navigation.navigate('Main')
            dispatch(getLedStatus(authenState.userToken))
            dispatch(getDoorStatus(authenState.userToken))
            dispatch(getFanStatus(authenState.userToken))
            dispatch(getTempStatus(authenState.userToken))
            dispatch(getHumiStatus(authenState.userToken))
        }
    }, [authenState.userToken])

    return (
        // <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <SafeAreaView style={styles.container}>
            <Text style={styles.nameText}>SMART HOME</Text>
            <Text style={styles.labelText}>Email:</Text>
            <View style={styles.inputbox}>
                <FontAwesome name="user" size={24} color={colors.MAIN} />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => { setEmail(text) }}
                    placeholder='Enter your email'
                />
            </View>
            <Text style={styles.errorMsg}>{email === '' && required}</Text>
            <Text style={styles.labelText}>Password:</Text>
            <View style={styles.inputbox}>
                <FontAwesome name="lock" size={24} color={colors.MAIN} />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => { setPassword(text) }}
                    placeholder='Enter your password'
                    secureTextEntry={hide}
                />
                <TouchableOpacity style={styles.hideBtn}
                    onPress={updateSecureTextEntry}
                >
                    {hide ?
                        <Feather name="eye-off" color="grey" size={20} />
                        :
                        <Feather name="eye" color="grey" size={20} />
                    }
                </TouchableOpacity>
            </View>
            <Text style={styles.errorMsg}>{password === '' && required}</Text>
            <Text style={styles.errorMsg}>{authenState.msg && authenState.msg}</Text>
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
    container: {
        flex: 1,
        backgroundColor: colors.BLANK,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputbox: {
        width: '80%',
        height: 30,
        borderColor: colors.MAIN,
        borderRadius: 30,
        borderWidth: 1,
        flexDirection: 'row',
        marginBottom: 10,
        paddingLeft: 10
    },
    input: {
        width: '85%',
        marginLeft: 5,
        borderLeftColor: colors.MAIN,
        borderLeftWidth: 1,
        height: '90%',
        marginTop: 1.5
    },
    nameText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: colors.MAIN,
        marginBottom: 100
    },
    labelText: {
        fontSize: 18,
        color: colors.MAIN,
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginBottom: 5
    },
    hideBtn: {
        marginBottom: 3.5,
        marginRight: 5,
        width: 25,
        marginLeft: '10%'
    },
    loginBtn: {
        width: '80%',
        height: 40,
        backgroundColor: colors.MAIN,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: colors.BRIGHTTEXT,
        fontSize: 28,
        fontWeight: 'bold'
    },
    registerText: {
        color: colors.MAIN,
        fontWeight: 'bold',
        fontSize: 20
    },
    bottomText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    errorMsg: {
        color: 'red',
    }
});