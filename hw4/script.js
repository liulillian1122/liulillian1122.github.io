// 定義變數
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let x = 0, y = 0, dx = 3, dy = 3, i = 0, N = 10;

// 預載走路圖片
let runl = [];
for(let i = 0; i < N; ++i)
{
	runl[i] = new Image();
	runl[i].src = "runl/Run__00" + i + ".png";
}

// 預載反向走路圖片
let runr = [];
for(let i = 0; i < N; ++i)
{
	runr[i] = new Image();
	runr[i].src = "runr/Run__00" + i + ".png";
}

// 貼上圖片
function drawImg() 
{    
	// parseInt(i/2) 讓兩時間格共用一張圖片，以讓動作更換不要過於頻繁
	// 編號 i：0, 1, 2, 3, 4, 5, 6, 7, ...
	// 對應圖：0, 0, 1, 1, 2, 2, 3, 3, ...
    if(dx > 0)   	ctx.drawImage(runl[parseInt(i/2)%N], x, y, 100,100);
    else          	ctx.drawImage(runr[parseInt(i/2)%N], x, y, 100,100);
}

// 更新畫布
function draw() 
{	
	ctx.clearRect(0, 0, canvas.width, canvas.height);

    x += dx;
    y += dy;
    ++i;

    if(x < 0 || x+150 > canvas.width)     dx = -dx;
    if(y < 0 || y+150 > canvas.height)    dy = -dy;
    
    drawImg();
    requestAnimationFrame(draw);
}
draw();