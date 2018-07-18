import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    TouchableWithoutFeedback
} from 'react-native';

let ScreenUtil = require('../uitl/ScreenUtil');

export function ItemCocClanAct(self, itemData, clan_config) {


    //#BBEDC2
    //#FBE88B
    //#F8B9C3
    //#949494

    //活跃度计算公式，收兵*0.1(满分10) + 捐兵*0.2(满分20) + 竞赛*0.3(低于1000级0分，高于1000得15分，+超过1000部分/3000*15) + 部落战1次进攻10分(每次保留上次分数) + (长老+5  副手+10  首领加15) + 收兵超过5w+5分，捐兵超过要求部分 每超过1W每1得1分
    //低于60 不合格 60-80一半  80+优秀
    let activeScorl = 0;

    //捐兵积分
    if (clan_config.donations === -1 || clan_config.donations === 0) {
        activeScorl += 20;
    } else {
        if (itemData.item.donations > clan_config.donations) {//捐兵符合配置
            activeScorl += 20;
        } else {
            let addScrol = Math.round((itemData.item.donations / clan_config.donations).toFixed(2) * 20);
            activeScorl += addScrol;
        }
    }

    //收兵积分

    if (clan_config.receiveTroop === -1 || clan_config.receiveTroop === 0) {
        activeScorl += 10;
    } else {
        if (itemData.item.donationsReceived > clan_config.receiveTroop) {//收兵满足
            activeScorl += 10;
        } else {
            let addScrol = Math.round((itemData.item.donationsReceived / clan_config.receiveTroop).toFixed(2) * 10);
            activeScorl += addScrol;
        }
    }

    //竞赛积分
    activeScorl += 15;

    //部落站积分
    activeScorl += 20;

    //额外加分
    let role = '成员';
    if (itemData.item.role === 'coLeader') {
        role = '副首领';
        activeScorl += 10;
    } else if (itemData.item.role === 'leader') {
        role = '首领';
        activeScorl += 15;
    } else if (itemData.item.role === 'admin') {
        role = '长老';
        activeScorl += 5;
    }

    if (itemData.item.donationsReceived > 50000) {
        activeScorl += 5;
    }

    if (itemData.item.donations > 10000) {
        let addScrol = Math.floor((itemData.item.donations - clan_config.donations) / 10000);
        activeScorl += addScrol;
    }

    let backBgColor = 'white';
    let textColor = 'black';

    if (activeScorl < 60) {//不活跃，不合格
        backBgColor = '#F8B9C3';
        textColor = '#890009';
    } else if (activeScorl < 80) {//合格，一般活跃
        backBgColor = '#FBE88B';
        textColor = '#895203';
    } else {//活跃党
        backBgColor = '#BBEDC2';
        textColor = '#155001';
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
            <Text style={{color: textColor}}>{itemData.index + 1}</Text>
        </View>

        <View style={styles.text_center}>
            <Text style={{color: textColor}}>{activeScorl}</Text>
        </View>

        <View style={styles.name_view}>
            <Text style={{
                textAlign: 'center',
                justifyContent: 'center',
                fontSize: 12, color: textColor
            }}>{itemData.item.name}</Text>
            <Text style={styles.coc_tag}>{itemData.item.tag}</Text>
        </View>

        <View style={styles.text_center}>
            <Text style={{color: textColor}}>{itemData.item.donations}</Text>
        </View>

        <View style={styles.text_center}>
            <Text style={{color: textColor}}>{itemData.item.donationsReceived}</Text>
        </View>


        <View style={styles.text_center}>
            <Text
                style={{color: textColor}}>{(itemData.item.donations / (itemData.item.donationsReceived === 0 ? 1 : itemData.item.donationsReceived)).toFixed(2)}</Text>
        </View>

        <View style={styles.text_center}>
            <Text style={{color: textColor}}>{role}</Text>
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
