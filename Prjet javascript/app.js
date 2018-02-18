var ns = "http://www.w3.org/2000/svg";

/*var prox = class Prox{
	constructor(){
		this.x = x;
		this.y = y;
	}
}*/

class Forme /*extends Prox*/{
	constructor(){
		this.x = 0;
		this.y = 0;
		this.fill = "red";
		this.stroke = "black";
		this.frm = null;
	}
	select(){
		this.frm.addEventListener('click', function(e){
			var allStates = $("svg.us > *");
			allStates.removeClass("on");
			$(e.currentTarget).addClass("on");
			console.log($(e.currentTarget));
			console.log(this)
		});
		console.log(this.frm);
	}


}

class Rectangle extends Forme{
	
	constructor(){
		super();
		this.width = 300;
		this.height = 200;
	}

	ajout(){

		var rectangle = document.createElementNS(ns, "rect" );
		var idp = document.querySelectorAll('[id^="rectangle-"]').length + 1;
		$(rectangle).attr({
				x:this.x,
				y:this.y,
				width:this.width,
				height:this.height,
				fill:this.fill,
				stroke:this.stroke,
				id: "rectangle-"+ idp
		});
		document.querySelector("svg").appendChild(rectangle);
		this.frm = rectangle;
		this.select();

	}

	select(){
		super.select();
	}


}

class Circle extends Forme{
	constructor(){
		super();
		this.r = 20
	}

	ajout(){

		var cercle = document.createElementNS(ns, "circle" ); 
		var idp = document.querySelectorAll('[id^="circle-"]').length + 1;
		$(cercle).attr({
			cx:250,
			cy:100,
			r:40,
			fill:"red",
			"stroke-width":3,
			stroke:"black",
			id:"circle-"+idp
		});
		document.querySelector("svg").appendChild(cercle);
		this.frm = cercle;
		this.select();

	}

	select(){
		super.select();
	}
}


function addRectangle(){
	var rectangle = new Rectangle();
	rectangle.ajout();
}

function addCircle(){
	var circle = new Circle();
	circle.ajout();
}