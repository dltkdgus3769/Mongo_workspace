db.by_road_type.find({ county: '강릉시' }, { '교차로내.accident_count': 1 })
db.by_road_type.find({ '기타단일로.death_toll': 0 }, { city_or_province: 1, county: 1 })

db.stores.insert(
    [
        { _id: 1, name: "Java Hut", description: "Coffee and cakes" },
        { _id: 2, name: "Burger Buns", description: "Gourmet hamburgers" },
        { _id: 3, name: "Coffee Shop", description: "Just coffee" },
        { _id: 4, name: "Clothes Clothes Clothes", description: "Discount clothing" },
        { _id: 5, name: "Java Shopping", description: "Indonesian goods" }
    ]
);

// Text index
db.stores.createIndex({ name: "text", description: "text" })

// $text Operation
db.stores.find({ $text: { $search: "java coffee shop" } })