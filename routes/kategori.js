const router = require("express").Router();
const {
  insert,
  getAll,
  edit,
  deletekategori,
} = require("../controller/kategori");

router.post("/insert", insert);
router.get("/get", getAll);
router.put("/edit/:id", edit);
router.delete("/delete/:id", deletekategori);
module.exports = router;
