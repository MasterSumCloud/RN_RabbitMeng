import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    ImageBackground,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';
import * as ScreenUtil from "../uitl/ScreenUtil";
import * as HttpUtil from "../uitl/HttpUtil";

let SPUtil = require('../uitl/SPUtil');
import * as Constant from '../uitl/Constant'

let ItemControlMember = require('../item/ItemControlMember');
let ItemControlMemberACt = require('../item/ItemControlMemberAct');

let townhall_12_color = '#1E90FF';
let townhall_11_color = '#FA8072';
let townhall_10_color = '#DC143C';
let townhall_9_color = '#33333E';
let townhall_clan_color = '#9400D3';

export default class ControlUI extends Component {

    static navigatorButtons = {
        rightButtons: [
            {
                title: '配置',
                id: 'setting',
            }
        ],
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataAry: [],
            clans_img: '',
            clan_tag_img_big: '',
            clans_name: '部落名称',
            clan_tag: '',
            isError: false,
            isActiveUI: false,
            clan_config: {
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
            }
        };
    }

    componentDidMount() {

        this.props.navigator.setOnNavigatorEvent((e) => {
            if (e.type === 'NavBarButtonPress') {
                if (e.id === 'setting') {
                    this.props.navigator.showModal({
                        screen: 'ConfigClanUI',
                        title: '配置部落',
                        passProps: {clan_tag: this.state.clan_tag}
                    })
                }
            }
        });


        SPUtil.getAsyncStorage(Constant.ControlClan, (listClan) => {
            let controlTag = '';
            if (listClan != null && listClan !== undefined) {
                let jsonData = JSON.parse(listClan);
                for (let item of jsonData) {
                    if (item.isControl) {
                        controlTag = item.tag;
                    }
                }
            }

            if (controlTag === '') {
                this.setState({isLoading: false, isError: true});
            } else {
                this._getConfigData(controlTag);
                this._getData(controlTag);
            }
        });

    }

    _getConfigData = (clan_tag) => {
        console.log('配置名'+Constant.ControlClan_Config + clan_tag);
        SPUtil.getAsyncStorage(Constant.ControlClan_Config + clan_tag, (value) => {
            console.log('读取的配置' + value);
            let configData = JSON.parse(value);
            if (configData != null && configData !== undefined) {
                this.setState({
                    clan_config: configData
                });
            }
            console.log('读取配置数据成功');
        }, () => {
            console.log('读取配置数据失败');
        })
    }

    _getData = (tag) => {
        let self = this;
        HttpUtil.get('https://api.clashofclans.com/v1/clans/' + tag.replace(/#/, '%23'), '', function (jsonData) {
            self.setState({
                dataAry: jsonData.memberList,
                isLoading: false,
                clans_img: jsonData.badgeUrls.small,
                clan_tag_img_big: jsonData.badgeUrls.large,
                clans_name: jsonData.name,
                clan_tag: jsonData.tag
            })
        }, function (error) {
            self.setState({isError: true})
        });
    };


    render() {

        if (this.state.isError) {
            return (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../res/imgs/error_no_control_clan.jpeg')}/>
                <Text>诶！没有管理的部落</Text>
            </View>)
        } else if (this.state.isLoading) {
            return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../res/imgs/ali_dance.gif')}/>
                <Text>数据加载中...</Text>
            </View>
        } else {
            // #F7B22F  警告颜色
            // #3FEB04  正常颜色
            // #BE0004  超标颜色

            let coc_num = this.state.dataAry.length;
            let coc_num_suggest = ' 满人';
            if (coc_num === 50) {
            } else if (coc_num > 48) {
                townhall_clan_color = '#3FEB04';
                coc_num_suggest = ' 缺' + (50 - coc_num);
            } else if (coc_num > 45) {
                townhall_clan_color = '#F7B22F';
                coc_num_suggest = ' 缺' + (50 - coc_num);
            } else {
                townhall_clan_color = '#BE0004';
                coc_num_suggest = ' 缺' + (50 - coc_num);
            }


            return (
                <View style={styles.container}>

                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={{flex: 1, flexDirection: 'column'}}
                        stickyHeaderIndices={[1]}
                    >
                        <ImageBackground resizeMode='stretch' style={styles.mine_top}
                                         source={require('../../res/imgs/coc_clan_bg.png')}
                        >

                            <Text style={styles.text_coc_name}>
                                {this.state.clans_name}
                            </Text>

                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.text_rund_bg}>
                                    <View style={styles.bg_cir_town_12}/>
                                    <Text style={styles.text_white_12}>12本数量</Text>
                                    <Text style={styles.text_num_inner_12}>加载中...</Text>
                                </View>

                                <View style={styles.text_rund_bg}>
                                    <View style={styles.bg_cir_town_11}/>
                                    <Text style={styles.text_white_11}>11本数量</Text>
                                    <Text style={styles.text_num_inner_11}>加载中...</Text>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row'}}>
                                <View style={styles.text_rund_bg}>
                                    <View style={styles.bg_cir_town_10}/>
                                    <Text style={styles.text_white_10}>10本数量</Text>
                                    <Text style={styles.text_num_inner_10}>加载中...</Text>
                                </View>

                                <View style={styles.text_rund_bg}>
                                    <View style={styles.bg_cir_town_9}/>
                                    <Text style={styles.text_white_9}>9本数量</Text>
                                    <Text style={styles.text_num_inner_9}>加载中...</Text>
                                </View>
                            </View>


                            <View style={styles.text_rund_bg_member}>
                                <View style={styles.bg_cir_town_member}/>
                                <Text style={styles.text_white__member}>部落总人数</Text>
                                <Text style={styles.text_num_inner_clan}>{coc_num + coc_num_suggest}</Text>
                            </View>

                            <Image style={styles.coc_clan_tag} source={{uri: this.state.clan_tag_img_big}}/>
                            <TouchableWithoutFeedback onPress={() => {
                                this.setState({isActiveUI: !this.state.isActiveUI});
                            }}>
                                <View style={{
                                    alignSelf: 'flex-end',
                                    marginTop: ScreenUtil.scaleSize(65),
                                    marginRight: ScreenUtil.scaleSize(15),
                                    backgroundColor: 'white'
                                }}>
                                    <Text>{this.state.isActiveUI ? '切换到违规列表' : '切换到活跃度列表'}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                        </ImageBackground>

                        <View>
                            <View style={styles.coc_sort_container}>
                                <View style={styles.text_tab_1}>
                                    <Text style={{color: '#666666'}}>序号</Text>
                                </View>
                                <View style={styles.text_tab_2}>
                                    <Text style={{color: '#666666'}}>{this.state.isActiveUI ? '活跃度' : '等级'}</Text>
                                </View>
                                <View style={styles.text_tab_3}>
                                    <Text style={{color: '#666666'}}>名 字</Text>
                                </View>

                                <View style={styles.text_tab_4}>
                                    <Text style={{color: '#666666'}}>收兵</Text>
                                </View>

                                <View style={styles.text_tab_5}>
                                    <Text style={{color: '#666666'}}>捐兵</Text>
                                </View>

                                <View style={styles.text_tab_6}>
                                    <Text style={{color: '#666666'}}>比例</Text>
                                </View>

                                <View style={styles.text_tab_7}>
                                    <Text style={{color: '#666666'}}>职位</Text>
                                </View>

                            </View>
                        </View>

                        <FlatList
                            ItemSeparatorComponent={() => {
                                return <View style={{
                                    height: ScreenUtil.scaleSize(1),
                                    backgroundColor: '#CCC',
                                }}/>
                            }}
                            data={this.state.dataAry}
                            keyExtractor={(item, index) => item.tag}
                            extraData={this.state}
                            renderItem={(item) => {
                                if (this.state.isActiveUI) {
                                    return ItemControlMemberACt.ItemCocClanAct(this, item, this.state.clan_config)
                                } else {
                                    return ItemControlMember.ItemCocClan(this, item, this.state.clan_config)
                                }
                            }}
                        />

                    </ScrollView>
                </View>
            );
        }
    }
}


