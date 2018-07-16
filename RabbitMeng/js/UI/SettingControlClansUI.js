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
            clan_list: [
                {name: '不打部落战只做捐兵狂26部', tag: '#P2YPYLJ', isControl: false},
                {name: 'Extreme丶神', tag: '#JOROUL9J', isControl: false},
                {name: '精英部队', tag: '#20CYRU98', isControl: false},
                {name: '追着幸福跑', tag: '#VVCUVQ2', isControl: false},
                {name: '轩皇', tag: '#PLJL2V0V', isControl: false},
                {name: '天使的守护', tag: '#G02RLVG0', isControl: true},
                {name: 'c.z.s2', tag: '#P0YJQ8UL', isControl: false},
                {name: '我珍惜的时光 ♡ 可已不在了', tag: '#JQQYVUJJ', isControl: false},
                {name: '天使的等待', tag: '#LQR8L9VP', isControl: false}],
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    /*ItemSeparatorComponent={() => {
                        return <View style={{height: 1, backgroundColor: '#EFEFEF'}}/>
                    }}*/
                    data={this.state.clan_list}
                    keyExtractor={(item, index) => item.tag}
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
                                }}>{item.item.isControl ? '管理中' : '待管理'}</Text>
                            </View>
                        )
                    }}
                />
            </View>
        );
    }

    componentDidMount(){
        SPUtil.saveAsyncStorage(Constant.ControlClan,JSON.stringify(this.state.clan_list),()=>{},()=>{})
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
