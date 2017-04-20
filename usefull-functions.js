// helper functions
/* 
parameters:
starting and ending coordinates

return 
distance between
*/
function distance(xOne,yOne,xTwo, yTwo){
	var xSlope = xTwo - xOne;
	var ySlope = yTwo - yOne;
	return Math.hypot(ySlope,xSlope);
}

/* 
parameters:
starting and ending coordinates

return 
distance between
*/
function angle(xOne,yOne,xTwo, yTwo){
	var xSlope = xTwo - xOne;
	var ySlope = yTwo - yOne;
	var angle = Math.atan2(xSlope,ySlope);
	return angle*180/Math.PI;
}

/* 
parameters:
starting and ending coordinates

return 
distance between
*/
function resize(object,w,h){
	if(!object.width){
		object.width = w;
		object.getWidth = function(){return object.width;}
		console.log("width property created");
	}
	else
		object.width = w;
	if(!object.height){
		object.height = h;
		object.getHeight = function(){return object.height;}
		console.log("height property created");
	}
	else 
		object.height = h;
}

/* 
parameters:
object you want to move
coordinates where you want it to go
and how fast you want it to get there.

returns:
	writes to console when complete

*/
function moveObject(object,x,y,speed){
	if(!object.xCoor){
		object.xCoor = 0;
		object.getXCoor = function(){return object.xCoor;}
		object.setXCoor = function(x){object.xCoor = x;}
		console.log("xCoor property created");
	}
	if(!object.yCoor){
		object.yCoor = 0;
		object.getYCoor = function(){return object.yCoor;}
		object.setYCoor = function(y){object.yCoor = y;}
		console.log("yCoor property created");
	}
	
	//three varalbes that tell us all the info
	var xSlope = x - object.xCoor;
	var ySlope = y - object.yCoor;
	var slope = ySlope/xSlope;
	
	if(object.xCoor == x && object.yCoor == y){
		console.log("at location");
		clearInterval(moveInterval);
	}
	else{
		//check for north and south
		if(slope == Infinity){
			object.yCoor += speed;
			if(object.yCoor > y)
				object.yCoor = y;
		}
		else if(slope == -Infinity){
			object.yCoor -= speed;
			if(object.yCoor < y)
				object.yCoor = y;
		}
		else{
			// check for east and west
			if(slope == 0 && xSlope > 0){
				object.xCoor += speed;
				if(object.xCoor > x)
					object.xCoor = x;
			}
			else if(slope == 0 && xSlope < 0){
				object.xCoor -= speed;
				if(object.xCoor < x)
					object.xCoor = x;
			}
			else{
				//north east
				if(slope > 0 && ySlope > 0){
					object.yCoor += speed;
					if(object.yCoor > y)
						object.yCoor = y;
					object.xCoor += speed*(1/slope);
					if(object.xCoor > x)
						object.xCoor = x;
				}
				//south east
				else if(slope < 0 && ySlope < 0){
					object.yCoor += speed*(1/slope);
					if(object.yCoor < y)
						object.yCoor = y;
					object.xCoor += speed;
					if(object.xCoor > x)
						object.xCoor = x;
				}
				//south west
				else if(slope > 0 && ySlope < 0){
					object.yCoor -= speed;
					if(object.yCoor < y)
						object.yCoor = y;
					object.xCoor -= speed*(1/slope);
					if(object.xCoor < x)
						object.xCoor = x;
				}
				else{
					object.yCoor += speed;
					if(object.yCoor > y)
						object.yCoor = y;
					object.xCoor += speed*(1/slope);
					if(object.xCoor < x)
						object.xCoor = x;
				}
			}
		}
	}
}

function rotateObject(object,angle,speed){
	if(!object.angle)
		object.angle = 0;
	// am i there?
	if(object.angle != angle){
	// is angle positive or negative
		if(angle > 0){
			object.angle += speed;
				if(object.angle > angle)
					object.angle = angle;
		}
		else if(angle < 0){
			object.angle -= speed;
			if(object.angle < angle)
				object.angle = angle;
		}
	}
	else{
		console.log("at angle: "+object.angle)
		clearInterval(rotateInterval);
	}
	
}

function DrawObject(ctx,img,x,y,w,h,a){
	var TO_RADIANS = Math.PI/180;
	
	if(!x)
		x = 0;
	if(!y)
		y = 0;
	if(!w)
		w = 0;
	if(!h)
		h = 0;
	if(!a)
		a = 0;
	
	if(ctx){
		if(!img){
			// save the current co-ordinate system 
			// before we screw with it
			ctx.save(); 

			// move to the middle of where we want to draw our image
			ctx.translate(x, y);

			// rotate around that point, converting our 
			// angle from degrees to radians 
			ctx.rotate(a * TO_RADIANS);

			// draw it up and to the left by half the width
			// and height of the image 
			ctx.fillRect(x,y,x+w,y+h);

			// and restore the co-ords to how they were when we began
			ctx.restore(); 
		}
		else{
			// save the current co-ordinate system 
			// before we screw with it
			ctx.save(); 

			// move to the middle of where we want to draw our image
			ctx.translate(x, y);

			// rotate around that point, converting our 
			// angle from degrees to radians 
			ctx.rotate(a * TO_RADIANS);

			// draw it up and to the left by half the width
			// and height of the image 
			ctx.drawImage(img,-(w/2), -(h/2),w,h);

			// and restore the co-ords to how they were when we began
			ctx.restore();
		}
	}
	else{
		console.log("please provide a context of a canvas to draw on")
	}
}

function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

/* 
parameters:
array of image sources

properties
name of images
array of image objects

functions
push
remove
get
size

*/
function AnimationImgs(name,arrayOfImageSrc){
	this.name = name;
	this.imgs = new Array;
	
	if(arrayOfImageSrc != undefined){
		for(var i = 0; i < arrayOfImageSrc.length; i++){
			this.imgs.push(new Image);
			this.imgs[i].src = arrayOfImageSrc[i];
			this.imgs[i].width = 50;
			this.imgs[i].height = 50;
		}
	}
	else
		console.log("please insert images using the PUSH function");
	
	this.push = function(imgSrc){
		var temp = new Image;
		temp.src = imgSrc;
		this.imgs.push(temp);
	}
	this.remove = function(i){this.imgs.splice(i,1);}
	this.get = function(i){return this.imgs[i];}
	this.getName = function(i){return this.name}
	this.size = function(){return this.imgs.length;}
}



/* 
parameters:
array of AnimationImgs

properties
array of AnimationImgs

functions
list AnimationImgs by name
push
remove
get
size
run - returns the cycle of images inoe at a time

*/
function ObjectAnimation(AnimationImgsArray){
	if(AnimationImgsArray != undefined){
		this.aia = AnimationImgsArray;
	}
	else{
		this.aia = new Array;
	}
	this.count = 0;
	
	this.list = function(){
		var names = "AnimationImgs objects: "
		for(var i = 0; i < this.aia.length; i++){
			names += this.aia[i].getName() + " , ";
		}
		return names;
	}
	
	this.push = function(AnimationImgs){this.aia.push(AnimationImgs);}
	this.remove = function(i){this.aia.splice(i,1);}
	this.get = function(i){return this.aia[i];}
	this.size = function(){return this.aia.length;}
	this.reset = function(i){this.count = 0; return this.get(i).get(this.count);}
	
	this.runInt = function(i){
		if(this.count < this.get(i).size()){
			var imgReturn = this.get(i).get(this.count);
			this.count++;	
			return imgReturn;
		}
		else{
			var temp = this.reset(i);
			return temp;
		}
	}
}