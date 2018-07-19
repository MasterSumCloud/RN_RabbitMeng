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


import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'


export default class ClanGameUI extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            isCollectting: false
        }
    }


    render() {
        return (

            <ScrollView>
                <View style={styles.container}>

                    <Text>使用说明：请在竞赛开始前进行开始登记，这时候会记录当前部落的所有成员积分，兵在赛季竞赛结束后进行结束登记，系统会计算两次登记时间中成员的竞赛积分差来算出对应成员在本次竞赛中所得积分！</Text>

                    <Text style={{marginTop: ScreenUtil.scaleSize(15), color: '#8EC31E'}}>登记竞赛开始时间：2018-7-16</Text>

                    <Text style={{
                        marginTop: ScreenUtil.scaleSize(15),
                        color: '#FFA500'
                    }}>按钮是针对部落新成员，勾选是，只记录新成员的竞赛积分，勾选否，更新所有成员</Text>


                    <Text style={{marginTop: ScreenUtil.scaleSize(15), color: '#33A1FF'}}>是否只针对新成员</Text>
                    <RadioGroup
                        selectedIndex={1}
                        style={{flexDirection: 'row'}}
                        onSelect={(index, value) => {
                        }}
                    >
                        <RadioButton value={true}>
                            <Text>是</Text>
                        </RadioButton>

                        <RadioButton value={false}>
                            <Text>否</Text>
                        </RadioButton>
                    </RadioGroup>


                    <Text style={styles.text_start_clangame}>竞赛开始</Text>

                    <Text style={{marginTop: ScreenUtil.scaleSize(15), color: 'red'}}>登记竞赛结束时间：2018-7-16</Text>

                    <Text style={styles.text_start_clangame}>竞赛结束</Text>

                    <Text style={{marginTop: ScreenUtil.scaleSize(15)}}>如果部落成员出现变动，也可以进行单个成员竞赛登记</Text>

                    <TextInput placeholderTextColor={'#CCCCCC'} placeholder={'村庄标签'}
                               style={styles.clan_input_tag}
                               underlineColorAndroid='transparent'
                               onChangeText={(value) => {
                               }}
                               maxLength={9}
                    />
                    <Text style={styles.text_start_clangame}>竞赛单个记录</Text>


                    <Text style={{marginTop: ScreenUtil.scaleSize(100), color: 'red'}}>重置会清空部落成员所有积分，慎重选择！</Text>
                    <Text style={styles.text_start_clangame}>重置</Text>


                    {this._loadView()}
                </View>
            </ScrollView>
        );
    }

    _loadView = () => {
        if (this.state.isCollectting) {
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
        }
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
