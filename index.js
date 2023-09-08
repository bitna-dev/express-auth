const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const secretText = "superSecret";

app.use(express.json());

app.post("/login", (req, res) => {
	const username = req.body.username;
	const user = { name: username };

	// 토큰 생성 payload + secretText

	// const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
	const accessToken = jwt.sign(user, secretText);

	res.json({ accessToken: accessToken });
});

app.listen(port, () => {
	console.log(`Running on port ${port}`);
});
