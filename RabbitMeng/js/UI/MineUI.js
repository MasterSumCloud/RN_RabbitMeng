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

                    <Text>
                        认证
                    </Text>
                </ImageBackground>
                /*中间按钮*/
                <View>

                </View>

                /*底部List*/
                <View>

                </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    mine_top: {
        width: ScreenUtil.screenW,
        height: ScreenUtil.scaleSize(500),
        justifyContent: 'center',
    }
});
