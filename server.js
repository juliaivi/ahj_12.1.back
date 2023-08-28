const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body').default;
const cors = require('@koa/cors');
const Router = require('koa-router');;
const slow = require('koa-slow');
// import { faker } from '@faker-js/faker';
const { faker } = require('@faker-js/faker');

const { v4: uuidv4 } = require('uuid');

const app = new Koa();
const router = new Router(); // создание роутера

app.use(
  cors({
    origin: '*',
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
)
app.use(koaBody({
   urlencoded: true, 
   multipart: true,
   json: true, 
  }));
app.use(
  slow({
    delay: 6000,
  })
);
 

const data = {
  status: "ok",
  timestamp: `${new Date().toLocaleDateString() } ${ new Date().toLocaleTimeString() }`,
  news: [
    {
      "id": uuidv4(),
      "image": faker.image.avatar(),
      "description": faker.lorem.words(10) ,
      "received": `${ new Date().toLocaleDateString() } ${ new Date().toLocaleTimeString() }`,
    },
    {
      "id": uuidv4(),
      "image": faker.image.avatar(),
      "description": faker.lorem.words(10),
      "received": `${ new Date().toLocaleDateString() } ${ new Date().toLocaleTimeString() }`,
    },
    {
      "id": uuidv4(),
      "image": faker.image.avatar(),
      "description": faker.lorem.words(10),
      "received": `${ new Date().toLocaleDateString() } ${ new Date().toLocaleTimeString() }`,
    },
  ]
}
//toLocaleDateString()"12/11/2012" При базовом использовании без указания локали возвращается строка, отформатированная в соответствии с локалью и опциями по умолчанию
// Метод toLocaleTimeString() возвращает строку с языкозависимым представлением части со временем в этой дате "7:00:00 PM"

router.get("/news", async (ctx) => {// при запросе /news с помощью метода get . Обяъвление роетера
  ctx.response.body = JSON.stringify(data); // етот запрос будет обработан этим обработчиком
  console.log(ctx.response.body, "result");
});

app.use(router.routes()).use(router.allowedMethods()) // важно отправить все сформированные роутеры в app.use
//routes этот метод работает также как мидл вейр позволяет внедрить синтаксис router в app.use в Koa
//////////////////////////////////////////////////////////

const port = process.env.PORT || 3000;
const server = http.createServer(app.callback());

server.listen(port);
console.log(`The server started on port ${port}`); 
