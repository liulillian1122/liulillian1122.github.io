// 定義變數
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let c=[["#743A3A","#B87070","#EBD6D6"],
		["#3D7878","#81C0C0","#C4E1E1"],
		["#5151A2","#7373B9","#9999CC"]];
let N=3, id=[0,0,0], x=[0,canvas.width,canvas.width/2], y=[0,0,0], dx=[5,5,5], dy=[5,5,5], r=[50,10,20];
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
		if(x[i]<0||x[i]>canvas.width){
			dx[i]=-dx[i];
			id[i]=(id[i]+1)%3;
			color[i] = c[i][id[i]];
		}
		if(y[i]<0||y[i]>canvas.height){
			dy[i]=-dy[i];
			id[i]=(id[i]+1)%3;
			color[i] = c[i][id[i]];
		}
	}
	for(let i=0; i<N; i++){
		for(let j=i+1; j<N; j++){
			if((x[i]-x[j])*(x[i]-x[j]) + (y[i]-y[j])*(y[i]-y[j]) < (r[i]+r[j])*(r[i]+r[j])){
				let vcx=((r[i]*dx[i]+r[j]*dx[j])/(r[i]+r[j]);
				let vcy=((r[i]*dx[i]+r[j]*dx[j])/(r[i]+r[j]);
				/*let R=r[i]+r[j];
				[x[i],x[j]]=[ (dx[i]*(r[i]-r[j])+2*r[j]*dx[j])/R, (dx[j]*(r[j]-r[i])+2*r[i]*dx[i])/R ];
				[y[i],y[j]]=[ (dy[i]*(r[i]-r[j])+2*r[j]*dy[j])/R, (dy[j]*(r[j]-r[i])+2*r[i]*dy[i])/R ];
				*/
				/*let tx=(dx[i]*(r[i]-r[j])+2*r[j]*dx[j])/(r[j]+r[j]);
				let ty=(dy[i]*(r[i]-r[j])+2*r[j]*dy[j])/(r[j]+r[j]);
				dx[j]=(dx[j]*(r[j]-r[i])+2*r[i]*dx[i])/(r[i]+r[j]);
				dy[j]=(dy[j]*(r[j]-r[i])+2*r[i]*dy[i])/(r[i]+r[j]);
				[dx[i],dy[i]]=[tx,ty];*/
				/*let ty=(dy*(r-r2)+2*r2*dy2)/(r+r2);
				dx2=(dx2*(r2-r)+2*r*dx)/(r2+r);
				dy2=(dy2*(r2-r)+2*r*dy)/(r2+r);
				[dx,dy]=[tx,ty];*/
			}
		}
	}
	/*if((x-x2)*(x-x2) + (y-y2)*(y-y2) < (r+r2)*(r+r2)){
		let tx=(dx*(r-r2)+2*r2*dx2)/(r+r2);
		let ty=(dy*(r-r2)+2*r2*dy2)/(r+r2);
		dx2=(dx2*(r2-r)+2*r*dx)/(r2+r);
		dy2=(dy2*(r2-r)+2*r*dy)/(r2+r);
		[dx,dy]=[tx,ty];
	}*/
	for(let i=0; i<N; i++){
		drawBall(x[i], y[i], r[i], color[i]);
	}
    requestAnimationFrame(draw);
}
draw();