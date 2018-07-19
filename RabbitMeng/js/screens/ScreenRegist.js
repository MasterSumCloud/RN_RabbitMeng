import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

import MineUI from '../UI/MineUI';
import GuideUI from '../UI/GuideUI';
import HomeUI from '../UI/HomeUI';
import LoginUI from '../UI/LoginUI';
import MainUI from '../UI/MainUI';
import WelcomeUI from '../UI/WelcomeUI';
import ControlUI from '../UI/ControlUI';
import CocClanUI from '../UI/CocClanUI';
import ClanDetailUI from '../UI/ClanDetailUI';
import MumberDetailUI from '../UI/MumberDetailUI';
import SettingControlClansUI from '../UI/SettingControlClansUI';
import SettingUI from '../UI/SettingUI';
import ConfigClanUI from '../UI/ConfigClanUI';
import ClanGameUI from '../UI/ClanGameUI';
import ClanWarUI from '../UI/ClanWarUI';

export function registerScreens() {
    Navigation.registerComponent('MineUI', () => MineUI);
    Navigation.registerComponent('GuideUI', () => GuideUI);
    Navigation.registerComponent('HomeUI', () => HomeUI);
    Navigation.registerComponent('LoginUI', () => LoginUI);
    Navigation.registerComponent('MainUI', () => MainUI);
    Navigation.registerComponent('WelcomeUI', () => WelcomeUI);
    Navigation.registerComponent('CocClanUI', () => CocClanUI);
    Navigation.registerComponent('ControlUI', () => ControlUI);
    Navigation.registerComponent('ClanDetailUI', () => ClanDetailUI);
    Navigation.registerComponent('MumberDetailUI', () => MumberDetailUI);
    Navigation.registerComponent('SettingControlClansUI', () => SettingControlClansUI);
    Navigation.registerComponent('SettingUI', () => SettingUI);
    Navigation.registerComponent('ConfigClanUI', () => ConfigClanUI);
    Navigation.registerComponent('ClanGameUI', () => ClanGameUI);
    Navigation.registerComponent('ClanWarUI', () => ClanWarUI);
}

export function registerScreenVisibilityListener() {
    new ScreenVisibilityListener({
        willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
        didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
        willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
        didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
    }).register();
}
