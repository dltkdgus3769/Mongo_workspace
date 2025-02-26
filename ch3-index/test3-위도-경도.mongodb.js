// 8_GeoSpatial Index(지리 정보 인덱스)
// 📌 정의
// 위도 / 경도 좌표 데이터를 빠르게 검색하는 인덱스
// 위치 기반 검색이 필요한 경우 사용됨.

db.locations.insertMany([
    { name: "Seoul Tower", coordinates: [126.9784, 37.5665] },
    { name: "Haeundae Beach", coordinates: [129.1611, 35.1587] },
    { name: "Namsan Park", coordinates: [126.9921, 37.5512] },
    { name: "Gyeongbokgung Palace", coordinates: [126.9769, 37.5796] },
    { name: "Lotte World", coordinates: [127.0996, 37.5112] },
    { name: "Jeju Island", coordinates: [126.5312, 33.4996] },
    { name: "Busan Tower", coordinates: [129.0327, 35.1019] },
    { name: "Incheon Airport", coordinates: [126.4512, 37.4602] },
    { name: "Daegu Tower", coordinates: [128.5986, 35.8714] },
    { name: "Gwangalli Beach", coordinates: [129.1202, 35.1554] },
    { name: "Daejeon Expo Park", coordinates: [127.3845, 36.3745] },
    { name: "Ulsan Grand Park", coordinates: [129.3151, 35.5438] },
    { name: "Gimhae International Airport", coordinates: [128.9532, 35.1796] },
    { name: "Seoraksan National Park", coordinates: [128.4657, 38.1195] },
    { name: "Suwon Hwaseong Fortress", coordinates: [127.0093, 37.2851] }
])


// 지리 공간 인덱스 생성
db.locations.createIndex({ coordinates: "2dsphere" })



db.locations.createIndex({ coordinates: "2dsphere" })
// ✅ coordinates 필드에 지리 공간 인덱스 생성.

// ✅ 1. $center(원형 검색)

db.locations.find({
    coordinates: { $geoWithin: { $center: [[126.9784, 37.5665], 10] } }
})

// $center

// 2D 인덱스에서 원형 검색을 수행하는 연산자
// 구문: [[경도, 위도], 반경]
// [[126.9784, 37.5665], 10] →
// 중심 좌표: 경도: 126.9784, 위도: 37.5665
// 반경: 10(단위: degree, 도)

// ✅ 서울 좌표[126.9784, 37.5665]에서 반경 10km 내 검색.

// ✅ 2. $box(사각형 검색)

db.locations.find({
    coordinates: { $geoWithin: { $box: [[126.9, 37.5], [127.1, 37.7]] } }
})

// ✅ 특정 좌표 범위 내 검색.

// ✅ 3. $polygon(다각형 검색)

db.locations.find({
    coordinates: { $geoWithin: { $polygon: [[126.9, 37.5], [127.0, 37.6], [127.1, 37.5]] } }
})


db.locations.find({
    coordinates: {
        $geoIntersects: {
            $geometry: {
                type: "Polygon",
                coordinates: [[
                    [126.9, 37.5],
                    [127.0, 37.6],
                    [127.1, 37.5],
                    [126.9, 37.5]  // 시작점과 끝점이 같아야 함
                ]]
            }
        }
    }
})

// ✅ 특정 다각형 영역 내 검색.

// ✅ 4. $nearSphere(구형 거리 검색)

db.locations.find({
    coordinates: {
        $nearSphere: {
            $geometry: { type: "Point", coordinates: [126.9784, 37.5665] },
            $maxDistance: 10000  // 10km (단위: 미터)
        }
    }
})
// ✅ 반경 10km 내에 있는 위치 검색.



db.businesses.insertMany([
    { name: "Cafe A", branches: [{ type: "Point", coordinates: [126.9784, 37.5665] }] },
    { name: "Cafe B", branches: [{ type: "Point", coordinates: [129.1611, 35.1587] }] },
    { name: "Cafe C", branches: [{ type: "Point", coordinates: [127.0276, 37.4979] }] },
    { name: "Restaurant D", branches: [{ type: "Point", coordinates: [126.9335, 37.5560] }] },
    { name: "Bar E", branches: [{ type: "Point", coordinates: [127.0396, 37.5013] }] },
    { name: "Bookstore F", branches: [{ type: "Point", coordinates: [126.9781, 37.5700] }] },
    { name: "Gym G", branches: [{ type: "Point", coordinates: [127.0245, 37.5825] }] },
    { name: "Hotel H", branches: [{ type: "Point", coordinates: [129.0653, 35.1798] }] },
    { name: "Cinema I", branches: [{ type: "Point", coordinates: [127.1150, 37.5133] }] },
    { name: "Supermarket J", branches: [{ type: "Point", coordinates: [126.8955, 37.5552] }] }
])

// 지리 공간 인덱스 생성
db.businesses.createIndex({ "branches.coordinates": "2dsphere" })

// 1_1_$nearSphere(구형 거리 검색)



db.locations.find({
    coordinates: {
        $nearSphere: {
            $geometry: { type: "Point", coordinates: [126.9784, 37.5665] },
            $maxDistance: 5000
        }
    }
})
// ✅ 반경 5km 내의 장소 검색.

// 1_2_GeoMetry 인덱스(places 컬렉션)



db.places.insertMany([
    { name: "Park", location: { type: "Point", coordinates: [126.9784, 37.5665] } },
    { name: "Mall", location: { type: "Point", coordinates: [129.1611, 35.1587] } }
])

// 지리 정보 인덱스 생성
db.places.createIndex({ location: "2dsphere" })