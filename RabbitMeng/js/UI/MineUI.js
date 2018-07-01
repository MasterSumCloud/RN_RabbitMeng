import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    ImageBackground
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
                <ImageBackground resizeMode='contain' style={styles.mine_top}
                                 source={require('../../res/imgs/mine_top_bg.jpg')}
                >
                    {/*头像*/}
                    <Image style={styles.image_login_head} roundAsCircle={true}
                           source={require('../../res/imgs/head_defoult.jpg')}/>

                    <Text style={styles.text_white}>
                        天使的守护
                    </Text>
                </ImageBackground>
                <View>

                    /*中间按钮*/
                </View>

                <View>

                    /*底部List*/
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    mine_top: {
        alignItems:'center',
        width: ScreenUtil.screenW,
        height: ScreenUtil.scaleSize(500),
    },
    image_login_head: {
        marginTop:ScreenUtil.scaleSize(100),
        width: ScreenUtil.scaleSize(140),
        height: ScreenUtil.scaleSize(140),
        borderRadius: 35,
    },
    text_white:{
        marginTop:ScreenUtil.scaleSize(15),
        color:'white'
    }
});
