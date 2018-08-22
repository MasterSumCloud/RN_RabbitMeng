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

export default class AboutRabbitmeng extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.rabbiticon} source={require('../../res/icon/icon.png')}/>
                <Text style={styles.rabbittext}>兔萌</Text>
                <Text>{'当前版本 V1.4.1'}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: ScreenUtil.screenW,
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    rabbittext: {
        fontSize: 24,
        marginBottom: ScreenUtil.scaleSize(10)
    },
    rabbiticon: {
        width: ScreenUtil.scaleSize(200),
        height: ScreenUtil.scaleSize(200),
        marginTop: ScreenUtil.scaleSize(150),
        marginBottom: ScreenUtil.scaleSize(10)
    }
});
