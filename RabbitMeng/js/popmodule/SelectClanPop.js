import React, {Component} from 'react';
import {
    Modal,
    Text,
    FlatList,
    View,
    StyleSheet,
    BackAndroid
} from 'react-native';
import * as ScreenUtil from "../uitl/ScreenUtil";

let SPUtil = require('../uitl/SPUtil');
import * as Constant from '../uitl/Constant';

export default class SelectClanPop extends Component {

    // 构造
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            clan_list: [],
        };
    }

    static propTypes = {
        _dialogSelectAction: React.PropTypes.func.isRequired,
        _dialogVisible: React.PropTypes.bool,
    }

    static defaultProps = {
        _dialogVisible: false,
    }

    componentDidMount() {
        SPUtil.getAsyncStorage(Constant.ControlClan, (listClan) => {
            self.setState({
                clan_list: listClan,
                isLoading: false,
            })
        })

    }

    render() {
        // onPress事件直接与父组件传递进来的属性挂接
        return (
            <Modal
                visible={this.props._dialogVisible}
                transparent={true}
                onRequestClose={() => {
                }} //如果是Android设备 必须有此方法
            >
                <View style={styles.bg}>
                    <FlatList
                        ItemSeparatorComponent={() => {
                            return <View style={{height: 1, backgroundColor: '#EFEFEF'}}/>
                        }}
                        data={this.state.clan_list}
                        keyExtractor={(item, index) => item.name}
                        renderItem={(item) => {
                            if (this.state.isLoading) {
                                return <Text>加载中</Text>
                            } else {
                                return <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text>123</Text>
                                </View>
                            }
                        }}
                    />
                </View>
            </Modal>
        );
    }

    componentDidMount(){
    }
}

const styles = StyleSheet.create({
    bg: {  //全屏显示 半透明 可以看到之前的控件但是不能操作了
        width: ScreenUtil.screenW,
        height: ScreenUtil.screenH,
        backgroundColor: 'rgba(52,52,52,0.5)',  //rgba  a0-1  其余都是16进制数
        justifyContent: 'center',
        alignItems: 'center',
    },
});
