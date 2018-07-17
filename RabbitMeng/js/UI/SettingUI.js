import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    Button,
    TouchableWithoutFeedback
} from 'react-native';
import {Navigation} from "react-native-navigation";

let ScreenUtil = require('../uitl/ScreenUtil');
let SPUtil = require('../uitl/SPUtil');
import Toast, {DURATION} from 'react-native-easy-toast'

export default class SettingUI extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
    }

    _login = (result) => {
        this.props.navigator.resetTo({
            screen: 'LoginUI'
        });
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container_v}>
                    <View style={styles.item_set}>
                        <Text style={styles.setting_text}>头像修改</Text>

                        <Image style={styles.arr_right} source={require('../../res/imgs/arrow_right.png')}/>
                    </View>

                    <View style={styles.item_set}>
                        <Text style={styles.setting_text}>修改密码</Text>

                        <Image style={styles.arr_right} source={require('../../res/imgs/arrow_right.png')}/>
                    </View>

                    <View style={styles.item_set}>
                        <Text style={styles.setting_text}>关于兔萌</Text>

                        <Image style={styles.arr_right} source={require('../../res/imgs/arrow_right.png')}/>
                    </View>

                    <TouchableWithoutFeedback onPress={() => {
                        SPUtil.saveAsyncStorage('LoginState', 'false', () => {
                            Navigation.startSingleScreenApp({
                                screen: {
                                    screen: 'LoginUI',
                                    title: null,
                                    navigatorButtons: {},
                                    navigatorStyle: {
                                        navBarHidden: true
                                    }
                                },
                                animationType: 'slide-down',


                            });
                        }, () => {
                            this.refs.toast.show('状态异常，请稍后再试');
                        })

                    }}  style={styles.login_out} >
                        <View style={styles.login_out_view}>
                            <Text style={{color: '#33A1FF'}}>退出登录</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Toast ref="toast"/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: ScreenUtil.screenW,
        flex: 1,
        backgroundColor: 'white',
    },
    container_v: {
        flex: 1,
        height: ScreenUtil.screenH * 0.79,
        alignItems: 'center',
    },
    item_set: {
        paddingRight: ScreenUtil.scaleSize(15),
        paddingLeft: ScreenUtil.scaleSize(15),
        height: ScreenUtil.scaleSize(100),
        width: ScreenUtil.screenW,
        flexDirection: 'row',
        alignItems: 'center'
    },
    arr_right: {
        position: 'absolute',
        width: ScreenUtil.scaleSize(14),
        height: ScreenUtil.scaleSize(24),
        marginLeft: ScreenUtil.screenW * 0.95
    },
    setting_text: {
        fontSize: 15
    },
    login_out: {
        height: ScreenUtil.scaleSize(100),
        width: ScreenUtil.scaleSize(480),
        borderColor: '#EFEFEF',
        borderWidth: ScreenUtil.scaleSize(1),
        borderRadius: ScreenUtil.scaleSize(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    login_out_view:{
        position: 'absolute',
        height: ScreenUtil.scaleSize(100),
        width: ScreenUtil.scaleSize(480),
        borderColor: '#EFEFEF',
        borderWidth: ScreenUtil.scaleSize(1),
        borderRadius: ScreenUtil.scaleSize(5),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:ScreenUtil.screenH*0.65
    }
});
