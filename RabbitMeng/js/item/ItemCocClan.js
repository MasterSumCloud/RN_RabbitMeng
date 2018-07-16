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

export function ItemCocClan(self, itemData) {

    return (<TouchableWithoutFeedback onPress={() => {
        self.props.navigator.showModal({
            screen: 'ClanDetailUI',
            title: '村庄详情',
            passProps: {coc_tag: itemData.item.tag}
        });
    }}>
        <View style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: itemData.index % 2 === 0 ? 'white' : '#F7F7F7',
            height: ScreenUtil.scaleSize(120),
        }} id={itemData.index}>
            <View style={styles.text_index}>
                <Text style={styles.index_s}>{itemData.index + 1}</Text>
            </View>

            <View style={styles.text_center}>
                <ImageBackground
                    source={require('../../res/imgs/lv_bg.png')}
                    resizeMode={'stretch'} style={styles.exp_lv_bg}>
                    <Text style={styles.lv_text}>{itemData.item.expLevel}</Text>
                </ImageBackground>
            </View>

            <View style={styles.name_view}>
                <Text style={styles.coc_name}>{itemData.item.name}</Text>
                <Text style={styles.coc_tag}>{itemData.item.tag}</Text>
            </View>

            <View style={styles.text_center}>
                <Text>{itemData.item.donations}</Text>
            </View>

            <View style={styles.text_center}>
                <Text>{itemData.item.donationsReceived}</Text>
            </View>


            <View style={styles.text_center}>
                <Text>{(itemData.item.donations / (itemData.item.donationsReceived === 0 ? 1 : itemData.item.donationsReceived)).toFixed(2)}</Text>
            </View>

            <View style={styles.text_center}>
                <Image style={styles.home_town_img} source={{uri: itemData.item.league.iconUrls.small}}/>
            </View>

        </View>
    </TouchableWithoutFeedback>);
}

const styles = StyleSheet.create({
    container: {},
    home_town_img: {
        height: ScreenUtil.scaleSize(60),
        width: ScreenUtil.scaleSize(60),
        marginRight: ScreenUtil.scaleSize(20),
        marginLeft: ScreenUtil.scaleSize(15),
    },
    name_view: {
        alignItems: 'center',
        justifyContent: 'center',
        // width: ScreenUtil.scaleSize(140),
        flex: 1.5,
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
    donations: {
        flex: 1,
    },
    bili: {
        flex: 1,
    },
    text_center: {
        // width: ScreenUtil.scaleSize(100),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_index: {
        // width: ScreenUtil.scaleSize(100),
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    exp_lv_bg: {
        height: ScreenUtil.scaleSize(65),
        width: ScreenUtil.scaleSize(65),
        justifyContent: 'center',
        alignItems: 'center',
    },
    lv_text: {
        color: 'white'
    }


});
