// Simple class example

function SimpleSquareParticle(posX, posY, color) {
		this.x = posX;
		this.y = posY;

		this.on = 0;
		this.radius = 11;
		this.margin = 8;
}

//The function below returns a Boolean value representing whether the point with the coordinates supplied "hits" the particle.
SimpleSquareParticle.prototype.hitTest = function(hitX,hitY) {
	return((hitX > this.x - this.radius)&&(hitX < this.x + this.radius)&&(hitY > this.y - this.radius)&&(hitY < this.y + this.radius));
}

//A function for drawing the particle.
SimpleSquareParticle.prototype.drawToContext = function(theContext) {

	if (this.on) {
		theContext.fillStyle = 'white';
	}
	else {
		theContext.fillStyle = 'grey';
	}

	theContext.fillRect(this.x - this.radius, this.y - this.radius, 2*this.radius, 2*this.radius);
}