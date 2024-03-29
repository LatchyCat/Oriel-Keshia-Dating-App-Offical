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
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    console.log("Error updating user:", error.message);
    res.status(500).json({ error: "Failed to update user" });
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
    const userProfile = await User.profile.create(req.body); // Assuming req.body contains profile data

    // Associate the created profile with the registered user
    await User.findByIdAndUpdate(userId, { profile: User.profile.id });

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


export const createOrUpdateProfile = async (req, res) => {
  const userId = req.params._id;
  const profileData = req.body;

  try {
    // Check if userId is provided
    if (!userId) {
      console.log('error')
      return res.status(400).json({ error: "User ID is required." });
    }

    // Check if userId exists in the database (for updating)
    // If userId exists, update the profile, otherwise, create a new one
    const existingUser = await User.findById(userId);
    if (existingUser) {
      // Update existing profile
      // Add validation logic if necessary
      await User.findOneAndUpdate({ _id: userId }, profileData, {upsert: true, runValidators: true});
      return res.status(200).json({ message: "Profile updated successfully." });
    }
  } catch (error) {
    console.error("Error creating/updating profile:", error);
    return res.status(400).json({ error: "Internal server error." });
  }
};



export const createMatchRequest = async (req, res) => {
  try {
    const { userId } = req.params._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const requestingUserId = req.user._id; // Assuming you have authentication middleware that adds the user object to the request
    const recipientUserId = userId; // The ID of the recipient user

    // Check if the requesting user is trying to match with themselves
    if (requestingUserId === recipientUserId) {
      return res.status(400).json({ error: "Cannot match with yourself" });
    }

    // Check if the requesting user has already sent a match request to the recipient user
    if (user.matchRequests.includes(requestingUserId)) {
      return res.status(400).json({ error: "Match request already sent" });
    }

    // Add the requesting user's ID to the recipient user's list of match requests
    user.matchRequests.push(requestingUserId);

    // Save the updated user document
    await user.save();

    // Return a success response
    return res.status(200).json({ message: "Match request sent successfully" });
  } catch (error) {
    console.error("Error creating match request:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// User.findByIdAndUpdate(User.userId, {$set: {"profile.$": req.body}})

export const readAllProfileId = async (id) => {
  try {
      // Make a GET request to fetch all profile IDs
      const response = await axios.get(`http://localhost:8000/api/profiles/${id}`);

      // Extract profile IDs from the response data
      const profileIds = response.data.map(profile => profile._id);

      return profileIds;
  } catch (error) {
      // Handle errors, such as network errors or server errors
      console.error('Error fetching profile IDs:', error);
      throw new Error('Failed to fetch profile IDs');
  }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
      // Update the user's profile using the provided userId and profileData
      const updatedUser = await User.findByIdAndUpdate(userId, { $set: { "profile.$": profileData } });
      return updatedUser;
  } catch (error) {
      // Handle errors, such as database errors or validation errors
      console.error('Error updating user profile:', error);
      throw new Error('Failed to update user profile');
  }
};
