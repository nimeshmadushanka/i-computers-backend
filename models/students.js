import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        name : String,
        aga : Number,
        city : String
    }
);
const Student = mongoose.model("Student",studentSchema);

//File eken eliyat yawanwanm Export kiyla danna oni

export default Student; 