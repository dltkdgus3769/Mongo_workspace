// MongoDB Capped Collection 사용 개념 및 예제

// 1. 기본 문법 및 개념
// createCollection(name, options)
// : MongoDB에서 새로운 컬렉션을 생성하는 메서드.
// Capped Collection: 저장 공간이 제한된(fixed - size) 컬렉션으로, 오래된 데이터가 자동으로 삭제됨.

//     옵션:
// capped: true → 컬렉션을 Capped Collection으로 설정.
//     size: <bytes> → 컬렉션의 최대 크기를 지정(바이트 단위).

// 2. 예제 코드

// 컬렉션 생성

// db.createCollection("cappedC", {capped: true, size: 10000 });
// cappedC라는 이름의 컬렉션을 생성.

// 최대 10,000바이트 크기의 공간을 유지.

// 데이터 삽입

// db.cappedC.insertOne({x: 1 });

// {x: 1 } 문서를 컬렉션에 삽입.

// 데이터 조회

// db.cappedC.find();

// 현재 컬렉션에 저장된 모든 문서 조회.

// 3. 예제 실행 결과
// json

// {"_id" : ObjectId("602d2149e773f2a3990b47f5"), "x" : 1 }

// _id 필드는 자동 생성되며, 문서 내용 {x: 1 }이 저장됨.

// 4. 실무 활용 사례
// 로그 데이터 저장

// 실시간 시스템에서 최근 N개의 로그만 유지하고 싶을 때.
// 예: 애플리케이션 이벤트 로그, 시스템 모니터링 로그.
// IoT 센서 데이터 관리

// 최신 센서 데이터를 지속적으로 유지하며, 오래된 데이터는 자동 삭제.
// 예: 온도, 습도 센서 데이터.
// 메시지 큐 시스템

// 고정 크기의 메시지 큐를 유지하며, 오래된 메시지는 자동 제거.
// 예: 실시간 알림 메시지 저장.

// 실제 예제 코드
db.createCollection("cappedC", { capped: true, size: 10000 });
db.cappedC.insertOne({ x: 1 });
db.cappedC.find();

for (i = 0; i < 1000; i++) {
    db.cappedC.insertOne({ x: i });
}

db.cappedC.find();
db.cappedC.storageSize();
db.cappedC.stats();

// 일반 컬렉션에 반복문으로 데이터 1000개 추가 해보기, 비교 
for (i = 0; i < 1000; i++) {
    db.testCollection.insertOne({ x: i });
}
db.testCollection.find()


// 2
// 1. 데이터베이스 선택 (use)
// 기본 문법

// use("databaseName");
// 특정 데이터베이스를 선택.
// use는 새로운 데이터베이스를 생성하지 않으며, 컬렉션이 추가될 때 생성됨.
// 예제

// use("testBlog");
// testBlog 데이터베이스를 선택.

// 주의사항, use 사용 안하면, 기본 test 디비 사용함.

// 3
//  컬렉션에 문서 삽입 (insertOne, insertMany)
// 기본 문법

// db.collection.insertOne(document);
// db.collection.insertMany([document1, document2, ...]);
// 단일 문서 또는 여러 문서를 컬렉션에 삽입.

// 예제
db.users.insertOne(
    { name: "Alice", age: 25 }
);
db.users.insertOne(
    { name: "Alice", age: 20 }
);
db.users.insertOne(
    { name: "Alice", age: 18 }
);
db.users.insertMany([{ name: "Bob", age: 30 }, { name: "Charlie", age: 35 }]);

// 출력 결과
// json

// { "acknowledged": true, "insertedId": ObjectId("6578a3b2a3f93c1d3e9f7b22") }
// 실무 활용
// 회원 가입 시 사용자 정보 저장.
// 로그 데이터 저장.

db.emp.insertOne({ eno: 1101, fname: 'JIMMY' });
db.emp.insertOne({ eno: 1102, fname: 'ADAM', lname: 'KROLL' });
db.emp.insertOne({ eno: 1103, fname: 'SMITH', job: 'CLERK' });
db.emp.find()
db.emp.find().sort({ eno: 1 })

db.testCollection.insertOne({ _id: 1, x: 2 })

db.user.insertMany([
    { username: "Kei", password: 4321 },
    { username: "Mijoo", password: 3212 },
    { username: "Yein", password: 3123 },
]);

// 4
// 3. 문서 조회 (find, findOne)
// 기본 문법
// db.collection.find(query,projection);
// 쿼리 -> 조건
// 프로젝션 -> 보고싶은 필드
// db.collection.find(query);
// db.collection.findOne(query);
// find() → 여러 문서를 조회.
// findOne() → 단일 문서를 조회.
// 예제

// db.users.find();
// db.users.findOne({ name: "Alice" });
// 출력 결과
// json

// { "_id": ObjectId("6578a3b2a3f93c1d3e9f7b22"), "name": "Alice", "age": 25 }
// 실무 활용
// 특정 사용자의 프로필 정보 가져오기.
// 데이터 분석을 위한 특정 조건의 데이터 검색.

db.user.find({}, { "_id": false, "username": true, "password": true })
db.user.find({}, { "_id": false, "username": true })



// 5
// 문서 업데이트 (updateOne, updateMany)
// 기본 문법

// db.collection.updateOne(filter, update);
// db.collection.updateMany(filter, update);
// updateOne() → 한 개의 문서만 변경.
// updateMany() → 여러 개의 문서를 변경.
// 예제

