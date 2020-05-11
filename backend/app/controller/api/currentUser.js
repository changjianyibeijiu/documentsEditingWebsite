"use strict";
const tokenparse = require("../../utils/tokenparse");
const Controller = require("egg").Controller;

class UserController extends Controller {
  async index() {
    const {
      ctx
    } = this;

    const token = ctx.request.header.authorization;
    const userId = tokenparse(token, ctx.app.config.jwt.secret);

    await ctx.model.User.findById({
      _id: userId,
    }).then(async (person) => {
      // console.log(person);
      let json = {
        code: "200",
        data: {
          userName: person.userName,
          avatar: person.avatar,
          userId: person._id,
          userEmail: person.userEmail,
          role: person.role,
        },
      };
      ctx.body = json;
    });
  }

  async myDoc() {
    const {
      ctx
    } = this;
    // console.log(ctx.query.results);

    const token = ctx.request.header.authorization;
    const userId = tokenparse(token, ctx.app.config.jwt.secret);

    await ctx.model.User.findById({
      _id: userId,
    }).then(async (person) => {
      // console.log(person);

      let arr = [];

      let folder = person.folder
        .filter((item) => {
          return item.delete == false && item.rm == false;
        })
        .map((item) => {
          return {
            name: item.name,
            icon: item.icon,
            folderId: item._id,
            createTime: item.createTime,
            edittTime: item.editTime,
            share: item.share,
            doc: item.doc
              .filter((item) => item.delete == false && item.rm == false)
              .map((item) => {
                return {
                  name: item.name,
                  icon: item.icon,
                  id: item._id,
                  createTime: item.createTime,
                  editTime: item.editTime,
                  share: item.share,
                  type: item.type,
                };
              })
              .reverse(),
          };
        })
        .reverse();

      let doc = person.doc
        .filter((item) => {
          return item.delete == false && item.rm == false;
        })
        .map((item) => {
          return {
            name: item.name,
            icon: item.icon,
            id: item._id,
            createTime: item.createTime,
            editTime: item.editTime,
            share: item.share,
            type: item.type,
          };
        })
        .reverse();

      arr = arr.concat(folder, doc);

      let json = {
        code: "200",
        messege: "数据获取成功",

        data: [
          ...arr.slice(
            ctx.query.results * ctx.query.time - ctx.query.results,
            ctx.query.results * ctx.query.time
          ),
        ],
      };
      ctx.body = json;
    });
  }

  async recently() {
    const {
      ctx
    } = this;
    // console.log(ctx.query.results);

    const token = ctx.request.header.authorization;
    const userId = tokenparse(token, ctx.app.config.jwt.secret);

    await ctx.model.User.findById({
      _id: userId,
    }).then(async (person) => {
      // console.log(person);
      // console.log(person);
      let arr = [];

      // let docList = [];
      // let folderDoc = person.folder.filter((item) => {
      //   console.log(item);
      //   return item.delete == false;
      // }).map(item=>{
      //   docList.concat(item.doc);
      // });
      // docList.filter((doc) => doc.delete == false).map((doc) => {
      //   return {
      //     name: doc.name,
      //     icon: doc.icon,
      //     id: doc._id,
      //     createTime: doc.createTime,
      //     editTime: doc.editTime,
      //     share: doc.share,
      //     type: doc.type,
      //   }
      // }).filter(item=>item);

      let folderDoc=[];
      person.folder
        .filter((item) => {
          // console.log(item);
          return item.delete == false && item.rm == false;
        })
        .map((item) => {
          // console.log(item);
          item.doc
            .filter((doc) => doc.delete == false && item.rm == false)
            .map((doc) => {
              folderDoc = folderDoc.concat({
                name: doc.name,
                icon: doc.icon,
                id: doc._id,
                createTime: doc.createTime,
                editTime: doc.editTime,
                share: doc.share,
                type: doc.type,
                folderId: item._id,
              });
            })
        })

      // console.log(folderDoc);
      console.log("folderDoc");
      console.log(folderDoc);
      // let docList = [];
      // folderDoc.map((item) => {
      //   docList.concat(item);
      // });

      // console.log('docList');
      // console.log(docList);
      let doc = person.doc
        .filter((item) => {
          // console.log(item);
          return item.delete == false && item.rm == false;
        })
        .map((item) => {
          // console.log(item);
          return {
            name: item.name,
            icon: item.icon,
            id: item._id,
            createTime: item.createTime,
            editTime: item.editTime,
            share: item.share,
            type: item.type,
          };
        });

      // console.log(doc);
      arr = arr.concat(folderDoc, doc);
      arr = arr.sort(function (a, b) {
        return Number(b.editTime) - Number(a.editTime);
      });

      // console.log(arr);
      let json = {
        code: "200",
        messege: "数据获取成功",

        data: [
          ...arr.slice(
            ctx.query.results * ctx.query.time - ctx.query.results,
            ctx.query.results * ctx.query.time
          ),
        ],
      };
      ctx.body = json;
    });
  }

