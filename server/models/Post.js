import mongoose from "mongoose";


const PostSchema = new mongoose.Schema(
    {
      userId: {
          type: String,
          required: true,
      },
      description: {
          type: String,
          required: true,
          max: 350,
      },
      likes: {
          type: Array,
          defaultValue: [],
      },
      views: {
        type: Array,
        defaultValue: [],
      },
   },
   { timestamps: true  }
  );
  
  export default mongoose.model("Post", PostSchema);