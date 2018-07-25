import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    ScrollView,
    ImageBackground
} from 'react-native';

let ScreenUtil = require('../uitl/ScreenUtil');
import * as Constant from '../uitl/Constant'

let SPUtil = require('../uitl/SPUtil');
import * as HttpUtil from "../uitl/HttpUtil";

import * as TimeUtil from '../uitl/TimeUtil'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'


export default class ClanGameUI extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            isCollectting: false,
            clanGameStartTime: '无',
            clanGameEndTime: '无',
            isSettingNewMember: false,
            updata_single_clan_tag: '',
            clan_tag: '',
            memberList: [],
            currentControlClanName: '无',
            clanGameMemberInfos: [],
            delete_tag_success: false,
            isOnerror: false,
            lastClanGameStartInfo: [],
            lastClanGameEndInfo: [],
        };
    }

    render() {
        return (

            <ScrollView style={{backgroundColor: 'white'}}>
                <View style={styles.container}>

                    {this.state.isOnerror ?
                        <Text style={{
                            marginTop: ScreenUtil.scaleSize(15),
                            color: 'red'
                        }}>{this.state.errorMsg}</Text> : null}

                    <Text
                        style={{marginTop: ScreenUtil.scaleSize(20)}}>使用说明：请在竞赛开始前进行开始登记，这时候会记录当前部落的所有成员积分，兵在赛季竞赛结束后进行结束登记，系统会计算两次登记时间中成员的竞赛积分差来算出对应成员在本次竞赛中所得积分！</Text>

                    <Text style={{
                        marginTop: ScreenUtil.scaleSize(15),
                        color: 'purple'
                    }}>{'当前管理部落：' + this.state.currentControlClanName}</Text>

                    <Text style={{
                        marginTop: ScreenUtil.scaleSize(15),
                        color: '#8EC31E'
                    }}>{'登记竞赛开始时间：' + this.state.clanGameStartTime}</Text>

                    <Text style={{
                        marginTop: ScreenUtil.scaleSize(15),
                        color: '#FFA500'
                    }}>按钮是针对部落新成员，勾选是，只记录所有新成员的竞赛积分，勾选否，更新所有成员</Text>


                    <Text style={{marginTop: ScreenUtil.scaleSize(15), color: '#33A1FF'}}>是否只针对新成员</Text>
                    <RadioGroup
                        selectedIndex={1}
                        style={{flexDirection: 'row'}}
                        onSelect={(index, value) => {
                            this.setState({
                                isSettingNewMember: value
                            });
                        }}
                    >
                        <RadioButton value={true}>
                            <Text>是</Text>
                        </RadioButton>

                        <RadioButton value={false}>
                            <Text>否</Text>
                        </RadioButton>
                    </RadioGroup>


                    <Text style={styles.text_start_clangame} onPress={() => {
                        this._collectAllMemberClanGameScrol();
                    }}>竞赛开始</Text>

                    <Text style={{
                        marginTop: ScreenUtil.scaleSize(15),
                        color: 'red'
                    }}>{'登记竞赛结束时间：' + this.state.clanGameEndTime}</Text>

                    <Text style={styles.text_start_clangame} onPress={() => {
                        this._collectEndClanGameScrol();
                    }}>竞赛结束</Text>

                    {/*<Text style={{marginTop: ScreenUtil.scaleSize(15)}}>如果部落成员出现变动，也可以进行单个成员竞赛登记</Text>

                    <TextInput placeholderTextColor={'#CCCCCC'} placeholder={'村庄标签'}
                               style={styles.clan_input_tag}
                               underlineColorAndroid='transparent'
                               onChangeText={(value) => {
                               }}
                               maxLength={9}
                    />
                    <Text style={styles.text_start_clangame}>竞赛单个记录</Text>*/}


                    <Text style={{marginTop: ScreenUtil.scaleSize(100), color: 'red'}}>重置会清空部落成员所有积分，慎重选择！</Text>
                    <Text style={styles.text_start_clangame} onPress={() => {
                        this._deleteClanGameInfo();
                    }}>重置</Text>
                    {this.state.delete_tag_success ?
                        <Text style={{marginTop: ScreenUtil.scaleSize(15), color: 'red'}}>重置成功</Text> : null}
                    {this._loadView()}
                </View>
            </ScrollView>
        );

    }


    _deleteClanGameInfo = () => {
        SPUtil.removeAsyncStorage(Constant.CollectClanGameTime + this.state.clan_tag, () => {
            this.setState({
                delete_tag_success: true,
                clanGameStartTime: '无',
                clanGameEndTime: '无',
                isOnerror: false
            });
            console.log('删除成功');
        }, () => {
        });

        SPUtil.removeAsyncStorage(Constant.Clan_games + this.state.clan_tag, () => {
            console.log('删除成功');
        }, () => {
        });

        SPUtil.removeAsyncStorage(Constant.Clan_games_END + this.state.clan_tag, () => {
            console.log('删除成功');
        }, () => {
        });
    };

    _loadView = () => {
        if (this.state.isCollectting) {
            return (
                <View style={{position: 'absolute', alignSelf: 'center', marginTop: (ScreenUtil.screenH - 300) / 2}}>
                    <ImageBackground resizeMode='stretch' style={{
                        width: ScreenUtil.scaleSize(400),
                        height: ScreenUtil.scaleSize(200)
                    }}
                                     source={require('../../res/imgs/dengji_loading.gif')}>
                        <Text style={{
                            marginTop: ScreenUtil.scaleSize(150),
                            marginLeft: ScreenUtil.scaleSize(30),
                            color: '#467fe7'
                        }}>正在统计中，请勿关闭页面</Text>
                    </ImageBackground>
                </View>
            )
        }
    };


    componentDidMount() {
        SPUtil.getAsyncStorage(Constant.ControlClan, (listClan) => {
            let controlTag = '';
            let controlname = '无';
            if (listClan != null && listClan !== undefined) {
                let jsonData = JSON.parse(listClan);
                for (let item of jsonData) {
                    if (item.isControl) {
                        controlTag = item.tag;
                        controlname = item.name;
                    }
                }
            }

            if (controlTag === '') {
                // this.refs.toast.show('没有管理中的部落');
            } else {

                this.setState({
                    clan_tag: controlTag,
                    currentControlClanName: controlname
                });

                SPUtil.getAsyncStorage(Constant.CollectClanGameTime + controlTag, (lastClanGameTime) => {

                    if (lastClanGameTime != null && lastClanGameTime !== undefined) {
                        let timeData = JSON.parse(lastClanGameTime);
                        this.setState({
                            clanGameStartTime: timeData.clanGameStartTime,
                            clanGameEndTime: timeData.clanGameEndTime,
                        });
                    }
                });

                this._getMemberList(controlTag);
                this._getLastClanGameData();
            }
        });
    }

    //获取上次统计信息
    _getLastClanGameData = (controlTag) => {
        SPUtil.getAsyncStorage(Constant.Clan_games_START + controlTag, (lastClanGameInfo) => {

            if (lastClanGameInfo != null && lastClanGameInfo !== undefined) {
                let clangame = JSON.parse(lastClanGameInfo);
                this.setState({
                    clanGameMemberInfos: clangame
                });
            }
        });
    };


    _getMemberList = () => {
        let self = this;
        HttpUtil.postJSON('clans', {'tag': this.state.clan_tag}, function (jsonData) {
            console.log('数据' + JSON.stringify(jsonData));
            if (jsonData.state) {
                self.setState({memberList: jsonData.data.memberList});
            }
        });
    };


    _collectAllMemberClanGameScrol = () => {
        let self = this;
        if (this.state.memberList.length > 0) {
            this.setState({
                isCollectting: true
            });

            if (this.state.isSettingNewMember) {
                let needGetClanGameNewMember = [];
                let memberList = this.state.memberList;//所有成员列表
                let newPushList = [];
                if (this.state.clanGameMemberInfos.length > 0) {
                    //找出需要更新的集合列表
                    for (let i = 0; i < memberList.length; i++) {
                        let tag = memberList[i].tag;
                        let isExist = false;
                        for (let j = 0; j < this.state.clanGameMemberInfos.length; j++) {
                            let tagg = this.state.clanGameMemberInfos[j].tag;
                            if (tag === tagg) {
                                isExist = true;
                                break;
                            }
                        }
                        if (!isExist) {
                            needGetClanGameNewMember.push(memberList[i]);
                        }
                    }

                    if (needGetClanGameNewMember.length > 0) {
                        for (let item of needGetClanGameNewMember) {
                            HttpUtil.postJSON('players', {'tag': item.tag}, function (jsonData) {
                                if (jsonData.state) {
                                    self._handleNewMemberDetailData(jsonData.data, newPushList);
                                }
                            });
                        }
                    } else {
                        this.setState({
                            errorMsg: '提示：没有新成员需要更新',
                            isOnerror: true,
                            isCollectting: false
                        });
                    }

                } else {
                    this.setState({
                        errorMsg: '错误：请先完成所有成员登记',
                        isOnerror: true,
                        isCollectting: false
                    });
                }
            } else {//更新全部

                let pushList = [];
                for (let item of this.state.memberList) {
                    HttpUtil.postJSON('players', {'tag': item.tag}, function (jsonData) {
                        if (jsonData.state) {
                            self._handleMemberDetailData(jsonData.data, pushList);
                        }
                    });
                }
            }
        }
    };


    //更新 新成员信息
    _handleNewMemberDetailData = (jsonData, newPushList) => {
        let chievementList = jsonData.achievements;
        for (let chieve of chievementList) {
            if (chieve.name === 'Games Champion') {
                let memberClanGame = {tag: jsonData.tag, clanGameValue: chieve.value};
                newPushList.push(memberClanGame);
            }
        }
        if (newPushList.length === chievementList.length) {
            this.setState({
                isCollectting: false,
                clanGameStartTime: TimeUtil.getNowFormatDate(),
                clanGameMemberInfos: this.state.clanGameMemberInfos.concat(newPushList)
            });

            //保存统计的信息
            SPUtil.saveAsyncStorage(Constant.Clan_games_START + this.state.clan_tag, JSON.stringify(this.state.clanGameMemberInfos.concat(newPushList)), () => {
                this.setState({
                        lastClanGameStartInfo: this.state.clanGameMemberInfos.concat(newPushList)
                    }
                );
                console.log('储存竞赛积分成功');
            }, () => {
                console.log('储存竞赛积分失败');
            });
            console.log('竞赛积分更新后的信息' + JSON.stringify(this.state.clanGameMemberInfos.concat(newPushList)))
        }
    };

    //更新所有成员  竞赛信息
    _handleMemberDetailData = (jsonData, pushList) => {
        let chievementList = jsonData.achievements;
        for (let chieve of chievementList) {
            if (chieve.name === 'Games Champion') {
                let memberClanGame = {tag: jsonData.tag, clanGameValue: chieve.value};
                pushList.push(memberClanGame);
            }
        }
        if (pushList.length === chievementList.length) {
            this.setState({
                isCollectting: false,
                clanGameStartTime: TimeUtil.getNowFormatDate(),
                clanGameMemberInfos: pushList
            });

            //保存统计的信息
            SPUtil.saveAsyncStorage(Constant.Clan_games_START + this.state.clan_tag, JSON.stringify(pushList), () => {
                this.setState({
                        lastClanGameStartInfo: pushList
                    }
                );
                console.log('储存竞赛积分成功');
            }, () => {
                console.log('储存竞赛积分失败');
            });
            console.log('竞赛登记开始的信息' + JSON.stringify(this.state.clanGameMemberInfos))
        }

    };


    _handleEndMemberDetailData = (jsonData, pushList) => {
        let chievementList = jsonData.achievements;
        for (let chieve of chievementList) {
            if (chieve.name === 'Games Champion') {
                let memberClanGame = {tag: jsonData.tag, clanGameValue: chieve.value};
                pushList.push(memberClanGame);
            }
        }
        if (pushList.length === chievementList.length) {
            this.setState({
                isCollectting: false,
                clanGameEndTime: TimeUtil.getNowFormatDate(),
            });

            //保存统计的信息
            // SPUtil.saveAsyncStorage(Constant.Clan_games_END + this.state.clan_tag, JSON.stringify(pushList), () => {
            //     console.log('储存竞赛结束积分成功');
            //     this.setState({
            //             lastClanGameEndInfo:pushList
            //         }
            //     );
            // }, () => {
            //     console.log('储存竞赛结束积分失败');
            // });
            let clanGameValueList = [];
            for (let start of this.state.lastClanGameStartInfo) {
                for (let end of pushList) {
                    if (start.tag === end.tag) {
                        let pustData = {tag: start.tag, clanGameValue: (end.clanGameValue - start.clanGameValue)};
                        clanGameValueList.push(pustData);
                    }
                }
            }
            console.log('结束竞赛积分信息' + JSON.stringify(pushList));
            SPUtil.saveAsyncStorage(Constant.Clan_games + this.state.clan_tag, JSON.stringify(clanGameValueList), () => {
                console.log('保存竞赛信息成功');
            }, () => {
                console.log('保存竞赛信息失败');
            });

            console.log('计算积分信息' + JSON.stringify(clanGameValueList));
        }

    };

    _collectEndClanGameScrol = () => {
        let self = this;
        SPUtil.getAsyncStorage(Constant.Clan_games_START + this.state.clan_tag, (valueList) => {
            if (valueList !== null, valueList !== undefined) {
                if (this.state.memberList.length > 0) {
                    this.setState({
                        isCollectting: true,
                        lastClanGameStartInfo: JSON.parse(valueList)
                    });

                    console.log('获取到的竞赛开始登记的信息' + valueList);

                    let pushList = [];
                    for (let item of this.state.memberList) {
                        HttpUtil.postJSON('players', {'tag': item.tag}, function (jsonData) {
                            if (jsonData.state) {
                                self._handleEndMemberDetailData(jsonData.data, pushList);
                            }
                        });
                    }

                }
            } else {
                this.setState({
                    errorMsg: '错误：你没有登记竞赛开始的部落',
                    isOnerror: true,
                    isCollectting: false
                });
            }
        }, () => {

        });
    };

    componentWillUnmount() {
        let clawarTiem = {clanGameStartTime: this.state.clanGameStartTime, clanGameEndTime: this.state.clanGameEndTime};
        SPUtil.saveAsyncStorage(Constant.CollectClanGameTime + this.state.clan_tag, JSON.stringify(clawarTiem), () => {
            console.log('保存时间成功')
        }, () => {
            console.log('保存时间失败')
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
    text_start_clangame: {
        backgroundColor: '#33A1FF',
        width: ScreenUtil.scaleSize(300),
        textAlign: 'center',
        color: 'white',
        borderRadius: ScreenUtil.scaleSize(5),
        marginTop: ScreenUtil.scaleSize(15),
        paddingTop: ScreenUtil.scaleSize(5),
        paddingBottom: ScreenUtil.scaleSize(5)
    },
    clan_input_tag: {
        paddingLeft: ScreenUtil.scaleSize(5),
        paddingRight: ScreenUtil.scaleSize(5),
        color: '#33A1FF',
        width: ScreenUtil.scaleSize(300),
        borderColor: '#EFEFEF',
        borderWidth: ScreenUtil.scaleSize(1),
        borderRadius: ScreenUtil.scaleSize(5),
        fontSize: 13,
        padding: 0,
        height: ScreenUtil.scaleSize(50),
        marginTop: ScreenUtil.scaleSize(15)
    },
});
