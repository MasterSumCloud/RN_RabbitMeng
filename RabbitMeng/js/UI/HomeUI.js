import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList
} from 'react-native';
import * as Constant from "../uitl/Constant";
import * as HttpUtil from "../uitl/HttpUtil";
import * as ToastUtil from "../uitl/ToastUitl";

let ItemHomeView = require('../item/ItemHomeView');

let ScreenUtil = require('../uitl/ScreenUtil');
const DeviceEventEmitter = require("react-native/Libraries/EventEmitter/NativeEventEmitter");

export default class HomeUI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nextWarTime: '未知',
            nextWarMsg: '未知',
            mData: []
        };
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.mData}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={() => {
                        return <View style={{height: 1, backgroundColor: '#EFEFEF'}}/>
                    }}
                    renderItem={(item) => {
                        if (item.item.type === 1) {
                            return ItemHomeView.ItemHomeType1(item.item);
                        } else if (item.item.type === 2) {
                            return ItemHomeView.ItemHomeType2(item.item);
                        } else {
                            return ItemHomeView.ItemHomeView(item.item);
                        }
                    }}
                />
            </View>
        );
    }


    componentDidMount() {
        HttpUtil.postJSON('warstarttime', null, function (dataJson) {
            console.log(JSON.stringify(dataJson));
            if (dataJson.state) {
                if (dataJson.data !== undefined && dataJson.data !== null && dataJson.data.length > 0) {
                    let warData = {
                        title: '下次开战时间',
                        type: 1,
                        nextWarTime: dataJson.data[0].fields.warstartT,
                        nextWarMsg: dataJson.data[0].fields.warmsg,
                        bgurl: 'http://img5.dwstatic.com/coc/1505/295437480408/295437762432.jpg',
                        publishTime:'管理员 8月22日'
                    };
                    this.state.mData.push(warData);
                    this.setState({
                        mData:this.state.mData
                    });
                }
            }
        }.bind(this), function (error) {

        });

        //// 下载最新Apk
        // NativeModules.upgrade.upgrade(this.state.apkUrl);


        // DeviceEventEmitter.addListener('LOAD_PROGRESS',(msg)=>{
        //     let title = "当前下载进度：" + msg;
        //     ToastUtil.showToastShort(title)
        // });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: ScreenUtil.scaleSize(30)
    },
    warStartTime: {
        marginTop: ScreenUtil.scaleSize(30)
    }
});
