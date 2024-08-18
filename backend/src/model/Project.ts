import mongoose, { Document, Schema, PopulatedDoc, Types } from "mongoose";
import { ITask } from "./Task";
import { IUser } from "./User";

export interface IProject extends Document {
    projectName: string;
    clientName: string;
    description: string;
    tasks: PopulatedDoc<ITask & Document>[];
    manager: PopulatedDoc<IUser & Document>;
    team: PopulatedDoc<IUser & Document>[];
};

const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: [ true, 'Project name is required'],
        trim: true,
    },
    clientName: {
        type: String,
        required: [ true, 'Client name is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [ true, 'Description is required'],
        trim: true,
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ],
    manager: {
        type: Types.ObjectId,
        ref: 'User',
    },
    team: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ],
}, { timestamps: true });

ProjectSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret, options) {
        delete ret._id;
    }
});

export const ProjectModel = mongoose.model<IProject>('Project', ProjectSchema);

// Con el generic decimos que cuando hagamos referencia al projecto, se haga con los atributos y elemetos correspondientes