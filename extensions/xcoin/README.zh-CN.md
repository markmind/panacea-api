# 灵丹首选服务器端程序 XCoin

XCoin实现了灵丹所有的API，您可以直接使用XCoin作为您的后台机器人，也可以通过学习XCoin的源码了解如何使用适配您的机器人

## 安装

复制 `panacea` 目录 to 您的XCoin项目的 `extensions/output/` 目录

## 关于XCoin

基于nodejs的简洁强大的交易机器人

## 功能特征

- 支持同时交易多个交易对，只要服务器有足够算力，理论上你可以同时交易所有交易对.
- 支持 [ccxt](https://github.com/ccxt/ccxt) 支持的所有交易所，[Binance](https://www.binance.com),[BinanceUsdm](https://www.binance.com),[Mexc](https://www.mexc.com/)已完整测试.
- 支持 [technicalindicators](https://github.com/anandanand84/technicalindicators) 支持的所有交易策略，轻松通过JSON文件扩展新的策略.
- 支持期货交易并可控制是多空双方还是仅交易多方，空方.
- 支持多种交易方式，自动买，手动买，手动卖或完全手动模式.
- 支持监控已购项目，支持黑名单，支持动态添加监控项目
- 支持在单独线程上获取价格更新，支持同一机器同一交易所部署多个机器人.
- 支持真实交易，虚拟交易及对交易进行回测
- 基于 [Zenbot](https://github.com/DeviaVir/zenbot) ，支持 zenbot 的绝大部分功能.

## 文档

- [用户文档](https://rainfu.github.io/xcoin)
