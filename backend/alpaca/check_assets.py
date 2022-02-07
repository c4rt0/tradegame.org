import alpaca_trade_api as tradeapi
import os
import json
from dotenv import load_dotenv
load_dotenv()

# authentication and connection details
api_key = os.getenv('ALPACA_API_KEY')
api_secret = os.getenv('ALPACA_SECRET_KEY')
base_url = os.getenv('ALPACA_ENDPOINT')

# instantiate REST API
api = tradeapi.REST(api_key, api_secret, base_url, api_version='v2')

active_assets = api.list_assets(status='active')

output = []

for x in active_assets:
    # In case you want to see all of the fields of the x object run :
    print(x)
    data = {"symbol": x.symbol, "name": x.name, "exchange": x.exchange}
    output.append(data)

with open('alpaca_active_assets.json', 'w') as json_file:
    json.dump(output, json_file, indent=4)
    print('File saved.')