/**
 * welcome UI
 * https://github.com/MasterSumCloud/RN_RabbitMeng
 * @create(PY)
 */

import {Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {registerScreens, registerScreenVisibilityListener} from './js/screens/ScreenRegist';


// screen related book keeping
registerScreens();
// registerScreenVisibilityListener();


const tabs = [{
    label: '首页',
    screen: 'HomeUI',
    icon: require('./res/imgs/tab_home.png'),
    title: '首页',
}, {
    label: '管理',
    screen: 'ControlUI',
    icon: require('./res/imgs/tab_control.png'),
    title: '管理',
}, {
    label: '部落',
    screen: 'CocClanUI',
    icon: require('./res/imgs/tab_coc.png'),
    title: '部落',
}, {
    label: '我的',
    screen: 'MineUI',
    icon: require('./res/imgs/tab_mine.png'),
    title: '我的',
}];


// if (Platform.OS === 'android') {
//     tabs.push({
//         label: 'Transitions',
//         screen: 'example.Transitions',
//         icon: require('../img/transform.png'),
//         title: 'Navigation Transitions',
//     });
// }

// this will start our app
Navigation.startTabBasedApp({
    tabs,
    animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
    tabsStyle: {
        tabBarBackgroundColor: '#ffffff',
        tabBarButtonColor: '#cccccc',
        tabBarSelectedButtonColor: '#33A1FF',
        tabFontFamily: 'BioRhyme-Bold',
    },
    appStyle: {
        tabBarBackgroundColor: '#F7F7F7',
        navBarButtonColor: '#ffffff',
        tabBarButtonColor: '#CCCCCC',
        navBarTextColor: '#ffffff',
        tabBarSelectedButtonColor: '#33A1FF',
        navigationBarColor: '#33A1FF',
        navBarBackgroundColor: '#33A1FF',
        statusBarColor: '#33A1FF',
        tabFontFamily: 'BioRhyme-Bold',
        forceTitlesDisplay: true
    }
});



