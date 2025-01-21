const User = require("../models/userModel");

exports.createAdmin = async () => {
  try {
    const adminExists = await User.exists({ role: "Admin" });

    if (adminExists) {
      console.log(`Admin already exists. Skipping creation.`);
      return;
    }

    const newAdmin = new User({
      name: "Dharmendra",
      email: "dk@gmail.com",
      role: "Admin",
      password: "pass123",
    });

    const savedAdmin = await newAdmin.save();

    console.log(`New ${savedAdmin.name} created:`, savedAdmin.email);
  } catch (error) {
    console.log(`Error creating SuperAdmin:`, error);
  }
};
