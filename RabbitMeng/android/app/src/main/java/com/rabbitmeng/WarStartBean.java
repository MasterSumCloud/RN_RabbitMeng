package com.rabbitmeng;

/**
 * Created by master on 13/08/2018.
 */

public class WarStartBean {
    private int rongCuo;
    private String showWarStartTime;
    private long warStartTime;
    private String platform;
    private String platformShow;
    private int newType = -1;//-1 未启动 （代开始）
    private boolean isEdit;

    private String onlySign;

    public String getOnlySign() {
        return onlySign;
    }

    public void setOnlySign(String onlySign) {
        this.onlySign = onlySign;
    }

    public boolean isEdit() {
        return isEdit;
    }

    public void setEdit(boolean edit) {
        isEdit = edit;
    }

    public int getNewType() {
        return newType;
    }

    public void setNewType(int newType) {
        this.newType = newType;
    }

    public int getRongCuo() {
        return rongCuo;
    }

    public void setRongCuo(int rongCuo) {
        this.rongCuo = rongCuo;
    }

    public String getShowWarStartTime() {
        return showWarStartTime;
    }

    public void setShowWarStartTime(String showWarStartTime) {
        this.showWarStartTime = showWarStartTime;
    }

    public long getWarStartTime() {
        return warStartTime;
    }

    public void setWarStartTime(long warStartTime) {
        this.warStartTime = warStartTime;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public String getPlatformShow() {
        return platformShow;
    }

    public void setPlatformShow(String platformShow) {
        this.platformShow = platformShow;
    }
}
