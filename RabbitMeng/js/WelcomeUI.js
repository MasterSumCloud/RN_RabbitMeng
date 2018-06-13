import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

import MainUI from "../js/MainUI";


export default class WelcomeUI extends Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text onPress={() => {
                    this.gotoPage();
                }}>这是欢迎页</Text>
            </View>
        );
    }

    gotoPage() {
        const {navigate} = this.props.navigation;
        navigate('MainUI', {
            user: 'MainUI'
        });
    }


    componentDidMount() {
        this.timer = setTimeout(
            () => {
                this.gotoPage();
            },
            2000
        );
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
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
