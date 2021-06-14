const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


// Get all ✔️
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll();
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({

    where: {
      // id: req.params.id
      id: req.params.id
    },
    // // including Product data creates an error
    include: [
      {
        model: Product,
        through: ProductTag
      },
    ],
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
  });
  // try {
  //   const tagData = await Tag.findByPk(req.params.id, 

  //     // // including Product data creates an error
  //     {
  //     include: [{ model: Product }]
  //     }

  //   );

  //   if (!tagData) {
  //     res.status(404).json({ message: 'No tag found with this id!' });
  //     return;
  //   }

  //   res.status(200).json(tagData);
  // } catch (err) {
  //   res.status(500).json(err);
  // }


router.post('/', async (req, res) => {
  console.log(req.body) // returns as empty
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name
    }
    );
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// update a tag's name by its `id` value ✔️
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: { id: req.params.id }
      });
    if (!tagData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete on tag by its `id` value
// Is not working ==> SequelizeForeignKeyConstraintError

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
