const express = require('express');
const app = express();
const port = 5000;

app.use(express.static('Static'));
app.get('/', (req, res) => {
     res.send('accept');
});

app.listen(port, () => {
    console.log(`App listening to port ${port
    }`)
});