package com.rabbitmeng.activity;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.DatePickerDialog;
import android.app.TimePickerDialog;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.TimePicker;
import android.widget.Toast;

import com.rabbitmeng.Constant;
import com.rabbitmeng.R;
import com.rabbitmeng.adapter.WarStartAdapter;
import com.rabbitmeng.bean.WarStartBean;
import com.rabbitmeng.utils.GsonUtil;
import com.rabbitmeng.utils.SPUtil;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by master-sum on 13/08/2018.
 */

public class WarStartManageActivity extends Activity implements View.OnClickListener, DatePickerDialog.OnDateSetListener, TimePickerDialog.OnTimeSetListener {

    private RecyclerView mRlvWarStart;
    private Button mBtnAddWarStartPlan;//添加开战计划

    private TextView mTvSelectData;//开战日期
    private TextView mTvSelectRongc;//开战时的容错
    private TextView mTvSelectrPlatform;//开战时的平台

    private long warStartPlanCuo;//开战的时间戳

    private ArrayList<WarStartBean> mWarStartBeanArrayList;

    private long warStartTiemc;
    private String warStartTimeshow;
    private String warPlanform;
    private String warPlanformShow;
    private WarStartAdapter mWarStartAdapter;
    private boolean isGuaji = false;

    private String[] isLeirenGuaji = new String[]{"否", "是"};

    private String[] plantPlatformShow = new String[]{"豌豆荚", "九游", "昆仑", "百度", "360"};
    private String[] plantPlatform = new String[]{"com.supercell.clashofclans.wdj",
            "com.supercell.clashofclans.uc",
            "com.supercell.clashofclans.kunlun",
            "com.supercell.clashofclans.baidu",
            "com.supercell.clashofclans.qihoo"};//360
    private Spinner mSpnPlatform;
    private Spinner mSpnLeirenGJing;
    private int mYear;
    private int mMonth;
    private int mDay;
    private int mMinute;
    private int mHour;
    private TextView mTvFinish;
    private TextView mTvEdit;

    private boolean isEdit;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.act_war_start_manage);
        mWarStartBeanArrayList = new ArrayList<>();
        Calendar ca = Calendar.getInstance();
        mYear = ca.get(Calendar.YEAR);
        mMonth = ca.get(Calendar.MONTH);
        mDay = ca.get(Calendar.DAY_OF_MONTH);
        mMinute = ca.get(Calendar.MINUTE);
        mHour = ca.get(Calendar.HOUR_OF_DAY);


        initView();

        initAdapter();

        initListener();

        getLastList();


    }

    private void getLastList() {
        String lastListJson = (String) SPUtil.getParam(this, Constant.WAR_START_PLAN_LIST, "");
        if (!TextUtils.isEmpty(lastListJson)) {
            Log.d("获取到的json===", lastListJson);
            List<WarStartBean> warStartBeans = GsonUtil.GsonToList(lastListJson, WarStartBean.class);
            mWarStartBeanArrayList.addAll(warStartBeans);
            mWarStartAdapter.notifyDataSetChanged();
        }
    }

    private void initAdapter() {
        mRlvWarStart.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));
        mWarStartAdapter = new WarStartAdapter(this, mWarStartBeanArrayList);
        mRlvWarStart.setAdapter(mWarStartAdapter);

        mSpnPlatform.setAdapter(new ArrayAdapter<String>(this, R.layout.support_simple_spinner_dropdown_item, plantPlatformShow));
        mSpnLeirenGJing.setAdapter(new ArrayAdapter<String>(this, R.layout.support_simple_spinner_dropdown_item, isLeirenGuaji));
    }

    private void initView() {
        mRlvWarStart = (RecyclerView) findViewById(R.id.rlv_war_start_list);
        mBtnAddWarStartPlan = (Button) findViewById(R.id.btn_add_war_start_plan);
        mTvSelectData = (TextView) findViewById(R.id.tv_select_date);
        mSpnPlatform = (Spinner) findViewById(R.id.spn_platform);
        mSpnLeirenGJing = (Spinner) findViewById(R.id.spn_rongcuo);
        mTvFinish = (TextView) findViewById(R.id.tv_finish);
        mTvEdit = (TextView) findViewById(R.id.tv_edit);
    }


    private void initListener() {
        mTvSelectData.setOnClickListener(this);
        mBtnAddWarStartPlan.setOnClickListener(this);
        mTvFinish.setOnClickListener(this);
        mTvEdit.setOnClickListener(this);

        mSpnLeirenGJing.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                if (position == 0) {
                    isGuaji = false;
                } else {
                    isGuaji = true;
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });

        mSpnPlatform.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                warPlanformShow = plantPlatformShow[position];
                warPlanform = plantPlatform[position];
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });
    }


    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.tv_select_date:
                new DatePickerDialog(this, this, mYear, mMonth, mDay).show();
                break;
            case R.id.btn_add_war_start_plan:
                addWarStartPlan();
                break;
            case R.id.tv_finish:
                finish();
                break;
            case R.id.tv_edit:
                if (isEdit) {
                    isEdit = false;
                    mTvEdit.setText("编辑");
                } else {
                    isEdit = true;
                    mTvEdit.setText("保存");
                }
                setAllDataEditing();
                break;
        }
    }

    private void setAllDataEditing() {
        if (mWarStartBeanArrayList.size() > 0) {
            for (WarStartBean warStartBean : mWarStartBeanArrayList) {
                warStartBean.setEdit(isEdit);
            }
        }
        mWarStartAdapter.notifyDataSetChanged();
    }

    private void addWarStartPlan() {
        if (TextUtils.isEmpty(warStartTimeshow)) {
            Toast.makeText(this, "开战实现必选", Toast.LENGTH_SHORT).show();
            return;
        }

        if (TextUtils.isEmpty(warPlanformShow)) {
            Toast.makeText(this, "平台必选", Toast.LENGTH_SHORT).show();
            return;
        }
        if (mWarStartBeanArrayList.size() >= 5) {
            Toast.makeText(this, "最多只能进行5个", Toast.LENGTH_SHORT).show();
            return;
        }
        WarStartBean warStartBean = new WarStartBean();
        warStartBean.setShowWarStartTime(warStartTimeshow);
        warStartBean.setWarStartTime(stringToLong(warStartTimeshow));
        warStartBean.setGuaji(isGuaji);
        warStartBean.setPlatform(warPlanform);
        warStartBean.setPlatformShow(warPlanformShow);
        warStartBean.setOnlySign(UUID.randomUUID().toString());
        mWarStartBeanArrayList.add(warStartBean);
        mWarStartAdapter.notifyDataSetChanged();
    }

    @Override
    public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
        Log.d("时间选择", mYear + "年" + mMonth + "月" + mDay + "日");
        mYear = year;
        mMonth = month;
        mDay = dayOfMonth;
        new TimePickerDialog(this, this, mHour, mMinute, true).show();
    }

    @Override
    public void onTimeSet(TimePicker view, int hourOfDay, int minute) {
        mHour = hourOfDay;
        mMinute = minute;
        Log.d("时间选择", mHour + "时" + mMinute + "分");
        warStartTimeshow = mYear + "-" + (mMonth + 1) + "-" + mDay + " " + mHour + ":" + mMinute;
        mTvSelectData.setText(warStartTimeshow);
    }

    public static long stringToLong(String strTime) {
        @SuppressLint("SimpleDateFormat")
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date date = null;
        try {
            date = formatter.parse(strTime);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        if (date == null) {
            return 0;
        } else {
            Log.d("保存的时间戳", String.valueOf(date.getTime()));
            return date.getTime();
        }
    }
}
