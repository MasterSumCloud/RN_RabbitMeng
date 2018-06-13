/**
 * welcome UI
 * https://github.com/MasterSumCloud/RN_RabbitMeng
 * @create(PY)
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Routes from './js/Routes';
import MainUI from './js/MainUI';
import WelcomeUI from './js/WelcomeUI';

export default class App extends Component<Props> {
    render() {
        return (
            <Routes style={styles.container}/>
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
