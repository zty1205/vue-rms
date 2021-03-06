import { digit } from './common';

let curShowTimeSeconds = 0
let balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]
export const WINDOW_WIDTH = document.documentElement.clientWidth-220;
export const WINDOW_HEIGHT = document.documentElement.clientHeight-140;
// export const WINDOW_WIDTH = 1200;
// export const WINDOW_HEIGHT = 540;
const MARGIN_LEFT = Math.round(WINDOW_WIDTH /10);
const RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1

const MARGIN_TOP = Math.round(WINDOW_HEIGHT /5);
export const clock = {
  // WINDOW_WIDTH: document.documentElement.clientWidth-20,
  // WINDOW_HEIGHT: document.documentElement.clientHeight-20,
  setCurShowTimeSeconds: function (val) {
    curShowTimeSeconds = val
  },
  getCurrentShowTimeSeconds: function() {
  let curTime = new Date();
  let ret = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds() ;
  return ret;
},

  update: function(){

  let nextShowTimeSeconds = this.getCurrentShowTimeSeconds();

  let nextHours = parseInt( nextShowTimeSeconds / 3600);
  let nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 )
  let nextSeconds = nextShowTimeSeconds % 60

  let curHours = parseInt( curShowTimeSeconds / 3600);
  let curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600)/60 )
  let curSeconds = curShowTimeSeconds % 60

  if( nextSeconds != curSeconds ){
    if( parseInt(curHours/10) != parseInt(nextHours/10) ){
      this.addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(curHours/10) );
    }
    if( parseInt(curHours%10) != parseInt(nextHours%10) ){
      this.addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours/10) );
    }

    if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
      this.addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
    }
    if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
      this.addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
    }

    if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
      this.addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
    }
    if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
      this.addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
    }

    curShowTimeSeconds = nextShowTimeSeconds;
  }
  this.updateBalls();
},

  updateBalls: function(){

  for( let i = 0 ; i < balls.length ; i ++ ){

    balls[i].x += balls[i].vx;

    let c = 1.0;
    if( balls[i].y + RADIUS + balls[i].vy >= WINDOW_HEIGHT ){
      c = ( WINDOW_HEIGHT - (balls[i].y+ RADIUS) ) / balls[i].vy;
      // console.log( c );
    }

    balls[i].y += balls[i].vy;
    balls[i].vy += c * balls[i].g;;

    if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
      balls[i].y = WINDOW_HEIGHT-RADIUS;
      balls[i].vy = - Math.abs(balls[i].vy)*0.75;
    }
  }

  let cnt = 0
  for( let i = 0 ; i < balls.length ; i ++ )
    if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WINDOW_WIDTH )
      balls[cnt++] = balls[i]
  // console.log(cnt)
  while( balls.length > Math.min(200,cnt) ){
    balls.pop();
  }
},

  addBalls: function( x , y , num ){
  for( let i = 0  ; i < digit[num].length ; i ++ )
    for( let j = 0  ; j < digit[num][i].length ; j ++ )
      if( digit[num][i][j] == 1 ){
        let aBall = {
          x:x+j*2*(RADIUS+1)+(RADIUS+1),
          y:y+i*2*(RADIUS+1)+(RADIUS+1),
          g:1.5+Math.random(),
          vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
          vy:-5,
          color: colors[ Math.floor( Math.random()*colors.length ) ]
        }
        balls.push( aBall )
      }
},

  render: function( cxt ){

  cxt.clearRect(0,0,WINDOW_WIDTH, WINDOW_HEIGHT);

  let hours = parseInt( curShowTimeSeconds / 3600);
  let minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 )
  let seconds = curShowTimeSeconds % 60

  this.renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt )
  this.renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt )
  this.renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt )
  this.renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
  this.renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
  this.renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
  this.renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
  this.renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);

  for( let i = 0 ; i < balls.length ; i ++ ){
    cxt.fillStyle=balls[i].color;

    cxt.beginPath();
    cxt.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
    cxt.closePath();

    cxt.fill();
  }
},

  renderDigit: function( x , y , num , cxt ){

  cxt.fillStyle = "rgb(0,102,153)";

  for( let i = 0 ; i < digit[num].length ; i ++ )
    for(let j = 0 ; j < digit[num][i].length ; j ++ )
      if( digit[num][i][j] == 1 ){
        cxt.beginPath();
        cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
        cxt.closePath()

        cxt.fill()
      }
}

}
