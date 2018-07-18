import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    TextInput
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast'
import * as ScreenUtil from "../uitl/ScreenUtil";

let SPUtil = require('../uitl/SPUtil');
import * as Constant from '../uitl/Constant'

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
            isEdit: false,
            donations: 3500,
            receiveTroop: 10000,
            townhall12_min: 15,
            townhall12_max: 20,
            townhall11_min: 15,
            townhall11_max: 20,
            townhall10_min: 15,
            townhall10_max: 20,
            townhall9_min: 4,
            townhall9_max: 6,
            clan_game: 1000,
            clan_war_artack: 2,
        };
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

        SPUtil.getAsyncStorage(Constant.ControlClan_Config + this.props.clan_tag, (value) => {
            let configData = JSON.parse(value);
            if (configData != null && configData !== undefined) {
                this.setState({
                    donations: configData.donations,
                    receiveTroop: configData.receiveTroop,
                    townhall12_min: configData.townhall12_min,
                    townhall12_max: configData.townhall12_max,
                    townhall11_min: configData.townhall11_min,
                    townhall11_max: configData.townhall11_max,
                    townhall10_min: configData.townhall10_min,
                    townhall10_max: configData.townhall10_max,
                    townhall9_min: configData.townhall9_min,
                    townhall9_max: configData.townhall9_max,
                    clan_game: configData.clan_game,
                    clan_war_artack: configData.clan_war_artack,
                });
                console.log('获取配置数据成功-配置页');
            }
        }, () => {
            console.log('获取配置数据失败-配置页');
        })
    }

    componentWillUnmount() {

        let clanData = {
            donations: 3500,
            receiveTroop: -1,
            townhall12_min: 15,
            townhall12_max: 20,
            townhall11_min: 15,
            townhall11_max: 20,
            townhall10_min: 15,
            townhall10_max: 20,
            townhall9_min: 15,
            townhall9_max: 20,
            clan_game: -1,
            clan_war_artack: 2
        };

        clanData.donations = this.state.donations;
        clanData.receiveTroop = this.state.receiveTroop;
        clanData.townhall12_min = this.state.townhall12_min;
        clanData.townhall12_max = this.state.townhall12_max;
        clanData.townhall11_min = this.state.townhall11_min;
        clanData.townhall11_max = this.state.townhall11_max;
        clanData.townhall10_min = this.state.townhall10_min;
        clanData.townhall10_max = this.state.townhall10_max;
        clanData.townhall9_min = this.state.townhall9_min;
        clanData.townhall9_max = this.state.townhall9_max;
        clanData.clan_game = this.state.clan_game;
        clanData.clan_war_artack = this.state.clan_war_artack;

        console.log('配置名A'+Constant.ControlClan_Config + this.props.clan_tag);
        SPUtil.saveAsyncStorage(Constant.ControlClan_Config + this.props.clan_tag, JSON.stringify(clanData), () => {
            console.log('数据配置成功')
        }, () => {
            console.log('数据配置失败')
        })
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
                        {this._EditSingleView('捐兵数量要求(每个赛季)', this.state.donations, (text) => {
                            this.setState({donations: parseInt(text)});
                        })}

                        {this._EditSingleView('收兵数量要求(每个赛季)', this.state.receiveTroop, (text) => {
                            this.setState({receiveTroop: parseInt(text)});
                        })}

                        {this._EditDoubleView('12本数量控制', this.state.townhall12_min, this.state.townhall12_max, (text) => {
                            this.setState({townhall12_min: parseInt(text)});
                        }, (text) => {
                            this.setState({townhall12_max: parseInt(text)});
                        })}

                        {this._EditDoubleView('11本数量控制', this.state.townhall11_min, this.state.townhall11_max, (text) => {
                            this.setState({townhall11_min: parseInt(text)});
                        }, (text) => {
                            this.setState({townhall11_max: parseInt(text)});
                        })}

                        {this._EditDoubleView('10本数量控制', this.state.townhall10_min, this.state.townhall10_max, (text) => {
                            this.setState({townhall10_min: parseInt(text)});
                        }, (text) => {
                            this.setState({townhall10_max: parseInt(text)});
                        })}
                        {this._EditDoubleView('9本数量控制', this.state.townhall9_min, this.state.townhall9_max, (text) => {
                            this.setState({townhall9_min: parseInt(text)});
                        }, (text) => {
                            this.setState({townhall9_max: parseInt(text)});
                        })}
                        {this._EditSingleView('竞赛最低要求', this.state.clan_game, (text) => {
                            this.setState({clan_game: parseInt(text)});
                        })}
                        <Text style={{
                            color: '#999999',
                            fontSize: 12,
                            marginTop: 5,
                            marginLeft: ScreenUtil.scaleSize(15),
                            marginRight: ScreenUtil.scaleSize(15)
                        }}>竞赛统计说明:竞赛开始时，需要手动去我的页面，竞赛积分统计点一下，记录本次竞赛积分开始分数(最后分数以竞赛开始统计积分为准)！！！！</Text>
                        {this._EditSingleView('部落战出战次数要求', this.state.clan_war_artack, (text) => {
                            this.setState({clan_war_artack: parseInt(text)});
                        })}
                        <Text style={{
                            color: '#999999',
                            fontSize: 12,
                            marginTop: 5,
                            marginLeft: ScreenUtil.scaleSize(15),
                            marginRight: ScreenUtil.scaleSize(15)
                        }}>部落战统计说明：在部落战结束前，需要手动去我的页面，部落战统计点一下，记录当前所有成员进攻次数！！！</Text>
                    </View>

                </ScrollView>
                <Toast ref="toast"/>
            </View>
        );
    }

    _EditDoubleView(leftNeedContent, minnum, maxnum, onMinTextChange, onMaxTextChange) {
        return (
            <View style={styles.item_container}>
                <Text style={{color: '#999999', marginRight: 5}}>{leftNeedContent}</Text>
                <TextInput placeholderTextColor={'#EFEFEF'} placeholder={'最小限制'}
                           style={styles.min_input}
                           underlineColorAndroid='transparent'
                           onChangeText={onMinTextChange}
                           maxLength={9}
                           keyboardType={'numeric'}
                           defaultValue={String(minnum)}
                           editable={this.state.isEdit}
                />
                <Text style={{color: '#666666'}}> ~ </Text>
                <TextInput placeholderTextColor={'#EFEFEF'} placeholder={'最大限制'}
                           style={styles.max_input}
                           underlineColorAndroid='transparent'
                           onChangeText={onMaxTextChange}
                           maxLength={9}
                           keyboardType={'numeric'}
                           defaultValue={String(maxnum)}
                           editable={this.state.isEdit}
                />
            </View>
        )
    }

    _EditSingleView(leftNeedContent, num, onTextChange) {
        return (
            <View style={styles.item_container}>
                <Text style={{color: '#999999', marginRight: 5}}>{leftNeedContent}</Text>
                <TextInput placeholderTextColor={'#EFEFEF'} placeholder={'最小限制'}
                           style={styles.min_input}
                           underlineColorAndroid='transparent'
                           onChangeText={onTextChange}
                           maxLength={9}
                           keyboardType={'numeric'}
                           defaultValue={String(num)}
                           editable={this.state.isEdit}
                />
            </View>
        )
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
