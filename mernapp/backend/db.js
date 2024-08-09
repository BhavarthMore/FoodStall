const mongoose = require("mongoose");

const mongoURI = "{your_connection_string}";

const mongoDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000
        });

        console.log("Connected Successfully");

        // Fetch data from food_items collection
        const fetched_data = await mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();
        global.food_items = data;
        

        // Fetch data from foodCategory collection
        const foodCategory = mongoose.connection.db.collection("food_category");
        const catData = await foodCategory.find({}).toArray();
        global.foodCategory = catData;
        

    } catch (err) {
        console.error("Error:", err);
    }
};

module.exports = mongoDB;
