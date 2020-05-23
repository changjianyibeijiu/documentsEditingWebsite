'use strict';

const Controller = require('egg').Controller;

class RegisterController extends Controller {
  async index() {
    const {
      ctx
    } = this;
    const data = ctx.request.body;
    ////console.log(data);

    await ctx.model.User.findOne({
      userEmail: ctx.request.body.values.userEmail
    }).then(async person => {
      ////console.log(person);
      if (person) {
        const json = {
          code: '200',
          data: {
            status: "9002",
            message: 'email已注册'
          }
        };
        ctx.body = json;
        ////console.log('邮箱已被注册');
      } else {
        await ctx.model.User.findOne({
          userName: ctx.request.body.values.userName
        }).then(async person => {
          ////console.log(person);
          if (person) {
            ctx.body = {
              code: '200',
              data: {
                status: '9001',
                message: '用户名已注册'
              }
            };
            ////console.log('用户名已被注册');
          } else {
            person = {
              userEmail: data.values.userEmail,
              password: data.values.password,
              userName: data.values.userName,

            };

            await ctx.model.User.create([person]).then(() => {
                ctx.body = {
                  code: '200',
                  data: {
                    status: '9000',
                    role: 'user',
                  }
                };
                ////console.log('注册成功');

              },
              err => {
                ctx.body = {
                  code: '200',
                  data: {
                    status: '9003',
                    message: '请重试！',
                  }
                };

              }
            );

          }
        });


      }
    });
  }
}

module.exports = RegisterController;