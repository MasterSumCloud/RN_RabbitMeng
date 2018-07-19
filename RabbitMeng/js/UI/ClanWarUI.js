import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

let ScreenUtil = require('../uitl/ScreenUtil');
import * as Constant from '../uitl/Constant'

export default class ClanWarUI extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            isShowLoading: true
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>使用说明：请一定在部落结束前进行登记，系统会当前部落站所有成员的进攻次数！如果部落战结束，则登记不了</Text>
                <Text style={{marginTop: ScreenUtil.scaleSize(15), color: 'red'}}>上次登记时间：2018-7-16</Text>
                <Text style={styles.text_start_war}>进行登记</Text>
                <Text style={{marginTop: ScreenUtil.scaleSize(200),}}>重置会清空所有部落成员进攻次数</Text>
                <Text style={styles.text_start_war}>重置</Text>

                {this._showLoading}
            </View>
        );
    }

    _showLoading = () => {
        if (this.state.isShowLoading) {
            return <View>
                <Image style={{width:ScreenUtil.scaleSize(30),height:ScreenUtil.scaleSize(30)}} source={require('../../res/imgs/ali_dance.gif')}/>
            </View>
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
