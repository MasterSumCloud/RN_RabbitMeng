package com.rabbitmeng.imagesearch;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import com.rabbitmeng.bean.SearchResultXYBean;
import com.rabbitmeng.bean.SearchXBean;
import com.rabbitmeng.bean.SearchYBean;

import java.util.ArrayList;

/**
 * Created by master on 05/09/2018.
 */

public class SearchImg {

    //找点的坐标集
    private ArrayList<SearchXBean> xSearchList;
    private ArrayList<SearchYBean> ySearchLIst;
    //最后返回的结果
    private ArrayList<SearchResultXYBean> searchResult;

    //找到后 对比状态中
    private boolean xSearching;
    private boolean ySearching;
    //对应模块的个数点
    private int positionX = -1;
    private int positionY = -1;

    private final int ROW = 1;
    private final int COLOUM = 2;

    public SearchImg(String path) {
        xSearchList = new ArrayList<>();
        ySearchLIst = new ArrayList<>();
        searchResult = new ArrayList<>();
//        getSingleLineRGB(ROW, 0, path);
        //TODO 搜索限制固定  需要根据分辨率修正
        getSingleLineRGB(COLOUM, 0, path);


    }

    public void getSingleLineRGB(int rowOrColoum, int xLine, String path) {
        int[] rgb = new int[3];
        Bitmap bi = BitmapFactory.decodeFile(path);
        int width = bi.getWidth();
        int height = bi.getHeight();

        Log.d("测量", "width=" + width + ",height=" + height + ".");

        if (rowOrColoum == 1) {
            int searchy = xLine;
            for (int i = 0; i < width; i++) {
                int pixel = bi.getPixel(i, searchy);
//				System.out.println("zzz"+pixel);
                rgb[0] = (pixel & 0xff0000) >> 16;
                rgb[1] = (pixel & 0xff00) >> 8;
                rgb[2] = (pixel & 0xff);
                System.out.println("横坐标=" + i + ",纵坐标=" + searchy + ":(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")");
            }
        } else if (rowOrColoum == 2) {
            int searchx = xLine;
            for (int i = 0; i < height; i++) {
                int pixel = bi.getPixel(searchx, i);
                rgb[0] = (pixel & 0xff0000) >> 16;
                rgb[1] = (pixel & 0xff00) >> 8;
                rgb[2] = (pixel & 0xff);
                System.out.println("横坐标=" + searchx + ",纵坐标=" + i + ":(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")");
            }
        }
    }


    public void getSingleLinePicks(int rowOrColoum, int xLine, String path) {
        Bitmap bi = BitmapFactory.decodeFile(path);
        int width = bi.getWidth();
        int height = bi.getHeight();

        Log.d("测量", "width=" + width + ",height=" + height + ".");

        if (rowOrColoum == 1) {
            int searchy = xLine;
            for (int i = 0; i < width; i++) {
                int pixel = bi.getPixel(i, searchy);
                putX(pixel, i);
                System.out.println("横坐标=" + i + ",纵坐标=" + searchy + "对应RGB的int值=" + pixel);
            }
        } else if (rowOrColoum == 2) {
            int searchx = xLine;
            for (int i = 0; i < height; i++) {
                int pixel = bi.getPixel(searchx, i);
                putY(pixel, i);
                System.out.println("横坐标=" + searchx + ",纵坐标=" + i + "对应RGB的int值=" + pixel);
            }
        }
    }


    private void putX(int picks, int position) {

        if (!xSearching) {// 统计未开始
            // 验证满足开始要求
            if (picks == 123) {
                xSearching = true;
                SearchXBean pickBean = new SearchXBean();
                pickBean.setxStart(position);
                positionX++;
                xSearchList.add(pickBean);
            }
        } else {// 开始统计中
            if (picks == 123) {

            } else {
                xSearching = false;
                xSearchList.get(positionX).setxEnd(position);

            }
        }
    }

    private void putY(int picks, int position) {
        if (!ySearching) {// 统计未开始
            // 验证满足开始要求
            if (picks == 123) {
                ySearching = true;
                SearchYBean pickBean = new SearchYBean();
                pickBean.setyStart(position);
                positionY++;
                ySearchLIst.add(pickBean);
            }
        } else {// 开始统计中
            if (picks == 123) {

            } else {
                ySearching = false;
                ySearchLIst.get(positionY).setyEnd(position);

            }
        }
    }


    public ArrayList<SearchResultXYBean> handResult(){
        for (SearchYBean searchYBean : ySearchLIst) {
            //TODO 直接X做好根据需要写死  根据分辨率修正
            SearchResultXYBean searchResultXYBean = new SearchResultXYBean(0,searchYBean.getDistance()/2);
            searchResult.add(searchResultXYBean);
        }
        return searchResult;
    }

}
