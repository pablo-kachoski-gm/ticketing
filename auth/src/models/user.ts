import { Schema, model, Model, Document } from "mongoose";
import { PasswordService } from "../services/password";

interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends Document {
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc: any, ret: any) {
    // remove these props when object is serialized
    delete ret._id;
    delete ret.password;
    delete ret.__v;
  },
});
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await PasswordService.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = model<UserDoc, UserModel>("User", userSchema);

export { User };
