// #빅데이터_수집_저장 #미니실습, #몽고디비
// 📌 기본 실습 문제
// 1. Embedded Document (Rich Document)
// users 컬렉션을 생성하고, name, age, address 
// 필드를 가진 문서를 삽입하시오.
db.users.insertOne({
  name: "lsy",
  age: 30,
  address: { city: "busan", zip: "12345", street: "중앙대로" }
})

// products 컬렉션에 name, price, manufacturer 
// 필드를 가진 문서를 삽입하시오.
db.products.insertOne(
  { name: "Laptop", price: 1200, manufacturer: "Apple" });


// orders 컬렉션에 주문 정보(orderId, userId, items)를 
// Embedded Document로 삽입하시오.
db.orders.insertOne({
  orderId: "A001",
  // userId ->ObjectId 부분은 각각 모두 다름. 확인 후, 작업하기.
  userId: ObjectId("67be5d20e2cfe9cbc119bf79"),
  items: [
    { product: "Laptop", price: 1200, quantity: 1 },
    { product: "Mouse", price: 25, quantity: 2 }
  ]
});

// books 컬렉션에 title, author, details(페이지 수, 출판 연도 포함) 
// 필드를 가진 문서를 삽입하시오.
db.books.insertOne(
  {
    title: "Laptop", author: "Apple",
    details: { pages: 200, publishedAt: new Date() }
  });


// reviews 컬렉션에 productId, userId, rating, comment를 Embedded Document로 저장하시오.
// 2. Link 구조
// users 컬렉션과 orders 컬렉션을 참조(Reference) 관계로 설정하고 
// 데이터 삽입하시오.
var userId = ObjectId();
db.users.insertOne({
  _id: userId,
  name: "Alice",
  email: "alice@example.com"
});
db.orders.insertOne({
  orderNumber: 1001,
  userId: ObjectId("67be5f852aeba1bdf0c489de"),  // 참조하는 사용자 _id
  total: 250,
  orderDate: new Date()
});
// posts 컬렉션과 comments 컬렉션을 참조(Reference) 관계로 설정하고 
// 데이터 삽입하시오.
var postId = ObjectId();
db.posts.insertOne({
  _id: postId,
  title: "첫 번째 게시글",
  content: "이것은 게시글의 내용입니다.",
  author: "Bob",
  createdAt: new Date()
});
db.comments.insertOne({
  postId: ObjectId("67be6015abdf923b69ca1add"),  // 참조하는 게시글 _id
  comment: "훌륭한 게시글입니다!",
  author: "Charlie",
  createdAt: new Date()
});

// students 컬렉션과 courses 
// 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.
var studentId = ObjectId();
db.students.insertOne({
  _id: studentId,
  name: "David",
  age: 21,
  major: "Computer Science"
});
var courseId = ObjectId();
db.courses.insertOne({
  _id: courseId,
  title: "MongoDB 입문",
  description: "NoSQL 데이터베이스에 대한 기초 강좌",
  studentIds: [ObjectId("67be60a26ba86ee43242ccc5")],
  createdAt: new Date()
});
// employees 컬렉션과 departments 컬렉션을 
// 참조(Reference) 관계로 설정하고 데이터 삽입하시오.
var deptId = ObjectId();
db.departments.insertOne({
  _id: deptId,
  name: "인사부",
  location: "본사"
});
db.employees.insertOne({
  name: "Eve",
  position: "HR Manager",
  departmentId: ObjectId("67be614b11a50cee02aad94d"),  // 참조하는 부서 _id
  hiredAt: new Date()
});
// doctors 컬렉션과 patients 컬렉션을 참조(Reference) 관계로 설정하고 데이터 삽입하시오.
var doctorId = ObjectId();
db.doctors.insertOne({
  _id: doctorId,
  name: "Dr. Smith",
  specialty: "내과"
});
db.patients.insertOne({
  name: "Frank",
  condition: "감기",
  doctorId: ObjectId("67be61967663f935fe884122"),  // 참조하는 의사 _id
  admittedAt: new Date()
});
// 3. 계층형 데이터 구조
// categories 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 데이터 삽입하시오.
var catElectronics = ObjectId();
db.categories.insertOne({
  _id: catElectronics,
  name: "전자제품",
  parentId: null  // 최상위 카테고리
});
db.categories.insertOne({
  name: "컴퓨터",
  parentId: ObjectId("67be61f48dd05ef4b630cb96")
});
// comments 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 
// 데이터 삽입하시오.
var comment1Id = ObjectId();
db.comments.insertOne({
  _id: comment1Id,
  text: "첫 번째 댓글입니다.",
  parentId: null,  // 최상위 댓글
  author: "Grace",
  createdAt: new Date()
});
db.comments.insertOne({
  text: "첫 번째 댓글에 대한 답글입니다.",
  parentId: ObjectId("67be62762b38a6fb1a6cc464"),  // 상위 댓글의 _id 참조
  author: "Heidi",
  createdAt: new Date()
});
// company_structure 컬렉션을 계층 구조(parentId 필드 포함)로 
// 생성하고 데이터 삽입하시오.
var companyId = ObjectId();
db.company_structure.insertOne({
  _id: companyId,
  name: "ABC Corp",
  parentId: null  // 최상위 노드
});
db.company_structure.insertOne({
  name: "영업부",
  parentId: ObjectId("67be62f943ddc4f2d8a34376")
});
// locations 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 
// 데이터 삽입하시오.
var countryId = ObjectId();
db.locations.insertOne({
  _id: countryId,
  name: "대한민국",
  parentId: null
});
db.locations.insertOne({
  name: "서울특별시",
  parentId: ObjectId("67be63453ed75d2e5dcd7c10")
});
// menus 컬렉션을 계층 구조(parentId 필드 포함)로 생성하고 
// 데이터 삽입하시오.
var dashboardId = ObjectId();
db.menus.insertOne({
  _id: dashboardId,
  name: "Dashboard",
  url: "/dashboard",
  parentId: null
});
var productsId = ObjectId();
db.menus.insertOne({
  _id: productsId,
  name: "Products",
  url: "/products",
  parentId: null
});
db.menus.insertOne({
  name: "Electronics",
  url: "/products/electronics",
  parentId: ObjectId("67be640135f8904d92475f89")
});

