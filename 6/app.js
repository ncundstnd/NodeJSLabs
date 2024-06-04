const fs = require('fs');
const path = require('path');
const sequelize = require('./db');
const initModels = require('./models/init-models');
const express = require('express');
const multer = require('multer');

try {
  sequelize.authenticate();
  console.log('Connection to the database has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const models = initModels(sequelize);
const upload = multer({ dest: 'images/' });
const app = express();
const pizzasRouter = require('./routes/PizzasRoute');
const turtlesRouter = require('./routes/TurtlesRoute');
const weaponsRouter = require('./routes/WeaponsRoute');

app.use(express.json());
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/public"));
app.use('/api/pizzas', pizzasRouter);
app.use('/api/turtles', turtlesRouter);
app.use('/api/weapons', weaponsRouter);

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, "/public/app.html"));
});

app.get('/upload', async (req, res) => {
  res.sendFile(path.join(__dirname, "/public/upload.html"));
});

app.post('/upload', upload.single('image'), async (req, res) => {
  const turtleId = req.body.turtleId;
  const image = req.file;

  console.log(turtleId);

  try {
    const turtle = await models.Turtles.findByPk(turtleId);
    if (!turtle) {
      throw new Error('Такая черепашка-ниндзя не существует');
    }

    const imageFileName = `turtle_${turtleId}.jpg`;
    fs.renameSync(image.path, path.join(__dirname, "/images", imageFileName)); 
    await models.Turtles.update(
      { image: imageFileName },
      { where: { id: turtleId } } 
    );

    res.send('Изображение успешно загружено и данные обновлены!');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.use((req, res, next) => {
  res.status(404).send('Ошибка 404: Страница не найдена');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));
