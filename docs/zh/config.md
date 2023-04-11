# 配置API

配置API为客户端的配置模块提供必要数据，通过配置模块，您在服务器的所有配置均可通过客户端进行实时更新。目前包括以下API

- init 获得配置设置与配置值
- updateConfig 更新配置
- updateSymbolFuture 更新交易对配置

## 必需实现

> **可选**
> 如果不实现此API，客户端将不会有配置模块.
> 如果未实现此API，在状态API请将机器人状态的`init`中请将`hasConfig`设置为`false`

## 更新流程

- 在`init`事件中传递配置设置与配置值
- 通过配置设置在客户端生成相关联的UI界面
- 通过UI界面修改配置并通过`updateConfig`更新服务器端值

## API列表

### - init

当使用配置模块时，配置设置与配置参数将通过`init`传递至客户端

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
    "options": { //机器人配置 ，用户提交config并在此处传入实时值，详见 config组
        "strategy": "BollingerBands",
        "period": "10m",
        "debug": false
        ...
    },
    "config": { //机器人配置设置，结构为分组，小分组，条目 ，可查看XCoin相关配置
        "bot": [//机器人相关配置分组，以下例子使用了不同种类的
            {
                "name": "strategy",//配置名称 比如策略名称
                "type": "string",//字符类型
                "value": "BollingerBands"//配置值
            },
            {
                "name": "period",//配置名称，比如周期选择
                "type": "array",//列表类型
                "list": [//列表值
                    "1m",
                    "3m",
                    "5m"
                ],
                "value": "5m"
            },
            {
                "name": "debug",//配置名称，比如是否调试
                "type": "bool",//布尔类型
                "value": false
            },
            {
                "name": "other",//分组名称，比如其它
                "type": "group"//分组类型，分组类型下的所有设置将在分组中显示
            },
            {
                "name": "poll_scan_time",//配置名称，比如轮循时间
                "type": "number",//数值类型
                "step": [//通过step设置
                    1000,//最小值
                    60000,//最大值
                    500//步长
                ],
                "value": 3000,
                "des": true//存在描述
            },
            {
                "name": "black_list",//配置名称，比如黑名单列
                "type": "textarea",//长字符串类型
                "value": 'binance.BTC-USDT,binance.AAB-USDt', //配置值
                "des": true//存在描述
            },
            ...
        ],
        "exchange": [], //交易所相关,
        "order": [], //订单相关,
        "sellPoint": [], //止赢止损相关相关,
        "watch": [], //监控池相关
        "paper":[],//模拟交易相关
    }
 }
