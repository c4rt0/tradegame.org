## Running Alpaca Scripts in

This quick readme explains how I run scripts within this folder.

1. Install 'alpaca_requirements.txt' with :

```bash
pip3 install -r alpaca_requirements.txt
```

2. Run script save_alpaca_stock_data.py with

```bash
python save_alpaca_stock_data.py
```

This will create the alpaca_tsla.json file which you can read with :

```bash
python readDataFromJson.py
```

3. If you want to check what stock data is available, run:

```bash
python check_assets.py
```

Above will produce alpaca_active_assets.json file with all available tickers to trade.
