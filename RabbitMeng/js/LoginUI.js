import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    ImageBackground,
    Alert, TouchableWithoutFeedback
} from 'react-native';

var Dimensions = require('Dimensions'); //必须要写这一行，否则报错，无法找到这个变量
var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

export default class LoginUI extends Component {

    static navigationOptions = {
        header: null
    }


    constructor(props) {
        super(props);
        this.state = {username: '', passWord: ''};

    }

    render() {
        return (
            <View style={styles.container}>
                {/*背景*/}
                <ImageBackground resizeMode='contain' style={{
                    width: ScreenWidth,
                    height: ScreenHeight
                }}
                                 source={require('../res/imgs/login_bg.jpg')}>
                    {/*背景透明度*/}
                    <ImageBackground resizeMode='contain' style={styles.login_bg}>

                        {/*头像*/}
                        <Image style={styles.image_login_head} roundAsCircle={true}
                               source={require('../res/imgs/head_defoult.jpg')}/>
                        {/*登陆 - 用户输入*/}
                        <View style={styles.login_user}>
                            <Image style={styles.login_left_icon} source={require('../res/imgs/login_email.png')}/>
                            <TextInput placeholderTextColor={'white'} style={styles.login_textinput}
                                       maxLength={30}
                                       onChangeText={(text) => this.setState({username: text})}
                                       placeholder={'E-mail address'}/>

                        </View>
                        {/*登陆 - 密码输入*/}
                        <View style={styles.login_user}>
                            <Image style={styles.login_left_icon} source={require('../res/imgs/login_password.png')}
                            />
                            <TextInput placeholderTextColor={'white'} placeholder={'Your password'}
                                       style={styles.login_textinput}
                                       secureTextEntry={true}
                                       onChangeText={(text) => this.setState({passWord: text})}
                                       maxLength={16}
                            />
                        </View>
                        {/*登陆安妞*/}
                        <TouchableWithoutFeedback onPress={() => {
                            if (this.state.username==='Sum' && this.state.passWord==='123456'){
                                this.props.navigation.navigate('Main');
                            }else {
                                Alert.alert(null, '账号或者密码错误', '确定');
                            }
                        }}>
                            <ImageBackground roundAsCircle={true}
                                             resizeMode={'stretch'} style={styles.oval_bg}>
                                <Text style={styles.login_btn}>
                                    登录
                                </Text>
                            </ImageBackground>
                        </TouchableWithoutFeedback>
                        {/*忘记密码*/}
                        <TouchableWithoutFeedback onPress={() => {
                            Alert.alert(null, '抱歉，功能暂未开通', '确定');
                        }}>
                            <Text style={styles.text_stl_forgot_passworld}>
                                忘记密码?
                            </Text>
                        </TouchableWithoutFeedback>

                        <View style={styles.line}/>
                        {/*注册*/}
                        <TouchableWithoutFeedback onPress={() => {
                            Alert.alert(null, '抱歉，暂未开通注册', '确定');
                        }}>
                            <Text style={styles.text_stl_forgot_regist}>
                                没有账号?注册
                            </Text>
                        </TouchableWithoutFeedback>

                    </ImageBackground>
                </ImageBackground>

            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    image_login_head: {
        marginTop: 168,
        width: 70,
        height: 70,
        marginBottom: 65,
        borderRadius: 35,
    },
    login_user: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 280,
        height: 50,
        backgroundColor: 'black',
        opacity: 0.7,
        borderWidth: 10,
        marginBottom: 20
    },
    login_textinput: {
        flex: 1,
        backgroundColor: 'black',
        width: 400,
        color: 'white',
        marginLeft: 20,
    },
    login_btn: {
        color: 'white',
        fontSize: 20
    },
    line: {
        backgroundColor: 'gray',
        width: 200,
        height: 1,
        marginTop: 70,
    },
    login_left_icon: {
        width: 30,
        height: 30,
        tintColor: '#35BB9A'
    }, login_bg: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)'
        //opacity: 0.6
    }, text_stl_forgot_passworld: {
        marginTop: 20,
        color: '#999999',
        fontSize: 15
    }, text_stl_forgot_regist: {
        color: '#999999',
        justifyContent: 'flex-end',
        marginTop: 10,
        fontSize: 15
    }, oval_bg: {
        width: 220,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#35BB9A',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
