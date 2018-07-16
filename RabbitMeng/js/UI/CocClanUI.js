import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    ScrollView,
    FlatList,
    Modal,
    TouchableHighlight
} from 'react-native';
import * as ScreenUtil from "../uitl/ScreenUtil";
import * as HttpUtil from "../uitl/HttpUtil";
import * as Constant from "../uitl/Constant";

let ItemCocClan = require('../item/ItemCocClan');
let SPUtil = require('../uitl/SPUtil')
import ModalDropdown from 'react-native-modal-dropdown';

export default class CocClanUI extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataAry: [],
            clans_img: '',
            clans_name: '部落名称',
            control_clan_list: [
                {name: '不打部落战只做捐兵狂26部', tag: '#P2YPYLJ', isControl: false},
                {name: 'Extreme丶神', tag: '#JOROUL9J', isControl: false},
                {name: '精英部队', tag: '#20CYRU98', isControl: false},
                {name: '追着幸福跑', tag: '#VVCUVQ2', isControl: false},
                {name: '轩皇', tag: '#PLJL2V0V', isControl: false},
                {name: '天使的守护', tag: '#G02RLVG0', isControl: true},
                {name: 'c.z.s2', tag: '#P0YJQ8UL', isControl: false},
                {name: '我珍惜的时光 ♡ 可已不在了', tag: '#JQQYVUJJ', isControl: false},
                {name: '天使的等待', tag: '#LQR8L9VP', isControl: false}],
        };
    }

    //  https://api.clashofclans.com/v1/clans/%23G02RLVG0/members
    //  https://api.clashofclans.com/v1/clans/%23G02RLVG0
    //  ▵▿
    componentDidMount() {
        let self = this;
        HttpUtil.get('https://api.clashofclans.com/v1/clans/%23G02RLVG0', '', function (jsonData) {
            console.log(jsonData.items)
            self.setState({
                dataAry: jsonData.memberList,
                isLoading: false,
                clans_img: jsonData.badgeUrls.small,
                clans_name: jsonData.name
            }).call(CocClanUI)
        })

        SPUtil.getAsyncStorage(Constant.ControlClan, (value) => {
            self.setState({
                // control_clan_list: JSON.parse(value)
            })
        }, () => {
        })

    }


    render() {
        return (
            <View style={styles.container}>
                {/*头部的搜索*/}
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={{flex: 1, flexDirection: 'column'}}
                    stickyHeaderIndices={[3]}
                >
                    <View style={styles.head_container}>
                        <Image style={styles.coc_img} source={{uri: this.state.clans_img}}/>

                        {/*<Text style={styles.coc_clan_name}>{this.state.clans_name + ' ▿'}</Text>*/}
                        <ModalDropdown
                            options={this.state.control_clan_list}
                            defaultValue={'部落名称'}
                            dropdownStyle={styles.dropdown}
                            renderButtonText={(rowData) => {
                                return rowData.name
                            }}
                            adjustFrame={style => {
                                style.top += ScreenUtil.scaleSize(150);
                                style.left -= ScreenUtil.scaleSize(40);
                                return style;
                            }}
                            renderRow={(rowData, rowID, highlighted) => {
                                return (
                                    <TouchableHighlight underlayColor='cornflowerblue'>
                                        <View style={{width:ScreenUtil.scaleSize(400),height:ScreenUtil.scaleSize(50),justifyContent:'center',}}>
                                            <Text>{rowData.name}</Text>
                                        </View>
                                    </TouchableHighlight>
                                );
                            }}
                        />

                        <View style={styles.text_input_search}>
                            <Image style={{
                                width: ScreenUtil.scaleSize(30),
                                height: ScreenUtil.scaleSize(30),
                                marginLeft: ScreenUtil.scaleSize(15)
                            }} source={require('../../res/imgs/search_left.png')}/>
                            <TextInput placeholderTextColor={'#999999'} style={styles.serarch}
                                       maxLength={30}
                                       underlineColorAndroid='transparent'
                                       placeholder={'请输入要查找的村庄名称'}/>
                        </View>
                    </View>

                    <View style={styles.line}/>

                    <View style={styles.coc_sort_container_sore}>
                        {/*△▽▲▼*/}
                        <Text style={styles.text_tab_t}>等级 ▼</Text>
                        <Text style={styles.text_tab_t}>捐兵 ▼</Text>
                        <Text style={styles.text_tab_t}>收兵 ▼</Text>
                        <Text style={styles.text_tab_t}>比例 ▼</Text>
                        <Text style={styles.text_tab_t}>段位 ▼</Text>
                    </View>

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
                                <Text style={{color: '#666666'}}>段位</Text>
                            </View>


                        </View>
                    </View>

                    <FlatList
                        // ItemSeparatorComponent={()=>{return <View style={{height:1,backgroundColor:'#EFEFEF'}}/>}}
                        data={this.state.dataAry}
                        keyExtractor={(item, index) => item.index}
                        renderItem={(item) => {
                            if (this.state.isLoading) {
                                return <Text>加载中</Text>
                            } else {
                                return ItemCocClan.ItemCocClan(this, item)
                            }
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
        width: ScreenUtil.scaleSize(30),
        height: ScreenUtil.scaleSize(30),
        marginLeft: ScreenUtil.scaleSize(15),
        marginRight: ScreenUtil.scaleSize(10)
    },
    head_container: {
        height: ScreenUtil.scaleSize(120),
        width: ScreenUtil.screenW,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    serarch: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: ScreenUtil.scaleSize(10),
        paddingRight: ScreenUtil.scaleSize(30),
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
        flexDirection: 'row',
        height: ScreenUtil.scaleSize(100),
    },
    coc_clan_name: {
        fontSize: 15,
        color: '#333333'
    },
    text_input_search: {
        flex: 1,
        height: ScreenUtil.scaleSize(80),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight: ScreenUtil.scaleSize(30),
        // marginTop: ScreenUtil.scaleSize(14),
        // marginBottom: ScreenUtil.scaleSize(14),
        marginLeft: ScreenUtil.scaleSize(15),
        borderColor: '#E1E1E1',
        borderWidth: ScreenUtil.scaleSize(1),
        borderRadius: ScreenUtil.scaleSize(40)
    },
    text_tab_1: {flex: 0.8, justifyContent: 'center', alignItems: 'center'},
    text_tab_2: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    text_tab_3: {flex: 1.5, justifyContent: 'center', alignItems: 'center',},
    text_tab_4: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    text_tab_5: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    text_tab_6: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    text_tab_7: {flex: 1, justifyContent: 'center', alignItems: 'center'},

    text_tab_t: {
        color: '#333333'
    },
    dropdown: {
        height: ScreenUtil.scaleSize(300),
        borderColor: '#EFEFEF',
        borderWidth: 2,
        borderRadius: 3,
    }
});
