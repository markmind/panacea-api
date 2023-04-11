# Developer

Panacea provides a easy way to manage your real-time trading bot status. You can adapt to your own bots by developing extensions. Your are welcome  to add extensions based on Freqtrade, Zenbot, and others

## Development process

1. Understand the Panacea API and decide which APIs you need to adapt to

2. Add an extension based on Panacea to your bot code

3. Download the Panacea application [Download Panacea]（ <https://www.ciiat.com/en/download> ）and add your trading bot for testing

4. You can also directly use the [Web version of Panacea]（ <https://www.ciiat.com/app/www> ）Directly  add your trading bot for testing

5. Download the Panacea API code and place your relevant code in the 'extensions' directory

```bash
    git clone https://github.com/markmind/panacea-api.git
```

6. Submit a PR and we will merge as soon as possible

## Precautions

- When adding code, it is necessary to add the README.md file in the root directory to help users understand the details of using the extension
- All extensions need to follow 'MIT' license
- You can download and run [XCoin](https://github.com/rianfu/xcoin) to learn how to use api.
