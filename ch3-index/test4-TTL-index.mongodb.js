// TTL 인덱스(Time - To - Live Index)
// 📌 개념
// 특정 시간이 지나면 자동 삭제되는 데이터
// 📌 문법
db.logs.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 })
// ✅ 실무 활용 사례
// 로그 데이터 일정 기간 후 자동 삭제

// ✅ TTL 인덱스(Time - To - Live Index) - 구체적인 예제 코드
// 📌 TTL 인덱스 개념
// TTL(Time - To - Live) 인덱스는 특정 시간이 지나면 자동으로 문서를 삭제하는 기능을 제공합니다.
// MongoDB에서 expireAfterSeconds 옵션을 사용하여 TTL 인덱스를 적용할 수 있습니다.

// ✅ 1. TTL 인덱스를 적용한 로그 데이터 예제
// 🔹 1️⃣ 컬렉션에 로그 데이터 추가

db.logs.insertMany([
    { message: "User logged in", createdAt: new Date() },
    { message: "User signed out", createdAt: new Date() },
    { message: "Password changed", createdAt: new Date() }
]);
// ✅ 각 로그 문서는 createdAt 필드를 포함하며 현재 시간(new Date())을 저장
// ✅ TTL 인덱스를 설정하면 일정 시간이 지나면 자동으로 삭제됨

// 🔹 2️⃣ TTL 인덱스 생성



db.logs.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });
// ✅ createdAt 필드를 기준으로 1시간(3600초) 후 자동 삭제됨
// ✅ MongoDB가 백그라운드에서 주기적으로 검사하여 만료된 문서를 삭제

// ✅ 2. 실무 활용 사례
// 🔹 (1) 하루(24시간) 후 자동 삭제되는 임시 데이터



db.tempData.createIndex({ createdAt: 1 }, { expireAfterSeconds: 86400 }); // 24시간 = 86400초
// ✅ 임시 데이터(세션, 캐시 등)를 하루(24시간) 후 자동 삭제

// 🔹 (2) 7일 후 자동 삭제되는 사용자 활동 로그



db.activityLogs.createIndex({ createdAt: 1 }, { expireAfterSeconds: 604800 }); // 7일 = 604800초
// ✅ 7일 후 자동 삭제되는 사용자 활동 기록 저장소

// 🔹 (3) 특정 API 요청 로그를 30일 후 자동 삭제



db.apiRequests.createIndex({ requestTime: 1 }, { expireAfterSeconds: 2592000 }); // 30일 = 2592000초
// ✅ API 로그를 한 달(30일) 후 자동 삭제하여 저장 공간 절약

// ✅ 3. TTL 인덱스 주의사항
// TTL 인덱스는 Date 타입 필드에만 적용 가능

// createdAt 필드는 반드시 new Date() 형식이어야 함.
//     문자열("2024-02-25T12:00:00") 형식은 TTL 인덱스로 작동하지 않음.
// 배치 작업이 아니라 MongoDB가 주기적으로 삭제

// 정확히 expireAfterSeconds 초 후에 즉시 삭제되지 않을 수도 있음.
// TTL 인덱스는 부분 필터링 불가능

// 특정 문서만 선택적으로 삭제하는 기능은 제공하지 않음.
// 🏆 결론
// TTL 인덱스를 활용하면 데이터 정리 자동화 가능
// 로그, 임시 데이터, API 요청 로그 등에 효과적
// MongoDB가 자동으로 삭제하여 별도의 스케줄러 필요 없음