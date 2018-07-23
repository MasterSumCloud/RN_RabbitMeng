import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';
let ScreenUtil = require('../uitl/ScreenUtil');

export default class HomeUI extends Component {

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
            <View style={styles.container}>
                <Text>APP使用说明：到我的界面，选择部落管理，选择你要管理的部落，回来刷新界面！</Text>
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
        padding:ScreenUtil.scaleSize(30)
    }
});
