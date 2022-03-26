import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import { EvilIcons, AntDesign, Feather } from '@expo/vector-icons';
import color from '../misc/color';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authenRedux/authenActions';

const Login = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
    secureTextEntry: true
  });
  const dispatch = useDispatch()

  const updateSecureTextEntry = () => {
    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    });
  }
  const handleUsernameChange = (val) => {
    setData({
      ...data,
      username: val.trim()
    });
  }
  
  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val.trim()
    });
  }

  const handleLogin = () => {
    const data = {
      username: data.username,
      password: data.password
    }
    // dispatch(login(data))  

  }


  return (
    <View style={styles.container}>
        <Text style = {styles.appName}>SMART HOME</Text>
        <Text style={styles.textstyle}>Username:</Text>
        <View style = {styles.textbox}>
            <EvilIcons name="user" size={35} color={color.MAIN}/>
            <TextInput
              style={styles.input}
              placeholder="Your username"
              onChangeText={(val) => handleUsernameChange(val)}
            />
        </View>
        <Text style={styles.textstyle}>Password:</Text>
        <View style = {styles.textbox}>
            <AntDesign name="lock" size={28} color={color.MAIN} />
            <TextInput
              caretHidden = {true}
              style={styles.input}
              onChangeText={(val) => handlePasswordChange(val)}
              secureTextEntry={data.secureTextEntry}
              placeholder="Your password"
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? 
              <Feather name="eye-off" color="grey" size={20}/> :
              <Feather name="eye" color="grey" size={20}/>
              }
            </TouchableOpacity>
        </View>
        <Button title='Login' color = {color.MAIN} onPress={handleLogin}/>
        <Text style = {styles.botomText}>Don't have an account? </Text>
        <Text style = {styles.signup}>Sign up here!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    textbox:{
        alignItems: 'center',
        flexDirection: "row",
        borderRadius: 30,
        borderColor: color.MAIN,
        backgroundColor: '#fff',
        height: 45,
        width: '85%',
        paddingLeft:10,
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom:10
    },
    signup:{
        fontWeight:'bold',
        color: color.MAIN,
    },
    appName:{
        fontSize: 30,
        fontWeight:'bold',
        color: color.MAIN,
        marginBottom: 50
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: '#fff',
      backgroundColor: '#fff',
      width: '72%'
    },
    container: {
        flex: 1,
        backgroundColor: color.BLANK,
        alignItems: 'center',
        justifyContent: 'center',
      },
    botomText:{
        marginTop: 10
    },
    textstyle:{
      fontSize: 20,
      color: color.MAIN,
      marginLeft: '-50%',
      marginBottom:5
    }
  });

export default Login