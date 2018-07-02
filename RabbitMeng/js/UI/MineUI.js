import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ImageBackground,
    ScrollView
} from 'react-native';

let ScreenUtil = require('../uitl/ScreenUtil');

export default class MineUI extends Component {

    static navigationOptions = {
        header: null
    }

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
                    /*中间按钮*/
                    <View style={styles.top_importent}>

                    </View>

                    /*底部List*/
                    <View style={styles.bottom_list}>

                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDF1F4',
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
    },
    bottom_list: {
        height: ScreenUtil.scaleSize(450),
        marginTop: ScreenUtil.scaleSize(110),
        marginLeft: ScreenUtil.scaleSize(30),
        marginRight: ScreenUtil.scaleSize(30),
        width: ScreenUtil.screenW - ScreenUtil.scaleSize(60),
        backgroundColor: 'white',
        borderRadius: ScreenUtil.scaleSize(30),
    }
});
