import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

let ScreenUtil = require('../uitl/ScreenUtil');

export default class RegistUI extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>

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
