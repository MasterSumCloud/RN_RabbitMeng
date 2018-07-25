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
let ItemTroops = require('../item/ItemTroops');
let ItemAchievements = require('../item/ItemAchievements');

let text_color = -1;
let border_color = -1;

export default class ClanDetailUI extends Component {

    //https://api.clashofclans.com/v1/players/%232Q808J2G

    static navigatorButtons = {
        leftButtons: [
            {
                title: '←',
                id: 'back',
            }
        ]
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            troops_home: [],
            troops_build: [],
            heroes_home: [],
            heroes_build: [],
            spells: [],
            achievements: [],
            mainData: {}
        };
    }

    render() {


        if (this.state.isLoading) {
            return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                <Image source={require('../../res/imgs/ali_arounde.gif')}/>
            </View>
        } else {
            let mainData = this.state.mainData;
            let role_color = '#666666';

            let role = '成员';
            if (mainData.role === 'coLeader') {
                role = '副首领';
                role_color = '#FF8C00';
            } else if (mainData.role === 'leader') {
                role = '首领';
                role_color = '#33A1FF';
            }


            let legendTrophies = '无';
            let bestSeason = '无';
            let bestVersusSeason = '无';
            if (mainData.legendStatistics != null) {
                legendTrophies = mainData.legendStatistics.legendTrophies;
                if (mainData.legendStatistics.bestSeason !== undefined) {
                    if (mainData.legendStatistics.bestSeason.id !== undefined) {
                        bestSeason = mainData.legendStatistics.bestSeason.id;
                    }
                }
                if (mainData.legendStatistics.bestVersusSeason !== undefined) {
                    if (mainData.legendStatistics.bestVersusSeason.id !== undefined) {
                        bestVersusSeason = mainData.legendStatistics.bestVersusSeason.id;
                    }
                }
            }

            let townHall = require('../../res/imgs/home_town_9.png');
            let buildHall = require('../../res/imgs/home_town_9.png');
            if (mainData.townHallLevel === 9) {
                // townHall = require('../../res/imgs/home_town_9.png');
            } else if (mainData.townHallLevel === 10) {
                townHall = require('../../res/imgs/home_town_10.png');
            } else if (mainData.townHallLevel === 11) {
                townHall = require('../../res/imgs/home_town_11.png');
            } else if (mainData.townHallLevel === 12) {
                if (mainData.townHallWeaponLevel === 1) {
                    townHall = require('../../res/imgs/home_town_12_1.png');
                } else if (mainData.townHallWeaponLevel === 2) {
                    townHall = require('../../res/imgs/home_town_12_2.png');
                } else if (mainData.townHallWeaponLevel === 3) {
                    townHall = require('../../res/imgs/home_town_12_3.png');
                } else if (mainData.townHallWeaponLevel === 4) {
                    townHall = require('../../res/imgs/home_town_12_4.png');
                } else if (mainData.townHallWeaponLevel === 5) {
                    townHall = require('../../res/imgs/home_town_12_5.png');
                }
            } else {
                townHall = require('../../res/imgs/question_mark.png');
            }

            if (mainData.builderHallLevel === 1) {
                buildHall = require('../../res/buildbase/buildhall_1.png');
            } else if (mainData.builderHallLevel === 2) {
                buildHall = require('../../res/buildbase/buildhall_2.png');
            } else if (mainData.builderHallLevel === 3) {
                buildHall = require('../../res/buildbase/buildhall_3.png');
            } else if (mainData.builderHallLevel === 4) {
                buildHall = require('../../res/buildbase/buildhall_4.png');
            } else if (mainData.builderHallLevel === 5) {
                buildHall = require('../../res/buildbase/buildhall_5.png');
            } else if (mainData.builderHallLevel === 6) {
                buildHall = require('../../res/buildbase/buildhall_6.png');
            } else if (mainData.builderHallLevel === 7) {
                buildHall = require('../../res/buildbase/buildhall_7.png');
            } else if (mainData.builderHallLevel === 8) {
                buildHall = require('../../res/buildbase/buildhall_8.png');
            } else {
                townHall = require('../../res/imgs/question_mark.png');
            }

            let townHallWeaponLevel = '无';
            if (mainData.townHallWeaponLevel !== undefined) {
                townHallWeaponLevel = mainData.townHallWeaponLevel;
            }

            return (
                <View
                    style={styles.container}
                >
                    <ScrollView showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                style={{flex: 1, flexDirection: 'column'}}>
                        <ImageBackground resizeMode='stretch' style={styles.detail_top_bg}
                                         source={require('../../res/imgs/detail_bgtop.jpg')}
                        >
                            <View style={{alignItems: 'center'}}>
                                <Text style={{
                                    paddingLeft: ScreenUtil.scaleSize(120),
                                    position: 'absolute',
                                    paddingTop: ScreenUtil.scaleSize(12),
                                    paddingBottom: ScreenUtil.scaleSize(12),
                                    borderColor: '#333',
                                    paddingRight: ScreenUtil.scaleSize(15),
                                    borderRadius: ScreenUtil.scaleSize(10),
                                    marginTop: ScreenUtil.scaleSize(35),
                                    backgroundColor: 'rgba(255,255,255,0.7)',
                                    fontSize: 15
                                }}>{'大本营 ' + mainData.townHallLevel}</Text>
                                <Image style={{
                                    width: ScreenUtil.scaleSize(100),
                                    height: ScreenUtil.scaleSize(100),
                                    marginRight: ScreenUtil.scaleSize(140)
                                }}
                                       source={townHall}/>
                                <Text style={{
                                    backgroundColor: 'rgba(255,255,255,0.7)',
                                    fontSize: 10,
                                    color: '#333'
                                }}> {'Weapon ' + townHallWeaponLevel}</Text>

                                <Text style={{
                                    paddingLeft: ScreenUtil.scaleSize(90),
                                    paddingTop: ScreenUtil.scaleSize(5),
                                    paddingBottom: ScreenUtil.scaleSize(5),
                                    borderColor: '#333',
                                    paddingRight: ScreenUtil.scaleSize(15),
                                    borderRadius: ScreenUtil.scaleSize(10),
                                    backgroundColor: 'rgba(255,255,255,0.7)',
                                    fontSize: 13
                                }}>{'建筑基地 ' + mainData.builderHallLevel}</Text>
                                <Image style={{
                                    width: ScreenUtil.scaleSize(65),
                                    height: ScreenUtil.scaleSize(65),
                                    position: 'absolute',
                                    marginTop: ScreenUtil.scaleSize(109),
                                    alignSelf: 'flex-start',
                                    marginLeft: ScreenUtil.scaleSize(15),
                                }}
                                       source={buildHall}/>
                            </View>
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
                                <View style={styles.bg_cir_215}/>
                                <Text style={styles.text_top_215}>经验等级</Text>
                                <View style={styles.inner_content}>
                                    <Image style={styles.left_icon}
                                           source={require('../../res/imgs/lv_bg.png')}></Image>
                                    <Text style={{color: '#215EC8'}}>{mainData.expLevel}</Text>
                                </View>
                            </View>

                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_f59}/>
                                <Text style={styles.text_top_f59}>奖杯</Text>
                                <View style={styles.inner_content}>
                                    <Image style={styles.left_icon}
                                           source={{uri: mainData.league.iconUrls.small}}></Image>
                                    <Text style={{color: '#F5981E'}}>{mainData.trophies}</Text>
                                </View>
                            </View>

                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_6c3}/>
                                <Text style={styles.text_top_6c3}>传奇奖杯</Text>
                                <View style={styles.inner_content}>
                                    <Image style={styles.left_icon}
                                           source={require('../../res/imgs/lagend_trophies.png')}></Image>
                                    <Text style={{color: '#6C36A4'}}>{legendTrophies}</Text>
                                </View>
                            </View>

                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_f7b}/>
                                <Text style={styles.text_top_f7b}>战争星星</Text>
                                <View style={styles.inner_content}>
                                    <Image style={{width: ScreenUtil.scaleSize(55), height: ScreenUtil.scaleSize(20)}}
                                           source={require('../../res/imgs/starts_3.png')}></Image>
                                    <Text style={{color: '#F7BC0A'}}>{mainData.warStars}</Text>
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
                                <View style={styles.bg_cir_c1}/>
                                <Text style={styles.text_top_1a}>成功进攻数</Text>
                                <View style={styles.inner_content}>
                                    <Text>{mainData.attackWins}</Text>
                                </View>
                            </View>

                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_c1}/>
                                <Text style={styles.text_top_1a}>成功防御</Text>
                                <View style={styles.inner_content}>
                                    <Text>{mainData.defenseWins}</Text>
                                </View>
                            </View>

                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_c1}/>
                                <Text style={styles.text_top_1a}>捐兵数</Text>
                                <View style={styles.inner_content}>
                                    <Text>{mainData.donations}</Text>
                                </View>
                            </View>

                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_c1}/>
                                <Text style={styles.text_top_1a}>收兵</Text>
                                <View style={styles.inner_content}>
                                    <Text>{mainData.donationsReceived}</Text>
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
                                <View style={styles.bg_cir_f59}/>
                                <Text style={styles.text_top_f59}>对抗奖杯</Text>
                                <View style={styles.inner_content}>
                                    <Image style={styles.left_icon}
                                           source={require('../../res/imgs/versus_trophies.png')}></Image>
                                    <Text style={{color: '#F5981E'}}>{mainData.versusTrophies}</Text>
                                </View>
                            </View>

                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_c1}/>
                                <Text style={styles.text_top_1a}>对抗胜利次数</Text>
                                <View style={styles.inner_content}>
                                    <Text>{mainData.versusBattleWins}</Text>
                                </View>
                            </View>

                            <View style={{
                                flex: 2,
                                flexDirection: 'column',
                                marginTop: ScreenUtil.scaleSize(10),
                                height: ScreenUtil.scaleSize(65),
                            }}>
                                <View style={styles.bg_cir_c1}/>
                                <Text style={styles.text_top_f59}>所属部落</Text>
                                <View style={styles.inner_content}>
                                    <Image style={styles.left_icon}
                                           source={{uri: mainData.clan.badgeUrls.small}}></Image>
                                    <Text style={{color: '#F5981E', fontSize: 13}}>{mainData.clan.name}</Text>
                                </View>
                            </View>

                        </View>

                        <View style={{
                            flexDirection: 'column',
                            marginTop: ScreenUtil.scaleSize(10),
                            height: ScreenUtil.scaleSize(65),
                            width: ScreenUtil.scaleSize(185),
                            marginLeft: ScreenUtil.scaleSize(5),
                        }}>
                            <View style={styles.bg_cir_c1}/>
                            <Text style={styles.text_top_1a}>部落角色</Text>
                            <View style={styles.inner_content}>
                                <Text style={{fontSize: 13, color: role_color}}>{role}</Text>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginTop: ScreenUtil.scaleSize(30),
                            marginTop: ScreenUtil.scaleSize(15)
                        }}>
                            {/*部队*/}
                            <View style={{
                                flex: 8,
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

                        {/*玩家最佳*/}
                        <Text style={{
                            marginTop: ScreenUtil.scaleSize(15),
                            color: 'black', fontSize: 20, paddingLeft: ScreenUtil.scaleSize(15),
                            paddingRight: ScreenUtil.scaleSize(15)
                        }}>玩家最佳</Text>

                        <View style={{
                            flexDirection: 'row',
                            paddingLeft: ScreenUtil.scaleSize(5),
                            paddingRight: ScreenUtil.scaleSize(5)
                        }}>
                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_f59}/>
                                <Text style={styles.text_top_f59}>最佳村庄奖杯</Text>
                                <View style={styles.inner_content}>
                                    <Image style={styles.left_icon}
                                           source={require('../../res/imgs/war_trophies.png')}></Image>
                                    <Text>{mainData.bestTrophies}</Text>
                                </View>
                            </View>

                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_f59}/>
                                <Text style={styles.text_top_f59}>最佳对抗奖杯</Text>
                                <View style={styles.inner_content}>
                                    <Image style={styles.left_icon}
                                           source={require('../../res/imgs/versus_trophies.png')}></Image>
                                    <Text>{mainData.bestVersusTrophies}</Text>
                                </View>
                            </View>

                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_6c3}/>
                                <Text style={styles.text_top_6c3}>历史最高赛季</Text>
                                <View style={styles.inner_content}>
                                    <Image style={styles.left_icon}
                                           source={require('../../res/imgs/tree_trophies.png')}></Image>
                                    <Text>{bestSeason}</Text>
                                </View>
                            </View>

                            <View style={styles.info_layout_cirle}>
                                <View style={styles.bg_cir_6c3}/>
                                <Text style={styles.text_top_6c3}>最佳对抗赛季</Text>
                                <View style={styles.inner_content}>
                                    <Image style={styles.left_icon}
                                           source={require('../../res/imgs/shield.png')}></Image>
                                    <Text>{bestVersusSeason}</Text>
                                </View>
                            </View>
                        </View>

                        <Text style={{
                            color: 'black',
                            fontSize: 20,
                            paddingLeft: ScreenUtil.scaleSize(15),
                            paddingRight: ScreenUtil.scaleSize(15),
                            textAlign: 'center',
                            marginTop: ScreenUtil.scaleSize(15)
                        }}>玩家成就</Text>

                        <FlatList
                            style={{paddingLeft: ScreenUtil.scaleSize(15), paddingRight: ScreenUtil.scaleSize(15)}}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={this.state.achievements}
                            keyExtractor={(item, index) => item.name}
                            renderItem={(item) => {
                                return ItemAchievements.Achievement(item)
                            }}
                            numColumns={2}
                        />
                    </ScrollView>
                </View>
            );
        }

    }

    componentDidMount() {
        let self = this;

        HttpUtil.postJSON('players', {'tag': self.props.coc_tag}, function (jsonData) {
            console.log('服务器返回数据' + JSON.stringify(jsonData));
            if (jsonData.state) {
                self._handle_data(self, jsonData.data);
            }
        });

        this.props.navigator.setOnNavigatorEvent((e) => {
            if (e.type === 'NavBarButtonPress') {
                if (e.id === 'back') {
                    this.props.navigator.dismissModal();
                }
            }
        });
    }


    _handle_data = (self, mainData) => {
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

        if (troop_h.length % 6 !== 0) {
            let additem = 6 - troop_h.length % 6;
            for (let i = 0; i < additem; i++) {
                troop_h.push({troop_img: null})
            }
        }

        if (troop_b.length % 6 !== 0) {
            let additem = 6 - troop_b.length % 6;
            for (let i = 0; i < additem; i++) {
                troop_b.push({troop_img: null})
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

        if (heroes_h.length % 6 !== 0) {
            let additem = 6 - heroes_h.length % 6;
            for (let i = 0; i < additem; i++) {
                heroes_h.push({troop_img: null})
            }
        }

        for (let item of mainData.spells) {
            item.troop_img = self._setSpellImg(item.name);
        }

        if (mainData.spells.length % 6 !== 0) {
            let additem = 6 - mainData.spells.length % 6;
            for (let i = 0; i < additem; i++) {
                mainData.spells.push({troop_img: null})
            }
        }


        self.setState({
            isLoading: false,
            troops_home: troop_h,
            troops_build: troop_b,
            heroes_home: heroes_h,
            heroes_build: heroes_b,
            spells: mainData.spells,
            achievements: mainData.achievements,
            mainData: mainData
        }).call(ClanDetailUI);
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
        } else if (name === 'Battle Blimp') {
            return require('../../res/imgs/question_mark.png');
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
        justifyContent: 'flex-end',
        width: ScreenUtil.screenW,
        height: ScreenUtil.scaleSize(450),
    },
    text_name: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10
    },
    info_layout_cirle: {
        flex: 1,
        flexDirection: 'column',
        marginTop: ScreenUtil.scaleSize(10),
        height: ScreenUtil.scaleSize(65),
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
        marginRight: ScreenUtil.scaleSize(5),
    },
    inner_content: {
        flexDirection: 'row',
        marginTop: ScreenUtil.scaleSize(20),
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: ScreenUtil.scaleSize(15),
    }, bg_cir_215: {
        marginLeft: ScreenUtil.scaleSize(10),
        marginRight: ScreenUtil.scaleSize(10),
        marginTop: ScreenUtil.scaleSize(11),
        borderRadius: 5,
        borderWidth: ScreenUtil.scaleSize(1),
        height: ScreenUtil.scaleSize(50),
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: '#215EC8'

    },
    bg_cir_f59: {
        marginLeft: ScreenUtil.scaleSize(10),
        marginRight: ScreenUtil.scaleSize(10),
        marginTop: ScreenUtil.scaleSize(11),
        borderRadius: 5,
        borderWidth: ScreenUtil.scaleSize(1),
        height: ScreenUtil.scaleSize(50),
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: '#F5981E'

    },
    bg_cir_6c3: {
        marginLeft: ScreenUtil.scaleSize(10),
        marginRight: ScreenUtil.scaleSize(10),
        marginTop: ScreenUtil.scaleSize(11),
        borderRadius: 5,
        borderWidth: ScreenUtil.scaleSize(1),
        height: ScreenUtil.scaleSize(50),
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: '#6C36A4'

    },
    bg_cir_f7b: {
        marginLeft: ScreenUtil.scaleSize(10),
        marginRight: ScreenUtil.scaleSize(10),
        marginTop: ScreenUtil.scaleSize(11),
        borderRadius: 5,
        borderWidth: ScreenUtil.scaleSize(1),
        height: ScreenUtil.scaleSize(50),
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: '#F7BC0A'

    },
    bg_cir_1c4: {
        marginLeft: ScreenUtil.scaleSize(10),
        marginRight: ScreenUtil.scaleSize(10),
        marginTop: ScreenUtil.scaleSize(11),
        borderRadius: 5,
        borderWidth: ScreenUtil.scaleSize(1),
        height: ScreenUtil.scaleSize(50),
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: '#1C4DB2'
    },
    bg_cir_c1: {
        marginLeft: ScreenUtil.scaleSize(10),
        marginRight: ScreenUtil.scaleSize(10),
        marginTop: ScreenUtil.scaleSize(11),
        borderRadius: 5,
        borderWidth: ScreenUtil.scaleSize(1),
        height: ScreenUtil.scaleSize(50),
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: '#C1C1C1'
    },
    text_top_215: {
        marginLeft: ScreenUtil.scaleSize(20),
        fontSize: 8,
        color: '#215EC8',
        backgroundColor: 'white',
        position: 'absolute'
    },
    text_top_f59: {
        marginLeft: ScreenUtil.scaleSize(20),
        fontSize: 8,
        color: '#F5981E',
        backgroundColor: 'white',
        position: 'absolute'
    }, text_top_6c3: {
        marginLeft: ScreenUtil.scaleSize(20),
        fontSize: 8,
        color: '#6C36A4',
        backgroundColor: 'white',
        position: 'absolute'
    }, text_top_f7b: {
        marginLeft: ScreenUtil.scaleSize(20),
        fontSize: 8,
        color: '#F7BC0A',
        backgroundColor: 'white',
        position: 'absolute'
    }, text_top_1c4: {
        marginLeft: ScreenUtil.scaleSize(20),
        fontSize: 8,
        color: '#1C4DB2',
        backgroundColor: 'white',
        position: 'absolute'
    }, text_top_c1: {
        marginLeft: ScreenUtil.scaleSize(20),
        fontSize: 8,
        color: '#C1C1C1',
        backgroundColor: 'white',
        position: 'absolute'
    }, text_top_1a: {
        marginLeft: ScreenUtil.scaleSize(20),
        fontSize: 8,
        color: '#1A1A1A',
        backgroundColor: 'white',
        position: 'absolute'
    }

});
