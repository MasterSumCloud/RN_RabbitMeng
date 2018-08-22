package com.rabbitmeng.activity;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;

import com.rabbitmeng.LongRunningService;
import com.rabbitmeng.utils.SystemManager;
import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //获取root权限
        String apkRoot = "chmod 777 " + getPackageCodePath();
        SystemManager.RootCommand(apkRoot);
        //启动请示开战检测
        Intent serintent = new Intent(this, LongRunningService.class);
        startService(serintent);
    }
}
