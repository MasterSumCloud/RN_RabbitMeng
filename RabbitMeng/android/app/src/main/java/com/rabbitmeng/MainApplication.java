package com.rabbitmeng;


import com.facebook.react.ReactPackage;
import com.rabbitmeng.android_upgrade.UpgradePackage;
import com.rabbitmeng.bean.SearchResultXYBean;
import com.rabbitmeng.imagesearch.SearchImg;
import com.rabbitmeng.reactnative.StartActivityPackage;
import com.rabbitmeng.utils.GsonUtil;
import com.reactnativenavigation.NavigationApplication;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
                // eg. new VectorIconsPackage()
                new StartActivityPackage(),
                new UpgradePackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    @Override
    public String getJSMainModuleName() {
        return "index";
    }
}
