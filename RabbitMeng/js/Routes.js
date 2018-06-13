import MainUI from '../js/MainUI';
import WelcomeUI from '../js/WelcomeUI';
import createStackNavigator from "react-navigation/src/navigators/createStackNavigator";

export default Routes = createStackNavigator({
    Main: {screen: MainUI},
    Welcome: {screen: WelcomeUI},
}, {
    initialRouteName: 'Welcome', // 默认显示界面
});
