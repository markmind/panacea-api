# Strategy API

Strategy API provides the necessary data for the strategy module of the client. Through the strategy module, all your strategies on the server can be updated in real time through the client. Currently includes the following APIs

- init:gets strategy list and strategy value
- updateConfig:update strategy

## Implementation

> **Optional**
> You should enable config module.
> If API is not implemented, the client will not have a strategy module.
> If API is not implemented, please set `hasStrategy` to `false` in the `init` of the robot state in the state API

## Update process

- Pass configuration settings and configuration values in the `init` event
- Generate the UI interface on the client side through configuration settings
- Modify the configuration through the UI interface and update the server-side value through `updateConfig`

## API List

### - init

When using the strategy module, strategy list and strategy configuration parameters will be passed to the client through `init`

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
    "options": { 
        "strategy": Object,//current strategy will be pushed to client by options
        ...
    },
    "strategies": [//strategies
        {
        "id": "BollingerBands",// strategy ID
        "name": "BollingerBands",//strategy name
        "des": "BollingerBands",//strategy description
        "editable": false,//strategy can editable
        "group": "custom",//strategy group
        "order": 20,//strategy order
        "strategies": [//subStrategy,there is a sample used bollingerbands and rsi to buy or sell
            {
                "name": "BollingerBands",//BollingerBands
                "group": "volatility",//group
                "input": [//input
                    {
                        "name": "period",//item name bb period
                        "type": "number",//item type
                        "step": [//min max and step
                            2,
                            100,
                            1
                        ],
                        "value": 14//defaut value
                    },
                    {
                        "name": "stdDev",//bb dev
                        "type": "number",
                        "step": [
                            -1,
                            30,
                            1
                        ],
                        "value": 2
                    },
                    {
                        "name": "valType",//value type
                        "type": "array",//array list
                        "list": [
                            "open",
                            "high",
                            "low",
                            "close",
                            "volume"
                        ],
                        "value": [
                            "close"//default use close price
                        ]
                    }
                ],
                "output": [//output
                    {
                        "name": "upper",//upper
                        "report": true,//report in server side console
                        "show": true,//show in client
                        "pos": "main",//show in main chart
                        "type": "line"//show as line chart
                    },
                    {
                        "name": "middle",
                        "report": true,
                        "show": true,
                        "pos": "main",
                        "type": "line"
                    },
                    {
                        "name": "lower",
                        "report": true,
                        "show": true,
                        "pos": "main",
                        "type": "line"
                    },
                    {
                        "name": "pw",
                        "report": true,
                        "mark": true,//markers show in this chart
                        "show": true,
                        "pos": "sub",//show in sub chart
                        "type": "line"
                    },
                    {
                        "name": "signals",//buy or sell signal
                        "report": false,
                        "show": true,
                        "pos": "sub",
                        "type": "marker"//show as markers
                    }
                ],
                "buyPoint": {//buy signal 
                    "connect": "base",//this is the base strategy when multi strategies
                    "source": "close",//close price line
                    "op": "crossUp",//cross up
                    "target": "lower"//lower line
                },
                "sellPoint": {//sell point
                    "connect": "base",//this is the base strategy when multi strategies
                    "source": "close",//close price line
                    "op": "crossDown",//cross down
                    "target": "upper"//upper line
                }
            },
            {
                "name": "RSI",//another strategy name
                "des": "RSI",
                "editable": false,
                "group": "oscillators",
                "input": [
                    {
                        "name": "period",
                        "type": "number",
                        "step": [
                            2,
                            100,
                            1
                        ],
                        "value": 8
                    },
                    {
                        "name": "overBoughtThreshold",//over bought
                        "type": "number",
                        "step": [
                            0,
                            100,
                            1
                        ],
                        "value": 75,
                        "show": true,
                        "pos": "bottom",
                        "owner": "RSI",//show in rsi line
                        "priceline": true //show as price line
                    },
                    {
                        "name": "overSoldThreshold",//ovr sold
                        "type": "number",
                        "step": [
                            0,
                            100,
                            1
                        ],
                        "value": 25,
                        "show": true,
                        "pos": "bottom",
                        "owner": "RSI",//show in rsi line
                        "priceline": true//show as price line
                    },
                    {
                        "name": "valType",
                        "type": "array",
                        "list": [
                            "open",
                            "high",
                            "low",
                            "close",
                            "volume"
                        ],
                        "value": [
                            "close"
                        ]
                    }
                ],
                "output": [
                    {
                        "name": "RSI",
                        "report": true,
                        "show": true,
                        "pos": "bottom",//show in bottom chart
                        "type": "line",
                        "mark": true
                    },
                    {
                        "name": "signals",
                        "report": false,
                        "show": true,
                        "pos": "bottom",//show in bottom chart
                        "type": "marker"
                    }
                ],
                "buyPoint": {
                    "connect": "and",//multi buypoint connect: 'none','and','or',
                    "source": "RSI",//RSI
                    "op": "crossUp",//cross up
                    "target": "overSoldThreshold"//over sold
                },
                "sellPoint": {
                    "connect": "or",//multi sellpoint connect:'none' is ignored,'and','or',
                    "source": "RSI",//RSI
                    "op": "crossDown",//cross down
                    "target": "overBoughtThreshold"//over bought
                }
            }
        ]
    },
    ...
    ]
 }
