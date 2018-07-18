import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
    TouchableHighlight
} from 'react-native';
import * as ScreenUtil from "../uitl/ScreenUtil";
import * as Constant from '../uitl/Constant';

let SPUtil = require('../uitl/SPUtil')

export default class SettingControlClansUI extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            clan_list: [],
        };
    }

    render() {
        if (this.state.isLoading) {
            return (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                <Image source={require('../../res/imgs/ali_look_around.gif')}/>
            </View>);
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        /*ItemSeparatorComponent={() => {
                            return <View style={{height: 1, backgroundColor: '#EFEFEF'}}/>
                        }}*/
                        data={this.state.clan_list}
                        keyExtractor={(item, index) => item.tag}
                        extraData={this.state}
                        renderItem={(item) => {
                            return (
                                <View style={{
                                    alignItems: 'center',
                                    backgroundColor: item.index % 2 === 0 ? 'white' : '#F7F7F7',
                                    height: ScreenUtil.scaleSize(100),
                                    width: ScreenUtil.screenW,
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{marginLeft: ScreenUtil.scaleSize(30)}}>{item.item.name}</Text>

                                    <Text style={{
                                        position: 'absolute',
                                        color: item.item.isControl ? '#8EC31E' : '#F7B22F',
                                        marginLeft: ScreenUtil.screenW * 0.8
                                    }} onPress={() => {
                                        let newList = this.state.clan_list;
                                        for (let i = 0; i < newList.length; i++) {
                                            if (i === item.index) {
                                                newList[i].isControl = true;
                                            } else {
                                                newList[i].isControl = false;
                                            }
                                        }
                                        this.setState({clan_list: newList});
                                    }}>{item.item.isControl ? '管理中' : '待管理'}</Text>
                                </View>
                            )
                        }}
                    />
                </View>
            );
        }

    }

    componentDidMount() {
        SPUtil.getAsyncStorage(Constant.ControlClan, (value) => {
            this.setState({isLoading: false, clan_list: JSON.parse(value)});
        }, () => {
            console.log('数据获取失败')
        })
    }


    componentWillUnmount() {
        SPUtil.saveAsyncStorage(Constant.ControlClan, JSON.stringify(this.state.clan_list), () => {
            console.log('数据储存成功')
        }, () => {
            console.log('数据储存失败')
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
});
