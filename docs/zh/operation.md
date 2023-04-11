# 操作API

操作API为客户端的机器人模块提供与服务器的交互，根据功能的不同可分为几个类型

- 对监控池的交易对的操作
  - 添加新交易对
  - 删除交易对
  - 清空交易池
- 特定交易对的交易
  - 买
  - 卖
  - 清仓

## 必需实现

> **必选**

## API列表

### -  addSymbol

将新的交易对添加至交易池

#### 请求参数

```javascript
{
    "action": "addSymbol",
    "symbols": [
        "mexc.ACM-USDT" //添加的交易对数组
    ],
    "data": {},
    "apiKYOUR API KEYJYOyKq"
}
```

#### 返回结果

```javascript
{
    "action": "addSymbol",
    "toast": "trade.addSymbolOk",//成功后消息提醒信息
    "data": {
        "success": true
    }
}
```

### - removeSymbol

将指定交晚对从监控池移除,

#### 请求参数

```javascript
{
    "action": "removeSymbol",
    "symbol": "mexc.ETH-USDT", //清除交易对名称
    "apiKey": "YOUR API KEY"
}
```

#### 返回结果

```javascript
{
    "action": "removeSymbol",
    "toast": "trade.removeSymbolOk",
    "data": {
        "success": true
    }
}
```

### - removeAllSymbol

清空交易池中的交易对

#### 请求参数

```javascript
{
    "action": "removeAllSymbol",
    "apiKey": "YOUR API KEY"
}
```

#### 返回结果

```javascript
{
    "action": "removeAllSymbol",
    "toast": "trade.removeAllSymbolOk"
}
```

### buy

购买指定交易对

#### 请求参数

```javascript
{
    "action": "buy",
    "symbol": "BTC-USDT",
    "data": {
        "position_side": "LONG", //LONG 买多 OR SHORT 买空
        "size":20//买入数量
    },
    "apiKey": "YOUR API KEY"
}
```

#### 返回结果

```javascript
{
    "action": "buy",
    "toast": "trade.buyOk" //返回消息提醒
}
```

### -Sell

卖出指定交易对

#### 请求参数

```javascript
{
    "action": "sell",
    "symbol": "BTC-USDT",
    "data": {
        "position_side": "LONG", //LONG 卖多 OR SHORT 卖空
        "size":20//卖出数量
    },
    "apiKey": "YOUR API KEY"
}
```

#### 返回结果

```javascript
{
    "action": "sell",
    "toast": "trade.sellOk" //返回消息提醒
}
```

### - sellAll

卖出所有交易对

#### 请求参数

```javascript
{
 "action": "sellAll",
 "apiKey": "YOUR API KEY"
}
```

#### 返回结果

```javascript
{
    "action": "sellAll",
    "toast": "trade.sellAllOk" //返回消息提醒
}
```
