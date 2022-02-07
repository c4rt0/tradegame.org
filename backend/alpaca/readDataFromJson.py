import json
from datetime import datetime

# read file
dataFile = open('alpaca_tsla.json', 'r')
dataSet = dataFile.read()

# Parse the data
dataObject = json.loads(dataSet)
stockData = dataObject['TSLA']

# stockData is of type list...
# print(type(stockData))

# # Extracting individual elements: # #

# Printing extracted data
for i in range(len(stockData)):
    t = datetime.fromtimestamp(stockData[i]["t"])
    o = stockData[i]["o"]
    c = stockData[i]["c"]
    h = stockData[i]["h"]
    l = stockData[i]["l"]
    v = stockData[i]["v"]
    day = t.strftime('%Y-%m-%d')
    print(i, "\n_________________ \nTime :", day)
    print(f'Open :{o:>15}')
    print(f'Close : {c:>13}')
    print(f'High : {h:>15}')
    print(f'Low : {l:>15}')
    print(f'Volume : {v:>15}')
