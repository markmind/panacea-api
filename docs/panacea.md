# About Panacea

Panacea expands the functions of your trading bot through a simple method, allowing you to control and observe your bot at any time and any place through desktop or mobile devices, through the status, operation, config, strategy, etc.  you can find out the ideal trading method more quickly and reasonably, greatly reducing the risk of quantitative trading and improving the profitability of trading.

## Screenshot

### Desktop

includes Windows,Osx and Linux client

![Desktop](/images/desktop.jpg)

### Mobile

includes Android and Ios client

![Mobile](/images/screenshot_mobile.jpg)

Before you can adapt your trading bot to Panacea, there are a few things you need to know about how we work.

## Page Architecture

Depending on what you implement the API, Panacea will display different page content

> Status and Operation API is the core function of panacea that must be implemented
> If you do not implement the configuration function, the panacea configuration  module will not be enabled

- bot
  - Bot management
  - Config management
  - Strategy management
  - Watch list
  - Trading pair
  - Trading history
- market
  - Trading pair list
  - Trading pair
  - Hot products

## API support

- Bot status `Required`
- Bot operation `Required`
- Bot config `Optional`
- Bot strategy `Optional`
- Bot Exchange Market `Optional`
