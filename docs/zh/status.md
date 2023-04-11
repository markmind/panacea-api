# 状态API

状态API为客户端的机器人模块提供必要数据，目前包括以下API

- init 获得机器人所有初始数据
- refresh 机器人数据更新数据

## 实现

> **必选**
> 服务器端使用websocket通讯时，`init`将获得所有初始数据并初始化客户端,websocket 通过广播不断将`refrsh`数据传递给客户端

## API列表

### - init

获取当前机器人所在初始数据

#### 请求参数

> 用户初次连接机器人成功时，服务器将主动推送。
> 用户设备重新连接（比如浏览器移动设备resume事件）也会主动推送

```javascript
{
    "action": "init",
    "apiKey":"YOUR API KEY"
}
```

#### 返回结果

```javascript
 {
    "exchange": { //交易所
        "name": "sim", //交易所名称 'sim'为模拟交易
        "makerFee": 0.1, //交易所市价费率
        "takerFee": 0.1//交易所限价费率
    },
    "symbols": [ // 监控池交易对
        {
            "product_id": "ETH-USDT", //交易对名称
            "price": 1858.08, //价格
            "normalized": "mexc.ETH-USDT",//全称
            "min_size": "0.00001",//最小交易价格
            "asset": "ETH",
            "currency": "USDT",
            "assetCaptial": 0,
            "leverage": 10,//杠杆大小
            "isolated": false,//是否全仓
            "usdtProfit": 0,//USDT 利润
            "dynamicProfit": 0,//未实现 USDT 利润
            "dynamicUsdtProfit": 0,//未实现 USDT 利润率
            "profit": 0,//USDT 利润率
            "signal": null,//信号 包括 'buying','selling','bought','sold'
            "win": 0,//赢次数
            "lost": 0,//输次数
            "winLostRate": 0,//赢率
            "trades": [{//成交订单列表
                "order_id": 1001, //订单ID
                "time": 1681111866476,//订单时间
                "execution_time": 5001,//订单执行时间
                "slippage": 0,//订单滑点
                "type": "buy",//订单类型 buy or sell
                "size": "0.10757",//订单数量
                "fee": 0.19980051799999998,//订单费用 usdt计价
                "price": "1857.40", //订单成交价
                "order_type": "maker",//订单成交方式 'maker' 或 'taker'
                "action": "BollingerBands_buy_long",//订单成交策略
                "profit": -0.0009999999999999998, //订单利润
                "usdtProfit": -0.19980051799999998,//订单利润率
                "position_side": "long",//订单多还是空 'long' 或 'short'
            },
            ...
            ],
            "lastTradeTime": 0,//最后交易时间
            "klines": [//K线数据
                {
                    "period_id": "m28018427",
                    "time": 1681105620000,
                    "size": "1m",
                    "close_time": 1681105679999,
                    "open": 1863.3,
                    "high": 1863.38,
                    "low": 1862.22,
                    "close": 1862.22,
                    "volume": 45.16688,
                    "strategy": { //K线中的策略数据
                        "BollingerBands_buyCrossCount": 0,//策略BollingerBands同一周期内买点次数
                        "BollingerBands_sellCrossCount": 0,//策略BollingerBands同一周期内卖点次数
                        "BollingerBands_buy": false,//策略BollingerBands是否有买点
                        "BollingerBands_sell": false//策略BollingerBands是否有卖点
                    }
                },
                ...
            ]
        },
        ...
    ],
    "status": { //机器人状态
        "hasConfig": true,//是否实现配置模块
        "hasStrategy": true,//是否实现策略模块
        "hasMarket": true,//是否实现市场模块
        "hasBacktest": true,//是否实现回测模块
        "tradeListLen": 1,//交易中交易对数量
        "startCapital": 1000,//初始资金
        "currentCapital": 800.10957177,//当前可用资金
        "tradeNum": 12,//成交数量
        "dynamicUsdtProfit": -0.0290142,//未实现USDT利润
        "dynamicProfit": -0.0000290142,//未实现USDT利润率
        "usdtProfit": -0.19980051799999998,//USDT利润
        "profit": -0.000199800518,//利润率
        "exchange": "mexc",//当前交易所
        "startTime": 1681111671975,//机器人启动时间
        "timeZoneOffset": -480,//服务器时间偏移
        "status": "work",//当前机器人状态，
        "win": 4,
        "lost": 1,
        "winLostRate": 0.8,
        "totalCapital":999.32 //当前资金，包括已实现与未实现利润
    }
 }
```

