import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    ImageBackground,
    SafeAreaView,
    Alert, TouchableWithoutFeedback, Platform
} from 'react-native';

let ScreenUtil = require('../uitl/ScreenUtil');
let SPUtil = require('../uitl/SPUtil');
import Toast, {DURATION} from 'react-native-easy-toast'
import {Navigation} from "react-native-navigation";
import * as Constant from "../uitl/Constant";

export default class LoginUI extends Component {

    static navigationOptions = {
        header: null
    }


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            passWord: '',
            clan_list: [
                {name: '不打部落战只做捐兵狂26部', tag: '#P2YPYLJ', isControl: false},
                {name: 'Extreme丶神', tag: '#JOROUL9J', isControl: false},
                {name: '精英部队', tag: '#20CYRU98', isControl: false},
                {name: '追着幸福跑', tag: '#VVCUVQ2', isControl: false},
                {name: '轩皇', tag: '#PLJL2V0V', isControl: false},
                {name: '天使的守护', tag: '#G02RLVG0', isControl: false},
                {name: 'c.z.s2', tag: '#P0YJQ8UL', isControl: false},
                {name: '我珍惜的时光 ♡ 可已不在了', tag: '#JQQYVUJJ', isControl: false},
                {name: '天使的等待', tag: '#LQR8L9VP', isControl: false}]
        };

    }

    componentDidMount() {

        //初始化部落管理

        SPUtil.saveAsyncStorage(Constant.ControlClan, JSON.stringify(this.state.clan_list), () => {
            console.log('数据储存成功，在登录页')
        }, () => {
            console.log('数据储存失败，在登录页')
        })
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
                                   source={require('../../res/imgs/huli_head_defult.jpeg')}/>
                            {/*登陆 - 用户输入*/}
                            <View style={styles.login_user}>
                                <Image style={styles.login_left_icon}
                                       source={require('../../res/imgs/login_email.png')}/>
                                <TextInput placeholderTextColor={'white'} style={styles.login_textinput}
                                           maxLength={30}
                                           underlineColorAndroid='transparent'
                                           onChangeText={(text) => this.setState({username: text})}
                                           placeholder={'E-mail address'}/>

                            </View>
                            {/*登陆 - 密码输入*/}
                            <View style={styles.login_user}>
                                <Image style={styles.login_left_icon}
                                       source={require('../../res/imgs/login_password.png')}
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
                            <TouchableWithoutFeedback style={{
                                width: ScreenUtil.scaleSize(440),
                                height: ScreenUtil.scaleSize(100)
                            }} onPress={() => {
                                if (this.state.username === '111' && this.state.passWord === '111') {
                                    this._saveLoginState();
                                } else {
                                    this.refs.toast.show('账号或者密码错误');
                                }
                            }}><View>
                                <ImageBackground roundAsCircle={true}
                                                 resizeMode={'stretch'} style={styles.oval_bg}
                                >
                                    <Text style={styles.login_btn}>
                                        登录
                                    </Text>
                                </ImageBackground>
                            </View>
                            </TouchableWithoutFeedback>
                            {/*忘记密码*/}
                            <Text style={styles.text_stl_forgot_passworld} onPress={() => {
                                this.refs.toast.show('抱歉，功能暂未开通');
                            }}>
                                忘记密码?
                            </Text>

                            <View style={styles.line}/>
                            {/*注册*/}
                            <Text style={styles.text_stl_forgot_regist} onPress={() => {
                                this.refs.toast.show('抱歉，暂未开通注册');
                            }}>
                                没有账号?注册
                            </Text>

                        </ImageBackground>
                    </ImageBackground>
                </View>
                <Toast ref="toast"/>
            </SafeAreaView>
        );
    }


    _gotoMain = () => {
        const tabs = [{
            label: '首页',
            screen: 'HomeUI',
            icon: require('../../res/imgs/tab_home.png'),
            title: '首页',
        }, {
            label: '管理',
            screen: 'ControlUI',
            icon: require('../../res/imgs/tab_control.png'),
            title: '管理',
        }, {
            label: '部落',
            screen: 'CocClanUI',
            icon: require('../../res/imgs/tab_coc.png'),
            title: '部落',
        }, {
            label: '我的',
            screen: 'MineUI',
            icon: require('../../res/imgs/tab_mine.png'),
            title: '我的',
        }];

        Navigation.startTabBasedApp({
            tabs,
            animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
            tabsStyle: {
                tabBarBackgroundColor: '#ffffff',
                tabBarButtonColor: '#cccccc',
                tabBarSelectedButtonColor: '#33A1FF',
                tabFontFamily: 'BioRhyme-Bold',
            },
            appStyle: {
                tabBarBackgroundColor: '#F7F7F7',
                navBarButtonColor: '#ffffff',
                tabBarButtonColor: '#CCCCCC',
                navBarTextColor: '#ffffff',
                tabBarSelectedButtonColor: '#33A1FF',
                navigationBarColor: '#33A1FF',
                navBarBackgroundColor: '#33A1FF',
                statusBarColor: '#33A1FF',
                tabFontFamily: 'BioRhyme-Bold',
                forceTitlesDisplay: true,
                navBarTitleTextCentered: true,
            }
        });


    }

    _saveLoginState = () => {
        SPUtil.saveAsyncStorage('LoginState', 'true', () => {
            this.refs.toast.show('登陆成功');
            this._gotoMain();
        }, () => {
            this.refs.toast.show('状态异常，请稍后再试');
        })
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
        tintColor: '#33A1FF',
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
        backgroundColor: '#33A1FF',
        marginTop: ScreenUtil.scaleSize(40),
        justifyContent: 'center',
        alignItems: 'center'
    }
});
