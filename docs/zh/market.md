# 市场API

市场API为客户端的市场模块提供必要数据，目前包括以下API

- getProducts 获得产品列表
- getTickers 获得产品价格
- getKlines 获得特定交易对的K线
- getPickerNormal 获得热门产品

## 必需实现

> **可选**
> 如果不实现此API，客户端将不会有市场模块
> 如果未实现此API，在状态API请将机器人状态的`init`中请将`hasMarket`设置为`false`

## API列表

### - getProducts

获取当前机器人所在交易所的所有产品

#### 请求参数

```javascript
{
    "action": "getProducts",
    "apiKey":"YOUR API KEY"
}
```

#### 返回结果

```javascript
{
    "action": "getProducts",
    "data":[{
        "id": "1INCH_USDT", //交易对
        "asset": "1INCH",//asset
        "currency": "USDT",//currency
        "active": true,
        "min_size": "0.01",//最小交易对单位
        "increment": "0.0001",//最小价格单位
        "asset_increment": "0.01",//最小交易对增量
        "label": "1INCH/USDT",
        "exchagne_id": "mexc",
        "product_id": "1INCH-USDT",
        "normalized": "mexc.1INCH-USDT"
    },
    ...
    ]
}
```

### - getTickers

获取当前机器人所在交易所的所有或指定产品的实时价格,

> 不传symbols参数时将返回所有产品的价格

#### 请求参数

```javascript
{
    "action": "getTickers",
    "data": {
        "symbols": [
            {
                "product_id": "1INCH-USDT" //交易对名称
            },
            ...
        ]
    },
    "apiKey": "YOUR API KEY"
}
```

#### 返回结果

```javascript
{
    "action": "getTickers",
    "data": [
        {
            "symbol": "GDO/USDT",//交易对名称
            "price": 8.98e-8, //当前价格    
            "percentage": 1 //24hr价格变化率
        }
        ...
    ]
}
```

### - getPickerNormal

获取当前机器人所在交易所的热门产品

> 目前支持的热门产品为指定周期内的最大涨幅，最大，最小振幅，连续上涨与阳线最多5个部分

#### 请求参数

```javascript
{
    "action": "getPickerNormal",
    "data": {
        "period": "1d", //K线周期
        "limit": 10,// 返回结果数量
        "number": 8 // K线长度
    },
    "apiKey": "YOUR API KEY"
}
```

#### 返回结果

```javascript
{
    "action": "getPickerNormal",
    "data": {
        "maxSum": [//最大振幅
            {
                "index": 1, //排名
                "product_id": "ARB-USDT",
                "price": 1.3181,
                "extra": "12400.37%", //总振幅
                "klines": [
                    {
                        "time": 1679529600000,
                        "close": 1.3181
                    }
                    ...
                ]
            }
            ...
        ],
        "minSum": [//最小振幅
            {
                "index": 1,//排名
                "product_id": "BUSD-USDT",
                "price": 0.9982,
                "extra": "2.04%",  //总振幅
                "klines": [
                    {
                        "time": 1678752000000,
                        "close": 0.9965
                    },
                    ...
                ]
            },
 ...
        ],
        "fastUp": [//最大涨幅
            {
                "index": 1,//排名
                "product_id": "ID-USDT",
                "price": 0.5285,
                "extra": "2014.00%",//总涨幅
                "klines": [
                    {
                        "time": 1679443200000,
                        "close": 0.40696
                    },
                   ...
                ]
            },
             ...
        ],
        "moreUp": [//最多阳线
            {
                "index": 1,// 排名
                "product_id": "LOOP-USDT",
                "price": 0.12923,
                "extra": "9/10",// 阳线数量
                "klines": [
                    {
                        "time": 1679529600000,
                        "close": 0.12923
                    },
     ...
                ]
            },
            ...
        ],
        "continueUp": [//连续涨
            {
                "index": 1, //排名
                "product_id": "LOOP-USDT",
                "price": 0.12923,
                "extra": 9, //连续涨数量
                "klines": [
                    {
                        "time": 1678752000000,
                        "close": 0.03596
                    },
      ...
     ],
 ...
            }
        ]
    }
}
```

### getKlines

获取当前机器人所在交易所的某一产品的K线图

#### 请求参数

```javascript
{
    "action": "getKlines",
    "symbol": "ALGO-USDT", //交易对名称
    "data": {
        "product_id": "ALGO-USDT",
        "limit": 60, //K线长度
        "period": "30m" //K线周期
    },
    "apiKey": "YOUR API KEY"
}
```

#### 返回结果

```javascript
{
    "action": "getKlines",
    "data": {
        "period": "30m", //K线周期
        "klines": [
            {
                "period_id": "30m933888",//kline id
                "time": 1680768000,//K线开始时间
                "size": "30m",//K线周期
                "close_time": 1681000199999,//k线结束时间
                "open": 0.216,
                "high": 0.2169,
                "low": 0.2157,
                "close": 0.2169,
                "volume": 12943.41
            }
            ...
        ]
    }
}
```
