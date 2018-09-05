package com.rabbitmeng.bean;

/**
 * Created by master on 05/09/2018.
 */

public class SearchXBean {
    private int xStart;
    private int xEnd;
    private int distance;

    public int getxStart() {
        return xStart;
    }

    public void setxStart(int xStart) {
        this.xStart = xStart;
    }

    public int getxEnd() {
        return xEnd;
    }

    public void setxEnd(int xEnd) {
        this.xEnd = xEnd;
    }

    public int getDistance() {
        return getxEnd()-getxStart();
    }

    public void setDistance(int distance) {
        this.distance = distance;
    }
}
