import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ImageBackground,
    ScrollView
} from 'react-native';

let ScreenUtil = require('../uitl/ScreenUtil');

export function ItemCocClan(itemData) {
    return <View style={styles.container} id={itemData.index}>
        <Text style={styles.index_s}>{itemData.index + 1}</Text>

        <Image style={styles.home_town_img}/>

        <View style={styles.name_view}>
            <Text>{itemData.item.name}</Text>
            <Text>{itemData.item.tag}</Text>
        </View>

        <Text>{itemData.item.donations}</Text>
        <Text>{itemData.item.donationsReceived}</Text>
        <Text>{(itemData.item.donations / itemData.item.donationsReceived).toFixed(2)}</Text>
        <Text>998</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-around',
    },
    home_town_img: {
        height: ScreenUtil.scaleSize(30),
        width: ScreenUtil.scaleSize(30)
    },
    name_view: {},
    index_s: {
        width: ScreenUtil.scaleSize(30)
    }

});
