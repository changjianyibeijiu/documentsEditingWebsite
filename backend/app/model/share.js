// module.exports = app => {
//     const mongoose = app.mongoose;
//     const Schema = mongoose.Schema;
//     const conn = app.mongooseDB.get('db1');
  
//     const ShareSchema = new Schema({
//         doc:[{
//             userName: { type: String },
//             userEmail: { type: String },
//             avatar: { type: String, default: '' },
            
//             name:{ type: String },
//             icon:{type:String,default:'http://127.0.0.1:7001/public/word.png'},
//             type:{ type: String },
//             createTime:{ type: String },
//             editTime:{ type: String },
//             path:{ type: String },
//             share:{ type: Boolean,default: true },
//           }],

//       folder:[{
//         userName: { type: String },
//         userEmail: { type: String },
//         avatar: { type: String, default: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' },

//         name:{ type: String },
//         icon:{type:String,default:'http://127.0.0.1:7001/public/folder.png'},
//         createTime:{ type: String },
//         editTime:{ type: String },
//         share:{ type:Boolean ,default: true},
//         doc:[{
//           name:{ type: String },
//           type:{ type: String },
//           icon:{type:String,default:'http://127.0.0.1:7001/public/word.png'},
          
//           createTime:{ type: String },
//           editTime:{ type: String },
//           path:{ type: String },
//           share:{ type: Boolean,default: true },
//         }],
//       }],
  
  
//     });
//     return conn.model('Share', ShareSchema);
//   };
  