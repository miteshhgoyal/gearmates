import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.json({
                success: false,
                message: "Not Authorized Login Again"
            });
        }

        // Verify and decode the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Check if token contains admin flag or if user ID matches admin
        if (!token_decode.id) {
            return res.json({
                success: false,
                message: "Not Authorized Login Again"
            });
        }

        // Optional: Add additional check for admin email in token payload
        // You can also check if token has isAdmin flag
        if (token_decode.isAdmin !== true) {
            return res.json({
                success: false,
                message: "Not Authorized Login Again"
            });
        }

        // Attach decoded user info to request for use in routes
        req.userId = token_decode.id;
        req.isAdmin = token_decode.isAdmin;

        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default adminAuth;
