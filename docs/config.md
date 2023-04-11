# Config API

Config API provides the necessary data for the configuration module of the client. Through the configuration module, all your configurations on the server can be updated in real time through the client. Currently includes the following APIs

- init: gets configuration settings and configuration values
- updateConfig: update configuration
- updateSymbolFuture: update trading pair configuration

## Implementation

> **Optional**
> If API is not implemented, the client will not have a configuration module.
> If API is not implemented, please set `hasConfig` to `false` in the `init` of the robot state in the state API

## Update process

- Pass configuration settings and configuration values in the `init` event
- Generate the UI interface on the client side through configuration settings
- Modify the configuration through the UI interface and update the server-side value through `updateConfig`

## API List

### - init

When using the configuration module, configuration settings and configuration parameters will be passed to the client through `init`

#### Request

> When use connects to the bot, data will push to client.
> When device reconnection (such asresume event),data push to client.

```javascript
{
    "action": "init",
    "apiKey":"YOUR API KEY"
}
```

#### Response

```javascript
 {
    "options": { //Bot config ，all values are set buy config settings
        "strategy": "BollingerBands",
        "period": "10m",
        "debug": false
        ...
    },
    "config": { //config settings，include group,subgroup and item
        "bot": [//bot group realted
            {
                "name": "strategy",//config item name such as strategy
                "type": "string",//config item type
                "value": "BollingerBands"//config item value
            },
            {
                "name": "period",//config item name such as period
                "type": "array",//array list
                "list": [//list value
                    "1m",
                    "3m",
                    "5m"
                ],
                "value": "5m"
            },
            {
                "name": "debug",//config item name such as debug
                "type": "bool",//bool
                "value": false
            },
            {
                "name": "other",//group name
                "type": "group"//config item is group
            },
            {
                "name": "poll_scan_time",//config item ,such as poll timeout
                "type": "number",//config item type
                "step": [//config item step
                    1000,//min
                    60000,//max
                    500//step
                ],
                "value": 3000,
                "des": true//this item has description
            },
            {
                "name": "black_list",//config item name ,such as black_list
                "type": "textarea",//config item type
                "value": 'binance.BTC-USDT,binance.AAB-USDt', //config item value
                "des": true
            },
            ...
        ],
        "exchange": [], //exchange related config,
        "order": [], //order related config,
        "sellPoint": [], //sell point related config,
        "watch": [], //watch pool related config
        "paper":[],//papaer related config
    }
 }
```

### - updateConfig

Update config params and restart bot or not

#### Request

```javascript
{
    "action": "updateConfig",
    "restart": true, //should restart bot or not
    "data": {
        "period": "3m", //update params
        "buy_pct":30 //update params
    },
    "apiKey": "YOUR API KEY"
}
```

#### Response

```javascript
{
    "action": "updateConfig",
    "data":Object, //response all params object
    "toast": "trade.updateConfigOk" //show toast message
}
```

### - updateSymbolFuture

Update symbol future parmas，now support future leverage and future mode

#### Request

```javascript
{
    "action": "updateSymbolFuture",
    "symbol":"BTC-USDT", //pair
    "data":{
        "type":"leverage",//marginMode or leverage
        "value":10 //type is marginMode ,value is  cross or isolated
    },
    "apiKey": "YOUR API KEY"
}
```

#### Response

```javascript
{
    "action": "updateSymbolFuture",
    "toast": "trade.updateSymbolFutureOk"
}
```

> A sample config file for extension/xcoin

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