### - refresh

获取当前机器人实时更新数据

> 服务器定时向客户端广播实时数据
> 特定事件发生时可向客户端广播数据，比如订单成交时

#### 请求参数

```javascript
{
    "action": "refresh",
    "apiKey": "YOUR API KEY"
}
```

#### 返回结果

```javascript
{
    "action": "refresh",
    "data": {
        "symbols": [ //所有交易对
            {
            "product_id": "ETH-USDT", //交易对名称
            "price": 1858.08, //价格
            "normalized": "mexc.ETH-USDT",//全称
            "min_size": "0.00001",//最小交易价格
            "asset": "ETH",
            "currency": "USDT",
            "assetCaptial": 0,
            "leverage": 10,//杠杆大小
            "isolated": false,//是否全仓
            "usdtProfit": 0,//USDT 利润
            "dynamicProfit": 0,//未实现 USDT 利润
            "dynamicUsdtProfit": 0,//未实现 USDT 利润率
            "profit": 0,//USDT 利润率
            "signal": null,//信号 包括 'buying','selling','bought','sold'
            "win": 0,//赢次数
            "lost": 0,//输次数
            "winLostRate": 0,//赢率
            "trades": [{//成交订单列表
                "order_id": 1001, //订单ID
                "time": 1681111866476,//订单时间
                "execution_time": 5001,//订单执行时间
                "slippage": 0,//订单滑点
                "type": "buy",//订单类型 buy or sell
                "size": "0.10757",//订单数量
                "fee": 0.19980051799999998,//订单费用 usdt计价
                "price": "1857.40", //订单成交价
                "order_type": "maker",//订单成交方式 'maker' 或 'taker'
                "action": "BollingerBands_buy_long",//订单成交策略
                "profit": -0.0009999999999999998, //订单利润
                "usdtProfit": -0.19980051799999998,//订单利润率
                "position_side": "long",//订单多还是空 'long' 或 'short'
             },
             ...
            ],
            "lastTradeTime": 0,//最后交易时间
            "klines": [//K线数据
                {
                    "period_id": "m28018427",
                    "time": 1681105620000,
                    "size": "1m",
                    "close_time": 1681105679999,
                    "open": 1863.3,
                    "high": 1863.38,
                    "low": 1862.22,
                    "close": 1862.22,
                    "volume": 45.16688,
                    "strategy": { //K线中的策略数据
                        "BollingerBands_buyCrossCount": 0,//策略BollingerBands同一周期内买点次数
                        "BollingerBands_sellCrossCount": 1,//策略BollingerBands同一周期内卖点次数
                        "BollingerBands_buy": false,//策略BollingerBands是否有买点
                        "BollingerBands_sell": false//策略BollingerBands是否有卖点
                        "middle": 1856.3892857142853,//布林线中轨
                        "upper": 1858.8566899522384,//布林线上轨
                        "lower": 1853.9218814763321,//布林线轨
                        "pb": 0.8203192775226102,//布林带偏移
                        "pw": 0.26582832134842305,//布林带宽度
                    }
                }
                ...
                ]
            },
            ...
        ],
        "status": { //机器人当前状态
            "tradeListLen": 1,//交易中交易对数量
            "startCapital": 1000,//初始资金
            "currentCapital": 800.10957177,//当前可用资金
            "tradeNum": 12,//成交数量
            "dynamicUsdtProfit": -0.0290142,//未实现USDT利润
            "dynamicProfit": -0.0000290142,//未实现USDT利润率
            "usdtProfit": -0.19980051799999998,//USDT利润
            "profit": -0.000199800518,//利润率
            "exchange": "mexc",//当前交易所
            "startTime": 1681111671975,//机器人启动时间
            "timeZoneOffset": -480,//服务器时间偏移
            "status": "work",//当前机器人状态，
            "win": 4,
            "lost": 1,
            "winLostRate": 0.8,
            "totalCapital":999.32 //当前资金，包括已实现与未实现利润
        }
    }
}
```