```

### - updateConfig

update config strategy

#### Request

```javascript
{
    "action": "updateConfig",
    "restart": true, //update will restart bot
    "data": {
        "strategy": Object, //update strategy
    },
    "apiKey": "YOUR API KEY"
}
```

#### Response

```json
{
    "action": "updateConfig",
    "data":Object, //response all config params
    "toast": "trade.updateConfigOk"
}
```

> a sample stratege list

````javascript
[
    {
        "id": "RSI",
        "name": "RSI",
        "des": "RSI",
        "editable": false,
        "group": "custom",
        "order": 10,
        "strategies": [
            {
                "name": "RSI",
                "des": "RSI",
                "editable": false,
                "group": "oscillators",
                "input": [
                    {
                        "name": "period",
                        "type": "number",
                        "step": [
                            2,
                            100,
                            1
                        ],
                        "value": 8
                    },
                    {
                        "name": "overBoughtThreshold",
                        "type": "number",
                        "step": [
                            0,
                            100,
                            1
                        ],
                        "value": 75,
                        "show": true,
                        "pos": "bottom",
                        "owner": "RSI",
                        "priceline": true
                    },
                    {
                        "name": "overSoldThreshold",
                        "type": "number",
                        "step": [
                            0,
                            100,
                            1
                        ],
                        "value": 25,
                        "show": true,
                        "pos": "bottom",
                        "owner": "RSI",
                        "priceline": true
                    },
                    {
                        "name": "valType",
                        "type": "array",
                        "list": [
                            "open",
                            "high",
                            "low",
                            "close",
                            "volume"
                        ],
                        "value": [
                            "close"
                        ]
                    }
                ],
                "output": [
                    {
                        "name": "RSI",
                        "report": true,
                        "show": true,
                        "pos": "bottom",
                        "type": "line",
                        "mark": true
                    },
                    {
                        "name": "signals",
                        "report": false,
                        "show": true,
                        "pos": "bottom",
                        "type": "marker"
                    }
                ],
                "buyPoint": {
                    "connect": "base",
                    "source": "RSI",
                    "op": "crossUp",
                    "target": "overSoldThreshold"
                },
                "sellPoint": {
                    "connect": "base",
                    "source": "RSI",
                    "op": "crossDown",
                    "target": "overBoughtThreshold"
                }
            }
        ]
    },
    {
        "id": "BollingerBands",
        "name": "BollingerBands",
        "des": "BollingerBands",
        "editable": false,
        "group": "custom",
        "order": 20,
        "strategies": [
            {
                "name": "BollingerBands",
                "group": "volatility",
                "input": [
                    {
                        "name": "period",
                        "type": "number",
                        "step": [
                            2,
                            100,
                            1
                        ],
                        "value": 14
                    },
                    {
                        "name": "stdDev",
                        "type": "number",
                        "step": [
                            -1,
                            30,
                            1
                        ],
                        "value": 2
                    },
                    {
                        "name": "valType",
                        "type": "array",
                        "list": [
                            "open",
                            "high",
                            "low",
                            "close",
                            "volume"
                        ],
                        "value": [
                            "close"
                        ]
                    }
                ],
                "output": [
                    {
                        "name": "upper",
                        "report": true,
                        "show": true,
                        "pos": "main",
                        "type": "line"
                    },
                    {
                        "name": "middle",
                        "report": true,
                        "show": true,
                        "pos": "main",
                        "type": "line"
                    },
                    {
                        "name": "lower",
                        "report": true,
                        "show": true,
                        "pos": "main",
                        "type": "line"
                    },
                    {
                        "name": "pw",
                        "report": true,
                        "mark": true,
                        "show": true,
                        "pos": "sub",
                        "type": "line"
                    },
                    {
                        "name": "signals",
                        "report": false,
                        "show": true,
                        "pos": "sub",
                        "type": "marker"
                    }
                ],
                "buyPoint": {
                    "connect": "base",
                    "source": "close",
                    "op": "crossUp",
                    "target": "lower"
                },
                "sellPoint": {
                    "connect": "base",
                    "source": "close",
                    "op": "crossDown",
                    "target": "upper"
                }
            },
            {
                "name": "RSI",
                "des": "RSI",
                "editable": false,
                "group": "oscillators",
                "input": [
                    {
                        "name": "period",
                        "type": "number",
                        "step": [
                            2,
                            100,
                            1
                        ],
                        "value": 8
                    },
                    {
                        "name": "overBoughtThreshold",
                        "type": "number",
                        "step": [
                            0,
                            100,
                            1
                        ],
                        "value": 75,
                        "show": true,
                        "pos": "bottom",
                        "owner": "RSI",
                        "priceline": true
                    },
                    {
                        "name": "overSoldThreshold",
                        "type": "number",
                        "step": [
                            0,
                            100,
                            1
                        ],
                        "value": 25,
                        "show": true,
                        "pos": "bottom",
                        "owner": "RSI",
                        "priceline": true
                    },
                    {
                        "name": "valType",
                        "type": "array",
                        "list": [
                            "open",
                            "high",
                            "low",
                            "close",
                            "volume"
                        ],
                        "value": [
                            "close"
                        ]
                    }
                ],
                "output": [
                    {
                        "name": "RSI",
                        "report": true,
                        "show": true,
                        "pos": "bottom",
                        "type": "line",
                        "mark": true
                    },
                    {
                        "name": "signals",
                        "report": false,
                        "show": true,
                        "pos": "bottom",
                        "type": "marker"
                    }
                ],
                "buyPoint": {
                    "connect": "none",
                    "source": "RSI",
                    "op": "crossUp",
                    "target": "overSoldThreshold"
                },
                "sellPoint": {
                    "connect": "none",
                    "source": "RSI",
                    "op": "crossDown",
                    "target": "overBoughtThreshold"
                }
            }
        ]
    },
    {
        "id": "PSAR",
        "name": "PSAR",
        "des": "PSAR",
        "editable": false,
        "group": "custom",
        "order": 30,
        "strategies": [
            {
                "name": "PSAR",
                "group": "momentum",
                "input": [
                    {
                        "name": "step",
                        "type": "number",
                        "step": [
                            0.01,
                            1,
                            0.005
                        ],
                        "value": 0.02
                    },
                    {
                        "name": "max",
                        "type": "number",
                        "step": [
                            0.05,
                            1,
                            0.05
                        ],
                        "value": 0.2
                    },
                    {
                        "name": "valType",
                        "type": "array",
                        "list": [
                            "open",
                            "high",
                            "low",
                            "close",
                            "volume"
                        ],
                        "value": [
                            "high",
                            "low"
                        ]
                    }
                ],
                "output": [
                    {
                        "name": "PSAR",
                        "report": true,
                        "mark": false,
                        "show": true,
                        "pos": "main",
                        "type": "line",
                        "dot": true
                    },
                    {
                        "name": "trend",
                        "report": true,
                        "mark": true,
                        "show": true,
                        "pos": "sub",
                        "type": "line"
                    },
                    {
                        "name": "signals",
                        "report": false,
                        "show": true,
                        "pos": "main",
                        "type": "marker"
                    }
                ],
                "buyPoint": {
                    "connect": "base",
                    "source": "PSAR",
                    "op": "crossDown",
                    "target": "close"
                },
                "sellPoint": {
                    "connect": "base",
                    "source": "PSAR",
                    "op": "crossUp",
                    "target": "close"
                }
            },
            {
                "name": "RSI",
                "des": "RSI",
                "editable": false,
                "group": "oscillators",
                "input": [
                    {
                        "name": "period",
                        "type": "number",
                        "step": [
                            2,
                            100,
                            1
                        ],
                        "value": 8
                    },
                    {
                        "name": "overBoughtThreshold",
                        "type": "number",
                        "step": [
                            0,
                            100,
                            1
                        ],
                        "value": 75,
                        "show": true,
                        "pos": "bottom",
                        "owner": "RSI",
                        "priceline": true
                    },
                    {
                        "name": "overSoldThreshold",
                        "type": "number",
                        "step": [
                            0,
                            100,
                            1
                        ],
                        "value": 25,
                        "show": true,
                        "pos": "bottom",
                        "owner": "RSI",
                        "priceline": true
                    },
                    {
                        "name": "valType",
                        "type": "array",
                        "list": [
                            "open",
                            "high",
                            "low",
                            "close",
                            "volume"
                        ],
                        "value": [
                            "close"
                        ]
                    }
                ],
                "output": [
                    {
                        "name": "RSI",
                        "report": true,
                        "show": true,
                        "pos": "bottom",
                        "type": "line",
                        "mark": true
                    },
                    {
                        "name": "signals",
                        "report": false,
                        "show": true,
                        "pos": "bottom",
                        "type": "marker"
                    }
                ],
                "buyPoint": {
                    "connect": "none",
                    "source": "RSI",
                    "op": "crossUp",
                    "target": "overSoldThreshold"
                },
                "sellPoint": {
                    "connect": "none",
                    "source": "RSI",
                    "op": "crossDown",
                    "target": "overBoughtThreshold"
                }
            }
        ]
    },
    {
        "id": "MACD",
        "name": "MACD",
        "des": "MACD",
        "editable": false,
        "group": "custom",
        "order": 40,
        "strategies": [
            {
                "name": "MACD",
                "group": "moving_averages",
                "input": [
                    {
                        "name": "fastPeriod",
                        "type": "number",
                        "step": [
                            1,
                            200,
                            1
                        ],
                        "value": 5
                    },
                    {
                        "name": "slowPeriod",
                        "type": "number",
                        "step": [
                            1,
                            200,
                            1
                        ],
                        "value": 8
                    },
                    {
                        "name": "signalPeriod",
                        "type": "number",
                        "step": [
                            1,
                            200,
                            1
                        ],
                        "value": 3
                    },
                    {
                        "name": "SimpleMAOscillator",
                        "type": "bool",
                        "value": false
                    },
                    {
                        "name": "SimpleMASignal",
                        "type": "bool",
                        "value": false
                    },
                    {
                        "name": "valType",
                        "type": "array",
                        "list": [
                            "open",
                            "high",
                            "low",
                            "close",
                            "volume"
                        ],
                        "value": [
                            "close"
                        ]
                    }
                ],
                "output": [
                    {
                        "name": "MACD",
                        "report": true,
                        "show": true,
                        "pos": "sub",
                        "type": "line"
                    },
                    {
                        "name": "histogram",
                        "report": true,
                        "show": true,
                        "pos": "sub",
                        "mark": true,
                        "type": "line"
                    },
                    {
                        "name": "signal",
                        "report": true,
                        "show": true,
                        "pos": "sub",
                        "type": "line"
                    },
                    {
                        "name": "signals",
                        "report": false,
                        "show": true,
                        "pos": "sub",
                        "type": "marker"
                    }
                ],
                "buyPoint": {
                    "connect": "base",
                    "source": "histogram",
                    "op": "crossUp",
                    "target": 0
                },
                "sellPoint": {
                    "connect": "base",
                    "source": "histogram",
                    "op": "crossDown",
                    "target": 0
                }
            },
            {
                "name": "RSI",
                "des": "RSI",
                "editable": false,
                "group": "oscillators",
                "input": [
                    {
                        "name": "period",
                        "type": "number",
                        "step": [
                            2,
                            100,
                            1
                        ],
                        "value": 8
                    },
                    {
                        "name": "overBoughtThreshold",
                        "type": "number",
                        "step": [
                            0,
                            100,
                            1
                        ],
                        "value": 75,
                        "show": true,
                        "pos": "bottom",
                        "owner": "RSI",
                        "priceline": true
                    },
                    {
                        "name": "overSoldThreshold",
                        "type": "number",
                        "step": [
                            0,
                            100,
                            1
                        ],
                        "value": 25,
                        "show": true,
                        "pos": "bottom",
                        "owner": "RSI",
                        "priceline": true
                    },
                    {
                        "name": "valType",
                        "type": "array",
                        "list": [
                            "open",
                            "high",
                            "low",
                            "close",
                            "volume"
                        ],
                        "value": [
                            "close"
                        ]
                    }
                ],
                "output": [
                    {
                        "name": "RSI",
                        "report": true,
                        "show": true,
                        "pos": "bottom",
                        "type": "line",
                        "mark": true
                    },
                    {
                        "name": "signals",
                        "report": false,
                        "show": true,
                        "pos": "bottom",
                        "type": "marker"
                    }
                ],
                "buyPoint": {
                    "connect": "none",
                    "source": "RSI",
                    "op": "crossUp",
                    "target": "overSoldThreshold"
                },
                "sellPoint": {
                    "connect": "none",
                    "source": "RSI",
                    "op": "crossDown",
                    "target": "overBoughtThreshold"
                }
            }
        ]
    },
    {
        "id": "CandleStick",
        "name": "CandleStick",
        "des": "CandleStick",
        "editable": false,
        "group": "custom",
        "order": 50,
        "strategies": [
            {
                "name": "CandleStick",
                "group": "candlestick",
                "input": [
                    {
                        "name": "buyPatterns",
                        "type": "array",
                        "list": [
                            "BullishEngulfingPattern",
                            "DownsideTasukiGap",
                            "BullishHarami",
                            "BullishHaramiCross",
                            "MorningDojiStar",
                            "MorningStar",
                            "BullishMarubozu",
                            "PiercingLine",
                            "ThreeWhiteSoldiers",
                            "BullishHammerStick",
                            "BullishInvertedHammerStick",
                            "HammerPattern",
                            "HammerPatternUnconfirmed",
                            "TweezerBottom"
                        ],
                        "value": [
                            "ThreeWhiteSoldiers",
                            "HammerPattern",
                            "TweezerBottom"
                        ]
                    },
                    {
                        "name": "sellPatterns",
                        "type": "array",
                        "list": [
                            "BearishEngulfingPattern",
                            "BearishHarami",
                            "BearishHaramiCross",
                            "EveningDojiStar",
                            "EveningStar",
                            "BearishMarubozu",
                            "ThreeBlackCrows",
                            "BearishHammerStick",
                            "BearishInvertedHammerStick",
                            "HangingMan",
                            "HangingManUnconfirmed",
                            "ShootingStar",
                            "ShootingStarUnconfirmed",
                            "TweezerTop"
                        ],
                        "value": [
                            "ThreeBlackCrows",
                            "HangingMan",
                            "ShootingStar",
                            "TweezerTop"
                        ]
                    },
                    {
                        "name": "valType",
                        "type": "array",
                        "list": [
                            "open",
                            "high",
                            "low",
                            "close",
                            "volume"
                        ],
                        "value": [
                            "close",
                            "high",
                            "low",
                            "open"
                        ]
                    }
                ],
                "output": [
                    {
                        "name": "pattern",
                        "mark": true,
                        "report": true,
                        "show": true,
                        "pos": "sub",
                        "type": "line"
                    },
                    {
                        "name": "patternname",
                        "report": true,
                        "show": false,
                        "pos": "sub",
                        "type": "none"
                    },
                    {
                        "name": "signals",
                        "report": false,
                        "show": true,
                        "pos": "sub",
                        "type": "marker"
                    }
                ],
                "buyPoint": {
                    "connect": "base",
                    "source": "pattern",
                    "op": "equal",
                    "target": -1
                },
                "sellPoint": {
                    "connect": "base",
                    "source": "pattern",
                    "op": "equal",
                    "target": 1
                }
            },
            {
                "name": "RSI",
                "des": "RSI",
                "editable": false,
                "group": "oscillators",
                "input": [
                    {
                        "name": "period",
                        "type": "number",
                        "step": [
                            2,
                            100,
                            1
                        ],
                        "value": 8
                    },
                    {
                        "name": "overBoughtThreshold",
                        "type": "number",
                        "step": [
                            0,
                            100,
                            1
                        ],
                        "value": 75,
                        "show": true,
                        "pos": "bottom",
                        "owner": "RSI",
                        "priceline": true
                    },
                    {
                        "name": "overSoldThreshold",
                        "type": "number",
                        "step": [
                            0,
                            100,
                            1
                        ],
                        "value": 25,
                        "show": true,
                        "pos": "bottom",
                        "owner": "RSI",
                        "priceline": true
                    },
                    {
                        "name": "valType",
                        "type": "array",
                        "list": [
                            "open",
                            "high",
                            "low",
                            "close",
                            "volume"
                        ],
                        "value": [
                            "close"
                        ]
                    }
                ],
                "output": [
                    {
                        "name": "RSI",
                        "report": true,
                        "show": true,
                        "pos": "bottom",
                        "type": "line",
                        "mark": true
                    },
                    {
                        "name": "signals",
                        "report": false,
                        "show": true,
                        "pos": "bottom",
                        "type": "marker"
                    }
                ],
                "buyPoint": {
                    "connect": "none",
                    "source": "RSI",
                    "op": "crossUp",
                    "target": "overSoldThreshold"
                },
                "sellPoint": {
                    "connect": "none",
                    "source": "RSI",
                    "op": "crossDown",
                    "target": "overBoughtThreshold"
                }
            }
        ]
    },
    {
        "id": "CUSTOM",
        "name": "CUSTOM",
        "des": "CUSTOM",
        "editable": false,
        "group": "custom",
        "order": 100,
        "strategies": [
            {
                "name": "PSAR",
                "group": "momentum",
                "input": [
                    {
                        "name": "step",
                        "type": "number",
                        "step": [
                            0.01,
                            1,
                            0.005
                        ],
                        "value": 0.02
                    },
                    {
                        "name": "max",
                        "type": "number",
                        "step": [
                            0.05,
                            1,
                            0.05
                        ],
                        "value": 0.2
                    },
                    {
                        "name": "valType",
                        "type": "array",
                        "list": [
                            "open",
                            "high",
                            "low",
                            "close",
                            "volume"
                        ],
                        "value": [
                            "high",
                            "low"
                        ]
                    }
                ],
                "output": [
                    {
                        "name": "PSAR",
                        "report": true,
                        "show": true,
                        "pos": "main",
                        "type": "line",
                        "dot": true
                    },
                    {
                        "name": "trend",
                        "report": true,
                        "mark": true,
                        "show": true,
                        "pos": "sub",
                        "type": "line"
                    },
                    {
                        "name": "signals",
                        "report": false,
                        "show": true,
                        "pos": "main",
                        "type": "marker"
                    }
                ],
                "buyPoint": {
                    "connect": "base",
                    "source": "PSAR",
                    "op": "crossDown",
                    "target": "close"
                },
                "sellPoint": {
                    "connect": "base",
                    "source": "PSAR",
                    "op": "crossUp",
                    "target": "close"
                }
            },
            {
                "name": "RSI",
                "des": "RSI",
                "editable": false,
                "group": "oscillators",
                "input": [
                    {
                        "name": "period",
                        "type": "number",
                        "step": [
                            2,
                            100,
                            1
                        ],
                        "value": 8
                    },
                    {
                        "name": "overBoughtThreshold",
                        "type": "number",
                        "step": [
                            0,
                            100,
                            1
                        ],
                        "value": 75,
                        "show": true,
                        "pos": "bottom",
                        "owner": "RSI",
                        "priceline": true
                    },
                    {
                        "name": "overSoldThreshold",
                        "type": "number",
                        "step": [
                            0,
                            100,
                            1
                        ],
                        "value": 25,
                        "show": true,
                        "pos": "bottom",
                        "owner": "RSI",
                        "priceline": true
                    },
                    {
                        "name": "valType",
                        "type": "array",
                        "list": [
                            "open",
                            "high",
                            "low",
                            "close",
                            "volume"
                        ],
                        "value": [
                            "close"
                        ]
                    }
                ],
                "output": [
                    {
                        "name": "RSI",
                        "report": true,
                        "show": true,
                        "pos": "bottom",
                        "type": "line",
                        "mark": true
                    },
                    {
                        "name": "signals",
                        "report": false,
                        "show": true,
                        "pos": "bottom",
                        "type": "marker"
                    }
                ],
                "buyPoint": {
                    "connect": "and",
                    "source": "RSI",
                    "op": "crossUp",
                    "target": "overSoldThreshold"
                },
                "sellPoint": {
                    "connect": "and",
                    "source": "RSI",
                    "op": "crossDown",
                    "target": "overBoughtThreshold"
                }
            }
        ]
    }
]
````
