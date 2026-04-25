import mongoose, { Schema, Document as MongooseDocument } from "mongoose";

export interface IDoc extends MongooseDocument {
  userId: mongoose.Types.ObjectId;
  fileName: string;
  pineconeNamespace: string;
  createdAt: Date;
}

const DocumentSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  fileName: { type: String, required: true },
  pineconeNamespace: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Document || mongoose.model<IDoc>("Document", DocumentSchema);
