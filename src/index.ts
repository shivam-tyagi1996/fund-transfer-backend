import express from 'express';
// import mainApp  from './mainApp';
import bodyParser from 'body-parser';

const app = express();
const port = 3000

app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req: any, res: any) => {
  console.log("rrrrrrrrrrr", req.body, "hello");
//   mainApp(req, res);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})