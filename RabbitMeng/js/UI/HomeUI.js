import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ImageBackground
} from 'react-native';
import * as Constant from "../uitl/Constant";
import * as HttpUtil from "../uitl/HttpUtil";

let ScreenUtil = require('../uitl/ScreenUtil');

export default class HomeUI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nextWarTime: '未知',
            nextWarMsg: '未知'
        };
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={{color:'#33A1FF'}}>{'开战信息：' + this.state.nextWarMsg}</Text>
                <Text style={{color:'#33A1FF',marginBottom:ScreenUtil.scaleSize(50),marginTop:ScreenUtil.scaleSize(10)}}>{'下次开战时间：' + this.state.nextWarTime}</Text>
                <Text
                    style={styles.warStartTime}>APP使用说明：第一步，到我的界面，点击部落管理，进入到部落管理页，部落都是待管理，点击待管理，再点击左上角我的，返回到我的页面。第二步，返回到手机主页，杀掉APP应用，然后再打开即可</Text>
                <Text style={styles.warStartTime}>本页面还没开发，因为不知道写啥，有想法私聊我</Text>
            </View>
        );
    }


    componentDidMount() {
        HttpUtil.postJSON('warstarttime', null, function (dataJson) {
            console.log(JSON.stringify(dataJson));
            if (dataJson.state) {
                if (dataJson.data !== undefined && dataJson.data !== null && dataJson.data.length > 0) {
                    this.setState({
                        nextWarTime: dataJson.data[0].fields.warstartT,
                        nextWarMsg: dataJson.data[0].fields.warmsg
                    });
                }
            }
        }.bind(this), function (error) {

        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: ScreenUtil.scaleSize(30)
    },
    warStartTime: {
        marginTop: ScreenUtil.scaleSize(30)
    }
});
