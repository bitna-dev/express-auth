const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const secretText = "superSecret";

const posts = [
	{
		username: "John",
		title: "Post 1",
	},
	{
		username: "Hwan",
		title: "Post 2",
	},
];
app.use(express.json());

app.post("/login", (req, res) => {
	const username = req.body.username;
	const user = { name: username };

	// 토큰 생성 payload + secretText

	// const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
	const accessToken = jwt.sign(user, secretText);

	res.json({ accessToken: accessToken });
});
function authMiddleware(req, res, next) {
	// 토큰 request header에서 가져오기
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) return res.sendStatus(401);

	// 토큰이 있으니 유요한 토큰인지 확인
	jwt.verify(token, secretText, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
}

app.get("/posts", authMiddleware, (req, res) => {
	res.json(posts);
});

app.listen(port, () => {
	console.log(`Running on port ${port}`);
});
