import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ImageBackground
} from 'react-native';

let ScreenUtil = require('../uitl/ScreenUtil');
import * as Constant from '../uitl/Constant'
import * as TimeUtil from '../uitl/TimeUtil'

let SPUtil = require('../uitl/SPUtil');
import Toast, {DURATION} from 'react-native-easy-toast'
import * as HttpUtil from "../uitl/HttpUtil";


export default class ClanWarUI extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            isCollect: false,
            warData: [],
            clan_tag: '',
            last_collect_time: '无',
            last_war_clan: '无',
            last_war_opponent: '无',
            last_war_start_time: '无',
            last_war_end_time: '无',
            last_war_state: '无'
        };
    }

    render() {
        console.log('统计等待图render');
        return (
            <View style={styles.container}>
                <Text>使用说明：请在部落完成结束后到下次部落开战前等级，系统会记录最近一次落站所有成员的进攻次数！</Text>

                <Text style={{
                    marginTop: ScreenUtil.scaleSize(15),
                    color: 'red'
                }}>{'上次登记时间：' + this.state.last_collect_time}</Text>

                <Text style={{
                    marginTop: ScreenUtil.scaleSize(15),
                    color: '#33A1FF'
                }}>{this.state.last_war_clan + '  对战  ' + this.state.last_war_opponent}</Text>
                <Text style={{
                    marginTop: ScreenUtil.scaleSize(15),
                    color: '#33A1FF'
                }}>{'部落站开始时间：' + this.state.last_war_start_time}</Text>
                <Text style={{
                    marginTop: ScreenUtil.scaleSize(15),
                    color: '#33A1FF'
                }}>{'部落站结束时间：' + this.state.last_war_start_time}</Text>
                <Text style={{
                    marginTop: ScreenUtil.scaleSize(15),
                    color: '#FF8C00'
                }}>{'部落站状态：' + this.state.last_war_state}</Text>
                <Text style={styles.text_start_war} onPress={() => {
                    this.setState({isCollect: true});
                    this._collectData();
                }}>进行登记</Text>
                <Text style={{marginTop: ScreenUtil.scaleSize(200),}}>重置会清空所有部落成员进攻次数</Text>
                <Text style={styles.text_start_war}>重置</Text>

                {this.state.isCollect ? this._loadView() : null}
                <Toast ref="toast"/>
            </View>
        );
    }

    _loadView = () => {
        return (
            <View style={{position: 'absolute', alignSelf: 'center', marginTop: (ScreenUtil.screenH - 300) / 2}}>
                <ImageBackground resizeMode='stretch' style={{
                    width: ScreenUtil.scaleSize(400),
                    height: ScreenUtil.scaleSize(200)
                }}
                                 source={require('../../res/imgs/wite_loading.gif')}>
                    <Text style={{
                        marginTop: ScreenUtil.scaleSize(150),
                        marginLeft: ScreenUtil.scaleSize(30),
                        color: '#467fe7'
                    }}>正在统计中，请勿关闭页面</Text>
                </ImageBackground>
            </View>
        )
    };

    _collectData = () => {
        let self = this;
        HttpUtil.get('https://api.clashofclans.com/v1/clans/' + this.state.clan_tag.replace(/#/, '%23') + '/currentwar', '', function (jsonData) {
            let warList = [];
            for (let memeber of jsonData.clan.members) {
                let memb = {tag: memeber.tag, attacks: memeber.attacks === undefined ? 0 : memeber.attacks.length};
                warList.push(memb)
            }

            let collectTime = TimeUtil.getNowFormatDate();
            self.setState({
                warData: warList,
                isCollect: false,
                last_war_clan: jsonData.clan.name,
                last_war_opponent: jsonData.opponent.name,
                last_war_start_time: TimeUtil.getFrrSerTime(jsonData.startTime),
                last_war_end_time: TimeUtil.getFrrSerTime(jsonData.endTime),
                last_war_state: jsonData.state,
                last_collect_time: collectTime
            });
            //warEnded
            // this.refs.toast.show('统计完毕');

            //保存统计的信息
            SPUtil.saveAsyncStorage(Constant.CollectWarTime + jsonData.clan.tag, collectTime, () => {
                console.log('储存登记时间成功');
            }, () => {
                console.log('储存登记时间失败');
            });

            SPUtil.saveAsyncStorage(Constant.War_Attacts + jsonData.clan.tag, JSON.stringify(warList), () => {
                console.log('储存部落进攻信息成功');
            }, () => {
                console.log('储存部落进攻信息失败');
            });

            console.log('部落站信息' + JSON.stringify(warList));
        }, function (error) {
            // this.refs.toast.show('统计出错，请稍后再试');
        });
    };


    componentDidMount() {
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
                // this.refs.toast.show('没有管理中的部落');
            } else {
                this.setState({
                    clan_tag: controlTag
                });

                SPUtil.getAsyncStorage(Constant.CollectWarTime + controlTag, (lastWarTime) => {
                    if (lastWarTime != null && lastWarTime !== undefined) {
                        this.setState({
                            last_collect_time: lastWarTime
                        });
                    }
                });
            }
        });

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: ScreenUtil.scaleSize(15),
        paddingRight: ScreenUtil.scaleSize(15),
        paddingTop: ScreenUtil.scaleSize(30),
    },
    text_start_war: {
        backgroundColor: '#33A1FF',
        width: ScreenUtil.scaleSize(300),
        textAlign: 'center',
        color: 'white',
        borderRadius: ScreenUtil.scaleSize(5),
        marginTop: ScreenUtil.scaleSize(15),
        paddingTop: ScreenUtil.scaleSize(5),
        paddingBottom: ScreenUtil.scaleSize(5)
    },
});
