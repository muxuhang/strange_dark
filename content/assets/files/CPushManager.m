//
//  CPushManager.m
//  JKServer
//
//  Created by 丁攀 on 2017/12/26.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CPushManager.h"
#import "JPUSHService.h"

#import <React/RCTLog.h>

@implementation CPushManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(Init)
{
//  :(UIApplication *)alias
//  RCTLogInfo(@" text%@",alias);
}
RCT_EXPORT_METHOD(bind:(NSString *)alias)
{
  NSLog(@"alias %@",alias);
//  :(UIApplication *)alias
//  RCTLogInfo(@" text%@",alias);
  [JPUSHService setAlias:alias completion:NULL seq:NULL];
}
RCT_EXPORT_METHOD(unbind:(NSString *)alias)
{
//  :(UIApplication *)alias
//  RCTLogInfo(@" text%@",alias);
  [JPUSHService deleteAlias:^(NSInteger iResCode, NSString *iAlias, NSInteger seq) {} seq:NULL];
}
@end
