const router = require('express').Router();
const { Books, User, Bookings } = require('../db/models');

router.post('/', async (req, res) => {
  const { books_id, date, returndate } = req.body;
  console.log(req.body);
  try {
    if (req.session.userId) {
      const { userId } = req.session;
      console.log('>>>', userId);
      const newBookings = await Bookings.create({
        books_id,
        user_id: userId,
        date,
        returndate,
      });
    }

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

router.get('/', async (req, res) => {
  const bookings = await Bookings.findAll({
    include: [{ all: true }],
  });
  res.json(bookings);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Bookings.destroy({
      where: { id },
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Bookings.update({status: true}, {where: { id }})
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;
