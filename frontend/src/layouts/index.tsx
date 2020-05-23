
import React, { Component } from 'react'
import { Button } from 'antd';



// function Sakura(props) {
//   if (props.bool) {
//     return  <script src="/js/sakura.js"></script>;
//   }
//   else{
//     return <div></div>
//   } 
// }
 

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sakura:true,
    };
  }
 sakura(){

    // let texiao = document.getElementById('texiao');

    const script = document.createElement("script");
    let stexiao = document.getElementById("stexiao");

    if(this.state.sakura&&!stexiao){
      script.src = "/js/sakura.js";
      script.id = "stexiao";
      script.async = true;
      document.body.appendChild(script);
      // texiao.appendChild(script);
    }
    else{

      let stexiao = document.getElementById("stexiao");
      // let ctexiao = document.getElementById("canvas_sakura");
      let canvas = document.getElementsByTagName('canvas');
      // //console.log(script);
      // //console.log(texiao);
        // texiao.removeChild(script);
        // //console.log(canvas)
        if(stexiao&&canvas){
        // texiao.removeChild(stexiao);
          for(let i=0;i<canvas.length;i++){
            if(canvas[i].id == "canvas_sakura"){
              document.body.removeChild(canvas[i]);

            }
          }
      
          document.body.removeChild(stexiao);
          // document.body.removeChild(ctexiao);

        }
      
    }


  }

  componentDidMount(){


    // let texiao = document.getElementById('texiao');

    const script = document.createElement("script");
    // let stexiao = document.getElementById("stexiao");

      script.src = "/js/sakura.js";
      script.id = "stexiao";
      script.async = true;
      document.body.appendChild(script);

    // if(this.state.sakura&&!stexiao){
    //   script.src = "/js/sakura.js";
    //   script.id = "stexiao";
    //   script.async = true;
    //   document.body.appendChild(script);
    //   // texiao.appendChild(script);
    // }
    // else{

    //   let stexiao = document.getElementById("stexiao");
    //   // let ctexiao = document.getElementById("canvas_sakura");
    //   let canvas = document.getElementsByTagName('canvas');
    //   // //console.log(script);
    //   // //console.log(texiao);
    //     // texiao.removeChild(script);
    //     // //console.log(canvas)
    //     if(stexiao&&canvas){
    //     // texiao.removeChild(stexiao);
    //       for(let i=0;i<canvas.length;i++){
    //         if(canvas[i].id == "canvas_sakura"){
    //           document.body.removeChild(canvas[i]);

    //         }
    //       }
      
    //       document.body.removeChild(stexiao);
    //       // document.body.removeChild(ctexiao);

    //     }
      
    // }


  }

  render() {
    return (
      <div id='texiao'>
        <div>{this.props.children}</div> 
        <div style = {{position:'fixed',bottom: '5rem',right: "2rem",zIndex:9999}}>
        <Button onClick ={()=>{
          this.setState({sakura: !this.state.sakura});
          this.sakura();


      
      
      }}> 特 效 </Button>

        </div>
        {/* <Sakura bool={this.state.sakura}></Sakura> */}

      </div>
    )
  }
}
