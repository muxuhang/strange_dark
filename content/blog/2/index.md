---
title: RN页面切换效果
date: "2020-04-21 11:02"
description: "切换页面滑动效果都改为左右滑动"
---
```javascript
// javascript
//设置android动画与ios一致，为左右滑动效果
import StackViewStyleInterpolator from "react-navigation-stack/src/views/StackView/StackViewStyleInterpolator";
export const AppNavigator = createStackNavigator({
  Page: { screen: Page },
  }, {    
  initialRouteName: 'Page',
  headerMode: "none",
  mode:'card',
  transitionConfig: () => ({
    screenInterpolator: StackViewStyleInterpolator.forHorizontal
  }),
})
```
#### react-navigation5
```js
//设置android动画与ios一致，为左右滑动效果
import { CardStyleInterpolators } from "@react-navigation/stack"
<Stack.Navigator
    screenOptions={{
        ...,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}
>
```