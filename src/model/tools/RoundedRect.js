import Tool from "./Tool";

class RoundedRect extends Tool {
    constructor(canvas) {
        super(canvas)
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }
  
  
    mouseUpHandler(e){
        this.mouseDown = false
    }

    mouseDownHandler(e){
        this.mouseDown = true
        this.ctx.beginPath()
        this.startX = e.pageX - e.target.offsetLeft;
        this.startY = e.pageY - e.target.offsetTop;
        this.saved = this.canvas.toDataURL()
    }
    mouseMoveHandler(e) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target.offsetLeft;
            let currentY = e.pageY - e.target.offsetTop;
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
            let shoulder = 20;
            let radius = 20;
            this.draw(this.startX, this.startY, this.width, this.height, shoulder, radius)
        }
    }

    draw(x, y, width, height, shoulder,radius) {
        const img = new Image();
        img.src = this.saved

        img.onload = async () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(x+ shoulder,y)
            this.ctx.lineTo(x+width - shoulder,y)
            this.ctx.arcTo(x+width,y,x+width,y+shoulder,radius);
            this.ctx.lineTo(x+width, y+height - shoulder)
            this.ctx.arcTo(x+width,y+height,x+width-shoulder, y+height,radius);
            this.ctx.lineTo(x+shoulder, y+height)
            this.ctx.arcTo(x,y+height,x,y+height-shoulder,radius);
            this.ctx.lineTo(x, y+shoulder);
            this.ctx.arcTo(x,y,x+shoulder,y,radius)
            this.ctx.closePath()
            this.ctx.fill()
            this.ctx.stroke()
          
        }
    }


}

export default RoundedRect;