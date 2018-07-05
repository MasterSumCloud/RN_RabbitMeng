import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text, ScrollView, ImageBackground, FlatList
} from 'react-native';
import * as ScreenUtil from "../uitl/ScreenUtil";
import * as HttpUtil from "../uitl/HttpUtil";

let ItemControlMember = require('./ItemControlMember');

export default class ControlUI extends Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataAry: [],
            clans_img: '',
            clans_name: '部落名称',
        };
    }

    componentDidMount() {
        let self = this
        HttpUtil.get('https://api.clashofclans.com/v1/clans/%23G02RLVG0', '', function (jsonData) {
            console.log(jsonData.items)
            self.setState({
                dataAry: jsonData.memberList,
                isLoading: false,
                clans_img: jsonData.badgeUrls.small,
                clans_name: jsonData.name
            })
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={{flex: 1, flexDirection: 'column'}}
                    stickyHeaderIndices={[1]}
                >
                    <ImageBackground resizeMode='stretch' style={styles.mine_top}
                                     source={require('../../res/imgs/control_bg.png')}
                    >

                        <Text style={styles.text_white}>
                            {this.state.clans_name}
                        </Text>

                        <Text style={styles.text_white}>12本数量</Text>
                        <Text style={styles.text_white}>11本数量</Text>
                        <Text style={styles.text_white}>10本数量</Text>
                        <Text style={styles.text_white}>9本数量</Text>
                        <Text style={styles.text_white}>部落总人数</Text>

                    </ImageBackground>

                    <View>
                        <View style={styles.coc_sort_container}>
                            <View style={styles.text_tab_1}>
                                <Text style={{color: '#666666'}}>序号</Text>
                            </View>
                            <View style={styles.text_tab_2}>
                                <Text style={{color: '#666666'}}>等级</Text>
                            </View>
                            <View style={styles.text_tab_3}>
                                <Text style={{color: '#666666'}}>名 字</Text>
                            </View>

                            <View style={styles.text_tab_4}>
                                <Text style={{color: '#666666'}}>收兵</Text>
                            </View>

                            <View style={styles.text_tab_5}>
                                <Text style={{color: '#666666'}}>捐兵</Text>
                            </View>

                            <View style={styles.text_tab_6}>
                                <Text style={{color: '#666666'}}>比例</Text>
                            </View>

                            <View style={styles.text_tab_7}>
                                <Text style={{color: '#666666'}}>职位</Text>
                            </View>

                        </View>
                    </View>

                    <FlatList
                        data={this.state.dataAry}
                        keyExtractor={(item, index) => item.tag}
                        renderItem={(item) => {
                            return ItemControlMember.ItemCocClan(item)
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
        backgroundColor: 'white',
    },
    mine_top: {
        alignItems: 'center',
        width: ScreenUtil.screenW,
        height: ScreenUtil.scaleSize(450),
    },
    text_white: {
        marginTop: ScreenUtil.scaleSize(15),
        color: 'white'
    },
    line: {
        backgroundColor: '#efefef',
        width: ScreenUtil.screenW,
        height: ScreenUtil.scaleSize(1),
    },
    coc_sort_container: {
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        justifyContent: 'space-around',
        flexDirection: 'row',
        height: ScreenUtil.scaleSize(100),
    },
    text_tab_1: {flex: 0.8, justifyContent: 'center', alignItems: 'center'},
    text_tab_2: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    text_tab_3: {flex: 1.5, justifyContent: 'center', alignItems: 'center',},
    text_tab_4: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    text_tab_5: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    text_tab_6: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    text_tab_7: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
