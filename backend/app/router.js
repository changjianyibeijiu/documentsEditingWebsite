'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const jwt = app.middleware.jwt(app.config.jwt);

  const {
    router,
    controller
  } = app;
  router.get('/', controller.home.index);

  router.post('/api/login', controller.api.login.index);
  router.post('/api/register', controller.api.register.index);


  //获取首页数据
  router.get('/api/currentUser', jwt, controller.api.currentUser.index);
  router.get('/api/myDoc', jwt, controller.api.currentUser.myDoc); //
  router.get('/api/recently', jwt, controller.api.currentUser.recently); //
  router.get('/api/shareList', jwt, controller.api.currentUser.shareList); //
  router.get('/api/recycleBinList', jwt, controller.api.currentUser.recycleBinList); //
  router.get('/api/findList', controller.api.currentUser.findList);


  router.post('/api/folder', jwt, controller.api.folder.index); //创建文件夹

  router.get('/api/folder', jwt, controller.api.folder.folderList); //获取文件夹文件



  router.post('/api/delete', jwt, controller.api.file.delete); //删除文件
  router.post('/api/restore', jwt, controller.api.file.restore); //还原

  router.post('/api/rm', jwt, controller.api.file.rm); //永久删除



  router.post('/api/share', jwt, controller.api.file.share); //删除文件
  router.post('/api/unshare', jwt, controller.api.file.unshare); //还原



  router.post('/api/file', jwt, controller.api.file.index); //修改文件,新建文件
  router.get('/api/file', jwt, controller.api.file.readFile); //获取文件内容

  // router.get('/api/file/share',jwt,controller.api.file.share);//分享文件
  // router.post('/api/file/share',jwt,controller.api.file.share);//取消分享文件


  //用户中心
  router.post('/api/userCenter/avatar', controller.api.userCenter.upAvatar);
  router.post('/api/userCenter/userInfo', controller.api.userCenter.upUserInfo);
  router.post('/api/userCenter/userPassword', controller.api.userCenter.upUserPassword);


  //搜索
  router.post('/api/search', jwt, controller.api.search.index); 







};