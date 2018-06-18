import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    ImageBackground,
    SafeAreaView,
    Alert, TouchableWithoutFeedback
} from 'react-native';

let ScreenUtil = require('../uitl/ScreenUtil');

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
            <SafeAreaView>
                <View>
                    {/*背景*/}
                    <ImageBackground resizeMode='stretch' style={{
                        width: ScreenUtil.screenW,
                        height: ScreenUtil.screenH
                    }}
                                     source={require('../../res/imgs/login_bg.jpg')}>
                        {/*背景透明度*/}
                        <ImageBackground resizeMode='contain' style={styles.login_bg}>

                            {/*头像*/}
                            <Image style={styles.image_login_head} roundAsCircle={true}
                                   source={require('../../res/imgs/head_defoult.jpg')}/>
                            {/*登陆 - 用户输入*/}
                            <View style={styles.login_user}>
                                <Image style={styles.login_left_icon} source={require('../../res/imgs/login_email.png')}/>
                                <TextInput placeholderTextColor={'white'} style={styles.login_textinput}
                                           maxLength={30}
                                           underlineColorAndroid='transparent'
                                           onChangeText={(text) => this.setState({username: text})}
                                           placeholder={'E-mail address'}/>

                            </View>
                            {/*登陆 - 密码输入*/}
                            <View style={styles.login_user}>
                                <Image style={styles.login_left_icon} source={require('../../res/imgs/login_password.png')}
                                />
                                <TextInput placeholderTextColor={'white'} placeholder={'Your password'}
                                           style={styles.login_textinput}
                                           secureTextEntry={true}
                                           underlineColorAndroid='transparent'
                                           onChangeText={(text) => this.setState({passWord: text})}
                                           maxLength={16}
                                />
                            </View>
                            {/*登陆安妞*/}
                            <TouchableWithoutFeedback onPress={() => {
                                if (this.state.username === 'Sum' && this.state.passWord === '123456') {
                                    this.props.navigation.navigate('Main');
                                } else {
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
                            <Text style={styles.text_stl_forgot_passworld} onPress={() => {
                                Alert.alert(null, '抱歉，功能暂未开通', '确定');
                            }}>
                                忘记密码?
                            </Text>

                            <View style={styles.line}/>
                            {/*注册*/}
                            <Text style={styles.text_stl_forgot_regist} onPress={() => {
                                Alert.alert(null, '抱歉，暂未开通注册', '确定');
                            }}>
                                没有账号?注册
                            </Text>

                        </ImageBackground>
                    </ImageBackground>

                </View>
            </SafeAreaView>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    image_login_head: {
        marginTop: ScreenUtil.scaleSize(235),
        width: ScreenUtil.scaleSize(140),
        height: ScreenUtil.scaleSize(140),
        marginBottom: ScreenUtil.scaleSize(160),
        borderRadius: 35,
    },
    login_user: {
        flexDirection: 'row',
        alignItems: 'center',
        width: ScreenUtil.scaleSize(535),
        height: ScreenUtil.scaleSize(100),
        backgroundColor: 'black',
        opacity: 0.7,
        marginBottom: 20,
        padding: 10
    },
    login_textinput: {
        flex: 1,
        backgroundColor: null,
        width: ScreenUtil.scaleSize(400),
        height: ScreenUtil.scaleSize(80),
        color: 'white',
        marginLeft: ScreenUtil.scaleSize(40),
    },
    login_btn: {
        color: 'white',
        fontSize: 20
    },
    line: {
        position: 'absolute',
        backgroundColor: 'gray',
        width: ScreenUtil.scaleSize(580),
        height: 1,
        marginTop: ScreenUtil.screenH * 0.895,
    },
    login_left_icon: {
        width: ScreenUtil.scaleSize(60),
        height: ScreenUtil.scaleSize(60),
        tintColor: '#35BB9A',
        backgroundColor: null
    }, login_bg: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)'
        //opacity: 0.6
    }, text_stl_forgot_passworld: {
        marginTop: ScreenUtil.scaleSize(40),
        color: '#999999',
        fontSize: 15
    }, text_stl_forgot_regist: {
        position: 'absolute',
        color: '#999999',
        marginTop: ScreenUtil.screenH * 0.925,
        fontSize: 15
    }, oval_bg: {
        width: ScreenUtil.scaleSize(440),
        height: ScreenUtil.scaleSize(100),
        borderRadius: 25,
        backgroundColor: '#35BB9A',
        marginTop: ScreenUtil.scaleSize(40),
        justifyContent: 'center',
        alignItems: 'center'
    }
});
