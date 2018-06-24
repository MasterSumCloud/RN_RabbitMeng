import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';


export default class CocClanUI extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>部落</Text>
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
