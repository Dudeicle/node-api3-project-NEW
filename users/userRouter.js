const express = require("express");

const UserDb = require("./userDb.js");
const PostDb = require("../posts/postDb.js");

const router = express.Router();

// url path leading up to these requests is
// localhost:5000/api/users/

router.get("/", (req, res) => {
	// do your magic!
	UserDb.get(req.query)
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((error) => {
			res.status(500).json({ message: "Error retrieving list of users" });
		});
}); // WORKING

router.get("/:id", validateUserId, (req, res) => {
	// do your magic!
	UserDb.getById(req.params.id)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((error) => {
			res.status(404).json({ message: "Could not find user of the specified ID" });
		});
}); // WORKING

router.get("/:id/posts", validateUserId, (req, res) => {
	// do your magic!
	UserDb.getUserPosts(req.params.id)
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			res.status(500).json({ message: "Error getting the posts for specified user" });
		});
}); // WORKING

router.post("/", validateUser, (req, res) => {
	// do your magic!
	UserDb.insert(req.body)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => {
			res.status(500).json({ message: "Error adding user to database" });
		});
}); // WORKING

router.post("/:id/posts", validatePost, (req, res) => {
	// do your magic!
	req.body.user_id = req.params.id;

	PostDb.insert(req.body)
		.then((result) => {
			res.status(200).send(result).end();
		})
		.catch((error) => {
			res.status(500).json({ message: "Error adding post to specified user" });
		});
}); // WORKING

router.delete("/:id", validateUserId, (req, res) => {
	// do your magic!
	UserDb.remove(req.params.id)
		.then((result) => {
			res.status(201).json({ message: "The user was deleted from the database!" });
		})
		.catch((error) => {
			res.status(404).json({ message: "The user with the specified ID could not be found" });
		});
}); // WORKING

router.put("/:id", (req, res) => {
	// do your magic!
	const id = req.params.id;
	const changes = req.body;

	UserDb.update(id, changes)
		.then((result) => {
			res.status(201).json(result);
		})
		.catch((error) => {
			res.status(404).json({ message: "Could not find the user of the ID entered" });
		});
}); // WORKING

//custom middleware

function validateUserId(req, res, next) {
	// do your magic!
	UserDb.getById(req.params.id)
		.then((result) => {
			if (!result) {
				res.status(404).json({ error: "Invalid ID" });
			} else {
				next();
			}
		})
		.catch((error) => {
			res.status(400).json({ error: "ID validation error" });
		});
} // WORKING

function validateUser(req, res, next) {
	// do your magic!
	if (!req.body.name) {
		res.status(400).json({ message: "Name is a required field!" });
	} else {
		next();
	}
} // WORKING

function validatePost(req, res, next) {
	// do your magic!
	if (!req.body.text) {
		res.status(400).json({ message: "Text is a required field!" });
	} else {
		next();
	}
} // WORKING

module.exports = router;
