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
            <WebView
                style={styles.webView_number}
                source={{uri:'http://www.cocbzlm.com/m/login.php?prevUrl=%2Fm%2FchangeAm.php%3F'}}
                // source={{uri:'https://www.baidu.com'}}
                startInLoadingState={true}
                domStorageEnabled={true}
                javaScriptEnabled={true}
            />
        );
    }
}

const styles = StyleSheet.create({
    webView_number:{
        flex:1,
        backgroundColor:'white'
    }
});
