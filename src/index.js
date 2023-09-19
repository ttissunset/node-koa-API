const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  ctx.body = 'hello koa-api'
})

app.listen(3000, () => {
  console.log('Serve is running on http://localhost:3000')
})
