import mongoose, { Schema, type Document } from "mongoose";
import type { RegistrationForm } from "../app/register/interface";

interface Team extends Document, RegistrationForm { }

const memberSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    rollNo: { type: String, required: true, trim: true, unique: true },
    phoneNumber: { type: String, required: true, trim: true, unique: true },
    branch: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true },
});

const teamSchema = new Schema<Team>({
    lead: { type: memberSchema, required: true },
    teamSize: { type: Number, required: true, min: 1 },
    teamName: { type: String, required: true, trim: true },
    completedCourse: { type: Boolean, required: true, default: false },
    college: { type: String, required: true, trim: true },
    teamDetails: { type: [memberSchema] },
},
    {
        timestamps: true,
    });

const TeamModel =
    (mongoose.models.Team as mongoose.Model<Team>) ||
    mongoose.model<Team>("Team", teamSchema);

export default TeamModel;
