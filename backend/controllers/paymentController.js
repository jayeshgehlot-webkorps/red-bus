const razorpay = require("../config/razorpay.js");
const crypto = require("crypto");

const createPayment = async (req, res) => {
    try {
        const options = {
            amount: Math.round(Number(req.body.amount) * 100),
            currency: "INR",
            receipt: "receipt_order_" + Date.now(),
        };
        const order = await razorpay.orders.create(options);

        res.json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("Razorpay Order Creation Error:", error);
        res.status(500).json({ error: error.message });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;


        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZOR_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            return res.json({ success: true });
        } else {
            return res.status(400).json({ success: false, message: "Invalid Signature Mapping Check" });
        }
    } catch (error) {
        console.error("Signature Validation Framework Exception:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    createPayment,
    verifyPayment
};