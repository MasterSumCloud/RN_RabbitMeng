import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    WebView
} from 'react-native';


export default class MumberDetailUI extends Component {

    static navigatorButtons = {
        leftButtons: [
            {
                title: '←',
                id: 'back',
            }
        ]
    };

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

    componentDidMount(){
        this.props.navigator.setOnNavigatorEvent((e) => {
            if (e.type == 'NavBarButtonPress') {
                if (e.id == 'back') {
                    this.props.navigator.dismissModal();
                }

            }
        });
    }
}

const styles = StyleSheet.create({
    webView_number:{
        flex:1,
        backgroundColor:'white'
    }
});
