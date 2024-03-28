import { model, Schema } from "mongoose";
const profileSchema = new Schema({
  profile_name: {
    type: String,
    required: [true, "Profile name is required!"],
    minlength: [3, "Profile name must be at least 3 characters long!"],
    maxlength: [255, "Profile name must be less than 255 characters long"],
  },
  interests: {
    type: String,
    maxlength: [255, "Interests must be less than 255 characters long"],
  },
  ethnicity: {
    type: String,
    maxlength: [255, "Ethnicity must be less than 255 characters long"],
  },
  isEmployed: {
    type: Boolean,
    default: false,
  },
  city: {
    type: String,
    maxlength: [255, "City must be less than 255 characters long"],
  },
  state: {
    type: String,
    maxlength: [255, "State must be less than 255 characters long"],
  },
});

const UserSchema = new Schema(
  {
    first: {
      type: String,
      required: [true, "First Name is required!"],
      minlength: [3, "First Name must be at least 3 characters long!"],
      maxlength: [255, "First name must be less than 255 characters long"],
    },
    last: {
      type: String,
      required: [true, "Last Name is required!"],
      minlength: [3, "Last Name must be at least 3 characters long!"],
      maxlength: [255, "Last name must be less than 255 characters long"],
    },
    birthday: {
      type: Date,
      required: [true, "Birthday is required!"],
      validate: {
        validator: function (value) {
          //? Calculate the date 18 years ago
          const eighteenYearsAgo = new Date();
          eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

          //? Check if the provided birthday is on or before eighteenYearsAgo
          return value <= eighteenYearsAgo;
        },
        message: "User must be 18 years or older.",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      validate: {
        validator: function (value) {
          //* Regular expression for email validation
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
        },
        message: "Invalid email address format!",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: [8, "Password must be at least 8 characters long!"],
      validate: {
        validator: function (value) {
          //* Regular expression for password validation
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          );
        },
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long!",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm Password is required!"],
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: "Passwords do not match!",
      },
    },
    security_key_hint: {
      type: String,
      required: [true, "Security Key Hint is required!"],
      maxlength: [
        255,
        "Security Key Hint must be less than 255 characters long!",
      ],
    },
    //! Reference to the PROFILE schema above the USER schema
    profile: profileSchema,
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

export default User;
