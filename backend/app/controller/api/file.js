"use strict";
const tokenparse = require("../../utils/tokenparse");
const Controller = require("egg").Controller;
const fs = require("fs");
const createfile = require("../../utils/file");
const path = require("path");

class FileController extends Controller {
  async index() {
    const {
      ctx,
      app
    } = this;
    const mongoose = app.mongoose;
    const token = ctx.request.header.authorization;
    const userId = tokenparse(token, app.config.jwt.secret);

    let id = ctx.request.body.id;
    let type = ctx.request.body.type;
    let data = ctx.request.body.data;
    let folderId = ctx.request.body.folderId;

    await ctx.model.User.findById(userId).then(
      async (person) => {
          // console.log(person);
          console.log("保存文件");
          // console.log(ctx.request.body);

          if (id) {
            //如果id存在，文件夹不在，则修改文件
            // 获取文件地址
            let filepath;
            if (folderId.toString() != 'false') {
              console.log("foleId" + folderId)
              for (let i = 0; i < person.folder.length; i++) {
                if (person.folder[i]._id == folderId) {
                  console.log("找到文件夹");

                  for (let y = 0; y < person.folder[i].doc.length; y++) {
                    if (person.folder[i].doc[y]._id == id) {
                      console.log("找到文件夹id");

                      filepath = person.folder[i].doc[y].path;

                      console.log('文件路径' + filepath);

                      fs.writeFile(filepath, data.content, function (err) {
                        if (err) {
                          ctx.body = {
                            code: "200",
                            data: {
                              message: "保存失败",
                            },
                          };

                          return console.error(err);
                        }
                        console.log("数据写入成功！");
                      });

                      person.folder[i].doc[y].editTime = data.editTime;
                      person.folder[i].doc[y].name = data.name;

                      await person.save().then((data) => {
                        console.log("数据保存成功");

                        ctx.body = {
                          code: "200",
                          data: {
                            message: "修改成功",
                            id: person.folder[i].doc[y]._id,
                            folderId: person.folder[i]._id
                          },
                        };
                      });
                      break;
                    } else {
                      ctx.body = {
                        code: "200",
                        data: {
                          message: "无此文件夹",
                        },
                      };
                    }
                  }
                  break;
                } else {
                  ctx.body = {
                    code: "200",
                    data: {
                      message: "无此文件",
                    },
                  };
                }
              }
            } else {
              for (let i = 0; i < person.doc.length; i++) {
                if (person.doc[i]._id == id) {
                  console.log("找到文件id");
                  filepath = person.doc[i].path;
                  //将文件保存到磁盘
                  fs.writeFile(filepath, data.content, function (err) {
                    if (err) {
                      ctx.body = {
                        code: "200",
                        data: {
                          message: "保存失败",
                        },
                      };

                      return console.error(err);
                    }
                    console.log("数据写入成功！");
                  });

                  person.doc[i].editTime = data.editTime;
                  person.doc[i].name = data.name;

                  await person.save().then((data) => {
                    console.log("数据保存成功");

                    ctx.body = {
                      code: "200",
                      data: {
                        message: "修改成功",
                        id: person.doc[i]._id,

                      },
                    };
                  });
                  break;
                } else {
                  ctx.body = {
                    code: "200",
                    data: {
                      message: "无此文件",
                    },
                  };
                }
              }
            }
          } else {
            //如果docid不存在，则添加文件
            console.log('文件id' + id);

            // 定义文件名
            const user = userId.slice(9);
            const filename = Date.now() + Math.round(Math.random() * 1000000).toString();
            // 目标文件
            let filepath;
            if (type == "word") {
              filepath = path.join(`app/azz/${user}/doc`, filename + ".word");
            } else if (type == "md") {
              filepath = path.join(`app/azz/${user}/doc`, filename + ".md");
            } else if (type == "mind") {
              filepath = path.join(`app/azz/${user}/doc`, filename + ".mind");
            } else if (type == "flow") {
              filepath = path.join(`app/azz/${user}/doc`, filename + ".flow");
            } else if (type == "excel") {
              filepath = path.join(`app/azz/${user}/doc`, filename + ".excel");
            } else {
              filepath = path.join(`app/azz/${user}/doc`, filename + ".word");
            }

            // try{

            // }
            // catch{

            // }
            createfile(filepath);

            console.log("data.content:" + data.content);
            //将文件保存到磁盘
            fs.writeFile(filepath, data.content, function (err) {
              if (err) {
                ctx.body = {
                  code: "200",
                  data: {
                    message: "保存失败",
                  },
                };
                return console.error(err);
              }
              console.log("数据写入成功！");
              //   fs.readFile(target, function (err, data) {
              //     if (err) {
              //       return console.error(err);
              //     }
              //     console.log("异步读取文件数据: " + data.toString());
              //   });
            });

            if (folderId != false) {
              console.log("folderId" + folderId);
              for (let i = 0; i < person.folder.length; i++) {
                if (person.folder[i]._id == folderId) {
                  console.log("找到文件夹");
                  let docdata = {
                    type: type,
                    name: data.name,
                    path: filepath,
                    createTime: data.createTime,
                    editTime: data.editTime.toString(),
                  };

                  console.log('docdata' + docdata);

                  console.log(person.folder[i]);

                  person.folder[i].doc.push(docdata);
                  console.log(person.folder[i].doc);

                  await person.save().then((data) => {
                    console.log("数据保存成功");
                    console.log(person.folder[i].doc);
                    console.log(i);
                    ctx.body = {
                      code: "200",
                      data: {
                        folderId: person.folder[i]._id,
                        // type:person.folder[i].doc[person.folder[i].doc.length-1].type,
                        // share:person.folder[i].doc[person.folder[i].doc.length-1].share,
                        // id:person.folder[i].doc[person.folder[i].doc.length-1]._id,
                        // name:person.folder[i].doc[person.folder[i].doc.length-1].name,
                        // icon:person.folder[i].doc[person.folder[i].doc.length-1].icon,
                        // createTime:person.folder[i].doc[person.folder[i].doc.length-1].createTime,
                        // editTime: person.folder[i].doc[person.folder[i].doc.length-1].editTime,
                        message: "保存成功",

                      },

                    };
                  });
                } else {
                  ctx.body = {
                    code: "200",
                    data: {
                      message: "无此文件夹",
                    },
                  };
                }
              }
            } else {
              let docdata = {
                type: type,
                name: data.name,
                path: filepath,
                createTime: data.createTime,
                editTime: data.editTime,
              };

              person.doc.push(docdata);

              await person.save().then((data) => {
                console.log("数据保存成功");

                ctx.body = {
                  code: "200",
                  data: {
                    message: "保存成功",
                    id: person.doc[person.doc.length - 1]._id,

                  },
                };
              });
            }
          }
        },
        (err) => {
          ctx.body = {
            code: "200",
            data: {
              message: "保存失败",
            },
          };
        }
    );
  }
  async readFile() {
    const {
      ctx,
      app
    } = this;
    const id = ctx.query.id;
    const folderId = ctx.query.folderId;

    console.log(ctx.query);

    const token = ctx.request.header.authorization;
    const userId = tokenparse(token, app.config.jwt.secret);

    await ctx.model.User.findOne({
      _id: userId,
    }).then(
      async (person) => {
          if (folderId != 'false') {
            console.log('folderId:' + folderId);
            for (let i = 0; i < person.folder.length; i++) {
              if (person.folder[i]._id == folderId) {
                for (let x = 0; x < person.folder[i].doc.length; x++) {
                  if (person.folder[i].doc[x]._id == id) {
                    let filepath = person.folder[i].doc[x].path;
                    var data = fs.readFileSync(filepath);
                    console.log("同步读取: " + data.toString());
                    ctx.body = {
                      code: "200",
                      data: {
                        content: data.toString(),
                        message: "读取成功",
                        name: person.folder[i].doc[x].name,
                        id: person.folder[i].doc[x]._id,
                        createTime: person.folder[i].doc[x].createTime,
                        folderId: person.folder[i]._id,
                      },
                    };
                    break;
                  } else {
                    ctx.body = {
                      code: "200",
                      data: {
                        message: "读取失败",
                      },
                    };
                  }
                }
                break;
              } else {
                ctx.body = {
                  code: "200",
                  data: {
                    message: "读取失败",
                  },
                };
              }
            }
          } else {
            for (let x = 0; x < person.doc.length; x++) {
              if (person.doc[x]._id == id) {
                let filepath = person.doc[x].path;
                var data = fs.readFileSync(filepath);
                console.log("同步读取: " + data.toString());
                ctx.body = {
                  code: "200",
                  data: {
                    content: data.toString(),
                    message: "读取成功",
                    name: person.doc[x].name,
                    id: person.doc[x]._id,
                    createTime: person.doc[x].createTime,
                  },
                };
                break;
              } else {
                ctx.body = {
                  code: "200",
                  data: {
                    message: "读取失败",
                  },
                };
              }
            }
          }
        },
        (err) => {
          ctx.body = {
            code: "200",
            data: {
              message: "读取失败",
            },
          };
        }
    );
  }


