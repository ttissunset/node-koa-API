# node-koa-API
通过koa框架搭建的API服务

## 目录结构：
- src/app :  http服务模块，存放与服务搭建的框架的有关内容
- src/config : 配置文件模块，读取.env配置文件并写入process.env环境变量
- src/constant : 常量模块，定义需要多次使用的常量
- src/controller : 路由管理模块，对路由请求进行处理
- src/db : 数据库模块，进行数据库的链接
- src/middleware : 中间件模块，抽离中间件降低耦合提高复用
- src/model : 模型模块，定义模型映射数据表 
- src/router : 路由模块，存放不同的路由
- src/service : 数据库操作模块，完成对数据库的操作
- index.js : 项目入口文件
- .env : 配置文件，定义环境变量
