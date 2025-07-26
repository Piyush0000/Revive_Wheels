require("dotenv").config(); // This should be at the very top
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Initialize Razorpay with your API keys from the .env file
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// New endpoint to get the Razorpay Key ID
app.get("/get-razorpay-key", (req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID });
});

// Endpoint to create a Razorpay order
app.post("/create-order", async (req, res) => {
  const options = {
    amount: 5250, // Amount in paisa (52.50 INR)
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send("Error creating order");
  }
});

// Endpoint to verify the payment
app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  const hmac = crypto.createHmac("sha256", key_secret);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  if (generated_signature === razorpay_signature) {
    res.json({ success: true, message: "Payment has been verified" });
  } else {
    res.json({ success: false, message: "Payment verification failed" });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