  async delete() {
    const {
      ctx,
      app
    } = this;
    const token = ctx.request.header.authorization;
    const userId = tokenparse(token, app.config.jwt.secret);


    let id = ctx.request.body.data.id;
    let folderId = ctx.request.body.data.folderId;


    console.log("id:"+ id);
    console.log("folderId:"+folderId);

    if (id&&folderId) {

      console.log('删除文件夹中文档');

      await ctx.model.User.findById({
        _id: userId
      }).then(async person => {
       
      
        for (let i = 0; i < person.folder.length; i++) {
          if (person.folder[i]._id == folderId) {
            console.log("找到文件夹");

            for (let y = 0; y < person.folder[i].doc.length; y++) {
              if (person.folder[i].doc[y]._id == id) {
                console.log("找到文件夹id");

                person.folder[i].doc[y].delete =true;

                await person.save().then(async (data) => {
                  console.log("文件删除成功");
                  ctx.body = {code: '200',data:{message:'成功删除'}}
        
                });
              }
            }
          }
          break;
        }



      });

    } else if(id&&!folderId){
      console.log('删除文档');

      await ctx.model.User.findById({
        _id: userId
      }).then(async person => {
       
      
        for (let i = 0; i < person.doc.length; i++) {
          if (person.doc[i]._id == id) {
            console.log("找到文件");

            person.doc[i].delete =true;

                await person.save().then(async (data) => {
                  console.log("文件删除成功");
                  ctx.body = {code: '200',data:{message:'成功删除'}}
        
                });
                break;
          }
          ctx.body = {code: '200',data:{message:'删除失败'}}

        }



      });


  }else{
    console.log('删除文件夹');

    await ctx.model.User.findById({
      _id: userId
    }).then(async person => {
     
    
      for (let i = 0; i < person.folder.length; i++) {
        if (person.folder[i]._id == folderId) {
          console.log("找到文件夹");
          person.folder[i].delete =true;

          await person.save().then(async (data) => {
            console.log("文件删除成功");
            ctx.body = {code: '200',data:{message:'成功删除'}}
  
          });
          break;
          }
        
      }



    });
  }
  }