  async shareList() {
    const {
      ctx
    } = this;
    console.log(ctx.query.results);

    const token = ctx.request.header.authorization;
    const userId = tokenparse(token, ctx.app.config.jwt.secret);

    await ctx.model.User.findById({
      _id: userId,
    }).then(async (person) => {
      let arr = [];

      let folder = person.folder
        .filter((item) => {
          return item.delete == false && item.share == true && item.rm == false;
        })
        .map((item) => {
          return {
            name: item.name,
            icon: item.icon,
            folderId: item._id,
            createTime: item.createTime,
            editTime: item.editTime,
            share: item.share,
            doc: item.doc
              .filter((item) => item.delete == false && item.rm == false)
              .map((item) => {
                return {
                  name: item.name,
                  icon: item.icon,
                  id: item._id,
                  createTime: item.createTime,
                  editTime: item.editTime,
                  share: item.share,
                  type: item.type,
                };
              })
              .reverse(),
          };
        })
        .reverse();

      let doc = person.doc
        .filter((item) => {
          return item.delete == false && item.share && item.rm == false;
        })
        .map((item) => {
          return {
            name: item.name,
            icon: item.icon,
            id: item._id,
            createTime: item.createTime,
            edittTime: item.editTime,
            share: item.share,
            type: item.type,
          };
        })
        .reverse();

      arr = arr.concat(folder, doc);

      let json = {
        code: "200",
        messege: "数据获取成功",

        data: [
          ...arr.slice(
            ctx.query.results * ctx.query.time - ctx.query.results,
            ctx.query.results * ctx.query.time
          ),
        ],
      };
      ctx.body = json;
    });
  }

  async recycleBinList() {
    const {
      ctx
    } = this;
    console.log(ctx.query.results);

    const token = ctx.request.header.authorization;
    const id = tokenparse(token, ctx.app.config.jwt.secret);
    console.log(id);

    await ctx.model.User.findById({
      _id: id,
    }).then(async (person) => {
      // console.log(person);

      let arr = [];

      let folder = person.folder
        .filter((item) => {
          return item.delete == true && item.rm == false;
        })
        .map((item) => {
          return {
            name: item.name,
            icon: item.icon,
            folderId: item._id,
            createTime: item.createTime,
            eidtTime: item.eidtTime,
            share: item.share,
            doc: item.doc
              .filter((item) => item.delete == false && item.rm == false)
              .map((item) => {
                return {
                  name: item.name,
                  icon: item.icon,
                  id: item._id,
                  createTime: item.createTime,
                  eidtTime: item.eidtTime,
                  share: item.share,
                  type: item.type,
                };
              })
              .reverse(),
          };
        })
        .reverse();

      let doc = person.doc
        .filter((item) => {
          return item.delete == true && item.rm == false;
        })
        .map((item) => {
          return {
            name: item.name,
            icon: item.icon,
            id: item._id,
            createTime: item.createTime,
            eidtTime: item.eidtTime,
            share: item.share,
            type: item.type,
          };
        })
        .reverse();

      arr = arr.concat(folder, doc);

      let json = {
        code: "200",
        messege: "数据获取成功",

        data: [
          ...arr.slice(
            ctx.query.results * ctx.query.time - ctx.query.results,
            ctx.query.results * ctx.query.time
          ),
        ],
      };
      ctx.body = json;
    });
  }

  async findList() {
    const {
      ctx
    } = this;
    console.log("查找");

    const token = ctx.request.header.authorization;
    const userId = tokenparse(token, ctx.app.config.jwt.secret);

    await ctx.model.User.find()
      .select("userName avatar userEmail doc folder")
      .then((data) => {
        console.log(data);

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
            console.log(item);
            arr = arr.concat(item);
            console.log("arr");
            console.log(arr);
          });
        // console.log(data);
        console.log(arr);
        arr = arr.sort(function (a, b) {
          return Number(b.editTime) - Number(a.editTime);
        });
        // console.log(data[0].doc);
        // console.log(data[0].folder);
        let json = {
          code: "200",
          messege: "数据获取成功",

          data: [
            ...arr.slice(
              ctx.query.results * ctx.query.time - ctx.query.results,
              ctx.query.results * ctx.query.time
            ),
          ],
        };
        ctx.body = json;
      });
  }
}

module.exports = UserController;