import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList
} from 'react-native';
import * as HttpUtil from "../uitl/HttpUtil";

let ScreenUtil = require('../uitl/ScreenUtil');

export default class BlackListUI extends Component {


    constructor(props) {
        super(props);
        this.state = {
            blacklist: [],
            isLoading: true,
        };
    }


    render() {
        if (this.state.isLoading) {
            return <View style={styles.container}>
                <Image source={require('../../res/imgs/black_loading.gif')}
                       style={{width: ScreenUtil.scaleSize(400), height: ScreenUtil.scaleSize(300)}}/>
                <Text>加载中。。。</Text>
            </View>
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        ItemSeparatorComponent={() => {
                            return <View style={{
                                height: 1,
                                backgroundColor: 'white',
                            }}/>
                        }}
                        data={this.state.blacklist}
                        keyExtractor={(item, index) => index}
                        renderItem={(item) => {
                            return this._ItemBlacklist(item.item)
                        }}
                    />
                </View>
            );
        }

    }

    _ItemBlacklist = (item) => {
        return <View style={styles.item}>
            <Text style={{color: 'white'}}>{item.fields.clanname}</Text>
            <Text style={{marginLeft: ScreenUtil.scaleSize(60), color: 'white'}}>{item.fields.clantag}</Text>
        </View>
    };

    componentDidMount() {
        HttpUtil.postJSON('getblack', null, function (jsonData) {
            console.log('服务器返回黑米单' + JSON.stringify(jsonData));
            if (jsonData.state) {
                this.setState({
                    blacklist: jsonData.data,
                    isLoading:false
                });
            }
        }.bind(this));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems:'center'
    },
    item: {
        flexDirection: 'row',
        backgroundColor: 'black',
        alignItems: 'center',
        height: ScreenUtil.scaleSize(80),
        paddingLeft: ScreenUtil.scaleSize(30)
    }
});
