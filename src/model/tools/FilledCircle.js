import Tool from "./Tool";

class FilledCircle extends Tool {
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
            let a = currentX - this.startX;
            let b = currentY - this.startY;
            let radius = Math.sqrt(a **2 + b**2);
            this.draw(this.startX, this.startY, radius)
        }
    }

    draw(x, y, r, color) {
        const img = new Image();
        img.src = this.saved
        img.onload = async () => {
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.arc(x, y, r, 0, Math.PI * 2)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }

}

export default FilledCircle;