  async restore() {
    const {
      ctx,
      app
    } = this;
    const token = ctx.request.header.authorization;
    const userId = tokenparse(token, app.config.jwt.secret);


    let id = ctx.request.body.data.id;
    let folderId = ctx.request.body.data.folderId;




    if (id&&folderId) {

      console.log('还原文件夹中文档');

      await ctx.model.User.findById({
        _id: userId
      }).then(async person => {
       
      
        for (let i = 0; i < person.folder.length; i++) {
          if (person.folder[i]._id == folderId) {
            console.log("找到文件夹");

            for (let y = 0; y < person.folder[i].doc.length; y++) {
              if (person.folder[i].doc[y]._id == id) {
                console.log("找到文件夹id");

                person.folder[i].doc[y].delete =false;

                await person.save().then(async (data) => {
                  console.log("文件还原成功");
                  ctx.body = {code: '200',data:{message:'成功还原'}}
        
                });
                break;
              }
            }
            break;
          }
        }



      });

    } else if(id&&!folderId){
      console.log('还原文档');

      await ctx.model.User.findById({
        _id: userId
      }).then(async person => {
       
      
        for (let i = 0; i < person.doc.length; i++) {
          if (person.doc[i]._id == id) {
            console.log("找到文件");

            person.doc[i].delete =false;

                await person.save().then(async (data) => {
                  console.log("文件还原成功");
                  ctx.body = {code: '200',data:{message:'成功还原'}}
        
                });
                break;
          }
        }



      });


  }else{
    console.log('还原文件夹');

    await ctx.model.User.findById({
      _id: userId
    }).then(async person => {
     
    
      for (let i = 0; i < person.folder.length; i++) {
        if (person.folder[i]._id == folderId) {
          console.log("找到文件夹");
          person.folder[i].delete =false;

          await person.save().then(async (data) => {
            console.log("文件还原成功");
            ctx.body = {code: '200',data:{message:'成功还原'}}
  
          });
break;
          }
        
      }



    });
  }
}

async share() {
  const {
    ctx,
    app
  } = this;

  const token = ctx.request.header.authorization;
  const userId = tokenparse(token, app.config.jwt.secret);


  let id = ctx.request.body.data.id;
  let folderId = ctx.request.body.data.folderId;




  if (id&&folderId) {

    console.log('分享文件夹中文档');

    await ctx.model.User.findById({
      _id: userId
    }).then(async person => {
     
    
      for (let i = 0; i < person.folder.length; i++) {
        if (person.folder[i]._id == folderId) {
          console.log("找到文件夹");

          for (let y = 0; y < person.folder[i].doc.length; y++) {
            if (person.folder[i].doc[y]._id == id) {
              console.log("找到文件夹id");

              person.folder[i].doc[y].share =true;

              await person.save().then(async (data) => {
                console.log("文件分享成功");
                ctx.body = {code: '200',data:{message:'成功分享'}}
      
              });
              // ctx.model.Share.find().then(data=>{

              // });
              break;
            }
          }
          break;
        }
      }



    });

  } else if(id&&!folderId){
    console.log('分享文档');

    await ctx.model.User.findById({
      _id: userId
    }).then(async person => {
     
    
      for (let i = 0; i < person.doc.length; i++) {
        if (person.doc[i]._id == id) {
          console.log("找到文件");

          person.doc[i].share =true;

              await person.save().then(async (data) => {
                console.log("文件分享成功");
                ctx.body = {code: '200',data:{message:'成功分享'}}
      
              });
              break;
        }
      }



    });


}else{
  console.log('分享文件夹');

  await ctx.model.User.findById({
    _id: userId
  }).then(async person => {
   
  
    for (let i = 0; i < person.folder.length; i++) {
      if (person.folder[i]._id == folderId) {
        console.log("找到文件夹");
        person.folder[i].share =true;

        await person.save().then(async (data) => {
          console.log("文件分享成功");
          ctx.body = {code: '200',data:{message:'成功分享'}}

        });
        break;
        }
      
    }



  });
}
}



async unshare() {
  const {
    ctx,
    app
  } = this;
  const token = ctx.request.header.authorization;
  const userId = tokenparse(token, app.config.jwt.secret);


  let id = ctx.request.body.data.id;
  let folderId = ctx.request.body.data.folderId;




  if (id&&folderId) {

    console.log('取消分享文件夹中文档');

    await ctx.model.User.findById({
      _id: userId
    }).then(async person => {
     
    
      for (let i = 0; i < person.folder.length; i++) {
        if (person.folder[i]._id == folderId) {
          console.log("找到文件夹");

          for (let y = 0; y < person.folder[i].doc.length; y++) {
            if (person.folder[i].doc[y]._id == id) {
              console.log("找到文件夹id");

              person.folder[i].doc[y].share =false;

              await person.save().then(async (data) => {
                console.log("取消分享成功");
                ctx.body = {code: '200',data:{message:'取消分享成功'}}
      
              });
              break;
            }
          }
          break;
        }
      }



    });

  } else if(id&&!folderId){
    console.log('取消分享文件');

    await ctx.model.User.findById({
      _id: userId
    }).then(async person => {
     
    
      for (let i = 0; i < person.doc.length; i++) {
        if (person.doc[i]._id == id) {
          console.log("找到文件");

          person.doc[i].share =false;

              await person.save().then(async (data) => {
                console.log("取消分享成功");
                ctx.body = {code: '200',data:{message:'取消分享成功'}}
      
              });
              break;
        }
      }



    });


}else{
  console.log('取消分享文件夹');

  await ctx.model.User.findById({
    _id: userId
  }).then(async person => {
   
  
    for (let i = 0; i < person.folder.length; i++) {
      if (person.folder[i]._id == folderId) {
        console.log("找到文件夹");
        person.folder[i].share =false;

        await person.save().then(async (data) => {
          console.log("取消分享成功");
          ctx.body = {code: '200',data:{message:'取消分享成功'}}

        });
        break;
        }
      
    }



  });
}
}



async rm() {
  const {
    ctx,
    app
  } = this;
  const token = ctx.request.header.authorization;
  const userId = tokenparse(token, app.config.jwt.secret);


  let id = ctx.request.body.data.id;
  let folderId = ctx.request.body.data.folderId;




  if (id&&folderId) {

    console.log('永久删除文件夹中文档');

    await ctx.model.User.findById({
      _id: userId
    }).then(async person => {
     
    
      for (let i = 0; i < person.folder.length; i++) {
        if (person.folder[i]._id == folderId) {
          console.log("找到文件夹");

          for (let y = 0; y < person.folder[i].doc.length; y++) {
            if (person.folder[i].doc[y]._id == id) {
              console.log("找到文件夹id");

              person.folder[i].doc[y].rm =true;

              await person.save().then(async (data) => {
                console.log("永久删除成功");
                ctx.body = {code: '200',data:{message:'永久删除成功'}}
      
              });
              break;

            }
          }
          break;
        }
      }



    });

  } else if(id&&!folderId){
    console.log('永久删除文件');

    await ctx.model.User.findById({
      _id: userId
    }).then(async person => {
     
    
      for (let i = 0; i < person.doc.length; i++) {
        if (person.doc[i]._id == id) {
          console.log("找到文件");

          person.doc[i].rm =true;

              await person.save().then(async (data) => {
                console.log("永久删除成功");
                ctx.body = {code: '200',data:{message:'永久删除成功'}}
      
              });
              break;

        }
      }



    });


}else{
  console.log('永久删除文件夹');

  await ctx.model.User.findById({
    _id: userId
  }).then(async person => {
   
  
    for (let i = 0; i < person.folder.length; i++) {
      if (person.folder[i]._id == folderId) {
        console.log("找到文件夹");
        person.folder[i].rm =true;

        await person.save().then(async (data) => {
          console.log("永久删除成功");
          ctx.body = {code: '200',data:{message:'永久删除成功'}}

        });
        break;

        }
      
    }



  });
}
}


}
module.exports = FileController;