"use strict";
const isEmail = require("../../utils/isemail");
const Controller = require("egg").Controller;
const JWT = require("jsonwebtoken");

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    const user = ctx.request.body.values.user;
    const password = ctx.request.body.values.password;

    if (isEmail(user)) {
      console.log("isEmali");
      await ctx.model.User.findOne({
        userEmail: user,
      }).then((person) => {
        if (person !== null) {
          if (password == person.password) {
            const token = JWT.sign(
              {
                userId: person._id,
                userName: person.userName,
                userEmail: person.userEmail,
                role: person.role,
              },
              this.config.jwt.secret,
              {
                expiresIn: 3 * 24 * 60 * 60,
              }
            );
            ctx.set("authorization", token);
            ctx.set("Access-Control-Expose-Headers", "authorization");
            console.log("登录成功");
            ctx.body = {
              code: "200",
              data: {
                status: "8000",
                role: person.role,
                message: "登录成功",
              },
            };
          } else {
            ctx.body = {
              code: "200",
              data: {
                status: "8001",
                currentAuthority: "guest",
                message: "邮箱或密码错误",
              },
            };
          }
        } else {
          ctx.body = {
            code: "200",
            data: {
              status: "8001",
              currentAuthority: "guest",
              message: "邮箱或密码错误",
            },
          };
        }
      });
    } else {
      console.log("isname");
      await ctx.model.User.findOne({
        userName: user,
      }).then((person) => {
        if (person !== null) {
          if (password== person.password) {
            const token = JWT.sign(
              {
                userId: person._id,
                userName: person.userName,
                userEmail: person.userEmail,
                role: person.role,
              },
              this.config.jwt.secret,
              {
                expiresIn: 3 * 24 * 60 * 60,
              }
            );
            ctx.set("authorization", token);
            ctx.set("Access-Control-Expose-Headers", "authorization");

            ctx.body = {
              code: "200",
              data: {
                status: "8000",
                role: person.role,
                message: "登录成功",
              },
            };
          } else {
            ctx.body = {
              code: "200",
              data: {
                status: "8001",
                currentAuthority: "guest",
                message: "用户名或密码错误",
              },
            };
          }
        } else {
          ctx.body = {
            code: "200",
            data: {
              status: "8001",
              currentAuthority: "guest",
              message: "用户名或密码错误",
            },
          };
        }
      });
    }
  }
}

module.exports = LoginController;
