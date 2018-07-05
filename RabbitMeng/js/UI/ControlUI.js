import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text, ScrollView, ImageBackground, FlatList
} from 'react-native';
import * as ScreenUtil from "../uitl/ScreenUtil";

let ItemCocClan = require('./ItemCocClan');

const dataAry = [];
export default class ControlUI extends Component {

    static navigationOptions = {
        header: null,
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
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={{flex: 1, flexDirection: 'column'}}
                    stickyHeaderIndices={[1]}
                >
                    <ImageBackground resizeMode='stretch' style={styles.mine_top}
                                     source={require('../../res/imgs/mine_top_bg.jpg')}
                    >


                        <Text style={styles.text_white}>
                            天使的守护
                        </Text>

                    </ImageBackground>

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

                    {/*<FlatList
                        data={this.state.dataAry}
                        renderItem={(item) => {
                            return ItemCocClan.ItemCocClan(item)
                        }}
                    />*/}

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
});
