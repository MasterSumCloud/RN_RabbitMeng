import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';


export default class WelcomeUI extends Component {

    constructor(props){
        super(props);
        // setTimeout()
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<Image source={require('./icon.png')}></Image>*/}
                <Text>这是欢迎页</Text>
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
    }
});
