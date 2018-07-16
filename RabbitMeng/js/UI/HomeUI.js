import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

let SPUtil = require('../uitl/SPUtil')

export default class HomeUI extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
    }

    _login = (result) => {
        this.props.navigator.resetTo({
            screen: 'LoginUI'
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>待开发，有好建议，找Summer</Text>
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
