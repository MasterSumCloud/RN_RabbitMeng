package com.rabbitmeng;

/**
 * Created by pengyan on 13/08/2018.
 */

public class WarStartBean {
    private int rongCuo;
    private String showWarStartTime;
    private long warStartTime;
    private String platform;


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
}
