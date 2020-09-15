---
title: RN 扫码功能
date: "2020-04-21 15:32"
description: "react-native android ios react-native-camera"
---

### 安装
```javascript
npm install react-native-camera —save
react-native link react-native-camera

npm install react-native-qrcode-scanner react-native-permissions --save
react-native link react-native-qrcode-scanner
react-native link react-native-permissions
```
### 使用
```javascript
import QRCodeScanner from "react-native-qrcode-scanner”;
export class ScannerScreen extends React.Component<ScannerScreenProps, {}> {
  /**
  * 扫描成功
  */
  onSuccess(e) {Ï
    console.tron.log(e)
  }
  render() {
    return (
      <Screen style={ROOT} preset="scroll">
        <QRCodeScanner
          showMarker={true}
          onRead={this.onSuccess.bind(this)}>
        </QRCodeScanner>
      </Screen>
    )
  }
}
```



##### Bug 1 ：Could not resolve project :react-native-camera. on Android
解决方法：
    在文件android/app/build.gradle中的 defaultConfig中添加
 missingDimensionStrategy 'react-native-camera', 'general'
android添加权限
```java
<uses-permission android:name="android.permission.VIBRATE"/>
```
##### ios添加权限 info.plis
```m
<key>NSCameraUsageDescription</key>
<string>Your message to user when the camera is accessed for the first time</string>
<!-- Include this only if you are planning to use the camera roll -->
<key>NSPhotoLibraryUsageDescription</key>
<string>Your message to user when the photo library is accessed for the first time</string>

<!-- Include this only if you are planning to use the microphone for video recording -->
<key>NSMicrophoneUsageDescription</key>
<string>Your message to user when the microsphone is accessed for the first time</string>
```
