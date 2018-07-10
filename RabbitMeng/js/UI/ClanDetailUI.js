import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';
import * as HttpUtil from "../uitl/HttpUtil";


export default class ClanDetailUI extends Component {

    //https://api.clashofclans.com/v1/players/%232Q808J2G

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    render() {

        if (this.state.isLoading) {

        } else {
            return (
                <View style={styles.container}>

                </View>
            );
        }

    }

    componentDidMount() {
        let self = this
        HttpUtil.get('https://api.clashofclans.com/v1/players/' + self.props.coc_tag, '', function (jsonData) {
            console.log(jsonData.items)
            self.setState({
                isLoading: false,
            }).call(ClanDetailUI)
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
});
