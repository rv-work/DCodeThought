import express from "express";
import { protect } from "../middleware/auth.js";
import { rateLimit } from "../middleware/rateLimit.js";
import { validate } from "../middleware/validate.js";
import {
  getCommentsByProblemSlug,
  addComment,
  addReply,
  voteComment,
  voteReply,
} from "../controllers/comment.controller.js";
import {
  addCommentSchema,
  addReplySchema,
  voteSchema,
} from "../validators/comment.validation.js";

const router = express.Router();

router.get("/:slug", getCommentsByProblemSlug);

router.post(
  "/:slug",
  protect,
  rateLimit({ keyPrefix: "comment-add", limit: 10, windowSec: 60 }),
  validate(addCommentSchema),
  addComment
);

router.post(
  "/reply/:commentId",
  protect,
  rateLimit({ keyPrefix: "reply-add", limit: 10, windowSec: 60 }),
  validate(addReplySchema),
  addReply
);

router.post(
  "/vote/:commentId",
  protect,
  rateLimit({ keyPrefix: "comment-vote", limit: 30, windowSec: 60 }),
  validate(voteSchema),
  voteComment
);

router.post(
  "/vote/:commentId/:replyId",
  protect,
  rateLimit({ keyPrefix: "reply-vote", limit: 30, windowSec: 60 }),
  validate(voteSchema),
  voteReply
);

export default router;
