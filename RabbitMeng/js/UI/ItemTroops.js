import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ImageBackground,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';

let ScreenUtil = require('../uitl/ScreenUtil');

export function Troops(self, itemData) {

    return (
        <View style={styles.container}>
            <Image style={styles.img}/>
            <Text style={styles.text}>7</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    img: {
        width: ScreenUtil.scaleSize(40),
        height: ScreenUtil.scaleSize(40),
        backgroundColor: 'red'
    },
    text: {
        width: ScreenUtil.scaleSize(14),
        height: ScreenUtil.scaleSize(14),
        backgroundColor: 'yellow',
    }
});
