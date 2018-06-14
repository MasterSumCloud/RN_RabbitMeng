import MainUI from '../js/MainUI';
import WelcomeUI from '../js/WelcomeUI';
import LoginUI from '../js/LoginUI';
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
