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
            troops_home: [],
            troops_build: [],
            heroes_home: [],
            heroes_build: [],
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
                                    data={this.state.troops_home}
                                    keyExtractor={(item, index) => index}
                                    renderItem={(item) => {
                                        return ItemTroops.Troops(item)
                                    }}
                                    numColumns={6}
                                />


                                <Text style={{color: 'black', fontSize: 20}}>Builder Base</Text>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.troops_build}
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
                                    data={this.state.heroes_home}
                                    keyExtractor={(item, index) => item.name}
                                    renderItem={(item) => {
                                        return ItemTroops.Troops(item)
                                    }}
                                    numColumns={3}
                                />

                                <Text style={{color: 'black', fontSize: 20}}>Hero</Text>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    data={this.state.heroes_build}
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
            mainData = jsonData;
            self._handle_data(self);
        })
    }

    _handle_data = (self) => {
        let troop_h = [];
        let troop_b = [];
        let heroes_h = [];
        let heroes_b = [];

        for (let item of mainData.troops) {
            item.troop_img = self._setTroopsImgUrl(item.name);
            if (item.village === 'home') {//家乡
                troop_h.push(item)
            } else {//建筑大师基地
                troop_b.push(item)
            }
        }

        for (let item of mainData.heroes) {
            item.troop_img = self._setHeroImg(item.name);
            if (item.village === 'home') {//家乡
                heroes_h.push(item)
            } else {//建筑大师基地
                heroes_b.push(item)
            }
        }
        for (let item of mainData.spells) {
            item.troop_img = self._setSpellImg(item.name);
        }


        self.setState({
            isLoading: false,
            troops_home: troop_h,
            troops_build: troop_b,
            heroes_home: heroes_h,
            heroes_build: heroes_b,
            spells: mainData.spells,
        }).call(ClanDetailUI)
    }

    _setTroopsImgUrl = (name) => {
        if (name === 'Barbarian') {
            return require('../../res/troops/barbarian.png');
        } else if (name === 'Archer') {
            return require('../../res/troops/archer.png');
        } else if (name === 'Goblin') {
            return require('../../res/troops/goblin.png');
        } else if (name === 'Giant') {
            return require('../../res/troops/giant.png');
        } else if (name === 'Wall Breaker') {
            return require('../../res/troops/wall_breaker.png');
        } else if (name === 'Balloon') {
            return require('../../res/troops/balloon.png');
        } else if (name === 'Wizard') {
            return require('../../res/troops/wizard.png');
        } else if (name === 'Healer') {
            return require('../../res/troops/healer.png');
        } else if (name === 'Dragon') {
            return require('../../res/troops/dragon.png');
        } else if (name === 'P.E.K.K.A') {
            return require('../../res/troops/P.E.K.K.A.png');
        } else if (name === 'Minion') {
            return require('../../res/troops/minion.png');
        } else if (name === 'Hog Rider') {
            return require('../../res/troops/hog_rider.png');
        } else if (name === 'Valkyrie') {
            return require('../../res/troops/valkyrie.png');
        } else if (name === 'Golem') {
            return require('../../res/troops/golem.png');
        } else if (name === 'Witch') {
            return require('../../res/troops/witch.png');
        } else if (name === 'Lava Hound') {
            return require('../../res/troops/lava_hound.png');
        } else if (name === 'Bowler') {
            return require('../../res/troops/bowler.png');
        } else if (name === 'Baby Dragon') {
            return require('../../res/troops/baby_dragon.png');
        } else if (name === 'Miner') {
            return require('../../res/troops/miner.png');
        } else if (name === 'Raged Barbarian') {
            return require('../../res/troops/raged_barbarian.png');
        } else if (name === 'Sneaky Archer') {
            return require('../../res/troops/sneaky_archer.png');
        } else if (name === 'Beta Minion') {
            return require('../../res/troops/beta_minion.png');
        } else if (name === 'Boxer Giant') {
            return require('../../res/troops/boxer_giant.png');
        } else if (name === 'Bomber') {
            return require('../../res/troops/bomber.png');
        } else if (name === 'Super P.E.K.K.A') {
            return require('../../res/troops/super_P.E.K.K.A.png');
        } else if (name === 'Cannon Cart') {
            return require('../../res/troops/cannon_cart.png');
        } else if (name === 'Drop Ship') {
            return require('../../res/troops/drop_ship.png');
        } else if (name === 'Night Witch') {
            return require('../../res/troops/night_witch.png');
        } else if (name === 'Wall Wrecker') {
            return require('../../res/imgs/question_mark.png');
        } else if (name === 'Electro Dragon') {
            return require('../../res/troops/electro_dragon.png');
        } else {
            return null;
        }
    }

    _setSpellImg = (name) => {
        if (name === 'Lightning Spell') {
            return require('../../res/spells/lightning_spell.png');
        } else if (name === 'Healing Spell') {
            return require('../../res/spells/healing_spell.png');
        } else if (name === 'Rage Spell') {
            return require('../../res/spells/rage_spell.png');
        } else if (name === 'Jump Spell') {
            return require('../../res/spells/jump_spell.png');
        } else if (name === 'Freeze Spell') {
            return require('../../res/spells/freeze_spell.png');
        } else if (name === 'Poison Spell') {
            return require('../../res/spells/poison_spell.png');
        } else if (name === 'Earthquake Spell') {
            return require('../../res/spells/earthquake_spell.png');
        } else if (name === 'Haste Spell') {
            return require('../../res/spells/haste_spell.png');
        } else if (name === 'Clone Spell') {
            return require('../../res/spells/clone_spell.png');
        } else if (name === 'Skeleton Spell') {
            return require('../../res/spells/skeleton_spell.png');
        } else {
            return null;
        }
    }

    _setHeroImg = (name) => {
        if (name === 'Barbarian King') {
            return require('../../res/troops/barbarian_king.png');
        } else if (name === 'Archer Queen') {
            return require('../../res/troops/archer_queen.png');
        } else if (name === 'Grand Warden') {
            return require('../../res/troops/grand_warden.png');
        } else if (name === 'Battle Machine') {
            return require('../../res/troops/battle_machine.png');
        } else {
            return null;
        }
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
