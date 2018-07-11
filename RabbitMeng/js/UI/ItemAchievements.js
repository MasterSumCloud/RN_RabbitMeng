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

export function Achievement(itemData) {

    return (
        <View style={styles.container}>
            <View style={styles.bg_round_view}>
                <Text style={styles.text}>{itemData.item.name}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'black'}}>{itemData.item.value}</Text>
                    <Text style={{fontSize: 10, color: '#999'}}>{' / '+itemData.item.target}</Text>
                </View>
            </View>
            <View>
                <View style={styles.progress_hint}/>
                <View style={styles.progress_cover}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop:ScreenUtil.scaleSize(10),
        backgroundColor:'pink',
        elevation: 4,
        height: ScreenUtil.scaleSize(120),
        width: ScreenUtil.screenW / 2-ScreenUtil.scaleSize(15),
    },
    bg_round_view: {
        backgroundColor: 'yellow',
        marginLeft: ScreenUtil.scaleSize(15),
        marginRight: ScreenUtil.scaleSize(15),
    },
    text: {
        color: '#666666',
        fontSize: 15
    },
    progress_hint: {
        marginLeft:ScreenUtil.scaleSize(15),
        position: 'absolute',
        backgroundColor: '#999999',
        height:ScreenUtil.scaleSize(10),
        width:ScreenUtil.screenW / 2-ScreenUtil.scaleSize(45),
    },
    progress_cover: {
        marginLeft:ScreenUtil.scaleSize(15),
        position: 'absolute',
        backgroundColor: '#F7BC0A',
        height:ScreenUtil.scaleSize(10),
        width:ScreenUtil.scaleSize(260),
    }
});
