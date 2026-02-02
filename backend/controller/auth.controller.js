export const Login = async (req, res) => {
    return res.status(201).json({
        success: true,
        message: "logged in successfully!",
    });
};
