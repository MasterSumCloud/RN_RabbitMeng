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

export function Troops(itemData) {
    let style_img = styles.img_normal;
    let style_txt = styles.text_normal;

    if (itemData.item.level===itemData.item.maxLevel) {
        style_img = styles.img_max;
        style_txt = styles.text_max;
    }

    return (
        <View style={styles.container}>
            <Image style={style_img} source={itemData.item.troop_img}/>
            <Text style={style_txt}>{itemData.item.level}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: ScreenUtil.scaleSize(50),
        height: ScreenUtil.scaleSize(50),
        margin: ScreenUtil.scaleSize(1),

    },
    img_normal: {
        borderWidth: ScreenUtil.scaleSize(1),
        borderColor: '#77769F',
        borderRadius: ScreenUtil.scaleSize(5),
        width: ScreenUtil.scaleSize(50),
        height: ScreenUtil.scaleSize(50),
    },
    img_max: {
        borderWidth: ScreenUtil.scaleSize(1),
        borderColor: '#F8C500',
        borderRadius: ScreenUtil.scaleSize(5),
        width: ScreenUtil.scaleSize(50),
        height: ScreenUtil.scaleSize(50),
    },
    text_normal: {
        paddingRight:ScreenUtil.scaleSize(2),
        textAlign: 'center',
        position: 'absolute',
        marginLeft: ScreenUtil.scaleSize(1),
        marginBottom: ScreenUtil.scaleSize(1),
        fontSize: 8,
        color:'black',
        marginTop: ScreenUtil.scaleSize(27),
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderBottomLeftRadius:ScreenUtil.scaleSize(5),
        borderTopRightRadius:ScreenUtil.scaleSize(3),
    },
    text_max: {
        borderBottomLeftRadius:ScreenUtil.scaleSize(5),
        borderTopRightRadius:ScreenUtil.scaleSize(3),
        paddingRight:ScreenUtil.scaleSize(2),
        textAlign: 'center',
        position: 'absolute',
        marginLeft: ScreenUtil.scaleSize(1),
        marginBottom: ScreenUtil.scaleSize(1),
        fontSize: 8,
        color:'white',
        marginTop: ScreenUtil.scaleSize(27),
        backgroundColor: '#F8C500',
    }
});
