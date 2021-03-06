import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';


export default class WelcomeUI extends Component {

    static navigationOptions = {
        header: null
    }

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
        this.props.navigation.navigate('Login');
    }

    componentDidMount() {
        this.timer = setTimeout(
            () => {
                this.gotoPage();
            },
            500
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
