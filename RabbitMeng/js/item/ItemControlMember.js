import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    TouchableWithoutFeedback
} from 'react-native';

let ScreenUtil = require('../uitl/ScreenUtil');

export function ItemCocClan(self, itemData, clan_config, isblack) {


    //#BBEDC2
    //#FBE88B
    //#F8B9C3
    //#949494

    let role = '成员';
    if (itemData.item.role === 'coLeader') {
        role = '副首领';
    } else if (itemData.item.role === 'leader') {
        role = '首领';
    } else if (itemData.item.role === 'admin') {
        role = '长老';
    }

    let backBgColor = itemData.index % 2 === 0 ? 'white' : '#F7F7F7';

    //竞赛判断
    let clanGameTextColor = '#666';
    if (itemData.item.clanGameValue !== undefined) {

        if (itemData.item.clanGameValue >= 4000) {
            clanGameTextColor = '#1fc32a';
        } else if (itemData.item.clanGameValue >= clan_config.clan_game) {
            clanGameTextColor = '#f9be3c';
        } else {
            clanGameTextColor = '#cc0400';
        }
    } else {
        clanGameTextColor = '#666';
    }

    //部落战判断
    let clanWarTextColor = '#666';
    if (itemData.item.warAttack !== undefined) {
        if (itemData.item.warAttack === 2) {
            clanWarTextColor = '#1fc32a';
        } else if (itemData.item.warAttack === 1) {
            clanWarTextColor = '#f9be3c';
        } else {
            clanWarTextColor = '#cc0400';
        }
    } else {
        clanWarTextColor = '#666';
    }

    //捐兵判断


    //黑名单判断
    if (isblack) {
        backBgColor = '#696969';
    }

    return <TouchableWithoutFeedback
        onPress={() => {
            self.props.navigator.showModal({
                screen: 'ClanDetailUI',
                title: '村庄详情',
                passProps: {coc_tag: itemData.item.tag}
            });
        }}><View style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: backBgColor,
        height: ScreenUtil.scaleSize(120),
    }} id={itemData.index}>
        <View style={styles.text_index}>
            <Text
                style={{color: clanWarTextColor}}>{itemData.item.warAttack === undefined ? 0 : itemData.item.warAttack}</Text>
        </View>

        <View style={styles.text_center}>
            <Text
                style={{color: clanGameTextColor}}>{itemData.item.clanGameValue === undefined ? 0 : itemData.item.clanGameValue}</Text>
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
            <Text>{role}</Text>
        </View>

    </View>
    </TouchableWithoutFeedback>
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
