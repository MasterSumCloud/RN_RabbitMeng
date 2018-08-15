package com.rabbitmeng;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by master-sum on 15/08/2018.
 */

public class StartActivityModule extends ReactContextBaseJavaModule {

    public StartActivityModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "StartActivityModule";
    }

    @ReactMethod
    public void startWarStartActivity() {
        Intent intent = new Intent(getReactApplicationContext(), WarStartManageActivity.class);
        getReactApplicationContext().startActivity(intent);
    }
}
