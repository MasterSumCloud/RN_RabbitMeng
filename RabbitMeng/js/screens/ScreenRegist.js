import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

import MineUI from '../UI/MineUI';
import GuideUI from '../UI/GuideUI';
import HomeUI from '../UI/HomeUI';
import LoginUI from '../UI/LoginUI';
import MainUI from '../UI/MainUI';
import WelcomeUI from '../UI/WelcomeUI';

export function registerScreens() {
    Navigation.registerComponent('MineUI', () => MineUI);
    Navigation.registerComponent('GuideUI', () => GuideUI);
    Navigation.registerComponent('HomeUI', () => HomeUI);
    Navigation.registerComponent('LoginUI', () => LoginUI);
    Navigation.registerComponent('MainUI', () => MainUI);
    Navigation.registerComponent('WelcomeUI', () => WelcomeUI);
}

export function registerScreenVisibilityListener() {
    new ScreenVisibilityListener({
        willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
        didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
        willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
        didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
    }).register();
}
