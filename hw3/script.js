// 定義變數
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let c=[["#743A3A","#B87070","#EBD6D6"],
		["#3D7878","#81C0C0","#C4E1E1"],
		["#5151A2","#7373B9","#9999CC"]];

let N=3, id=[0,0,0], r=[50,30,20];
//let dx=[10,10,10], dy=[10,10,10];
let dx=[20,20,20], dy=[20,20,20];

let x=[r[0],canvas.width-r[1],canvas.width/2], y=[r[0],r[1],r[2]];
let color=[ c[0][0], c[1][0], c[2][0] ];

// 畫圓形
function drawBall(x, y, r, color){
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2); // arc(圓心x, 圓心y, 半徑, 起始角, 結束角)
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

// 更新畫布
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(let i=0; i<N; i++){
		x[i]+=dx[i];
		y[i]+=dy[i];
	}		
    // TODO: 如果發生碰撞(畫布寬canvas.width, 畫布高canvas.height)，則改變速度(dx, dy)和顏色(color)
	for(let i=0; i<N; i++){
		if(x[i]-r[i]<0||x[i]+r[i]>canvas.width){
			dx[i]=-dx[i];
			
			if(x[i]-r[i]<0)	x[i] = r[i];
			else			x[i] = canvas.width-r[i];
			
			id[i]=(id[i]+1)%3;
			color[i] = c[i][id[i]];
		}
		if(y[i]-r[i]<0||y[i]+r[i]>canvas.height){
			dy[i]=-dy[i];
			
			if(y[i]-r[i]<0)	y[i] = r[i];
			else			y[i] = canvas.height-r[i];
			id[i]=(id[i]+1)%3;
			color[i] = c[i][id[i]];
		}
	}
	for(let i=0; i<N; i++){
		for(let j=i+1; j<N; j++){
			if((x[i]-x[j])*(x[i]-x[j]) + (y[i]-y[j])*(y[i]-y[j]) <= (r[i]+r[j])*(r[i]+r[j])){
				let vcx=((r[i]*dx[i]+r[j]*dx[j])/(r[i]+r[j]));
				let vcy=((r[i]*dy[i]+r[j]*dy[j])/(r[i]+r[j]));
				dx[i]=2*vcx-dx[i];
				dx[j]=2*vcx-dx[j];
				dy[i]=2*vcy-dy[i];
				dy[j]=2*vcy-dy[j];
			}
		}
	}
	for(let i=0; i<N; i++){
		drawBall(x[i], y[i], r[i], color[i]);
	}
    requestAnimationFrame(draw);
}
draw();
