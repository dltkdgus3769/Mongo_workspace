// ✅ 1. users 컬렉션에서 age 필드에 단일 인덱스 생성
db.users.createIndex({ age: 1 })


// ✅ 2. users 컬렉션에서 기존에 존재하는 모든 인덱스 조회
db.users.getIndexes()


// ✅ 3. users 컬렉션에서 city 필드의 단일 인덱스를 삭제
db.users.dropIndex("city")
db.users.dropIndex("age_1")


// ✅ 4. users 컬렉션에서 age와 city 필드에 대한 복합 인덱스 생성
db.users.createIndex({ age: 1, city: 1 })


// ✅ 5. users 컬렉션에서 email 필드를 기준으로 유니크 인덱스 생성
db.users.createIndex({ email: 1 }, { unique: true })


// ✅ 6. users 컬렉션에서 status 필드의 스파스 인덱스 생성
db.users.createIndex({ status: 1 }, { sparse: true })


// ✅ 7. users 컬렉션에서 age 필드에 대해 30세 이상만 포함하는 부분 인덱스 생성
db.users.createIndex({ age: 1 }, { partialFilterExpression: { age: { $gte: 30 } } })


// ✅ 8. transactions 컬렉션에서 date 필드에 대한 백그라운드 인덱스 생성
db.transactions.createIndex({ data: 1 }, { background: true })


// ✅ 9. products 컬렉션에서 name과 category 필드를 포함하는 커버드 인덱스 생성
db.droducts.createIndex({ name: 1, category: 1 })


// ✅ 10. locations 컬렉션에서 coordinates 필드에 대한 지리 공간 인덱스 생성
db.locations.createIndex({ coordinates: "2dsphere" })


// ✅ 11. 특정 좌표(서울)에서 반경 10km 내 위치 검색 ($center)
db.locations.find({
    coordinates: { $geoWithin: { $center: [[126.9784, 37.5665], 10] } }
})


// ✅ 12. 특정 지역의 사각형 범위 내 검색 ($box)
db.locations.find({
    coordinates: { $geoWithin: { $box: [[126.9, 37.5], [127.1, 37.7]] } }
})

// ✅ 13. 다각형 영역 내 검색 ($polygon)
db.locations.find({
    coordinates: { $geoWithin: { $polygon: [[126.9, 37.5], [127.0, 37.6], [127.1, 37.5]] } }
})

// ✅ 14. businesses 컬렉션에서 다중 위치 지점 데이터 저장 및 인덱스 생성
db.businesses.insertMany([
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
db.businesses.createIndex({ coordinates: "2dsphere" })

// ✅ 15. 현재 위치에서 가장 가까운 장소 찾기 ($nearSphere)
db.businesses.find({
    coordinates: {
        $nearSphere: {
            $geometry: {
                type: "Point",
                coordinates: [129.05946377212712, 35.155956438938105]
            }
        }
    }
}).limit(1)

// ✅ 16. places 컬렉션에서 GeoON 형식의 포인트 데이터 저장 및 인덱스 생성
db.places.insertOne({
    name: "Example Place",
    coordinates: {
        type: "Point",
        coordinates: [127.123456, 37.123456] // [경도, 위도]
    }
});
db.places.createIndex({ coordinates: "2dsphere" });


// ✅ 17. 특정 카테고리(Technology)를 구독한 사용자 찾기
db.users.find({ subscribe: "Technology" })


// ✅ 18. 특정 사용자가 특정 제품을 구매했는지 확인
db.users.find({ "order.product": "Laptop" })


// ✅ 19. 최근에 가입한 사용자 찾기
db.users.find().sort({ JoinedAt: -1 }).limit(1)


// ✅ 20. 이메일 도메인별 사용자 수 계산
db.users.aggregate([
    {
        $group: {
            _id: { $arrayElemAt: [{ $split: ["$email", "@"] }, 1] },
            count: { $sum: 1 }
        }
    }
])