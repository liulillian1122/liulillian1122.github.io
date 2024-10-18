// 定義變數
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let c = ["#743A3A","#B87070","#EBD6D6"];
let c2= ["#3D7878","#81C0C0","#C4E1E1"];
let c3= ["#5151A2","#7373B9","#9999CC"];
let id=0,  x = 0, y = 0, dx = 5, dy = 5, r = 50, color = c[0];
let id2=0, x2= canvas.width, y2= 0, dx2= 5, dy2= 5, r2= 10, color2= c2[0];
let id3=0, x3= canvas.width/2, y3= 0, dx3= 5, dy3= 5, r3= 30, color3= c3[0];

// 畫圓形
function drawBall(x, y, r, color)
{
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2); // arc(圓心x, 圓心y, 半徑, 起始角, 結束角)
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

// 更新畫布
function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x+=dx,   y+=dy;
	x2+=dx2, y2+=dy2;
	x3+=dx3, y3+=dy3;
	
    // TODO: 如果發生碰撞(畫布寬canvas.width, 畫布高canvas.height)，則改變速度(dx, dy)和顏色(color)
    if(x<0||x>canvas.width){
		dx=-dx;
		id=(id+1)%3;
		color = c[id];
	}
	if(y<0||y>canvas.height){
		dy=-dy;
		id=(id+1)%3;
		color = c[id];
	}
	if(x2<0||x2>canvas.width){
		dx2=-dx2;
		id2=(id2+1)%3;
		color2 = c2[id2];
	}
	if(y2<0||y2>canvas.height){
		dy2=-dy2;
		id2=(id2+1)%3;
		color2 = c2[id2];
	}
	if((x-x2)*(x-x2) + (y-y2)*(y-y2) < (r+r2)*(r+r2)){
		let tx=(dx*(r-r2)+2*r2*dx2)/(r+r2);
		let ty=(dy*(r-r2)+2*r2*dy2)/(r+r2);
		dx2=(dx2*(r2-r)+2*r*dx)/(r2+r);
		dy2=(dy2*(r2-r)+2*r*dy)/(r2+r);
		[dx,dy]=[tx,ty];
	}
    drawBall(x, y, r, color);
	drawBall(x2, y2, r2, color2);
    requestAnimationFrame(draw);
}
draw();
