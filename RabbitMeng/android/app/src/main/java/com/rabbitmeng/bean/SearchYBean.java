package com.rabbitmeng.bean;

/**
 * Created by master on 05/09/2018.
 */

public class SearchYBean {
    private int yStart;
    private int yEnd;
    private int distance;


    public int getyStart() {
        return yStart;
    }

    public void setyStart(int yStart) {
        this.yStart = yStart;
    }

    public int getyEnd() {
        return yEnd;
    }

    public void setyEnd(int yEnd) {
        this.yEnd = yEnd;
    }

    public int getDistance() {
        return getyEnd()+getyStart();
    }

    public void setDistance(int distance) {
        this.distance = distance;
    }
}
