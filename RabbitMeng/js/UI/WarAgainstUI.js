import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    WebView
} from 'react-native';


export default class WarAgainstUI extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                <WebView
                    style={styles.webView_number}
                    source={{uri: 'http://47.100.189.239/war'}}
                    // source={{uri:'https://www.baidu.com'}}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                />
            </View>
        );
    }

    componentDidMount() {

    }
}

const styles = StyleSheet.create({
    webView_number: {
        flex: 1,
        backgroundColor: 'white'
    }
});
