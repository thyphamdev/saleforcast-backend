## Introduction

The backend is implemented using NestJS. It contains 3 endpoints:

1. Sales forecast endpoint: to get the sale forecast for all locations.
2. Wheather forecast endpoint: to get the forecasted temperature of each location.
3. Get alerts: to get the suggested closed dates of each location.

```
GET localhost:3001/salesforecast?fromDate=2023-04-02&toDate=2023-04-16
Response
{
    "Hamburg": [
        {
            "id": 71,
            "location": "Hamburg",
            "forecastedSalesQty": 583,
            "date": "2023-04-03"
        },
        {
            "id": 70,
            "location": "Hamburg",
            "forecastedSalesQty": 2,
            "date": "2023-04-02"
        },
        {
            "id": 69,
            "location": "Hamburg",
            "forecastedSalesQty": 151,
            "date": "2023-04-01"
        }
    ],
    "Munich": [
        {
            "id": 170,
            "location": "Munich",
            "forecastedSalesQty": 360,
            "date": "2023-04-03"
        },
        {
            "id": 169,
            "location": "Munich",
            "forecastedSalesQty": 487,
            "date": "2023-04-02"
        },
        {
            "id": 168,
            "location": "Munich",
            "forecastedSalesQty": 446,
            "date": "2023-04-01"
        }
    ]
}
```

```
GET http://localhost:3001/wheatherforecast?fromDate=2023-04-01&toDate=2023-04-03&city=Hamburg

Response
[
    {
        "date": "2023-04-01",
        "temperature": 6.9
    },
    {
        "date": "2023-04-02",
        "temperature": 4
    },
    {
        "date": "2023-04-03",
        "temperature": 3
    }
]
```

```
GET http://localhost:3001/alerts?fromDate=2023-04-01&toDate=2023-04-07

Response
{
    "Hamburg": [ // This array is the suggested closed dates
        "2023-04-01",
        "2023-04-02",
        "2023-04-03",
        "2023-04-05"
    ],
    "Munich": [ // This array is the suggested closed dates
        "2023-04-01",
        "2023-04-02",
        "2023-04-03",
        "2023-04-05"
    ]
}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ POSTGRES_PASSWORD="postgres Password" WHEATHER_SERVICE_API_KEY="api key of the wheater api" npm run start
```

The app will run at port 3001.
