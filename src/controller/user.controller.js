class userController {
  async register(ctx, next) {
    ctx.body = '注册用户'
  }
  async login(ctx, next) {
    ctx.body = '登录用户'
  }
}

module.exports = new userController()
