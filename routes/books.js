const router = require('express').Router();
const { Books, User } = require('../db/models');
const upload = require('../middlewares/multer')

router.post('/', upload.single('image'), async (req, res) => {
  const { name, author, descr, genre } = req.body;
  console.log(req.body);
  try {
    if (req.session.userId) {
      const { userId } = req.session;
      console.log('>>>', userId);
      const newBooks = await Books.create({
        name,
        author,
        descr,
        genre,
        image: req.file?.path.replace('public', ''),
        user_id: userId,
      });
    }

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

router.get('/', async (req, res) => {
  const books = await Books.findAll({
    include: [{ all: true }],
  });
  res.json(books);
});

router.post('/:id', async (req, res) => {
  const { rating } = req.body;
  console.log(req.body);
  try {
    if (req.session.userId) {
      const { userId } = req.session;
      console.log('>>>', userId);
      const newBooks = await Books.update({
        rating,
      });
    }

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Books.destroy({
      where: { id },
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
