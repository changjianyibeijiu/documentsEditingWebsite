module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('db1');

  const UserSchema = new Schema({
    userName: { type: String },
    password: { type: String },
    userEmail: { type: String },

    avatar: { type: String, default: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' },
    role: { type: String, default: 'user' },

    doc:[{
      name:{ type: String },
      type:{ type: String,default:'word'},
      delete:{ type: Boolean ,default:false},
      createTime:{ type: String },
      editTime:{ type: String },
      path:{ type: String },
      share:{ type: Boolean ,default:false},
      icon:{type:String,default:'http://127.0.0.1:7001/public/word.png'},
      rm:{ type: Boolean ,default:false},

    }],
    folder:[{
      rm:{ type: Boolean ,default:false},

      name:{ type: String },
      icon:{type:String,default:'http://127.0.0.1:7001/public/folder.png'},
      delete:{ type: Boolean ,default:false},
      createTime:{ type: String },
      editTime:{ type: String },
      share:{ type: Boolean,default:false},
      doc:[{
        rm:{ type: Boolean ,default:false},
        
        name:{ type: String },
        type:{ type: String,default:'word'},
        delete:{ type: Boolean ,default:false},
        createTime:{ type: String },
        editTime:{ type: String },
        path:{ type: String },
        share:{ type: Boolean ,default:false},
        icon:{type:String,default:'http://127.0.0.1:7001/public/word.png'},
  
      }],
    }],


  });
  return conn.model('User', UserSchema);
};
