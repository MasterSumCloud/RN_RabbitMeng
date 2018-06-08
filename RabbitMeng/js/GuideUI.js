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
                <Text>引导页</Text>
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
