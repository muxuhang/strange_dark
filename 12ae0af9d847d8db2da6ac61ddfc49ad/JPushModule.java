package com.findchen.jpush;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import cn.jpush.android.api.JPushInterface;

import java.text.SimpleDateFormat;
import java.util.Date;
import android.util.Log;

public class JPushModule extends ReactContextBaseJavaModule {

  public JPushModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "JPush";
  }
  
  @ReactMethod
  public void init() {
    Log.e("AmapError","使用推送");
    JPushInterface.init(getReactApplicationContext());
  }

  @ReactMethod
  public void setDebug(Boolean debug) {
    JPushInterface.setDebugMode(debug);
  }

  private int getSequence() {
      SimpleDateFormat sdf = new SimpleDateFormat("MMddHHmmss");
      String date = sdf.format(new Date());
      return Integer.valueOf(date);
  }

  @ReactMethod
  public void check(Promise promise) {
    try {
      boolean result = JPushInterface.isPushStopped(getReactApplicationContext());
      promise.resolve(!result);
    } catch(Throwable e) {
      promise.reject(e);
    }
  }

  @ReactMethod
  public void restart() {
    JPushInterface.resumePush(getReactApplicationContext());
  }

  @ReactMethod
  public void stop() {
    JPushInterface.stopPush(getReactApplicationContext());
  }

  @ReactMethod
  public void bind(String user) {
    Log.e("Jpush",user);
    int sequece = getSequence();
    JPushInterface.setAlias(getReactApplicationContext(), sequece, user);
  }

  @ReactMethod
  public void unbind(String user) {
    int sequece = getSequence();
    JPushInterface.deleteAlias(getReactApplicationContext(), sequece);
  }

}
