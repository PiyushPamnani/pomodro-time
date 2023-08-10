import User from "../models/users.js";

export const signin = async (req, res) => {
  const { email, picture } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      await User.create({
        email: email,
        image: picture,
      });
    }

    res.status(200).json({ result: existingUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
