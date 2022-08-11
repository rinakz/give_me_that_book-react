const router = require('express').Router();
const { Books, User, Bookings, Comments } = require('../db/models');
const upload = require('../middlewares/multer')

router.post('/', upload.single('image'), async (req, res) => {
  const { books_id, descr } = req.body;
  console.log(req.body);
  try {
    if (req.session.userId) {
      const { userId } = req.session;
      console.log('>>>', userId);
      const newComments = await Comments.create({
        books_id,
        user_id: userId,
        descr,
        image: req.file?.path.replace('public', ''),
      });
    }

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

router.get('/', async (req, res) => {
  const comments = await Comments.findAll({
    include: [{ all: true }],
  });
  res.json(comments);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Comments.destroy({
      where: { id },
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
