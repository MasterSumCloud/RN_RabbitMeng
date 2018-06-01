import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput
} from 'react-native';

export default class LoginUI extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image_login_head}/>
                <View style={styles.login_user}>
                    <Image style={styles.login_left_icon} source={{uri: './res/imgs/login_email.png'}}/>
                    <Image
                        style={styles.icon}
                        source={require('./res/imgs/login_email.png')}
                    />
                    <TextInput style={styles.login_textinput}/>
                </View>
                <View style={styles.login_user}>
                    <Image style={styles.login_left_icon} source={{uri: './res/imgs/login_password.png'}}
                    />
                    <TextInput style={styles.login_textinput}/>
                </View>
                <Text style={styles.login_btn}>
                    Sign in
                </Text>
                <Text>
                    Forgot password?
                </Text>
                <View style={styles.line}/>
                <Text>
                    New here?Sing Up
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    image_login_head: {
        width: 140,
        height: 140,
        backgroundColor: 'blue',
    },
    login_user: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 450,
        height: 80,

    },
    login_textinput: {
        flex: 1
    },
    login_btn: {
        width: 370,
        height: 80,
        backgroundColor: '#35BB9A'
    },
    line: {
        backgroundColor: 'gray',
        width: 500,
        height: 1
    },
    login_left_icon: {
        width: 40,
        height: 40,
        tintColor: '#35BB9A'
    }
});
