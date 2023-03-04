const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

//async keyword before the callback to return a promise
router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    // store categoryData in a variable once promise is resolved
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
  res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
 
  try {
    const categoryData = await Category.findByPk(req.params.id, {
// be sure to include its associated Products
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with that ID" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new category
  Category.create({
      category_name: req.body.category_name,
    }) 
     .then((categoryData) => res.status(200).json(categoryData))
    .catch((err =>{
      console.log(err);
      res.status(404).json(err);
    })
     )});

router.put("/:category_id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(404).json(err));
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
