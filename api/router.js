const router = require("express").Router();

const userRouter = require("../users/userRouter");

router.get("/", (req, res) => {
	res.status(200).json({ router: "api" });
});

router.use("/users", userRouter);

module.exports = router;
