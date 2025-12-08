import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js"; // adjust path as needed

const seedAdminUser = async () => {
    try {
        // Check if admin already exists
        const adminExists = await userModel.findOne({
            email: process.env.ADMIN_EMAIL
        });

        if (adminExists) {
            console.log("✅ Admin user already exists");
            return;
        }

        // Hash the admin password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(
            process.env.ADMIN_PASSWORD,
            salt
        );

        // Create admin user
        const adminUser = new userModel({
            name: "Admin",
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            phone: "",
            cartData: {},
            addresses: [],
            profile: {
                firstName: "Admin",
                lastName: "GearMates",
                phone: "",
                gender: "other"
            }
        });

        await adminUser.save();
        console.log("✅ Admin user seeded successfully");
        console.log(`📧 Email: ${process.env.ADMIN_EMAIL}`);
    } catch (error) {
        console.error("❌ Error seeding admin user:", error.message);
    }
};

const connectDB = async () => {
    mongoose.connection.on('connected', async () => {
        console.log("DB Connected");

        // Automatically seed admin user after connection
        await seedAdminUser();
    });

    await mongoose.connect(`${process.env.MONGODB_URI}`);
};

export default connectDB;
