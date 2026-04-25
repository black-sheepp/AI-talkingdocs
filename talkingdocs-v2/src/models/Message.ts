import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  documentId: mongoose.Types.ObjectId;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  documentId: { type: Schema.Types.ObjectId, ref: "Document", required: true },
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);
