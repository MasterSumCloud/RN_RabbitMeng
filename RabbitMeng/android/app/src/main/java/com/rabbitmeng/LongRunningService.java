package com.rabbitmeng;

import android.annotation.TargetApi;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.os.SystemClock;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.view.WindowManager;

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
                    executePlan(warStartBean);
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


    private void executePlan(WarStartBean warStartBean) {
        //确定的XY坐标 720p
        int x_cimfirm = 640;
        int y_cimfirm = 645;
        //部落站按钮 720P
        int x_clanwar = 53;
        int y_clanwar = 441;
        //开始搜索按钮
        int x_startclanwar = 650;
        int y_startclanwar = 520;

        int x_startclanwarSearch = 1020;
        int y_startclanwarSearch = 650;

        //挂机点开菜单
        int x_guajiOpenMenu = 1275;
        int y_guajiOpenMenu = 253;

        //挂机停止按钮
        int x_StopLeiren = 925;
        int y_StopLeiren = 253;
        //历史战争确认
        int x_endlastwar = 920;
        int y_endlastwar = 620;
        //回营按钮
        int x_gobackhome = 82;
        int y_gobackhome = 636;


        WindowManager wm = (WindowManager) this.getSystemService(Context.WINDOW_SERVICE);
        DisplayMetrics dm = new DisplayMetrics();

        wm.getDefaultDisplay().getMetrics(dm);

        int widthCoe = dm.widthPixels / 720;// 屏幕宽度（像素）
        int heightCoe = dm.heightPixels / 1280; // 屏幕高度（像素）

        Log.d("执行开战任务", "获取屏幕像素宽==" + dm.widthPixels);
        Log.d("执行开战任务", "获取屏幕像素高==" + dm.heightPixels);


        x_cimfirm = x_cimfirm * widthCoe;
        y_cimfirm = y_cimfirm * heightCoe;

        x_clanwar = x_clanwar * widthCoe;
        y_clanwar = y_clanwar * heightCoe;

        x_startclanwar = x_startclanwar * widthCoe;
        y_startclanwar = y_startclanwar * heightCoe;

        x_startclanwarSearch = x_startclanwarSearch * widthCoe;
        y_startclanwarSearch = y_startclanwarSearch * heightCoe;

        x_guajiOpenMenu = x_guajiOpenMenu * widthCoe;
        y_guajiOpenMenu = y_guajiOpenMenu * heightCoe;

        x_StopLeiren = x_StopLeiren * widthCoe;
        y_StopLeiren = y_StopLeiren * heightCoe;

        x_endlastwar = x_endlastwar * widthCoe;
        y_endlastwar = y_endlastwar * heightCoe;

        Log.d("执行开战任务", "特殊判断，是否雷人挂机" + warStartBean.isGuaji());
        if (warStartBean.isGuaji()) {
            Log.d("执行开战任务", "点击雷人菜单");
            ShellUtils.execCmd("input tap " + x_guajiOpenMenu + " " + y_guajiOpenMenu, true);
            SystemClock.sleep(2000);
            Log.d("执行开战任务", "关闭雷人辅助");
            ShellUtils.execCmd("input tap " + x_StopLeiren + " " + y_StopLeiren, true);
            SystemClock.sleep(2000);
        }

        Log.d("执行开战任务", "杀指定游戏进程");
        ShellUtils.execCmd("am force-stop" + warStartBean.getPlatform(), true);
        SystemClock.sleep(3000);

        Log.d("执行开战任务", "进入指定COC平台");
        if (warStartBean.getPlatformShow().contains("九游")) {
            ShellUtils.execCmd("am start -n " + warStartBean.getPlatform() + "/.GameApp", true);
        } else {
            ShellUtils.execCmd("am start -n " + warStartBean.getPlatform() + "/com.supercell.clashofclans.GameAppKunlun", true);
        }
        SystemClock.sleep(30000);

        Log.d("执行开战任务", "点击可能存在的确定按钮");
        ShellUtils.execCmd("input tap " + x_cimfirm + " " + y_cimfirm, true);
        SystemClock.sleep(2000);

        Log.d("执行开战任务", "点击部落站按钮");
        ShellUtils.execCmd("input tap " + x_clanwar + " " + y_clanwar, true);
        SystemClock.sleep(2000);

        Log.d("执行开战任务", "点击确认上次部落站");
        ShellUtils.execCmd("input tap " + x_endlastwar + " " + y_endlastwar, true);
        SystemClock.sleep(2000);

        Log.d("执行开战任务", "点击开始部落站");
        ShellUtils.execCmd("input tap " + x_startclanwar + " " + y_startclanwar, true);
        SystemClock.sleep(2000);

        Log.d("执行开战任务", "点击确认开始部落站");
        ShellUtils.execCmd("input tap " + x_startclanwarSearch + " " + y_startclanwarSearch, true);
        SystemClock.sleep(2000);

        if (warStartBean.isGuaji()) {
            Log.d("执行开战任务", "点击雷人菜单");
            ShellUtils.execCmd("input tap " + x_guajiOpenMenu + " " + y_guajiOpenMenu, true);
            SystemClock.sleep(2000);
            Log.d("执行开战任务", "打开雷人辅助");
            ShellUtils.execCmd("input tap " + x_StopLeiren + " " + y_StopLeiren, true);
            SystemClock.sleep(2000);
            Log.d("执行开战任务", "回营 开始挂机");
            ShellUtils.execCmd("input tap " + x_gobackhome + " " + y_gobackhome, true);
            SystemClock.sleep(2000);
        } else {
            Log.d("执行开战任务", "第七步关闭应用");
            ShellUtils.execCmd("am force-stop " + warStartBean.getPlatform(), true);
            SystemClock.sleep(3000);
        }


    }


    private void putNewPlan(List<WarStartBean> data) {
        String listData = GsonUtil.GsonString(data);
        SPUtil.setParam(this, Constant.WAR_START_PLAN_LIST, listData);
    }

}
