'use strict';
// import tokenparse from '../../utils/tokenparse';
const Controller = require('egg').Controller;
const tokenparse = require('../../utils/tokenparse');
const createfile = require('../../utils/file');
var path = require("path")
var fs = require("fs");
//故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');


class UserCenterController extends Controller {
    async upAvatar() {
        const {
            ctx
        } = this;

        console.log('保持文件')
        const token = this.ctx.request.header.authorization;
        const userId = tokenparse(token, this.ctx.app.config.jwt.secret);
        // console.log(id);
        const user = userId.slice(9);
        // 获取文件流
        const stream = await this.ctx.getFileStream();
        // 定义文件名
        const filename = Date.now() + path.extname(stream.filename).toLocaleLowerCase();
        // 目标文件
        const target = path.join(`app/public/${user}`, filename);
        //
        console.log(target);
        createfile(target);
        const writeStream = fs.createWriteStream(target);
        console.log('-----------获取表单中其它数据 start--------------');
        console.log(stream.fields);
        console.log('-----------获取表单中其它数据 end--------------');
        try {
            //异步把文件流 写入
            console.log('正在写入')
            await awaitWriteStream(stream.pipe(writeStream));
            console.log("写入成功")

            await this.ctx.model.User.findByIdAndUpdate(userId, {
                avatar: `http://127.0.0.1:7001/public/${user}/${filename}`
            }, function (err, res) {
                if (err) {
                    console.log("Error:" + err);
                } else {
                    console.log("Res:" + res);
                    ctx.body = {
                        code: '200',
                        data: {
                            url: `/public/${user}/${filename}`,
                            messege: "更新成功"
                        }
                    }

                }
            });

        } catch (err) {
            //如果出现错误，关闭管道
            await sendToWormhole(stream);
            // 自定义方法
            console.log('写入失败')
            ctx.body = {
                code: '200',
                data: {
                    messege: "更新头像失败"
                }
            }
        }
        // 自定义方法
    }

    async upUserInfo() {
        const { ctx } = this;
        const data = ctx.request.body;
        console.log(data);
        const token = this.ctx.request.header.authorization;
        const userId = tokenparse(token, this.ctx.app.config.jwt.secret);
        // console.log(id);
       if(data.userName&&data.userEmail){


        await ctx.model.User.findOne({ userEmail: ctx.request.body.userEmail }).then(async person => {
            // console.log(person);
            if (person) {
              const json = {code:'200',data:{ status: "9002", message: 'email已注册' }};
              ctx.body = json;
            //   console.log('邮箱已被注册');
            } else {
              await ctx.model.User.findOne({ userName: ctx.request.body.userName }).then(async person => {
                // console.log(person);
                if (person) {
                  ctx.body = {code:'200', data:{status: '9001', message: '用户名已注册' }};
                //   console.log('用户名已被注册');
                } else {
                  
                    await this.ctx.model.User.findByIdAndUpdate(userId, {
                        userName: data.userName,
                        userEmail:data.userEmail,
                    }, function (err, res) {
                        if (err) {
                            console.log("Error:" + err);
                            ctx.body = {
                                code: '200',
                                data: {
                                    status:'6001',
                                    messege: "更新失败"
                                }
                            }
                        } else {
                            console.log("Res:" + res);
                            ctx.body = {
                                code: '200',
                                data: {
                                    status:'6000',
                                    messege: "更新成功"
                                }
                            }
            
                        }
                    });
                 
      
                }
              });
      
      
            }
          });

       
       }
       else{
        ctx.body = {
            code: '200',
            data: {
                status:'6002',
                messege: "请输入正确用户名和邮箱"
            }
        }
       }

        
      }



      async upUserPassword() {
        const { ctx } = this;
        const data = ctx.request.body;
        console.log(data);
        const token = this.ctx.request.header.authorization;
        const userId = tokenparse(token, this.ctx.app.config.jwt.secret);
        // console.log(id);
        if(data.password.length>=6){
            await this.ctx.model.User.findByIdAndUpdate(userId, {
                password: data.password
            }, function (err, res) {
                if (err) {
                    console.log("Error:" + err);
                    ctx.body = {
                        code: '200',
                        data: {
                            status:'6004',
                            messege: "更新失败"
                        }
                    }
                } else {
                    console.log("Res:" + res);
                    ctx.body = {
                        code: '200',
                        data: {
                            status:'6003',
                            messege: "更新成功"
                        }
                    }
    
                }
            });
        }
        else{
            ctx.body = {
                code: '200',
                data: {
                    status:'6005',
                    messege: "请输入6位或以上密码"
                }
            }
        }
     

      }


}

module.exports = UserCenterController;