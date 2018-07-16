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
let total_progress = ScreenUtil.screenW / 2 - ScreenUtil.scaleSize(46);
let over_progress = 0;

export function Achievement(itemData) {
    if (itemData.item.value > itemData.item.target) {
        over_progress = total_progress;
    } else {
        over_progress = (itemData.item.value / itemData.item.target) * total_progress;
    }
    let starts = -1;
    switch (itemData.item.stars) {
        case 0:
            starts = require('../../res/imgs/starts_0.png');
            break;
        case 1:
            starts = require('../../res/imgs/starts_1.png');
            break;
        case 2:
            starts = require('../../res/imgs/starts_2.png');
            break;
        case 3:
            starts = require('../../res/imgs/starts_3.png');
            break;
    }


    let simp_value = -1;
    let simp_target = -1;
    if (itemData.item.target === 100000000) {
        simp_target = '1E';
    } else if (itemData.item.target === 1000000) {
        simp_target = '100W';
    }

    if (itemData.item.value > 100000000) {
        simp_value = '1E+'
    } else if (itemData.item.value > 200000000) {
        simp_value = '2E+'
    }

    return (
        <View style={styles.container}>
            <View style={styles.bg_round_view}>
                <Text style={styles.text}>{itemData.item.name}</Text>
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                    <Text style={{color: 'black'}}>{(simp_value === -1 ? itemData.item.value : simp_value)}</Text>
                    <Text style={{
                        fontSize: 10,
                        color: '#999'
                    }}>{' / ' + (simp_target === -1 ? itemData.item.target : simp_target)}</Text>
                </View>
            </View>
            <View>
                <View style={styles.progress_hint}/>
                <View style={{
                    marginLeft: ScreenUtil.scaleSize(15),
                    position: 'absolute',
                    backgroundColor: '#F7BC0A',
                    height: ScreenUtil.scaleSize(10),
                    width: over_progress,
                    borderBottomLeftRadius: ScreenUtil.scaleSize(10),
                    borderBottomRightRadius: ScreenUtil.scaleSize(10),
                }}/>
            </View>

            <Image style={{
                width: ScreenUtil.scaleSize(65),
                height: ScreenUtil.scaleSize(25),
                position: 'absolute',
                marginTop: ScreenUtil.scaleSize(35),
                marginLeft: ScreenUtil.scaleSize(260)
            }} source={starts}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: ScreenUtil.scaleSize(10),
        height: ScreenUtil.scaleSize(110),
        width: ScreenUtil.screenW / 2 - ScreenUtil.scaleSize(15),
    },
    bg_round_view: {
        borderColor: '#999',
        borderWidth: ScreenUtil.scaleSize(1),
        borderTopRightRadius: ScreenUtil.scaleSize(10),
        borderTopLeftRadius: ScreenUtil.scaleSize(10),
        marginLeft: ScreenUtil.scaleSize(15),
        marginRight: ScreenUtil.scaleSize(15),
        paddingLeft: ScreenUtil.scaleSize(5),
        paddingRight: ScreenUtil.scaleSize(5),
    },
    text: {
        color: '#999',
        fontSize: 13
    },
    progress_hint: {
        marginLeft: ScreenUtil.scaleSize(15),
        position: 'absolute',
        backgroundColor: '#999999',
        height: ScreenUtil.scaleSize(10),
        width: total_progress,
        borderBottomLeftRadius: ScreenUtil.scaleSize(10),
        borderBottomRightRadius: ScreenUtil.scaleSize(10),
    },
    progress_cover: {
        marginLeft: ScreenUtil.scaleSize(15),
        position: 'absolute',
        backgroundColor: '#F7BC0A',
        height: ScreenUtil.scaleSize(10),
        width: over_progress,
        borderBottomLeftRadius: ScreenUtil.scaleSize(10),
        borderBottomRightRadius: ScreenUtil.scaleSize(10),
    }
});
