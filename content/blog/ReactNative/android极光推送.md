---
title: RN android极光推送
date: "2022-04-02 15:32"
description: "react-native 极光推送 android"
---

### android 推送集成

##### android/app/build.gradle

```js
android {
    ......
    defaultConfig {
        applicationId "com.xxx.xxx" //JPush 上注册的包名.
        ......


        ndk {
            //选择要添加的对应 cpu 类型的 .so 库。
            abiFilters 'armeabi', 'armeabi-v7a', 'arm64-v8a'
            // 还可以添加 'x86', 'x86_64', 'mips', 'mips64'
        }


        manifestPlaceholders = [
            JPUSH_PKGNAME : applicationId,
            JPUSH_APPKEY : "你的 Appkey ", //JPush 上注册的包名对应的 Appkey.
            JPUSH_CHANNEL : "developer-default", //暂时填写默认值即可.
        ]
        ......
    }
    ......
}

dependencies {
    ......
    implementation 'cn.jiguang.sdk:jpush:3.4.1'  // 此处以JPush 3.4.1 版本为例。
    implementation 'cn.jiguang.sdk:jcore:2.2.4'  // 此处以JCore 2.2.4 版本为例。
    ......
}
```

##### android/build.gradle

```js
buildscript{
    repositories {
        jcenter()        //添加
        ...
    }
    ...
}
allprojects{
    repositories {
        jcenter()        //添加
        ...
    }
    ...
}
```

##### android/app/src/main/AndroidManifest.xml

```xml
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.RECEIVE_USER_PRESENT"/>
<uses-permission android:name="com.jkserver.permission.JPUSH_MESSAGE "/>
```

```xml
<!-- Since JCore2.0.0 Required SDK核心功能-->
<!-- 可配置android:process参数将Service放在其他进程中；android:enabled属性不能是false -->
<!-- 这个是自定义Service，要继承极光JCommonService，可以在更多手机平台上使得推送通道保持的更稳定 -->
<service android:name=“com.jpush.JPushService"
android:enabled="true"
android:exported="false"
android:process=":pushcore">
  <intent-filter>
    <action android:name="cn.jiguang.user.service.action" />
  </intent-filter>
</service>
```

```xml
<!-- Required since 3.0.7 -->
<!-- 新的 tag/alias 接口结果返回需要开发者配置一个自定的广播 -->
<!-- 3.3.0开始所有事件将通过该类回调 -->
<!-- 该广播需要继承 JPush 提供的 JPushMessageReceiver 类, 并如下新增一个 Intent-Filter -->
<receiver
android:name="com.jpush.JUPushMessageReceiver"
android:enabled="true"
android:exported="false" >
<intent-filter>
  <action android:name="cn.jpush.android.intent.RECEIVE_MESSAGE" />
  <category android:name="您应用的包名" />
</intent-filter>
</receiver>
```

##### android/app/src/main/java/com/jpush 内部文件

[JPushModule.java 下载](../../assets/files//JPushModule.java)

[JPushPackage.java 下载](../../assets/files//JPushPackage.java)

[JPushService.java 下载](../../assets/files//JPushService.java)

[JUPushMessageReceiver.java 下载](../../assets/files//JUPushMessageReceiver.java)

##### android/app/src/main/java/{appname}/MainApplication.java

```java
import com.jpush.JPushPackage    //添加内容
@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
    ...
    new JPushPackage()    //添加内容
  );
}
```

##### 混淆 android/app/proguard-rules.pro

```pro
-dontoptimize
-dontpreverify
-dontwarn cn.jpush.**
-keep class cn.jpush.** { *; }
-keep class * extends cn.jpush.android.helpers.JPushMessageReceiver { *; }
-dontwarn cn.jiguang.**
-keep class cn.jiguang.** { *; }

2.0.5 ~ 2.1.7 版本有引入 gson 和 protobuf，增加排除混淆的配置。（2.1.8 版本不需配置）
#==================gson && protobuf==========================
-dontwarn com.google.**
-keep class com.google.gson.** {*;}
-keep class com.google.protobuf.** {*;}
```

