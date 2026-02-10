import mongoose from "mongoose";

const potdSchema = new mongoose.Schema(
  {
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
      unique: true, // ek problem ek hi baar POTD ban sakti
    },
    date: {
      type: Date,
      required: true,
      unique: true, // ek date par ek hi POTD
    },
  },
  { timestamps: true }
);

export default mongoose.model("Potd", potdSchema);
