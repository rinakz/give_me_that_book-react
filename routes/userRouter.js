const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const upload = require('../middlewares/multer')
require('dotenv').config();

router.get('/check', async (req, res) => {
  try {
    console.log('=========================================', req.session);
    if (req.session.userId) {
      const result = await User.findByPk(req.session.userId);
      res.json(result);
    } 
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.get('/logout', async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('sid');
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});
router.get('/allusers', async (req, res) => {
  try {
    const data = await User.findAll({include : {all : true}})
    res.json(JSON.parse(JSON.stringify(data)))
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post('/register', upload.single('image'), async (req, res) => {
  try {
    const { email, password, contact, name } = req.body;
    console.log(req.body);
    const result = await User.create({
      email,
      name,
      contact,
      image: req.file?.path.replace('public', ''),
      password: await bcrypt.hash(password, +process.env.SALTROUNDS),
    });
    console.log('123');
    if (result.id) {
      req.session.userName = result.name;
      req.session.userId = result.id;
      return res.json(result);
    }
  } catch (error) {
    return res.sendStatus(400);
  }
});

router.post('/login', async (req, res) => {
  console.log(req.body, 'fffffffffffffffffffffffffffff');
  try {
    const { email, password } = req.body;
    const result = await User.findOne({ where: { email } });
    console.log(result);
    if (await bcrypt.compare(password, result.password)) {
      req.session.userName = result.name;
      req.session.userId = result.id;
      return res.json(result);
    }
  } catch (error) {
    return res.sendStatus(400);
  }
});


router.put('/:id',upload.single('image'), async (req, res) => {
  const { name, contact } = req.body;
  console.log(req.body);
  try {
    if (req.session.userId) {
      const { userId } = req.session;
      console.log('>>>', userId);
      const result = await User.update({
        name,
        contact,
        image: req.file?.path.replace('public', ''),
      }, {where: {id: req.params.id} });
      console.log(result);
    }
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
});



module.exports = router;
