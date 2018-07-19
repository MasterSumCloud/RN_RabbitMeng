import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ImageBackground,
    ScrollView,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';

let ScreenUtil = require('../uitl/ScreenUtil');

const listArr =
    [{index: 1, name: '黑名单', leftIcon: require('../../res/imgs/black_list_icon.png')},
        {index: 2, name: '我的收藏', leftIcon: require('../../res/imgs/collect_icon.png')},
        {index: 3, name: '管理部落', leftIcon: require('../../res/imgs/manage_icon.png')},
        {index: 4, name: '积分登记', leftIcon: require('../../res/imgs/registration_icon.png')},
        {index: 5, name: '设置', leftIcon: require('../../res/imgs/setting_icon.png')},
    ]

export default class MineUI extends Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    style={{flex: 1, flexDirection: 'column'}}
                >
                    <ImageBackground resizeMode='stretch' style={styles.mine_top}
                                     source={require('../../res/imgs/mine_top_bg.jpg')}
                    >
                        {/*头像*/}
                        <Image style={styles.image_login_head} roundAsCircle={true}
                               source={require('../../res/imgs/head_defoult.jpg')}/>

                        <Text style={styles.text_white}>
                            天使的守护
                        </Text>

                        <View style={styles.identify_bg}>
                            <Text style={{color: 'white'}}>认证</Text>
                        </View>
                    </ImageBackground>
                    {/*中间按钮*/}


                    <View style={styles.top_importent}>
                        <TouchableWithoutFeedback onPress={()=>{
                            this.props.navigator.push({
                                screen: 'ClanGameUI',
                                title: '竞赛登记',
                            });
                        }}>
                            <View style={styles.center_lay}>
                                <Image style={styles.top_icon} source={require('../../res/imgs/vip_icon.png')}/>
                                <Text>竞赛登记</Text>
                            </View></TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{
                            this.props.navigator.push({
                                screen: 'ClanWarUI',
                                title: '部落战登记',
                            });
                        }}>
                            <View style={styles.center_lay}>
                                <Image style={styles.top_icon} source={require('../../res/imgs/tongji.png')}/>
                                <Text>部落战登记</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {/*底部List*/}
                    <View style={styles.bottom_list}>
                        <FlatList
                            ItemSeparatorComponent={() => {
                                return <View style={{
                                    height: 1,
                                    backgroundColor: '#EFEFEF',
                                    marginLeft: ScreenUtil.scaleSize(30),
                                    marginRight: ScreenUtil.scaleSize(30)
                                }}/>
                            }}
                            data={listArr}
                            keyExtractor={(item, index) => item.index}
                            renderItem={(item) => {
                                return this._ItemMine(this, item.item)
                            }}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }

    _ItemMine(mineUi, item) {
        return (
            <TouchableWithoutFeedback onPress={() => {
                switch (item.index) {
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        this.props.navigator.push({
                            screen: 'SettingControlClansUI',
                            title: '部落管理',
                        });
                        break;
                    case 4:
                        this.props.navigator.showModal({
                            screen: 'MumberDetailUI',
                            title: '积分管理',
                        });
                        break;
                    case 5:
                        this.props.navigator.push({
                            screen: 'SettingUI',
                            title: '设置',
                        });
                        break;
                }
            }}>
                <View style={styles.item_style}>
                    <Image style={styles.left_icon} source={item.leftIcon}/>
                    <Text style={styles.text_item}>{item.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF1F4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mine_top: {
        alignItems: 'center',
        width: ScreenUtil.screenW,
        height: ScreenUtil.scaleSize(450),
    },
    image_login_head: {
        marginTop: ScreenUtil.scaleSize(100),
        width: ScreenUtil.scaleSize(140),
        height: ScreenUtil.scaleSize(140),
        borderRadius: 35,
    },
    text_white: {
        marginTop: ScreenUtil.scaleSize(15),
        color: 'white'
    },
    identify_bg: {
        paddingTop: ScreenUtil.scaleSize(5),
        paddingBottom: ScreenUtil.scaleSize(5),
        paddingLeft: ScreenUtil.scaleSize(15),
        paddingRight: ScreenUtil.scaleSize(15),
        marginTop: ScreenUtil.scaleSize(15),
        borderWidth: ScreenUtil.scaleSize(1),
        borderColor: 'white',
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: ScreenUtil.scaleSize(25)
    },
    top_importent: {
        marginLeft: ScreenUtil.scaleSize(30),
        marginRight: ScreenUtil.scaleSize(30),
        height: ScreenUtil.scaleSize(150),
        width: ScreenUtil.screenW - ScreenUtil.scaleSize(60),
        backgroundColor: 'white',
        borderRadius: ScreenUtil.scaleSize(30),
        position: 'absolute',
        marginTop: ScreenUtil.scaleSize(375),
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    bottom_list: {
        marginTop: ScreenUtil.scaleSize(110),
        marginLeft: ScreenUtil.scaleSize(30),
        marginRight: ScreenUtil.scaleSize(30),
        width: ScreenUtil.screenW - ScreenUtil.scaleSize(60),
        backgroundColor: 'white',
        borderRadius: ScreenUtil.scaleSize(30),
    },
    left_icon: {
        height: ScreenUtil.scaleSize(30),
        width: ScreenUtil.scaleSize(30),
    },
    center_lay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    top_icon: {
        height: ScreenUtil.scaleSize(50),
        width: ScreenUtil.scaleSize(50),
        marginBottom: ScreenUtil.scaleSize(10),
    },
    item_style: {
        flexDirection: 'row',
        height: ScreenUtil.scaleSize(90),
        alignItems: 'center',
        paddingLeft: ScreenUtil.scaleSize(50),
    },
    text_item: {
        marginLeft: ScreenUtil.scaleSize(10),
    }
});
