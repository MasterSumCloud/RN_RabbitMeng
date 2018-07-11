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

export function Troops(itemData,self) {

    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require('../../res/troops/lava_hound.png')}/>
            <Text style={styles.text}>{itemData.item.level}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: ScreenUtil.scaleSize(50),
        height: ScreenUtil.scaleSize(50),
    },
    img: {
        margin:ScreenUtil.scaleSize(1),
        borderWidth:ScreenUtil.scaleSize(1),
        borderColor:'blue',
        borderRadius:ScreenUtil.scaleSize(5),
        width: ScreenUtil.scaleSize(50),
        height: ScreenUtil.scaleSize(50),
    },
    text: {
        textAlign:'center',
        borderRadius:ScreenUtil.scaleSize(5),
        position:'absolute',
        marginLeft:ScreenUtil.scaleSize(2),
        marginBottom:ScreenUtil.scaleSize(2),
        fontSize:7,
        marginTop:ScreenUtil.scaleSize(35),
        width: ScreenUtil.scaleSize(14),
        height: ScreenUtil.scaleSize(14),
        backgroundColor: 'yellow',
    }
});
