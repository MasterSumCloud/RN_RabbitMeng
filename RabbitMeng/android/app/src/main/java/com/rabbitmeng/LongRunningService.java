package com.rabbitmeng;

import android.annotation.TargetApi;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.os.SystemClock;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.util.Log;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by master-sum on 16/08/2018.
 */

public class LongRunningService extends Service {


    private List<WarStartBean> mParpareToAccessList;

    @Override
    public void onCreate() {
        super.onCreate();
        mParpareToAccessList = new ArrayList<>();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @TargetApi(Build.VERSION_CODES.KITKAT)
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        new Thread(new Runnable() {

            @Override

            public void run() {
                getInfoAndJuadge();
            }

        }).start();

        AlarmManager manager = (AlarmManager) getSystemService(ALARM_SERVICE);

        int anHour = 1 * 60 * 1000;//每隔5分钟执行一次

        long triggerAtTime = SystemClock.elapsedRealtime() + anHour;
        Intent i = new Intent(this, AlarmReceiver.class);
        PendingIntent pi = PendingIntent.getBroadcast(this, 0, i, 0);

        manager.setExact(AlarmManager.ELAPSED_REALTIME_WAKEUP, triggerAtTime, pi);

        return super.onStartCommand(intent, flags, startId);
    }

    private void getInfoAndJuadge() {
        String lastListJson = (String) SPUtil.getParam(this, Constant.WAR_START_PLAN_LIST, "");
        if (!TextUtils.isEmpty(lastListJson)) {
            Log.d("获取到的json===", lastListJson);
            List<WarStartBean> warStartBeans = GsonUtil.GsonToList(lastListJson, WarStartBean.class);
            long currentThreadTimeMillis = System.currentTimeMillis();

            for (WarStartBean warStartBean : warStartBeans) {
                Log.d("执行开战任务", "是否有可执行任务K" + warStartBean.getWarStartTime());
                Log.d("执行开战任务", "是否有可执行任务C" + currentThreadTimeMillis);

                if (warStartBean.getNewType() == 1 && currentThreadTimeMillis > warStartBean.getWarStartTime()) {
                    mParpareToAccessList.add(warStartBean);
                }
            }
            Log.d("执行开战任务", "是否有可执行任务" + mParpareToAccessList.size());
            List<WarStartBean> hasExecute = new ArrayList<>();
            if (mParpareToAccessList.size() > 0) {

                for (WarStartBean warStartBean : mParpareToAccessList) {
                    executePlan();
                    hasExecute.add(warStartBean);
                }
                //清楚已经执行过的任务
                warStartBeans.removeAll(hasExecute);
                //执行任务完成，清空数据
                mParpareToAccessList.clear();
                //替换数据
                putNewPlan(warStartBeans);
            }

        }
    }

    private void executePlan() {
        Log.d("执行开战任务", "第一步杀指定游戏进程");
        SystemClock.sleep(2000);
        Log.d("执行开战任务", "第二步进入指定COC平台");
        SystemClock.sleep(2000);
        Log.d("执行开战任务", "第三步点击部落站按钮");
    }


    private void putNewPlan(List<WarStartBean> data){
        String listData = GsonUtil.GsonString(data);
        SPUtil.setParam(this, Constant.WAR_START_PLAN_LIST, listData);
    }

}
