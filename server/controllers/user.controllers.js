import User from "../models/user.models.js";

export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(400).json({ error: err.message });
  }
};

export const readAllUsers = async (req, res) => {
  try {
    res.json(await User.find());
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res
      .status(500)
      .json(err);
  }
};

export const readOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.json(user);
  } catch (err) {
    console.error("Error finding user:", err.message);
    res
      .status(500)
      .json(err);
  }
};

export const updateOneUser = async (req, res) => {
  const options = { new: true, runValidators: true };
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      options
    );
    if (!updatedUser) {
      return res.status(404).json(err);
    }
    res.json(updatedUser);
  } catch (error) {
    console.log("Error updating user:", error.message);
    res
      .status(400)
      .json(error);
  }
};

export const deleteOneUser = async (req, res) => {
  try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
          return res.status(404).json({ message: 'User not found for deletion' });
      }
      res.json(deletedUser);
  } catch (err) {
      console.error('Error deleting user:', err.message);
      res.status(500).json({ message: 'Failed to delete user', error: err.message });
  }
};


// Controller method to fetch all user emails
export const readAllUserEmails = async (req, res) => {
  try {
    const users = await User.find({}, { email: 1 });
    const emails = users.map(user => user.email);
    res.json(emails);
  } catch (err) {
    console.error("Error fetching user emails:", err.message);
    res.status(500).json({ error: err.message });
  }
};


export const checkExistingEmail = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    console.error("Error checking existing email:", err.message);
    res.status(500).json({ error: err.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body); // Assuming req.body contains user data
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(400).json(err);
  }
};

export const createProfile = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is passed in the request params
    const userProfile = await Profile.create(req.body); // Assuming req.body contains profile data

    // Associate the created profile with the registered user
    await User.findByIdAndUpdate(userId, { profile: userProfile._id });

    res.status(201).json(userProfile);
  } catch (err) {
    console.error("Error creating profile:", err.message);
    res.status(400).json(err);
  }
};



export const login = async (req, res) => {
  try {
    // Retrieve email and password from request body
    const { email, password } = req.body;

    // Find user in the database by email and password
    const user = await User.findOne({ email, password });

    if (!user) {
      // If user is not found or credentials are incorrect, return appropriate response
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If login is successful, you can return a success message or user data with a token
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    // Handle any errors
    console.error("Error logging in:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSecurityKeyHint = async (req, res) => {
  try {
    // Retrieve user's email from request query parameters
    const { email } = req.query;

    // Find the user in the database by their email
    const user = await User.findOne({ email });

    if (!user) {
      // If user is not found, return appropriate response
      return res.status(404).json({ message: "User not found" });
    }

    // If user is found, return their security key hint
    res.status(200).json({ securityKeyHint: user.profile.security_key_hint });
  } catch (error) {
    // Handle any errors
    console.error("Error retrieving security key hint:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
