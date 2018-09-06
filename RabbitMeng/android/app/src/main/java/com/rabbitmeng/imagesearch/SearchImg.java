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

    public static final int ROW = 1;
    public static final int COLOUM = 2;
    private Bitmap mBi;

    public SearchImg(String path) {
        xSearchList = new ArrayList<>();
        ySearchLIst = new ArrayList<>();
        searchResult = new ArrayList<>();
//        getSingleLineRGB(ROW, 0, path);
//        getSingleLineRGB(COLOUM, 600, path);
//        getSingleLinePicks(COLOUM,600,path);

    }

    public void getSingleLineRGB(int rowOrColoum, int xLine, String path) {
        int[] rgb = new int[3];
        mBi = BitmapFactory.decodeFile(path);
        int width = mBi.getWidth();
        int height = mBi.getHeight();

        Log.d("测量", "width=" + width + ",height=" + height + ".");

        if (rowOrColoum == 1) {
            int searchy = xLine;
            for (int i = 0; i < width; i++) {
                int pixel = mBi.getPixel(i, searchy);
//				System.out.println("zzz"+pixel);
                rgb[0] = (pixel & 0xff0000) >> 16;
                rgb[1] = (pixel & 0xff00) >> 8;
                rgb[2] = (pixel & 0xff);
//                Log.d("坐标", "横坐标=" + i + ",纵坐标=" + searchy + ":(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")");
                //接下来10个点不搜索
                if (putXRGB(rgb[0], rgb[1], rgb[2], i)) {
                    if (i + 10 <= width) {
                        i += 10;
                    }
                }

            }
        } else if (rowOrColoum == 2) {
            int searchx = xLine;
            for (int i = 0; i < height; i++) {
                int pixel = mBi.getPixel(searchx, i);
                rgb[0] = (pixel & 0xff0000) >> 16;
                rgb[1] = (pixel & 0xff00) >> 8;
                rgb[2] = (pixel & 0xff);
//                if (i > 800 && i < 1000) {
//                    Log.d("坐标", "横坐标=" + searchx + ",纵坐标=" + i + ":(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")");
//                }
                if (putYRGB(rgb[0], rgb[1], rgb[2], i)) {
                    if (i + 10 <= height) {
                        i += 10;
                    }
                }
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
                Log.d("坐标", "横坐标=" + i + ",纵坐标=" + searchy + "对应RGB的int值=" + pixel);
                putX(pixel, i);
            }
        } else if (rowOrColoum == 2) {
            int searchx = xLine;
            for (int i = 0; i < height; i++) {
                int pixel = bi.getPixel(searchx, i);
                Log.d("坐标", "横坐标=" + searchx + ",纵坐标=" + i + "对应RGB的int值=" + pixel);
                putY(pixel, i);
            }
        }
    }


    private void putX(int picks, int position) {

        if (!xSearching) {// 统计未开始
            // 验证满足开始要求
            if (picks == -15921907) {
                xSearching = true;
                SearchXBean pickBean = new SearchXBean();
                pickBean.setxStart(position);
                positionX++;
                xSearchList.add(pickBean);
            }
        } else {// 开始统计中
            if (picks == -15921907) {//再次找到  结束按钮
                xSearching = false;
                xSearchList.get(positionX).setxEnd(position);
            }
        }
    }

    private void putY(int picks, int position) {
        if (!ySearching) {// 统计未开始
            // 验证满足开始要求
            if (picks == -15921907) {
                ySearching = true;
                SearchYBean pickBean = new SearchYBean();
                pickBean.setyStart(position);
                position += 10;
                positionY++;
                ySearchLIst.add(pickBean);
                Log.d("进入", "putY: " + position);
            }
        } else {// 开始统计中
            if (picks == -15921907) {
                ySearching = false;
                ySearchLIst.get(positionY).setyEnd(position);
                Log.d("退出", "putY: " + position);
            }
        }
    }

    private boolean juadge(int r, int g, int b) {
        int i = 0;
        if (r == 13) {
            i++;
        }

        if (g == 13) {
            i++;
        }

        if (b == 13) {
            i++;
        }

        if (i == 3) {
            return true;
        } else {
            return false;
        }
    }

    private boolean putXRGB(int r, int g, int b, int position) {

        if (!xSearching) {// 统计未开始
            // 验证满足开始要求
            if (juadge(r, g, b)) {
                xSearching = true;
                SearchXBean pickBean = new SearchXBean();
                pickBean.setxStart(position);
                positionX++;
                xSearchList.add(pickBean);
                return true;
            }
        } else {// 开始统计中
            if (juadge(r, g, b)) {//再次找到  结束按钮
                xSearching = false;
                xSearchList.get(positionX).setxEnd(position);
            }
        }
        return false;
    }

    private boolean putYRGB(int r, int g, int b, int position) {
        if (!ySearching) {// 统计未开始
            // 验证满足开始要求
            if (juadge(r, g, b)) {
                ySearching = true;
                SearchYBean pickBean = new SearchYBean();
                pickBean.setyStart(position);
                positionY++;
                ySearchLIst.add(pickBean);
                Log.d("进入", "putY: " + position);
                return true;
            }
        } else {// 开始统计中
            if (juadge(r, g, b)) {
                ySearching = false;
                ySearchLIst.get(positionY).setyEnd(position);
                Log.d("退出", "putY: " + position);
            }
        }
        return false;
    }


    public ArrayList<SearchResultXYBean> handResultY() {
        if (ySearchLIst.size() > 2) {
            for (int i = 0; i < ySearchLIst.size(); i++) {
                if (i % 2 != 0) {
                    SearchResultXYBean searchResultXYBean = new SearchResultXYBean();
                    searchResultXYBean.setY(ySearchLIst.get(i-1).getyStart());
                    searchResultXYBean.setyEnd(ySearchLIst.get(i).getyStart());
                    searchResult.add(searchResultXYBean);
                }
            }
        }
        return searchResult;
    }

    public ArrayList<SearchYBean> getYList() {
        return ySearchLIst;
    }


    public Bitmap getBitMap(int x, int y, int width, int height) {
        Bitmap rectBitmap = Bitmap.createBitmap(mBi, x, y, width, height);
        return rectBitmap;
    }

}
