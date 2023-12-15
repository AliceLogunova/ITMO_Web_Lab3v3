package com.example.web_3;

import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;

import java.io.Serializable;
import java.util.List;

@Named
@SessionScoped
public class ResultCDI implements Serializable {

    private float x;
    private float y;
    private float r;
    private boolean isInside;
    private String currentTime;

    @Inject
    private ResultEJB resultEJB;

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public float getR() {
        return r;
    }

    public void setR(float r) {
        this.r = r;
    }

    public boolean isInside() {
        return isInside;
    }

    public void setInside(boolean inside) {
        isInside = inside;
    }

    public String getCurrentTime() {
        return currentTime;
    }

    public void setCurrentTime(String currentTime) {
        this.currentTime = currentTime;
    }
    public void makeResult(){
        resultEJB.makeResult(x, y, r);
    }
    public void makeResultFromSVG(){
        resultEJB.makeResultFromSVG();
    }

    public void deleteData(){
        resultEJB.deleteData();
    }
    public List<Result> getAllResults(){
        return resultEJB.getAllResults();
    }


}
