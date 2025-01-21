const express = require("express");

const { verifyJWT, checkRole } = require("../middileware/auth");
const userController = require("../controller/userController");
const router = express.Router();

router.get("/get/:id", verifyJWT, checkRole(["Admin"]), userController.get);
router.get("/get-all", verifyJWT, checkRole(["Admin"]), userController.getAll);

router.patch(
  "/update/:id",
  verifyJWT,
  checkRole(["Admin", "User"]),
  userController.update
);
router.delete(
  "/delete/:id",
  verifyJWT,
  checkRole(["Admin"]),
  userController.delete
);

module.exports = router;
