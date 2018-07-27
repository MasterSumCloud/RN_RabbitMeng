import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

let ScreenUtil = require('../uitl/ScreenUtil');

export default class HomeUI extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>APP使用说明：第一步，到我的界面，点击部落管理，进入到部落管理页，部落都是待管理，点击待管理，再点击左上角我的，返回到我的页面。第二步，返回到手机主页，杀掉APP应用，然后再打开即可</Text>
                <Text>本页面还没开发，因为不知道写啥，有想法私聊我</Text>
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
        padding: ScreenUtil.scaleSize(30)
    }
});
