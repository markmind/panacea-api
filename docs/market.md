# Market API

Market API provide data for client market module，Inclues APIs

- getProducts Get products
- getTickers Get products tickers
- getKlines Get kline for symbol
- getPickerNormal Get hot products in exchange

## Implementation

>**Optional**
>If this API is not implemented, the client will not have a market module
>If this API is not implemented, please set `hasMarket` to `false` in the `init` of the bot's status`

## API List

### - getProducts

Get all products in bot exchange

#### Request

```javascript
{
    "action": "getProducts",
    "apiKey":"YOUR API KEY"
}
```

#### Response

```javascript
{
    "action": "getProducts",
    "data":[{
        "id": "1INCH_USDT", //pair id
        "asset": "1INCH",//asset
        "currency": "USDT",//currency
        "active": true,
        "min_size": "0.01",//min asset size
        "increment": "0.0001",//price increment
        "asset_increment": "0.01",//asset increment
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

Get tickers for request symbols or all products in exchange,

> response all products tickers when no symbols input

#### Request

```javascript
{
    "action": "getTickers",
    "data": {
        "symbols": [
            {
                "product_id": "1INCH-USDT"
            },
            ...
        ]
    },
    "apiKey": "YOUR API KEY"
}
```

#### Response

```javascript
{
    "action": "getTickers",
    "data": [
        {
            "symbol": "GDO/USDT",//symbol name
            "price": 8.98e-8, //real-time price    
            "percentage": 1 //24hr price changed rate
        }
        ...
    ]
}
```

### - getPickerNormal

Get hot products in the bot exchange

> Get some featured products ,such as Maximum amplitude...

#### Request

```javascript
{
    "action": "getPickerNormal",
    "data": {
        "period": "1d", //kline period
        "limit": 10,// result data length
        "number": 8 //min kline data length
    },
    "apiKey": "YOUR API KEY"
}
```

#### Response

```javascript
{
    "action": "getPickerNormal",
    "data": {
        "maxSum": [//Maximum amplitude
            {
                "index": 1, //order
                "product_id": "ARB-USDT",
                "price": 1.3181,
                "extra": "12400.37%", //Total amplitude rate
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
        "minSum": [//Minimum amplitude
            {
                "index": 1,//order
                "product_id": "BUSD-USDT",
                "price": 0.9982,
                "extra": "2.04%", //Total amplitude rate
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
        "fastUp": [//Maximum Up
            {
                "index": 1,//order
                "product_id": "ID-USDT",
                "price": 0.5285,
                "extra": "2014.00%",//total up rate
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
        "moreUp": [//More up 
            {
                "index": 1,// order
                "product_id": "LOOP-USDT",
                "price": 0.12923,
                "extra": "9/10",// up line length
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
        "continueUp": [//Continue Up
            {
                "index": 1, //order
                "product_id": "LOOP-USDT",
                "price": 0.12923,
                "extra": 9, //continue up length
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

Get klines for symbol

#### Request

```javascript
{
    "action": "getKlines",
    "symbol": "ALGO-USDT", //symbol
    "data": {
        "product_id": "ALGO-USDT",
        "limit": 60, //kline data length
        "period": "30m" //kline period
    },
    "apiKey": "YOUR API KEY"
}
```

#### Response

```javascript
{
    "action": "getKlines",
    "data": {
        "period": "30m", //kline period
        "klines": [
            {
                "period_id": "30m933888",//kline id
                "time": 1680768000,//kline start time
                "size": "30m",//period
                "close_time": 1681000199999,//kline close time
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
