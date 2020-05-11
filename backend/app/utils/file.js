"use strict";

const fs = require("fs"); //文件模块

async function create(str) {
  var path = [];
  var arr = str.split("/");
  if (arr[0] == "") {
    arr.shift();
  }
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    path.push(arr[i]);
    var filename = path.join("/");
    // 判断这个文件或文件夹是否存在
    var bln = fs.existsSync(filename);
    if (bln == false) {
      if (i < len - 1) {
        // 一定是文件夹
        console.log("计划创建 " + filename + " 文件夹");
        await fs.mkdirSync(filename);
      } else {
        // 判断是文件还是文件夹
        if (arr[i].indexOf(".") > -1) {
          // 如果是文件
          console.log("创建文件" + filename);
          await fs.writeFileSync(filename);
        } else {
          // 如果是文件夹
          console.log("创建文件夹" + filename);
          await fs.mkdirSync(filename);
        }
      }
    }
  }
}
module.exports = create;
