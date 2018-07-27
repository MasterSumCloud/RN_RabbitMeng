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

        };
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    ItemSeparatorComponent={() => {
                        return <View style={{
                            height: 1,
                            backgroundColor: '#EFEFEF',
                            marginLeft: ScreenUtil.scaleSize(30),
                            marginRight: ScreenUtil.scaleSize(30)
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

    _ItemBlacklist = (item) => {
        return <View style={styles.item}>
            <Text>{item.fields.clanname}</Text>
            <Text style={{marginLeft: ScreenUtil.scaleSize(30)}}>{item.fields.clantag}</Text>
        </View>
    };

    componentDidMount() {
        HttpUtil.postJSON('getblack', null, function (jsonData) {
            console.log('服务器返回黑米单' + JSON.stringify(jsonData));
            if (jsonData.state) {
                this.setState({
                    blacklist: jsonData.data
                });
            }
        }.bind(this));
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
    item: {
        flexDirection: 'row',
        height: ScreenUtil.scaleSize(100)
    }
});
