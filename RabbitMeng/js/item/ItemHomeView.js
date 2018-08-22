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

export function ItemHomeType1(itemData) {
    return (
        <View>
            <Text style={styles.title_style}>{itemData.title}</Text>
            <ImageBackground resizeMode='stretch' style={styles.imgbg} source={{uri: itemData.bgurl}}>
                <Text style={styles.white_text}>{itemData.nextWarMsg}</Text>
                <Text style={styles.white_text}>{itemData.nextWarTime}</Text>
            </ImageBackground>
            <Text style={styles.push_text}>{itemData.publishTime}</Text>
        </View>
    );
}

export function ItemHomeType2(itemData) {
    return (
        <View>
            <Text style={styles.title_style}>{itemData.title}</Text>
            <Image style={styles.imgbg} source={{uri: itemData.bgurl}}/>
            <Text style={styles.push_text}>{itemData.publishTime}</Text>
        </View>
    );
}

export function ItemHomeView(itemData) {
    return (
        <View>
            <Text style={styles.title_style}>{itemData.title}</Text>
            <Image style={styles.imgbg} source={{uri: itemData.bgurl}}/>
            <Text style={styles.push_text}>{itemData.publishTime}</Text>
        </View>
    );
}


export const styles = StyleSheet.create({
    container: {},
    title_style: {
        fontSize: 18
    },
    imgbg: {
        marginTop: ScreenUtil.scaleSize(10),
        marginBottom: ScreenUtil.scaleSize(10),
        width: ScreenUtil.screenW,
        height: ScreenUtil.scaleSize(360),
        alignItems: 'center',
        justifyContent: 'center'
    },
    push_text: {
        color: '#666'
    },
    white_text: {
        color: 'white',
        fontSize: 26
    }
});
