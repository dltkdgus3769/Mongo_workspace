use('testDB')  // 기본 데이터베이스, test 그냥 사용, 
// 생략시, test 기본 디비 사용함

// 테이블 생성
db.testCollection.insertOne({
    name: '이상현',
    age: 31,
    favoriteFood: ['국밥', '국수', '돈가스', '고기'],
})

db.testCollection.find()

db.testCollection.updateOne({
    name: '이상현'
}, {
    $set: { age: 33 }
})

db.testCollection.deleteOne({
    name: '이상현'
})