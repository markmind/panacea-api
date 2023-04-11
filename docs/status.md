# Status API

Status API provides the necessary data for the bot module of the client, currently includes the following APIs

- init:get all bot initial data
- refresh:get bot update data

## Implementation

> **Required**
> When the server uses websocket communication, `init` will get all the initial data and initialize the client, and websocket will continuously pass `refrsh` data to the client through broadcasting

## API List

### - init

Get all current bot init data

#### Request

> When user successfully connects to the bot, data will be pushed to client.
> When device reconnection (such as resume event), data will be pushed to client again.

```javascript
{
    "action": "init",
    "apiKey":"YOUR API KEY"
}
```

#### Response

```javascript
 {
    "exchange": { //exchange
        "name": "sim", //name 'sim' is paper trading
        "makerFee": 0.1, //exchange maker fee
        "takerFee": 0.1//exchange taker fee
    },
    "symbols": [ // watch symbols
        {
            "product_id": "ETH-USDT", //pair name
            "price": 1858.08, //pair price
            "normalized": "mexc.ETH-USDT",//pair full name
            "min_size": "0.00001",//pair min size
            "asset": "ETH",
            "currency": "USDT",
            "assetCaptial": 0,
            "leverage": 10,//future leverage
            "isolated": false,//future mode
            "usdtProfit": 0,//USDT profit
            "dynamicProfit": 0,//unrealized USDT profit
            "dynamicUsdtProfit": 0,//unrealized USDT profit rate
            "profit": 0,//USDT profit reate
            "signal": null,//signal include 'buying','selling','bought','sold'
            "win": 0,//win count
            "lost": 0,//lost count
            "winLostRate": 0,//win rate
            "trades": [{//pair order list
                "order_id": 1001, //order ID
                "time": 1681111866476,//order time
                "execution_time": 5001,//order execution time
                "slippage": 0,//order slippage
                "type": "buy",//order position type, buy or sell
                "size": "0.10757",//order size
                "fee": 0.19980051799999998,//order fee usdt 
                "price": "1857.40", //order price
                "order_type": "maker",//order type 'maker' or 'taker'
                "action": "BollingerBands_buy_long",//order buy or send strategy type
                "profit": -0.0009999999999999998, //order porfit
                "usdtProfit": -0.19980051799999998,//order profit rate
                "position_side": "long",//order position side 'long' or 'short'
            },
            ...
            ],
            "lastTradeTime": 0,//last trade time
            "klines": [//kline data
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
                    "strategy": { //kline data straegy
                        "BollingerBands_buyCrossCount": 0,//bb buy point count in this period
                        "BollingerBands_sellCrossCount": 1,//bb sell point count in this period
                        "BollingerBands_buy": false,//if bb has buy point
                        "BollingerBands_sell": false//if bb has sell point
                    }
                },
                ...
            ]
        },
        ...
    ],
    "status": { //bot status
            "hasConfig": true,//if has config module
            "hasStrategy": true,//if has strategy module
            "hasMarket": true,//if has market module
            "hasBacktest": true,//if has backtest module
            "tradeListLen": 1,//watch pair length
            "startCapital": 1000,//start capital
            "currentCapital": 800.10957177,//current useful capital
            "tradeNum": 12,//traded pair number
            "dynamicUsdtProfit": -0.0290142,//unrealized profit
            "dynamicProfit": -0.0000290142,//unrealized profit rate
            "usdtProfit": -0.19980051799999998,//USDT profit
            "profit": -0.000199800518,//profit rate
            "exchange": "mexc",//bot exchange
            "startTime": 1681111671975,//bot start time
            "timeZoneOffset": -480,//server timezone offset
            "status": "work",//current bot status
            "win": 4,
            "lost": 1,
            "winLostRate": 0.8,
            "totalCapital":999.32 //current capital,include profit and unrealized profit
    }
 }
```

### - refresh

Get current bot update data

> The server regularly broadcasts real-time data to the client
> Broadcast data to the client when a specific event occurs, such as new order is created

#### Request

```javascript
{
    "action": "refresh",
    "apiKey": "YOUR API KEY"
}
```

#### Response

```javascript
{
    "action": "refresh",
    "data": {
        "symbols": [ //all pairs
            {
            "product_id": "ETH-USDT", //pair name
            "price": 1858.08, //pair price
            "normalized": "mexc.ETH-USDT",//pair full name
            "min_size": "0.00001",//pair min size
            "asset": "ETH",
            "currency": "USDT",
            "assetCaptial": 0,
            "leverage": 10,// future leverage
            "isolated": false,//future mode
            "usdtProfit": 0,//USDT profit
            "dynamicProfit": 0,//unrealized USDT profit
            "dynamicUsdtProfit": 0,//unrealized USDT profit rate
            "profit": 0,//USDT USDT profit rate
            "signal": null,//signal include 'buying','selling','bought','sold'
            "win": 0,//win count
            "lost": 0,//lost count
            "winLostRate": 0,//win rate
            "trades": [{// pair order list
                "order_id": 1001, //order ID
                "time": 1681111866476,//order time
                "execution_time": 5001,//order execution time
                "slippage": 0,//order slippage
                "type": "buy",//order position type, buy or sell
                "size": "0.10757",//order size
                "fee": 0.19980051799999998,//order fee usdt 
                "price": "1857.40", //order price
                "order_type": "maker",//order type 'maker' or 'taker'
                "action": "BollingerBands_buy_long",//order buy or send strategy type
                "profit": -0.0009999999999999998, //order porfit
                "usdtProfit": -0.19980051799999998,//order profit rate
                "position_side": "long",//order position side 'long' or 'short'
             },
             ...
            ],
            "lastTradeTime": 0,//last trade time
            "klines": [//Kline data
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
                    "strategy": { //kline data for strategy
                        "BollingerBands_buyCrossCount": 0,//bb buy point count in this period
                        "BollingerBands_sellCrossCount": 1,//bb sell point count in this period
                        "BollingerBands_buy": false,//if bb has buy point
                        "BollingerBands_sell": false//if bb has sell point
                        "middle": 1856.3892857142853,//bb middle
                        "upper": 1858.8566899522384,//bb uper
                        "lower": 1853.9218814763321,//bb lower
                        "pw": 0.26582832134842305,//bb pw
                    }
                }
                ...
                ]
            },
            ...
        ],
        "status": { //bot status
            "tradeListLen": 1,//watch pair length
            "startCapital": 1000,//start capital
            "currentCapital": 800.10957177,//current useful capital
            "tradeNum": 12,//traded pair number
            "dynamicUsdtProfit": -0.0290142,//unrealized profit
            "dynamicProfit": -0.0000290142,//unrealized profit rate
            "usdtProfit": -0.19980051799999998,//USDT profit
            "profit": -0.000199800518,//profit rate
            "exchange": "mexc",//bot exchange
            "startTime": 1681111671975,//bot start time
            "timeZoneOffset": -480,//server timezone offset
            "status": "work",//current bot status
            "win": 4,
            "lost": 1,
            "winLostRate": 0.8,
            "totalCapital":999.32 //current capital,include profit and unrealized profit
        }
    }
}
```
