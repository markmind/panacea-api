# Operation API

Operation API provide interaction with the server, which can be divided into several types according to different functions

- Watch symbols
  - addSymbol
  - removeSymbol
  - removeAllSymbol
- Trade for symbol
  - buy
  - sell
  - sellAll

## Implementation

> **Must**

## API List

### -  addSymbol

Add new symbol to watch symbols

#### Request

```javascript
{
    "action": "addSymbol",
    "symbols": [
        "mexc.ACM-USDT" //add symbol name
    ],
    "data": {},
    "apiKYOUR API KEYJYOyKq"
}
```

#### Response

```javascript
{
    "action": "addSymbol",
    "toast": "trade.addSymbolOk",//toast to show
    "data": {
        "success": true
    }
}
```

### - removeSymbol

Remove symbols for watch symbols,

#### Request

```javascript
{
    "action": "removeSymbol",
    "symbol": "mexc.ETH-USDT", //remove symbol name
    "apiKey": "YOUR API KEY"
}
```

#### Response

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

Remove all symbols from watch symbols

#### Request

```javascript
{
    "action": "removeAllSymbol",
    "apiKey": "YOUR API KEY"
}
```

#### Response

```javascript
{
    "action": "removeAllSymbol",
    "toast": "trade.removeAllSymbolOk"
}
```

### buy

buy symbol

#### Request

```javascript
{
    "action": "buy",
    "symbol": "BTC-USDT",
    "data": {
        "position_side": "LONG", //LONG buy OR SHORT buy
        "size":20//buy size
    },
    "apiKey": "YOUR API KEY"
}
```

#### Response

```javascript
{
    "action": "buy",
    "toast": "trade.buyOk" //toast to show
}
```

### -Sell

sell symbol

#### Request

```javascript
{
    "action": "sell",
    "symbol": "BTC-USDT",
    "data": {
        "position_side": "LONG", //LONG sell OR SHORT sell
        "size":20// sell size
    },
    "apiKey": "YOUR API KEY"
}
```

#### Response

```javascript
{
    "action": "sell",
    "toast": "trade.sellOk" //toast to show
}
```

### - sellAll

sell all symbols

#### Request

```javascript
{
 "action": "sellAll",
 "apiKey": "YOUR API KEY"
}
```

#### Response

```javascript
{
    "action": "sellAll",
    "toast": "trade.sellAllOk" //toast to show
}
```
