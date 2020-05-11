'use strict';

const Controller = require('egg').Controller;
const tokenparse = require('../../utils/tokenparse');

class FolderController extends Controller {
  async index() {
    const {
      ctx
    } = this;
    const token = ctx.request.header.authorization;
    const userId = tokenparse(token, ctx.app.config.jwt.secret);

    const folder = ctx.request.body.folder;
    const share = ctx.request.body.share;
    const createTime = ctx.request.body.createTime;
    const editTime = ctx.request.body.editTime;


    if (share == true) {
      await ctx.model.User.findById({
        _id: userId
      }).then(async person => {
        person.folder.push({
          name: folder,
          createTime: createTime,
          editTime: editTime,
          share: true
        });
        await person.save().then(async (data) => {
          console.log("共享文件夹创建成功");
          await ctx.model.Share.find().then(async data => {
            if (!data[0]) {
              await ctx.model.Share.create([{
                doc: [],
                folder: [{
                  userName: person.userName,
                  userEmail: person.userEmail,
                  avatar: person.avatar,
                  name: folder,
                  createTime: createTime,
                  editTime: editTime,
                }]
              }]).then(() => {
                console.log('创建共享集合');
                console.log(data);
                console.log("以分享");
                ctx.body = {
                  code: "200",
                  data: {
                    message: "成功创建共享文件夹",
                  }
                };

              });
            } else {
              console.log(data);
              data[0].folder.push({
                userName: person.userName,
                userEmail: person.userEmail,
                avatar: person.avatar,
                name: folder,
                createTime: createTime,
                editTime: editTime,
              });
              await data[0].save().then((data) => {
                console.log("以分享");
                ctx.body = {
                  code: "200",
                  data: {
                    message: "成功创建共享文件夹",
                  }
                };
              });
            }
          });

        });

      });

    } else {
      await ctx.model.User.findById({
        _id: userId
      }).then(async person => {
        person.folder.push({
          name: folder,
          createTime: createTime,
          editTime: editTime,
          share: false
        });
        await person.save().then((data) => {
          console.log("个人文件夹创建成功");

          ctx.body = {
            code: "200",
            data: {
              message: "成功创建文件夹",
            }
          };
        });

      });

    }

  }

  async folderList() {
    const {
      ctx
    } = this;
    // console.log(ctx.query.results);


    const token = ctx.request.header.authorization;
    const userId = tokenparse(token, ctx.app.config.jwt.secret);


    await ctx.model.User.findById({
      _id: userId
    }).then(async person => {
      // console.log(person);

      for (let i = 0; i < person.folder.length; i++) {
        if (person.folder[i]._id == ctx.query.folderId) {
          console.log("找到文件夹");
          let doc = person.folder[i].doc.filter((item) => {
            return item.delete == false;
          }).map((item) => {
            return {
              name: item.name,
              icon: item.icon,
              id: item._id,
              createTime: item.createTime,
              editTime: item.editTime,
              share: item.share,
              type: item.type
            }
          }).reverse();

          console.log("doc");
          console.log(doc);
          let json = {
            code: '200',
            messege: '数据获取成功',

            data: [...doc.slice(ctx.query.results * ctx.query.time - ctx.query.results, ctx.query.results * ctx.query.time)]

          }
          ctx.body = json;
          break;

        } 
        else {
          ctx.body = {
            code: "200",
            message: "无此文件夹",

            data: []
          };
        }
      }




    })
  }
}

module.exports = FolderController;