```

### - updateConfig

更新机器人参数

#### 请求参数

```javascript
{
    "action": "updateConfig",
    "restart": true, //本次更新需要重启机器人
    "data": {
        "period": "3m", //更新的参数
        "buy_pct":30 //更新的参数
    },
    "apiKey": "YOUR API KEY"
}
```

#### 返回结果

```javascript
{
    "action": "updateConfig",
    "data":Object, //返回全部配置参数 方便更
    "toast": "trade.updateConfigOk"
}
```

### - updateSymbolFuture

更新指定交易对的期货参数，目前支持杠杆倍数与全仓逐仓模式的更新

#### 请求参数

```javascript
{
    "action": "updateSymbolFuture",
    "symbol":"BTC-USDT", //交易对
    "data":{
        "type":"leverage",//marginMode or leverage
        "value":10 //type为marginMode时，值为 cross或isolated
    },
    "apiKey": "YOUR API KEY"
}
```

#### 返回结果

```javascript
{
    "action": "updateSymbolFuture",
    "toast": "trade.updateSymbolFutureOk"
}
```

> 一个示例的配置设置文件

````json
{
    "bot": [
        {
            "name": "strategy",
            "type": "string",
            "value": "rain_sar"
        },
        {
            "name": "period",
            "type": "array",
            "list": [
                "1m",
                "3m",
                "5m",
                "15m",
                "30m",
                "1h",
                "2h",
                "4h",
                "8h",
                "12h",
                "1d",
                "3d",
                "1w"
            ],
            "value": "30m"
        },
        {
            "name": "mode",
            "type": "array",
            "list": [
                "live",
                "paper"
            ],
            "value": "live"
        },
        {
            "name": "trade_type",
            "type": "array",
            "list": [
                "auto",
                "autoBuy",
                "autoSell",
                "manual"
            ],
            "value": "live"
        },
        {
            "name": "debug",
            "type": "bool",
            "value": false
        },
        {
            "name": "other",
            "type": "group"
        },
        {
            "name": "poll_scan_time",
            "type": "number",
            "step": [
                1000,
                60000,
                500
            ],
            "value": 3000,
            "des": true
        },
        {
            "name": "poll_broadcast_time",
            "type": "number",
            "step": [
                3000,
                60000,
                1000
            ],
            "value": 5000,
            "des": true
        },
        {
            "name": "save_bot_time",
            "type": "number",
            "step": [
                6000,
                6000000,
                6000
            ],
            "value": 600000,
            "des": true
        },
        {
            "name": "min_periods",
            "type": "number",
            "step": [
                18,
                500,
                1
            ],
            "value": 32
        },
        {
            "name": "keep_lookback_periods",
            "type": "number",
            "step": [
                50,
                50000,
                10
            ],
            "value": 500
        },
        {
            "name": "price_format",
            "type": "string",
            "value": "0.00000000"
        },
        {
            "name": "same_period_multi_buy",
            "type": "bool",
            "value": false
        },
        {
            "name": "run_for",
            "type": "number",
            "step": [
                0,
                1000,
                1
            ],
            "value": 0,
            "des": true
        }
    ],
    "exchange": [
        {
            "name": "exchange",
            "type": "array",
            "list": [
                "binanceusdm",
                "binance",
                "mexc"
            ],
            "value": "binanceusdm"
        },
        {
            "name": "takerFee",
            "type": "number",
            "step": [
                0.001,
                0.5,
                0.001
            ],
            "value": 0.1
        },
        {
            "name": "makerFee",
            "type": "number",
            "step": [
                0.001,
                0.5,
                0.001
            ],
            "value": 0.1
        },
        {
            "name": "future",
            "type": "group"
        },
        {
            "name": "future",
            "type": "bool",
            "value": false,
            "readonly": true
        },
        {
            "name": "market",
            "type": "array",
            "list": [
                "only_long",
                "only_short",
                "both"
            ],
            "value": "only_long"
        },
        {
            "name": "leverage",
            "type": "number",
            "step": [
                2,
                125,
                1
            ],
            "value": 10
        },
        {
            "name": "marginMode",
            "type": "array",
            "list": [
                "cross",
                "isolated"
            ],
            "value": "isolated"
        },
        {
            "name": "short_buy_pct",
            "type": "number",
            "step": [
                0,
                100,
                1
            ],
            "value": 20
        },
        {
            "name": "buy_position_side_when_sell",
            "type": "bool",
            "value": false
        }
    ],
    "order": [
        {
            "name": "order_type",
            "type": "array",
            "list": [
                "maker",
                "taker"
            ],
            "value": "maker"
        },
        {
            "name": "max_slippage_pct",
            "type": "number",
            "step": [
                0.1,
                2,
                0.1
            ],
            "value": 0.5,
            "group": "core"
        },
        {
            "name": "buy",
            "type": "group"
        },
        {
            "name": "buy_pct",
            "type": "number",
            "step": [
                0,
                100,
                1
            ],
            "value": 20
        },
        {
            "name": "min_buy_size",
            "type": "number",
            "step": [
                0,
                100,
                1
            ],
            "value": 10
        },
        {
            "name": "max_buy_size",
            "type": "number",
            "step": [
                0,
                10000,
                100
            ],
            "value": 0
        },
        {
            "name": "sell",
            "type": "group"
        },
        {
            "name": "sell_pct",
            "type": "number",
            "step": [
                0,
                100,
                1
            ],
            "value": 100,
            "group": "sell"
        },
        {
            "name": "other",
            "type": "group"
        },
        {
            "name": "order_adjust_time",
            "type": "number",
            "step": [
                1000,
                1000,
                1000
            ],
            "value": 5000,
            "group": "other"
        },
        {
            "name": "max_sell_loss_pct",
            "type": "number",
            "step": [
                0,
                5,
                0.5
            ],
            "value": 1,
            "group": "other"
        },
        {
            "name": "max_buy_loss_pct",
            "type": "number",
            "step": [
                0,
                5,
                0.5
            ],
            "value": 1,
            "group": "other"
        },
        {
            "name": "order_poll_time",
            "type": "number",
            "step": [
                1000,
                60000,
                1000
            ],
            "value": 5000,
            "group": "other"
        },
        {
            "name": "wait_for_settlement",
            "type": "number",
            "step": [
                1000,
                60000,
                1000
            ],
            "value": 5000,
            "group": "other",
            "des": true
        },
        {
            "name": "markdown_buy_pct",
            "type": "number",
            "step": [
                0,
                5,
                0.1
            ],
            "value": 0,
            "group": "other"
        },
        {
            "name": "markup_sell_pct",
            "type": "number",
            "step": [
                0,
                5,
                0.1
            ],
            "value": 0,
            "group": "other"
        },
        {
            "name": "post_only",
            "type": "bool",
            "value": false,
            "group": "other"
        },
        {
            "name": "use_fee_asset",
            "type": "bool",
            "value": false,
            "group": "other"
        },
        {
            "name": "avg_slippage_pct",
            "type": "number",
            "value": 0.045,
            "step": [
                0,
                0.1,
                0.005
            ],
            "group": "other"
        },
        {
            "name": "quarentine_time",
            "type": "number",
            "step": [
                0,
                100000,
                1000
            ],
            "value": 0,
            "group": "other"
        }
    ],
    "sellPoint": [
        {
            "name": "sell_stop_pct",
            "type": "number",
            "step": [
                0,
                30,
                0.1
            ],
            "value": 5
        },
        {
            "name": "profitStop",
            "type": "group"
        },
        {
            "name": "profit_stop_enable",
            "type": "bool",
            "value": true
        },
        {
            "name": "profit_stop_percent",
            "type": "number",
            "step": [
                0,
                100,
                1
            ],
            "value": 50
        },
        {
            "name": "profit_stop_first_rate",
            "type": "number",
            "step": [
                0,
                500,
                1
            ],
            "value": 10
        },
        {
            "name": "profit_stop_first_percent",
            "type": "number",
            "step": [
                0,
                100,
                1
            ],
            "value": 30
        },
        {
            "name": "profit_stop_second_rate",
            "type": "number",
            "step": [
                0,
                500,
                1
            ],
            "value": 20
        },
        {
            "name": "profit_stop_second_percent",
            "type": "number",
            "step": [
                0,
                100,
                1
            ],
            "value": 40
        },
        {
            "name": "profit_stop_third_rate",
            "type": "number",
            "step": [
                0,
                500,
                1
            ],
            "value": 50
        },
        {
            "name": "profit_stop_third_percent",
            "type": "number",
            "step": [
                0,
                100,
                1
            ],
            "value": 50
        },
        {
            "name": "profit_stop_max_rate",
            "type": "number",
            "step": [
                0,
                500,
                1
            ],
            "value": 100
        },
        {
            "name": "profit_stop_max_percent",
            "type": "number",
            "step": [
                0,
                100,
                1
            ],
            "value": 70
        },
        {
            "name": "profitSell",
            "type": "group"
        },
        {
            "name": "profit_win_enable",
            "type": "bool",
            "value": true
        },
        {
            "name": "profit_win_first_rate",
            "type": "number",
            "step": [
                0,
                500,
                1
            ],
            "value": 25
        },
        {
            "name": "profit_win_first_percent",
            "type": "number",
            "step": [
                0,
                100,
                1
            ],
            "value": 50
        },
        {
            "name": "profit_win_second_rate",
            "type": "number",
            "step": [
                0,
                500,
                1
            ],
            "value": 50
        },
        {
            "name": "profit_win_second_percent",
            "type": "number",
            "step": [
                0,
                100,
                1
            ],
            "value": 50
        },
        {
            "name": "profit_win_third_rate",
            "type": "number",
            "step": [
                0,
                500,
                1
            ],
            "value": 100
        },
        {
            "name": "profit_win_third_percent",
            "type": "number",
            "step": [
                0,
                100,
                1
            ],
            "value": 50
        },
        {
            "name": "profit_win_max_rate",
            "type": "number",
            "step": [
                0,
                500,
                1
            ],
            "value": 200
        },
        {
            "name": "profit_win_max_percent",
            "type": "number",
            "step": [
                0,
                100,
                1
            ],
            "value": 50
        }
    ],
    "watch": [
        {
            "name": "max_watch_size",
            "type": "number",
            "step": [
                0,
                30,
                5
            ],
            "value": 10
        },
        {
            "name": "watch_symbols",
            "type": "textarea",
            "value": "",
            "placeholder": true
        },
        {
            "name": "watchInit",
            "type": "group"
        },
        {
            "name": "watch_include_bought",
            "type": "bool",
            "value": true
        },
        {
            "name": "watch_with_black_list",
            "type": "bool",
            "value": true
        },
        {
            "name": "black_list",
            "type": "textarea",
            "value": "",
            "placeholder": true
        }
    ],
    "paper": [
        {
            "name": "currency_capital",
            "type": "number",
            "step": [
                0,
                10000,
                1000
            ],
            "value": 1000
        },
        {
            "name": "asset_capital",
            "type": "number",
            "step": [
                0,
                10000,
                1000
            ],
            "value": 0
        }
    ]
}
````
