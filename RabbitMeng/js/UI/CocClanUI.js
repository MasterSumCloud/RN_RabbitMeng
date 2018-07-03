import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    ScrollView,
    FlatList
} from 'react-native';
import * as ScreenUtil from "../uitl/ScreenUtil";

let ItemCocClan = require('./ItemCocClan');

const dataAry = [];

export default class CocClanUI extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        for (var i = 0; i < 100; i++) {
            var obj = {}
            obj.key = i
            dataAry.push(obj)
        }

        this.state = {
            index: 1,
            dataAry: dataAry,
        };
    }


    render() {
        return (
            <View style={styles.container}>
                {/*头部的搜索*/}
                <ScrollView
                    style={{flex: 1, flexDirection: 'column'}}
                    stickyHeaderIndices={[3]}
                >
                    <View style={styles.head_container}>
                        <Image style={styles.coc_img}></Image>

                        <Text style={styles.coc_clan_name}>部落名称</Text>

                        <View style={styles.text_input_search}>
                            <Image style={{
                                width: ScreenUtil.scaleSize(30),
                                height: ScreenUtil.scaleSize(30),
                                marginLeft: ScreenUtil.scaleSize(15)
                            }} source={require('../../res/imgs/search_left.png')}/>
                            <TextInput placeholderTextColor={'#999999'} style={styles.serarch}
                                       maxLength={30}
                                       underlineColorAndroid='transparent'
                                       placeholder={'请输入要查找的部落名称'}/>
                        </View>
                    </View>

                    <View style={styles.line}/>

                    <View style={styles.coc_sort_container_sore}>
                        <Text style={styles.text_tab_t}>部落 升</Text>
                        <Text style={styles.text_tab_t}>部落 升</Text>
                        <Text style={styles.text_tab_t}>部落 升</Text>
                        <Text style={styles.text_tab_t}>部落 升</Text>
                        <Text style={styles.text_tab_t}>部落 升</Text>
                    </View>

                    <View>
                        <View style={styles.coc_sort_container}>
                            <Text style={styles.text_tab}>序号</Text>
                            <Text style={styles.text_tab}>大本营</Text>
                            <Text style={styles.text_tab}>名字</Text>
                            <Text style={styles.text_tab}>捐兵</Text>
                            <Text style={styles.text_tab}>收兵</Text>
                            <Text style={styles.text_tab}>比例</Text>
                            <Text style={styles.text_tab}>星星</Text>
                        </View>
                    </View>

                    <FlatList
                        data={this.state.dataAry}
                        renderItem={(item) => {
                            return ItemCocClan.ItemCocClan(item)
                        }}
                    />

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    coc_img: {
        backgroundColor: '#F00',
        width: ScreenUtil.scaleSize(30),
        height: ScreenUtil.scaleSize(30),
        marginLeft: ScreenUtil.scaleSize(15),
        marginRight: ScreenUtil.scaleSize(10)
    },
    head_container: {
        height: ScreenUtil.scaleSize(100),
        width: ScreenUtil.screenW,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    serarch: {
        flex: 1,
        paddingLeft: ScreenUtil.scaleSize(10),
        paddingRight: ScreenUtil.scaleSize(30),
        backgroundColor: null,
        color: '#999999',
    },
    line: {
        backgroundColor: '#efefef',
        width: ScreenUtil.screenW,
        height: ScreenUtil.scaleSize(1),
    },
    coc_sort_container_sore: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-around',
        flexDirection: 'row',
        height: ScreenUtil.scaleSize(100),
    },
    coc_sort_container: {
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        justifyContent: 'space-around',
        flexDirection: 'row',
        height: ScreenUtil.scaleSize(100),
    },
    coc_clan_name: {
        fontSize: 15,
        color: '#333333'
    },
    text_input_search: {
        flex: 1,
        height: ScreenUtil.scaleSize(62),
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: ScreenUtil.scaleSize(30),
        // marginTop: ScreenUtil.scaleSize(14),
        // marginBottom: ScreenUtil.scaleSize(14),
        marginLeft: ScreenUtil.scaleSize(15),
        borderColor: '#E1E1E1',
        borderWidth: ScreenUtil.scaleSize(1),
        borderRadius: ScreenUtil.scaleSize(30)
    },
    text_tab: {
        color: '#666666'
    }, text_tab_t: {color: '#333333'}
});
