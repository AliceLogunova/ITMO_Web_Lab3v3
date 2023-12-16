package com.example.web_3;

public class CheckResult {
    public boolean check(float x, float y, float r) {
        //квадрат
        if (x >= 0 && y >= 0 && x <= r && y <= r / 2) return true;
        //треугольник
        if (x <= 0 && y <= 0 && ((-1 * x) + (-1 * y)) <= r) return true;
        //четверть круга
        if (x <= 0 && y >= 0 && ((x * x + y * y) <= r * r)) return true;
        else return false;
    }
}
