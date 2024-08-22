import mongoose, { Document, Schema, PopulatedDoc, Types } from "mongoose";
import { ITask, Task } from "./Task";
import { IUser } from "./User";
import Note from "./Note";

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

// Middleware
ProjectSchema.pre('deleteOne', {document: true}, async function() {
    const projectId = this.id;
    if( !projectId) return;

    const tasks = await Task.find({ project: projectId });
    for( const task of tasks ) {
        await Note.deleteMany({ task: task.id });
    }

    await Task.deleteMany({ project: projectId });
});

ProjectSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret, options) {
    }
});

export const ProjectModel = mongoose.model<IProject>('Project', ProjectSchema);

// Con el generic decimos que cuando hagamos referencia al projecto, se haga con los atributos y elemetos correspondientes