db.users.updateOne({ name: "Alice" }, { $set: { age: 26 } });
db.users.updateMany({ age: { $gte: 30 } }, { $set: { isAdult: true } });
// 출력 결과
// json

// { "acknowledged": true, "matchedCount": 1, "modifiedCount": 1 }
// 실무 활용
// 사용자 정보 변경(예: 닉네임 변경).
// 특정 그룹의 사용자 정보 일괄 업데이트.



// 6
// 문서 삭제(deleteOne, deleteMany)
// 기본 문법

// db.collection.deleteOne(filter);
// db.collection.deleteMany(filter);
// deleteOne() → 조건과 일치하는 첫 번째 문서 삭제.
//     deleteMany() → 조건과 일치하는 모든 문서 삭제.
//         예제

db.users.deleteOne({ name: "Alice" });
db.users.deleteMany({ age: { $lt: 23 } });
// 출력 결과
// json


// { "acknowledged": true, "deletedCount": 1 }
// 실무 활용
// 특정 사용자 계정 삭제.
// 일정 기간이 지난 로그 데이터 삭제.


// 7
// 정렬 및 제한(sort, limit)
// 기본 문법

// db.collection.find().sort({ field: 1 });  // 오름차순
// db.collection.find().sort({ field: -1 }); // 내림차순
// db.collection.find().limit(n);
// 예제

db.users.find().sort({ age: -1 }).limit(5);
// 출력 결과
// 나이가 많은 사용자 5명을 조회.
// 실무 활용
// 최신 등록된 회원 목록 출력.
// 게시글 목록을 최신순으로 정렬.

// 8
// 필드 선택(Projection)
// 기본 문법

// db.collection.find(query, { field1: 1, field2: 1 });
// 예제

db.users.find({}, { name: 1, _id: 0 });
// 출력 결과
// json

// { "name": "Alice" }
// 실무 활용
// 특정 필드만 가져와서 API 응답 최적화.


// 11
// 존재 여부 확인 (countDocuments)
// 기본 문법

// db.collection.countDocuments(query);
// 예제

db.users.countDocuments({ age: { $gte: 30 } });
// 출력 결과
// json
// 10
// 실무 활용
// 특정 조건을 만족하는 문서 개수 파악.

// 12
// 필드 존재 여부 확인 ($exists)
// 기본 문법

// db.collection.find({ fieldName: { $exists: true } });
// 특정 필드가 존재하는 문서를 조회.
// 예제

db.users.find({ isAdult: { $exists: true } });
// 출력 결과
// json

// { "_id": ObjectId("6578a3b2a3f93c1d3e9f7b22"), "name": "Alice", "age": 25 }
// 실무 활용
// 특정 필드가 있는 데이터만 조회할 때 사용(예: 이메일이 등록된 사용자 찾기).


// 13
//  특정 값 포함 여부 ($in, $nin)
// 기본 문법

// db.collection.find({ fieldName: { $in: [value1, value2] } });
// db.collection.find({ fieldName: { $nin: [value1, value2] } });
// 예제

db.users.find({ age: { $in: [25, 30, 35] } });
// 실무 활용
// 특정 연령대의 사용자만 필터링.

// 14
// 범위 조건 검색 ($gte, $lte)
// 기본 문법

// db.collection.find({ field: { $gte: value } });
// db.collection.find({ field: { $lte: value } });
// 예제

db.users.find({ age: { $gte: 18, $lte: 30 } });
// 실무 활용
// 특정 연령대, 가격 범위 등의 데이터 검색.


// 15
// 복합 조건 검색 ($or, $and)
// 기본 문법

// db.collection.find({ $or: [condition1, condition2] });
// db.collection.find({ $and: [condition1, condition2] });
// 예제

db.users.find({ $and: [{ age: 25 }, { name: "Alice" }] });
// 실무 활용
// 여러 개의 필터링 조건을 적용할 때.


// 16
// 배열에 값 추가($push)
// 기본 문법

// db.collection.updateOne({ filter }, { $push: { arrayField: value } });
// 예제

db.users.updateOne({ name: "Alice" }, { $push: { hobbies: "swimming" } });
// 실무 활용
// 사용자 관심사 업데이트.


// 17
// 배열에서 값 제거($pull)
// 기본 문법

// db.collection.updateOne({ filter }, { $pull: { arrayField: value } });
// 예제

db.users.updateOne({ name: "Alice" }, { $pull: { hobbies: "swimming" } });
// 실무 활용
// 사용자 관심사 제거.


// 18
// 필드 삭제($unset)
// 기본 문법

// db.collection.updateOne({ filter }, { $unset: { field: "" } });
// 예제

db.users.updateOne({ name: "Alice" }, { $unset: { age: "" } });
// 실무 활용
// 사용되지 않는 데이터 필드 삭제.

// 19
// 필드 이름 변경($rename)
// 기본 문법

// db.collection.updateMany({}, { $rename: { "oldField": "newField" } });
// 예제

db.users.updateMany({}, { $rename: { "name": "fullName" } });
// 실무 활용
// 데이터 구조 변경 시 필드명을 일괄 수정.


// 20
// 컬렉션 삭제 (drop)
// 기본 문법

// db.collection.drop();
// 예제

db.users.drop();
// 실무 활용
// 필요 없는 컬렉션 삭제.


// 21
// 데이터베이스 삭제 (dropDatabase)
// 기본 문법

// db.dropDatabase();
// 예제

// use("testDB");
db.dropDatabase();
// 실무 활용
// 개발 환경에서 테스트 데이터베이스 삭제.