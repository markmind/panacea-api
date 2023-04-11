# 策略API

策略API为客户端的策略模块提供必要数据，通过策略模块，您在服务器的所有策略均可通过客户端进行实时更新。目前包括以下API

- init 获得策略列表与策略值
- updateConfig 更新策略

## 必需实现

> **可选**
> 您需要先启用配置模块.
> 如果不实现此API，客户端将不会有策略模块.
> 如果未实现此API，在状态API请将机器人状态的`init`中请将`hasStrategy`设置为`false`

## 更新流程

- 在`init`事件中传递策略列表
- 通过策略设置在客户端生成相关联的UI界面
- 通过UI界面修改策略并通过`updateConfig`更新服务器端值

## API列表

### - init

当使用策略模块时，策略列表与策略参数将通过`init`传递至客户端

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
    "options": { 
        "strategy": Object,//当前策略会通过配置值传递至客户端
        ...
    },
    "strategies": [//策略列表
        {
        "id": "BollingerBands",// 策略ID
        "name": "BollingerBands",//策略名称
        "des": "BollingerBands",//策略描述
        "editable": false,//可编辑
        "group": "custom",//策略分组
        "order": 20,//策略权重
        "strategies": [//子策略，本示例使用布林带与RSI组合来判断买卖点
            {
                "name": "BollingerBands",//布林带
                "group": "volatility",//分组
                "input": [//输入
                    {
                        "name": "period",//布林带周期
                        "type": "number",//数值类型
                        "step": [//最大最小与步长
                            2,
                            100,
                            1
                        ],
                        "value": 14//默认值
                    },
                    {
                        "name": "stdDev",//布林带偏移
                        "type": "number",
                        "step": [
                            -1,
                            30,
                            1
                        ],
                        "value": 2
                    },
                    {
                        "name": "valType",//输入数据
                        "type": "array",//数组类型，可多选
                        "list": [
                            "open",
                            "high",
                            "low",
                            "close",
                            "volume"
                        ],
                        "value": [
                            "close"//默认使用收盘价
                        ]
                    }
                ],
                "output": [//输出
                    {
                        "name": "upper",//上轨
                        "report": true,//在服务端report中显示
                        "show": true,//在客户端显示
                        "pos": "main",//显示在主图上
                        "type": "line"//显示类型为线图
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
                        "mark": true,//买卖点将显示在本图
                        "show": true,
                        "pos": "sub",//显示在副图上
                        "type": "line"
                    },
                    {
                        "name": "signals",//买卖点信息
                        "report": false,
                        "show": true,
                        "pos": "sub",
                        "type": "marker"//显示为标识
                    }
                ],
                "buyPoint": {//买点 
                    "connect": "base",//多个子策略时，本策略为基础策略
                    "source": "close",//收盘价
                    "op": "crossUp",//上穿
                    "target": "lower"//下轨
                },
                "sellPoint": {//卖点
                    "connect": "base",//多个子策略时，本策略为基础策略
                    "source": "close",//收盘价
                    "op": "crossDown",//下穿
                    "target": "upper"//上轨
                }
            },
            {
                "name": "RSI",//另一个子策略名称
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
                        "name": "overBoughtThreshold",//超买点
                        "type": "number",
                        "step": [
                            0,
                            100,
                            1
                        ],
                        "value": 75,
                        "show": true,
                        "pos": "bottom",
                        "owner": "RSI",//显示图为RSI
                        "priceline": true //显示类型为价格线
                    },
                    {
                        "name": "overSoldThreshold",//超卖点
                        "type": "number",
                        "step": [
                            0,
                            100,
                            1
                        ],
                        "value": 25,
                        "show": true,
                        "pos": "bottom",
                        "owner": "RSI",//显示图为RSI
                        "priceline": true//显示类型为价格线
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
                        "pos": "bottom",//显示在底图中
                        "type": "line",
                        "mark": true
                    },
                    {
                        "name": "signals",
                        "report": false,
                        "show": true,
                        "pos": "bottom",//显示在底图中
                        "type": "marker"
                    }
                ],
                "buyPoint": {
                    "connect": "and",//买点之间为和关系 'none','and','or',
                    "source": "RSI",//RSI
                    "op": "crossUp",//上穿
                    "target": "overSoldThreshold"//超卖点
                },
                "sellPoint": {
                    "connect": "or",//卖点之间为或关系 'none'为不启用,'and','or',
                    "source": "RSI",//RSI
                    "op": "crossDown",//下穿
                    "target": "overBoughtThreshold"//超买点
                }
            }
        ]
    },
    ...
    ]
 }
```

### - updateConfig

更新机器人策略参数

#### 请求参数

```javascript
{
    "action": "updateConfig",
    "restart": true, //本次更新需要重启机器人
    "data": {
        "strategy": Object, //更新策略
    },
    "apiKey": "YOUR API KEY"
}
```

#### 返回结果

```json
{
    "action": "updateConfig",
    "data":Object, //返回全部配置参数 方便更
    "toast": "trade.updateConfigOk"
}
```

> 一些示例的策略文件

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
