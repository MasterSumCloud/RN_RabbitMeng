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
            clan_tag_img_big: '',
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
                clan_tag_img_big: jsonData.badgeUrls.large,
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
                                     source={require('../../res/imgs/coc_clan_bg.png')}
                    >

                        <Text style={styles.text_coc_name}>
                            {this.state.clans_name}
                        </Text>

                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.text_rund_bg}>
                                <View style={styles.bg_cir_town_12}/>
                                <Text style={styles.text_white_12}>12本数量</Text>
                                <Text style={styles.text_num_inner}>15个 未超标</Text>
                            </View>

                            <View style={styles.text_rund_bg}>
                                <View style={styles.bg_cir_town_11}/>
                                <Text style={styles.text_white_11}>11本数量</Text>
                                <Text style={styles.text_num_inner}>15个 未超标</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <View style={styles.text_rund_bg}>
                                <View style={styles.bg_cir_town_10}/>
                                <Text style={styles.text_white_10}>10本数量</Text>
                                <Text style={styles.text_num_inner}>15个 未超标</Text>
                            </View>

                            <View style={styles.text_rund_bg}>
                                <View style={styles.bg_cir_town_9}/>
                                <Text style={styles.text_white_9}>9本数量</Text>
                                <Text style={styles.text_num_inner}>5个 未超标</Text>
                            </View>
                        </View>


                        <View style={styles.text_rund_bg_member}>
                            <View style={styles.bg_cir_town_member}/>
                            <Text style={styles.text_white__member}>部落总人数</Text>
                            <Text style={styles.text_num_inner}>50 满人</Text>
                        </View>

                        <Image style={styles.coc_clan_tag} source={{uri: this.state.clan_tag_img_big}}/>


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


// #F7B22F  警告颜色
// #1afa29  正常颜色
// #BE0004  超标颜色
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mine_top: {
        width: ScreenUtil.screenW,
        height: ScreenUtil.scaleSize(450),
    },
    text_white_12: {
        marginLeft: ScreenUtil.scaleSize(20),
        fontSize: 10,
        color: '#1E90FF',
        backgroundColor: '#E8F4F6',
        position: 'absolute'
    },
    text_white_11: {
        marginLeft: ScreenUtil.scaleSize(20),
        fontSize: 10,
        color: '#FA8072',
        backgroundColor: '#E8F4F6',
        position: 'absolute'
    },
    text_white_10: {
        marginLeft: ScreenUtil.scaleSize(20),
        fontSize: 10,
        color: '#DC143C',
        backgroundColor: '#E8F4F6',
        position: 'absolute'
    },
    text_white_9: {
        marginLeft: ScreenUtil.scaleSize(20),
        fontSize: 10,
        color: '#33333E',
        backgroundColor: '#E8F4F6',
        position: 'absolute'
    },
    text_white__member: {
        marginLeft: ScreenUtil.scaleSize(20),
        fontSize: 10,
        color: '#FF00FF',
        backgroundColor: '#E8F4F6',
        position: 'absolute'
    },
    text_coc_name: {
        color: '#33A1FF',
        position: 'absolute',
        fontSize: 20,
        marginTop: ScreenUtil.scaleSize(140),
        marginLeft: ScreenUtil.scaleSize(ScreenUtil.screenW * 0.45),
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
    bg_cir_town_12: {
        marginTop: ScreenUtil.scaleSize(15),
        borderRadius: 5,
        borderWidth: ScreenUtil.scaleSize(1),
        borderColor: '#1afa29',
        height: ScreenUtil.scaleSize(40),
        paddingLeft: 1,
        paddingRight: 1,
    },
    bg_cir_town_11: {
        marginTop: ScreenUtil.scaleSize(15),
        borderRadius: 5,
        borderWidth: ScreenUtil.scaleSize(1),
        borderColor: '#1afa29',
        height: ScreenUtil.scaleSize(40),
        paddingLeft: 1,
        paddingRight: 1,
    },
    bg_cir_town_10: {
        marginTop: ScreenUtil.scaleSize(15),
        borderRadius: 5,
        borderWidth: ScreenUtil.scaleSize(1),
        borderColor: '#1afa29',
        height: ScreenUtil.scaleSize(40),
        paddingLeft: 1,
        paddingRight: 1,
    },
    bg_cir_town_9: {
        marginTop: ScreenUtil.scaleSize(15),
        borderRadius: 5,
        borderWidth: ScreenUtil.scaleSize(1),
        borderColor: '#1afa29',
        height: ScreenUtil.scaleSize(40),
        paddingLeft: 1,
        paddingRight: 1,
    },
    bg_cir_town_member: {
        marginTop: ScreenUtil.scaleSize(15),
        borderRadius: 5,
        borderWidth: ScreenUtil.scaleSize(1),
        borderColor: '#1afa29',
        height: ScreenUtil.scaleSize(40),
        paddingLeft: 1,
        paddingRight: 1,
    },
    text_rund_bg: {
        flexDirection: 'column',
        marginLeft: ScreenUtil.scaleSize(15),
        marginTop: ScreenUtil.scaleSize(10),
        width: ScreenUtil.scaleSize(200),
        height: ScreenUtil.scaleSize(50),
    },
    text_num_inner: {
        color: '#1afa29',
        marginTop: ScreenUtil.scaleSize(20),
        position: 'absolute',
        fontSize: 12,
        marginLeft: ScreenUtil.scaleSize(15),
    },
    text_rund_bg_member: {
        flexDirection: 'column',
        marginLeft: ScreenUtil.scaleSize(15),
        marginTop: ScreenUtil.scaleSize(160),
        width: ScreenUtil.scaleSize(200),
        height: ScreenUtil.scaleSize(50),
    }, coc_clan_tag: {
        width: ScreenUtil.scaleSize(120),
        height: ScreenUtil.scaleSize(120),
        position: 'absolute',
        marginLeft: ScreenUtil.scaleSize(485),
        marginTop: ScreenUtil.scaleSize(175),
    }
});
