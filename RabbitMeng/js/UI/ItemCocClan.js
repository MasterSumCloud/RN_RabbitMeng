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

export function ItemCocClan(item) {
    return <View style={styles.container}>
        <Text style={styles.index_s}>{item.key}</Text>

        <Image style={styles.home_town_img}/>

        <View style={styles.name_view}>
            <Text>大本营名字</Text>
            <Text>#666666</Text>
        </View>

        <Text>1000</Text>
        <Text>500</Text>
        <Text>2.0</Text>
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
    name_view: {

    },
    index_s:{
        width:ScreenUtil.scaleSize(30)
    }

});
