const express = require("express");
const { verifyJWT, checkRole } = require("../middileware/auth");
const itemContoller = require("../controller/itemController");
const router = express.Router();

router.post("/create", verifyJWT, checkRole(["Admin"]), itemContoller.create);
router.get(
  "/get/:id",
  verifyJWT,
  checkRole(["Admin", "User"]),
  itemContoller.get
);
router.get(
  "/get-all",
  verifyJWT,
  checkRole(["Admin", "User"]),
  itemContoller.getAll
);
router.patch(
  "/update/:id",
  verifyJWT,
  checkRole(["Admin"]),
  itemContoller.update
);
router.delete(
  "/delete/:id",
  verifyJWT,
  checkRole(["Admin"]),
  itemContoller.delete
);

module.exports = router;
