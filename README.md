# Commute bus slack bot ๐ค

- ํต๊ทผ ๋ฒ์ค ์๊ฐ์ ๋ฏธ๋ฆฌ ๊ณ์ฐํ์ฌ ์๋ ค์ฃผ๋ ์ฌ๋ ๋ด

## Tech stack

- node.js
- slack api

## Bus API

### 1. ๊ฒฝ๊ธฐ๋ ๋ฒ์ค๋ธ์  ์กฐํ

1. ๋ธ์ ์ ๋ณดํญ๋ชฉ์กฐํ
2. ๊ฒฝ์ ์ ๋ฅ์๋ชฉ๋ก์กฐํ
3. ๋ธ์ ๋ฒํธ๋ชฉ๋ก์กฐํ
4. ์ดํ์ง์ญ๋ณ๋ธ์ ๋ฒํธ๋ชฉ๋ก์กฐํ
5. ๋ธ์ ํ์์ ๋ณด๋ชฉ๋ก์กฐํ

#### 1. ๋ธ์ ์ ๋ณดํญ๋ชฉ์กฐํ ( routeId: 228000179 )

- http://apis.data.go.kr/6410000/busrouteservice/getBusRouteInfoItem

- Result
- api/stations.json ์ฐธ์กฐ

#### 3. ๋ธ์ ๋ฒํธ๋ชฉ๋ก์กฐํ ( keyword: 101 )

- http://apis.data.go.kr/6410000/busrouteservice/getBusRouteList

- Result
- routeId: 228000179

```xml
<busRouteList>
	<districtCd>2</districtCd>
	<regionName>์์ธ,์ฑ๋จ</regionName>
	<routeId>228000179</routeId>
	<routeName>101</routeName>
	<routeTypeCd>13</routeTypeCd>
	<routeTypeName>์ผ๋ฐํ์๋ด๋ฒ์ค</routeTypeName>
</busRouteList>
```

### 2. ๊ฒฝ๊ธฐ๋ ๋ฒ์ค์์น์ ๋ณด ์กฐํ ( routeId: 228000179 )

- http://apis.data.go.kr/6410000/buslocationservice/getBusLocationList

- Result

```json
{
    plateNo: "๊ฒฝ๊ธฐ70์6123",
    stationId: 206000637 // <-- ?
    stationSeq: 92 // <-- ?
}
```

```xml
<response>
    <comMsgHeader/>
    <msgHeader>
        <queryTime>2021-09-14 21:24:22.695</queryTime>
        <resultCode>0</resultCode>
        <resultMessage>์ ์์ ์ผ๋ก ์ฒ๋ฆฌ๋์์ต๋๋ค.</resultMessage>
    </msgHeader>
    <msgBody>
        <busLocationList>
            <endBus>0</endBus>
            <lowPlate>0</lowPlate>
            <plateNo>๊ฒฝ๊ธฐ70์6123</plateNo>
            <plateType>3</plateType>
            <remainSeatCnt>-1</remainSeatCnt>
            <routeId>228000179</routeId>
            <stationId>206000637</stationId>
            <stationSeq>92</stationSeq>
        </busLocationList>
    </msgBody>
</response>
```

# Slack

## Event Subscriptions
- ์ฌ์ฉ์์ ๋ฉ์์ง๋ฅผ subscriptionํ  ์ ์๋ api
