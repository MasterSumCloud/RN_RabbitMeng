import MainUI from './UI/MainUI';
import WelcomeUI from './UI/WelcomeUI';
import LoginUI from './UI/LoginUI';
import createStackNavigator from "react-navigation/src/navigators/createStackNavigator";

export default Routes = createStackNavigator({
    Main: {
        screen: MainUI,
    },
    Welcome: {
        screen: WelcomeUI
    },
    Login:{
        screen:LoginUI
    }
}, {
    initialRouteName: 'Welcome', // 默认显示界面
});
