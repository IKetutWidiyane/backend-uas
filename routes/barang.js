const router = require("express").Router();
const {
  insert,
  getAll,
  edit,
  deleteBarang,
  getByID,
} = require("../controller/barang");

const { upload } = require("../uploadconfig");
const uploadPoster = upload.single("image");

router.post("/insert", uploadPoster, insert);
router.get("/get-all", getAll);
router.put("/edit/:id", uploadPoster, edit);
router.delete("/delete/:id", deleteBarang);
router.get("/get/:id", getByID);

module.exports = router;