// #F7B22F  警告颜色
// #3FEB04  正常颜色
// #BE0004  超标颜色
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mine_top: {
        width: ScreenUtil.screenW,
        height: ScreenUtil.scaleSize(450),
    },
    text_white_12: {
        marginLeft: ScreenUtil.scaleSize(20),
        fontSize: 10,
        color: '#1E90FF',
        backgroundColor: 'white',
        position: 'absolute'
    },
    text_white_11: {
        marginLeft: ScreenUtil.scaleSize(20),
        fontSize: 10,
        color: '#FA8072',
        backgroundColor: 'white',
        position: 'absolute'
    },
    text_white_10: {
        marginLeft: ScreenUtil.scaleSize(20),
        fontSize: 10,
        color: '#DC143C',
        backgroundColor: 'white',
        position: 'absolute'
    },
    text_white_9: {
        marginLeft: ScreenUtil.scaleSize(20),
        fontSize: 10,
        color: '#33333E',
        backgroundColor: 'white',
        position: 'absolute'
    },
    text_white__member: {
        marginLeft: ScreenUtil.scaleSize(20),
        fontSize: 10,
        color: '#9400D3',
        backgroundColor: 'white',
        position: 'absolute'
    },
    text_coc_name: {
        color: '#33A1FF',
        position: 'absolute',
        fontSize: 20,
        marginTop: ScreenUtil.scaleSize(140),
        marginLeft: ScreenUtil.scaleSize(ScreenUtil.screenW * 0.45),
    },
    line: {
        backgroundColor: '#efefef',
        width: ScreenUtil.screenW,
        height: ScreenUtil.scaleSize(1),
    },
    coc_sort_container: {
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        justifyContent: 'space-around',
        flexDirection: 'row',
        height: ScreenUtil.scaleSize(100),
    },
    text_tab_1: {flex: 0.8, justifyContent: 'center', alignItems: 'center'},
    text_tab_2: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    text_tab_3: {flex: 1.5, justifyContent: 'center', alignItems: 'center',},
    text_tab_4: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    text_tab_5: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    text_tab_6: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    text_tab_7: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    bg_cir_town_12: {
        marginTop: ScreenUtil.scaleSize(15),
        borderRadius: 5,
        borderWidth: ScreenUtil.scaleSize(1),
        borderColor: '#1E90FF',
        height: ScreenUtil.scaleSize(40),
        paddingLeft: 1,
        paddingRight: 1,
    },
    bg_cir_town_11: {
        marginTop: ScreenUtil.scaleSize(15),
        borderRadius: 5,
        borderWidth: ScreenUtil.scaleSize(1),
        borderColor: '#FA8072',
        height: ScreenUtil.scaleSize(40),
        paddingLeft: 1,
        paddingRight: 1,
    },
    bg_cir_town_10: {
        marginTop: ScreenUtil.scaleSize(15),
        borderRadius: 5,
        borderWidth: ScreenUtil.scaleSize(1),
        borderColor: '#DC143C',
        height: ScreenUtil.scaleSize(40),
        paddingLeft: 1,
        paddingRight: 1,
    },
    bg_cir_town_9: {
        marginTop: ScreenUtil.scaleSize(15),
        borderRadius: 5,
        borderWidth: ScreenUtil.scaleSize(1),
        borderColor: '#33333E',
        height: ScreenUtil.scaleSize(40),
        paddingLeft: 1,
        paddingRight: 1,
    },
    bg_cir_town_member: {
        marginTop: ScreenUtil.scaleSize(15),
        borderRadius: 5,
        borderWidth: ScreenUtil.scaleSize(1),
        borderColor: '#9400D3',
        height: ScreenUtil.scaleSize(40),
        paddingLeft: 1,
        paddingRight: 1,
    },
    text_rund_bg: {
        flexDirection: 'column',
        marginLeft: ScreenUtil.scaleSize(15),
        marginTop: ScreenUtil.scaleSize(10),
        width: ScreenUtil.scaleSize(200),
        height: ScreenUtil.scaleSize(50),
    },
    text_num_inner_12: {
        color: townhall_12_color,
        marginTop: ScreenUtil.scaleSize(20),
        position: 'absolute',
        fontSize: 12,
        marginLeft: ScreenUtil.scaleSize(15),
    },
    text_num_inner_11: {
        color: townhall_11_color,
        marginTop: ScreenUtil.scaleSize(20),
        position: 'absolute',
        fontSize: 12,
        marginLeft: ScreenUtil.scaleSize(15),
    },
    text_num_inner_10: {
        color: townhall_10_color,
        marginTop: ScreenUtil.scaleSize(20),
        position: 'absolute',
        fontSize: 12,
        marginLeft: ScreenUtil.scaleSize(15),
    },
    text_num_inner_9: {
        color: townhall_9_color,
        marginTop: ScreenUtil.scaleSize(20),
        position: 'absolute',
        fontSize: 12,
        marginLeft: ScreenUtil.scaleSize(15),
    },
    text_num_inner_clan: {
        color: townhall_clan_color,
        marginTop: ScreenUtil.scaleSize(20),
        position: 'absolute',
        fontSize: 12,
        marginLeft: ScreenUtil.scaleSize(15),
    },
    text_rund_bg_member: {
        flexDirection: 'column',
        marginLeft: ScreenUtil.scaleSize(15),
        marginTop: ScreenUtil.scaleSize(160),
        width: ScreenUtil.scaleSize(200),
        height: ScreenUtil.scaleSize(50),
    }, coc_clan_tag: {
        width: ScreenUtil.scaleSize(120),
        height: ScreenUtil.scaleSize(120),
        position: 'absolute',
        marginLeft: ScreenUtil.scaleSize(485),
        marginTop: ScreenUtil.scaleSize(175),
    }
});
