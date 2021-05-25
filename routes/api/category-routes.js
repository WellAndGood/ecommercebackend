const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories ✔️
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll(
      {include: [{ model: Product }]}
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

// find one category by its `id` value ✔️
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

// Creates a new entry ✔️
router.post('/', async (req, res) => {
  try {
    console.log(req.body.category_name)
    const categoryData = await Category.create({
      category_name: req.body.category_name
    }   
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    
    console.log(req.body.category_name) // Works
    console.log(req.params.id) // Works

    const categoryData = await Category.update(
    { category_name: req.body.category_name}, 
    { where: req.params.id });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// Deletes a specific entry ✔️
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
