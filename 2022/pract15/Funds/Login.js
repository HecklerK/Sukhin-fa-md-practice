import React, {useState} from "react";
import {Text, SafeAreaView, TextInput, Button, View, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthContext} from "../context/context";

export default function Earnings() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { signIn } = React.useContext(AuthContext)

    const storeToken = async (value) => {
        try {
            await AsyncStorage.setItem('token', JSON.parse(value)["token"])
        } catch (e) {
            console.log('cant save token')
        }
    }

    async function clearToken() {
        AsyncStorage.removeItem('token')
    }

    function submitHandler() {
        const requestOptions = {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": username,
                "password": password
            })
        }

        fetch('https://6391c942b750c8d178cd4371.mockapi.io/api/users', requestOptions).then((res) => {
            return res.json()
        }).then((res) => {

            if (res !== '' && res !== 'error') {
                storeToken(res).then(() => {
                    signIn()
                })
                console.log('GOT TOKEN')
            } else {
                console.log('GOR ERROR OR EMPTY RESULT')
            }
        }).catch(function (error) {
            console.log(error.stack)
            console.log('GOT ERROR: ', error)

        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                defaultValue={username}
                onChangeText={text => setUsername(text)}
                placeholder={'Username'}
                style={styles.input}
            />
            <TextInput
                defaultValue={password}
                onChangeText={text => setPassword(text)}
                placeholder={'Password'}
                style={styles.input}
                secureTextEntry={true}
            />
            <Button
                title={'Login'}
                style={styles.input}
                onPress={submitHandler}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 300,
        height: 48,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    }
});
