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
      replies: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            userProfilePic: {
                type: String,
            },
            username: {
                type: String,
            },
        },
    ],

   },
   { timestamps: true  }
  );
  
  export default mongoose.model("Post", PostSchema);