package com.rabbitmeng;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.util.ArrayList;

/**
 * Created by master-sum on 13/08/2018.
 */

public class WarStartManageActivity extends Activity implements View.OnClickListener {

    private RecyclerView mRlvWarStart;
    private Button mBtnAddWarStartPlan;//添加开战计划

    private TextView mTvSelectData;//开战日期
    private TextView mTvSelectRongc;//开战时的容错
    private TextView mTvSelectrPlatform;//开战时的平台

    private long warStartPlanCuo;//开战的时间戳

    private ArrayList<WarStartBean> mWarStartBeanArrayList;

    private long warStartTiemc;
    private String warStartTimeshow;
    private int warStartDif;
    private String warPlanform;
    private WarStartAdapter mWarStartAdapter;

    private int[] rongcuo = new int[]{2,4,6,8,10};
    private String[] plantPlantorm = new String[]{};

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.act_war_start_manage);
        mWarStartBeanArrayList = new ArrayList<>();
        initView();

        mRlvWarStart.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));
        mWarStartAdapter = new WarStartAdapter(this, mWarStartBeanArrayList);
        mRlvWarStart.setAdapter(mWarStartAdapter);

        initListener();
    }

    private void initView() {
        mRlvWarStart = (RecyclerView) findViewById(R.id.rlv_war_start_list);
        mBtnAddWarStartPlan = (Button) findViewById(R.id.btn_add_war_start_plan);
        mTvSelectData = (TextView) findViewById(R.id.tv_select_date);
        mTvSelectRongc = (TextView) findViewById(R.id.tv_select_fault_tolerant);
        mTvSelectrPlatform = (TextView) findViewById(R.id.tv_select_platform);
    }


    private void initListener() {
        mTvSelectData.setOnClickListener(this);
        mTvSelectRongc.setOnClickListener(this);
        mTvSelectrPlatform.setOnClickListener(this);
        mBtnAddWarStartPlan.setOnClickListener(this);
    }


    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.tv_select_date:

                break;
            case R.id.tv_select_fault_tolerant:

                break;
            case R.id.tv_select_platform:

                break;
            case R.id.btn_add_war_start_plan:
                WarStartBean warStartBean = new WarStartBean();
//                warStartBean.setShowWarStartTime();
//                warStartBean.setWarStartTime();
//                warStartBean.setRongCuo();
//                warStartBean.setPlatform();
                mWarStartBeanArrayList.add(warStartBean);
                mWarStartAdapter.notifyDataSetChanged();
                break;
        }
    }

}
