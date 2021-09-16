# Commute bus slack bot

- 통근 버스 시간을 미리 계산하여 알려주는 슬랙 봇

## Tech stack

- node.js
- slack api

## Bus API

### 1. 경기도 버스노선 조회

1. 노선정보항목조회
2. 경유정류소목록조회
3. 노선번호목록조회
4. 운행지역별노선번호목록조회
5. 노선형상정보목록조회

#### 1. 노선정보항목조회 ( routeId: 228000179 )

- http://apis.data.go.kr/6410000/busrouteservice/getBusRouteInfoItem

- Result
- api/stations.json 참조

#### 3. 노선번호목록조회 ( keyword: 101 )

- http://apis.data.go.kr/6410000/busrouteservice/getBusRouteList

- Result
- routeId: 228000179

```xml
<busRouteList>
	<districtCd>2</districtCd>
	<regionName>서울,성남</regionName>
	<routeId>228000179</routeId>
	<routeName>101</routeName>
	<routeTypeCd>13</routeTypeCd>
	<routeTypeName>일반형시내버스</routeTypeName>
</busRouteList>
```

### 2. 경기도 버스위치정보 조회 ( routeId: 228000179 )

- http://apis.data.go.kr/6410000/buslocationservice/getBusLocationList

- Result

```json
{
    plateNo: "경기70아6123",
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
        <resultMessage>정상적으로 처리되었습니다.</resultMessage>
    </msgHeader>
    <msgBody>
        <busLocationList>
            <endBus>0</endBus>
            <lowPlate>0</lowPlate>
            <plateNo>경기70아6123</plateNo>
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
- 사용자의 메시지를 subscription할 수 있는 api
