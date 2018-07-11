import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ImageBackground,
    ScrollView,
    FlatList
} from 'react-native';
import * as HttpUtil from "../uitl/HttpUtil";

let ScreenUtil = require('../uitl/ScreenUtil');
let ItemTroops = require('./ItemTroops');
let mainData = {}

export default class ClanDetailUI extends Component {

    //https://api.clashofclans.com/v1/players/%232Q808J2G


    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            troops: [],
            heroes: [],
            spells: [],
        };
    }

    render() {


        if (this.state.isLoading) {
            return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                <Image source={require('../../res/imgs/ali_look_around.gif')}/>
            </View>
        } else {
            return (
                <View
                    style={styles.container}
                >
                    <ScrollView showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                style={{flex: 1, flexDirection: 'row'}}>
                        <ImageBackground resizeMode='stretch' style={styles.detail_top_bg}
                                         source={require('../../res/imgs/detail_bg_top.jpg')}
                        >
                            <Text style={styles.text_name}>
                                {mainData.name}
                            </Text>
                        </ImageBackground>

                        {/*第一段*/}
                        <View style={{
                            flexDirection: 'row',
                            paddingLeft: ScreenUtil.scaleSize(5),
                            paddingRight: ScreenUtil.scaleSize(5)
                        }}>
                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_town_10}/>
                                <Text style={styles.text_white_10}>经验等级</Text>
                                <View style={styles.inner_content}>
                                    <Image style={styles.left_icon}
                                           source={require('../../res/imgs/lv_bg.png')}></Image>
                                    <Text>367</Text>
                                </View>
                            </View>

                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_town_10}/>
                                <Text style={styles.text_white_10}>传奇杯</Text>
                                <View style={styles.inner_content}>
                                    <Image style={styles.left_icon}
                                           source={require('../../res/imgs/lv_bg.png')}></Image>
                                    <Text>367</Text>
                                </View>
                            </View>

                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_town_10}/>
                                <Text style={styles.text_white_10}>传奇奖杯</Text>
                                <View style={styles.inner_content}>
                                    <Image style={styles.left_icon}
                                           source={require('../../res/imgs/lv_bg.png')}></Image>
                                    <Text>367</Text>
                                </View>
                            </View>

                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_town_10}/>
                                <Text style={styles.text_white_10}>战争星星</Text>
                                <View style={styles.inner_content}>
                                    <Image style={styles.left_icon}
                                           source={require('../../res/imgs/lv_bg.png')}></Image>
                                    <Text>367</Text>
                                </View>
                            </View>
                        </View>

                        {/*第二段*/}
                        <View style={{
                            flexDirection: 'row',
                            paddingLeft: ScreenUtil.scaleSize(5),
                            paddingRight: ScreenUtil.scaleSize(5)
                        }}>
                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_town_10}/>
                                <Text style={styles.text_white_10}>成功进攻数</Text>
                                <View style={styles.inner_content}>
                                    <Text>367</Text>
                                </View>
                            </View>

                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_town_10}/>
                                <Text style={styles.text_white_10}>成功防御</Text>
                                <View style={styles.inner_content}>
                                    <Text>367</Text>
                                </View>
                            </View>

                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_town_10}/>
                                <Text style={styles.text_white_10}>捐兵数</Text>
                                <View style={styles.inner_content}>
                                    <Text>367</Text>
                                </View>
                            </View>

                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_town_10}/>
                                <Text style={styles.text_white_10}>收兵</Text>
                                <View style={styles.inner_content}>
                                    <Text>367</Text>
                                </View>
                            </View>
                        </View>

                        {/*第三段*/}
                        <View style={{
                            flexDirection: 'row',
                            paddingLeft: ScreenUtil.scaleSize(5),
                            paddingRight: ScreenUtil.scaleSize(5)
                        }}>
                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_town_10}/>
                                <Text style={styles.text_white_10}>经验等级</Text>
                                <View style={styles.inner_content}>
                                    <Image style={styles.left_icon}
                                           source={require('../../res/imgs/lv_bg.png')}></Image>
                                    <Text>367</Text>
                                </View>
                            </View>

                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_town_10}/>
                                <Text style={styles.text_white_10}>传奇杯</Text>
                                <View style={styles.inner_content}>
                                    <Image style={styles.left_icon}
                                           source={require('../../res/imgs/lv_bg.png')}></Image>
                                    <Text>367</Text>
                                </View>
                            </View>

                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_town_10}/>
                                <Text style={styles.text_white_10}>传奇奖杯</Text>
                                <View style={styles.inner_content}>
                                    <Image style={styles.left_icon}
                                           source={require('../../res/imgs/lv_bg.png')}></Image>
                                    <Text>367</Text>
                                </View>
                            </View>

                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_town_10}/>
                                <Text style={styles.text_white_10}>战争星星</Text>
                                <View style={styles.inner_content}>
                                    <Image style={styles.left_icon}
                                           source={require('../../res/imgs/lv_bg.png')}></Image>
                                    <Text>367</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginTop: ScreenUtil.scaleSize(30)
                        }}>
                            {/*部队*/}
                            <View style={{
                                flex: 9,
                                marginLeft: ScreenUtil.scaleSize(15),
                                marginRight: ScreenUtil.scaleSize(15),
                            }}>
                                <Text style={{color: 'black', fontSize: 20}}>部队</Text>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.troops}
                                    keyExtractor={(item, index) => index}
                                    renderItem={(item) => {
                                        return ItemTroops.Troops(item)
                                    }}
                                    numColumns={6}
                                />
                            </View>

                            {/*法术*/}
                            <View style={{
                                flex: 4,
                                marginLeft: ScreenUtil.scaleSize(15),
                                marginRight: ScreenUtil.scaleSize(15)
                            }}>
                                <Text style={{color: 'black', fontSize: 20}}>法术</Text>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.spells}
                                    keyExtractor={(item, index) => item.name}
                                    renderItem={(item) => {
                                        return ItemTroops.Troops(item)
                                    }}
                                    numColumns={3}
                                />
                            </View>
                            {/*英雄*/}
                            <View style={{
                                flex: 4,
                                marginLeft: ScreenUtil.scaleSize(15),
                                marginRight: ScreenUtil.scaleSize(15)
                            }}>
                                <Text style={{color: 'black', fontSize: 20}}>英雄</Text>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.heroes}
                                    keyExtractor={(item, index) => item.name}
                                    renderItem={(item) => {
                                        return ItemTroops.Troops(item)
                                    }}
                                    numColumns={3}
                                />
                            </View>
                        </View>

                    </ScrollView>
                </View>
            );
        }

    }

    componentDidMount() {
        let self = this
        HttpUtil.get('https://api.clashofclans.com/v1/players/' + self.props.coc_tag.replace(/#/, '%23'), '', function (jsonData) {
            mainData = jsonData
            self.setState({
                isLoading: false,
                troops: jsonData.troops,
                heroes: jsonData.heroes,
                spells: jsonData.heroes,
            }).call(ClanDetailUI)
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    detail_top_bg: {
        alignItems: 'center',
        justifyContent: 'center',
        width: ScreenUtil.screenW,
        height: ScreenUtil.scaleSize(450),
    },
    text_name: {
        color: 'white',
        fontSize: 15
    },
    info_layout_cirle: {
        flex: 1,
        flexDirection: 'column',
        marginTop: ScreenUtil.scaleSize(10),
        // width: ScreenUtil.scaleSize(200),
        height: ScreenUtil.scaleSize(65),
    },
    bg_cir_town_10: {
        marginLeft: ScreenUtil.scaleSize(10),
        marginRight: ScreenUtil.scaleSize(10),
        marginTop: ScreenUtil.scaleSize(11),
        borderRadius: 5,
        borderWidth: ScreenUtil.scaleSize(1),
        borderColor: '#1afa29',
        height: ScreenUtil.scaleSize(50),
        paddingLeft: 1,
        paddingRight: 1,
    },
    text_white_10: {
        marginLeft: ScreenUtil.scaleSize(20),
        fontSize: 8,
        color: '#DC143C',
        backgroundColor: 'white',
        position: 'absolute'
    },
    text_num_inner: {
        marginTop: ScreenUtil.scaleSize(20),
        position: 'absolute',
        fontSize: 15,
        marginLeft: ScreenUtil.scaleSize(15),
    },
    left_icon: {
        width: ScreenUtil.scaleSize(30),
        height: ScreenUtil.scaleSize(30),
    },
    inner_content: {
        flexDirection: 'row',
        marginTop: ScreenUtil.scaleSize(20),
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: ScreenUtil.scaleSize(15),
    }
});
