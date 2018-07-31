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
        backgroundColor: '#F5FCFF',
    },
    item: {
        flexDirection: 'row',
        backgroundColor: 'black',
        alignItems: 'center',
        height: ScreenUtil.scaleSize(80),
        paddingLeft: ScreenUtil.scaleSize(30)
    }
});
