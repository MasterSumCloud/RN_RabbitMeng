package com.rabbitmeng.bean;

/**
 * Created by master on 05/09/2018.
 */

public class SearchResultXYBean {
    private int x = -1;
    private int y = -1;
    private int xEnd = -1;
    private int yEnd = -1;


    public SearchResultXYBean() {
    }

    public int getxEnd() {
        return xEnd;
    }

    public void setxEnd(int xEnd) {
        this.xEnd = xEnd;
    }

    public int getyEnd() {
        return yEnd;
    }

    public void setyEnd(int yEnd) {
        this.yEnd = yEnd;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }
}
