package com.rabbitmeng;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

/**
 * Created by master-sum on 13/08/2018.
 */

public class WarStartManage extends Activity implements View.OnClickListener {

    private RecyclerView mRlvWarStart;
    private Button mBtnAddWarStartPlan;//添加开战计划

    private TextView mTvSelectData;//开战日期
    private TextView mTvSelectRongc;//开战时的容错
    private TextView mTvSelectrPlatform;//开战时的平台

    private long warStartPlanCuo;//开战的时间戳

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.act_war_start_manage);


//        mRlvWarStart.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.VERTICAL, false));
//        mRlvWarStart.setAdapter(new WarStartAdapter(this, null));

        initView();
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
    }


    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.tv_select_date:

                break;
        }
    }
}
