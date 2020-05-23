"use strict";
const tokenparse = require("../../utils/tokenparse");
const Controller = require("egg").Controller;

class UserController extends Controller {


  async index() {
    const {
      ctx
    } = this;
    ////console.log("查找");

    const token = ctx.request.header.authorization;
    const userId = tokenparse(token, ctx.app.config.jwt.secret);
    const searchData = ctx.request.body.searchData;

    await ctx.model.User.find()
      .select("userName avatar userEmail doc folder")
      .then((data) => {
        ////console.log(data);

        let arr = [];
        data
          .map((item) => {
            // return {doc:item.doc.filter((doc)=>{return doc.share&&!doc.delete&&!doc.rm}).map((doc)=>{return {name:doc.name,type:doc.type,icon:doc.icon,id:doc._id,createTime:doc.createTime,editTime:doc.editTime,userName:item.userName,userEmail:item.userEmail,avatar:item.avatar}}),
            // folder:item.folder.filter((doc)=>{return doc.share&&!doc.delete&&!doc.rm}).map((doc)=>{return {name:doc.name,icon:doc.icon,id:doc._id,createTime:doc.createTime,editTime:doc.editTime,userName:item.userName,userEmail:item.userEmail,avatar:item.avatar,doc:doc.doc}}),
            return item.doc
              .filter((doc) => {
                return doc.share && !doc.delete && !doc.rm;
              })
              .map((doc) => {
                return {
                  name: doc.name,
                  type: doc.type,
                  icon: doc.icon,
                  id: doc._id,
                  createTime: doc.createTime,
                  editTime: doc.editTime,
                  userName: item.userName,
                  userEmail: item.userEmail,
                  avatar: item.avatar,
                };
              })
              .concat(
                item.folder
                .filter((doc) => {
                  return doc.share && !doc.delete && !doc.rm;
                })
                .map((doc) => {
                  return {
                    name: doc.name,
                    icon: doc.icon,
                    folderId: doc._id,
                    createTime: doc.createTime,
                    editTime: doc.editTime,
                    userName: item.userName,
                    userEmail: item.userEmail,
                    avatar: item.avatar,
                    doc: doc.doc,
                  };
                })
              );
          })
          .map((item) => {
            ////console.log(item);
            arr = arr.concat(item);
            // ////console.log("arr");
            // ////console.log(arr);
          });
        // ////console.log(data);
        // ////console.log(arr);
        arr = arr.sort(function (a, b) {
          return Number(b.editTime) - Number(a.editTime);
        });

        arr = arr.filter(item=>{
          return item.name.search(searchData)!=-1;
        });
        ////console.log(arr);
        // ////console.log(data[0].doc);
        // ////console.log(data[0].folder);
        let json = {
          code: "200",
          messege: "数据获取成功",

          data: [
            ...arr.slice(
              ctx.request.body.results * ctx.request.body.time - ctx.request.body.results,
              ctx.request.body.results * ctx.request.body.time
            ),
          ],
        };
        ctx.body = json;
      });
  }
}

module.exports = UserController;