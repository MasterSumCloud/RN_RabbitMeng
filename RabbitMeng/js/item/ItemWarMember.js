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

export function ItemWarmember(itemData) {

    return (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: itemData.index % 2 === 0 ? 'white' : '#F7F7F7',
            height: ScreenUtil.scaleSize(100),
        }} id={itemData.index}>
            <View style={styles.text_index}>
                <Text style={styles.index_s}>{itemData.index + 1}</Text>
            </View>

            <View style={styles.name_view}>
                <Text style={styles.coc_name}>{itemData.item.name}</Text>
                <Text style={styles.coc_tag}>{itemData.item.tag}</Text>
            </View>

            <View style={styles.text_attack}>
                <Text>{itemData.item.attacks}</Text>
            </View>

            <View style={styles.text_center}>
                <Text>{itemData.item.collectTime}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    name_view: {
        alignItems: 'center',
        justifyContent: 'center',
        // width: ScreenUtil.scaleSize(140),
        flex: 5,
    },
    index_s: {},
    coc_name: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 12,
    },
    coc_tag: {
        fontSize: 8,
        textAlign: 'center',
        justifyContent: 'center',
        color: '#999999'
    },
    text_center: {
        // width: ScreenUtil.scaleSize(100),
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_attack: {
        // width: ScreenUtil.scaleSize(100),
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_index: {
        // width: ScreenUtil.scaleSize(100),
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
