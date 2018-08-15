package com.rabbitmeng;

import android.content.Context;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.reactnativenavigation.params.StyleParams;

import java.util.List;

/**
 * Created by pengyan on 13/08/2018.
 */

public class WarStartAdapter extends RecyclerView.Adapter<WarStartAdapter.ViewHolder> {

    private Context context;
    private List<WarStartBean> data;

    public WarStartAdapter(Context context, List<WarStartBean> data) {
        this.context = context;
        this.data = data;
    }

    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_war_start, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, final int position) {
        WarStartBean warStartBean = data.get(position);
        holder.mTvSelectData.setText(warStartBean.getShowWarStartTime());
        holder.mTvSelectPlatform.setText(warStartBean.getPlatformShow());
        holder.mTvSelectFaultTolerant.setText(String.valueOf(warStartBean.getRongCuo()));

        if (warStartBean.getNewType() == -1) {
            holder.mDeleteStartPlan.setBackgroundColor(Color.GREEN);
            holder.mDeleteStartPlan.setText("开始");
            holder.mDeleteStartPlan.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    data.get(position).setNewType(1);
                    notifyDataSetChanged();
                    Toast.makeText(context, "开启成功", Toast.LENGTH_SHORT).show();
                }
            });
        } else {
            if (warStartBean.isEdit()) {
                holder.mDeleteStartPlan.setBackgroundColor(Color.RED);
                holder.mDeleteStartPlan.setText("取消");
                holder.mDeleteStartPlan.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        data.remove(position);
                        notifyDataSetChanged();
                        Toast.makeText(context, "取消成功", Toast.LENGTH_SHORT).show();
                    }
                });
            } else {
                holder.mDeleteStartPlan.setBackgroundColor(Color.RED);
                holder.mDeleteStartPlan.setText("进行中");
                holder.mDeleteStartPlan.setOnClickListener(null);
            }

        }
    }


    @Override
    public int getItemCount() {
        return data.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        private TextView mTvSelectData;
        private TextView mTvSelectFaultTolerant;
        private TextView mTvSelectPlatform;
        private Button mDeleteStartPlan;

        public ViewHolder(View itemView) {
            super(itemView);
            mTvSelectData = (TextView) itemView.findViewById(R.id.tv_select_date);
            mTvSelectFaultTolerant = (TextView) itemView.findViewById(R.id.tv_select_fault_tolerant);
            mTvSelectPlatform = (TextView) itemView.findViewById(R.id.tv_select_platform);
            mDeleteStartPlan = (Button) itemView.findViewById(R.id.btn_add_war_start_plan);
        }
    }
}

