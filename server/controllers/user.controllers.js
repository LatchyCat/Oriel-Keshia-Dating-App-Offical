import User from "../models/user.models.js";

export const createUser = async (req, res) => {
  try {
    res.json(await User.create(req.body));
  } catch (err) {
    console.error("Error creating user:", err.message);
    res
      .status(400)
      .json(err);
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
