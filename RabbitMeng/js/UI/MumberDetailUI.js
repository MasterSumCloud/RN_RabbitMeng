import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    WebView
} from 'react-native';


export default class MumberDetailUI extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    source={'http://www.cocbzlm.com/m/collocation.php'}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                />
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
