import express from "express";

import {
  addComment,
  getComments,
  addReply,
  likeComment,
  dislikeComment,
} from "../controllers/comment.controller.js";

import { protect } from "../middleware/auth.js";
import { rateLimit } from "../middleware/rateLimit.js";
import { validate } from "../middleware/validate.js";

import {
  addCommentSchema,
  addReplySchema,
  likeDislikeSchema,
} from "../validators/comment.validation.js";

const router = express.Router();

// ---------------------- PUBLIC ----------------------
router.get("/:problemId", getComments);

// ---------------------- LOGGED-IN USERS ----------------------
router.post(
  "/add",
  protect,
  rateLimit({ keyPrefix: "comment", limit: 1, windowSec: 10 }),
  validate(addCommentSchema),
  addComment
);

router.post(
  "/reply",
  protect,
  rateLimit({ keyPrefix: "reply", limit: 2, windowSec: 10 }),
  validate(addReplySchema),
  addReply
);

router.post(
  "/like",
  protect,
  rateLimit({ keyPrefix: "like", limit: 5, windowSec: 10 }),
  validate(likeDislikeSchema),
  likeComment
);

router.post(
  "/dislike",
  protect,
  rateLimit({ keyPrefix: "dislike", limit: 5, windowSec: 10 }),
  validate(likeDislikeSchema),
  dislikeComment
);

export default router;
