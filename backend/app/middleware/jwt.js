const JWT = require('jsonwebtoken');


module.exports = options => {
  return async function (ctx, next) {
    // 拿到传会数据的header 中的token值
    const token = ctx.request.header.authorization;

    // 当前token值不存在的时候
    if (!token) {
      console.log('无口令')
      ctx.body = {
        code: '200',
        data: {
          status: '7000',
          message: '请重新登录'
        }
      };
      return;

    } else { // 当前token值存在
      let decode;
      try {
        // 验证当前token
        decode = JWT.verify(token, options.secret);
        if (!decode || !decode.userId) {
          console.log('口令无效')
          ctx.body = {
            code: '200',
            data: {
              status: '7001',
              message: '请重新登录'
            }
          };

          return;
        }
        if (Date.now() - decode.expire > 0) {
          console.log('口令过期')
          ctx.body = {
            code: '200',
            data: {
              status: '7002',
              message: '请重新登录'
            }
          };

          return;
        }
        const user = await ctx.model.User.find({
          _id: decode.userId,
        });
        if (user) {
          // console.log('找到用户id')
          await next();

        } else {
          console.log("无用户")
          ctx.body = {
            code: '200',
            data: {
              status: '7003',
              message: '请重新登录'
            }
          };

          return;
        }
      } catch (e) {
        console.log(e);
        ctx.body = {
          code: '200',
          data: {
            status: '7004',
            message: '请重试'
          }
        };

        return;
      }
    }
  };
};