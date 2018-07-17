import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    TextInput
} from 'react-native';

let isEditting = false;

import * as ScreenUtil from "../uitl/ScreenUtil";

export default class ConfigClanUI extends Component {

    static navigatorButtons = {
        leftButtons: [
            {
                title: '←',
                id: 'back',
            }
        ],
        rightButtons: [
            {
                title: '编辑',
                id: 'edit',
            }
        ],
    };


    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        }
    }

    componentDidMount() {
        this.props.navigator.setOnNavigatorEvent((e) => {
            if (e.type === 'NavBarButtonPress') {
                if (e.id === 'back') {
                    this.props.navigator.dismissModal();
                } else if (e.id === 'edit') {
                    this.setState({
                        isEdit: !this.state.isEdit
                    });
                    this.props.navigator.setButtons({
                        rightButtons: [
                            {
                                title: this.state.isEdit ? '保存' : '编辑',
                                id: 'edit',
                            }
                        ]
                    })
                }
            }
        });
    }


    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={{flex: 1, flexDirection: 'column'}}
                >
                    <View style={styles.container}>
                        <Text style={{color: '#999999', marginRight: 5, fontSize: 12, marginTop: 5}}>Tip:-1表示无要求</Text>
                        {this._EditSingleView('捐兵数量要求(每个赛季)', 3000)}
                        {this._EditSingleView('收兵数量要求(每个赛季)', 3000)}
                        {this._EditDoubleView('12本数量控制', 15,20)}
                        {this._EditDoubleView('11本数量控制', 15,20)}
                        {this._EditDoubleView('10本数量控制', 15,20)}
                        {this._EditDoubleView('9本数量控制', 4,6)}
                        {this._EditSingleView('竞赛最低要求', 1000)}
                        <Text style={{color: '#999999', marginRight: 5, fontSize: 12, marginTop: 5,marginLeft: ScreenUtil.scaleSize(15),
                            marginRight: ScreenUtil.scaleSize(15)}}>竞赛统计说明:竞赛开始时，需要手动去我的页面，竞赛积分统计点一下，记录本次竞赛积分开始分数(最后分数以竞赛开始统计积分为准)！！！！</Text>
                        {this._EditSingleView('部落战出战次数要求', 1000)}
                        <Text style={{color: '#999999', marginRight: 5, fontSize: 12, marginTop: 5,marginLeft: ScreenUtil.scaleSize(15),
                            marginRight: ScreenUtil.scaleSize(15)}}>部落战统计说明：在部落战结束前，需要手动去我的页面，部落战统计点一下，记录当前所有成员进攻次数！！！</Text>
                    </View>

                </ScrollView>
            </View>
        );
    }

    _EditDoubleView(leftNeedContent, minnum, maxnum) {
        if (!this.state.isEdit) {
            return (
                <View style={styles.item_container}>
                    <Text style={{color: '#999999', marginRight: 5}}>{leftNeedContent}</Text>
                    <Text style={styles.text_min_input}>{minnum}</Text>
                    <Text style={{color: '#666666'}}> ~ </Text>
                    <Text style={styles.text_max_input}>{maxnum}</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.item_container}>
                    <Text style={{color: '#999999', marginRight: 5}}>{leftNeedContent}</Text>
                    <TextInput placeholderTextColor={'#EFEFEF'} placeholder={'最小限制'}
                               style={styles.min_input}
                               underlineColorAndroid='transparent'
                               onChangeText={(text) => this.setState({passWord: text})}
                               maxLength={9}
                               keyboardType={'numeric'}
                               value={String(minnum)}
                    />
                    <Text style={{color: '#666666'}}> ~ </Text>
                    <TextInput placeholderTextColor={'#EFEFEF'} placeholder={'最大限制'}
                               style={styles.max_input}
                               underlineColorAndroid='transparent'
                               onChangeText={(text) => this.setState({passWord: text})}
                               maxLength={9}
                               keyboardType={'numeric'}
                               value={String(maxnum)}
                    />
                </View>
            )
        }
    }

    _EditSingleView(leftNeedContent, num) {
        if (!this.state.isEdit) {
            return (
                <View style={styles.item_container}>
                    <Text style={{color: '#999999', marginRight: 5}}>{leftNeedContent}</Text>
                    <Text style={styles.text_min_input}>{num}</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.item_container}>
                    <Text style={{color: '#999999', marginRight: 5}}>{leftNeedContent}</Text>
                    <TextInput placeholderTextColor={'#EFEFEF'} placeholder={'最小限制'}
                               style={styles.min_input}
                               underlineColorAndroid='transparent'
                               onChangeText={(text) => this.setState({passWord: text})}
                               maxLength={9}
                               keyboardType={'numeric'}
                               value={String(num)}
                    />
                </View>
            )
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    item_container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: ScreenUtil.scaleSize(100),
        width: ScreenUtil.screenW,
        paddingLeft: ScreenUtil.scaleSize(15),
        paddingRight: ScreenUtil.scaleSize(15)
    },
    min_input: {
        color: '#33A1FF',
        width: ScreenUtil.scaleSize(180),
        textAlign: 'right',
        borderColor: '#EFEFEF',
        borderWidth: ScreenUtil.scaleSize(1),
        borderRadius: ScreenUtil.scaleSize(5),
        paddingLeft: ScreenUtil.scaleSize(5),
        paddingRight: ScreenUtil.scaleSize(5),
        fontSize: 13,
        padding: 0,
        height: ScreenUtil.scaleSize(50)
    },
    max_input: {
        paddingLeft: ScreenUtil.scaleSize(5),
        paddingRight: ScreenUtil.scaleSize(5),
        color: '#33A1FF',
        width: ScreenUtil.scaleSize(180),
        borderColor: '#EFEFEF',
        borderWidth: ScreenUtil.scaleSize(1),
        borderRadius: ScreenUtil.scaleSize(5),
        fontSize: 13,
        padding: 0,
        height: ScreenUtil.scaleSize(50)
    },
    text_min_input: {
        color: '#33A1FF',
        width: ScreenUtil.scaleSize(180),
        textAlign: 'right',
        borderColor: '#EFEFEF',
        borderWidth: ScreenUtil.scaleSize(1),
        borderRadius: ScreenUtil.scaleSize(5),
        paddingLeft: ScreenUtil.scaleSize(5),
        paddingRight: ScreenUtil.scaleSize(5),
        height: ScreenUtil.scaleSize(50),
        paddingTop: ScreenUtil.scaleSize(5),
        fontSize: 13,
    },
    text_max_input: {
        paddingLeft: ScreenUtil.scaleSize(5),
        paddingRight: ScreenUtil.scaleSize(5),
        color: '#33A1FF',
        width: ScreenUtil.scaleSize(180),
        borderColor: '#EFEFEF',
        borderWidth: ScreenUtil.scaleSize(1),
        borderRadius: ScreenUtil.scaleSize(5),
        height: ScreenUtil.scaleSize(50),
        paddingTop: ScreenUtil.scaleSize(5),
        fontSize: 13,
    }
});
