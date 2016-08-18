function getCookie(name){
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}
var min = function(array) {
	var index = 0;
	for (var i = 0, len = array.length; i < len; i++)
		if (array[i] < array[index]) index = i;
	return array[index];
}

var max = function(array) {
	var index = 0;
	for (var i = 0, len = array.length; i < len; i++)
		if (array[i] > array[index]) index = i;
	return array[index];
}
function getMaxValue(array){
    var max = array[0]; 
    for (var i = 0; i < array.length; i++) { 
        if (max < array[i]) max = array[i]; 
    }
    return max;
}
function getMinValue(array){
    var min = array[0];
    for (var i = 0; i < array.length; i++) {
        if (min > array[i]) min = array[i];
    }
    return min;
} 
//---------------------------------------------------------------------------------
var smeta = {};
smeta.listInd = 0;
smeta.item = '';
smeta.SmetaArr = [];
smeta.getSmetaItem = function(){
	return this.item;
}
smeta.setSmetaItem = function(val){
	this.item = val;
}
smeta.creatreList = function(){
	if(this.listInd == 0){
		var listBody = document.createElement('div');
		listBody.className = 'SmetaList';
		listBody.id = 'smetaList';
		var smetaTable = document.createElement('tbale');
		var smetaTbody = document.createElement('tbody');
		var smetaDefoultTr = document.createElement('td');
		
		var smetaDefoultTr = document.createElement('tr');
		document.body.insertBefore(listBody, document.getElementById('interfaceBlock'));
		
		this.listInd = 1;
	}
}
smeta.addItem = function(inner){
	console.log(inner);
	var table = document.getElementById('smetaTable');
	var item = document.createElement('tr');
	item.className = 'item';
	var work = document.createElement('td');
	work.className = 'workSmetaTd';
	work.innerHTML = inner[0];
	var cost = document.createElement('td');
	cost.className = 'costSmetaTd';
	cost.innerHTML = +(inner[3])*(+inner[1]);
	var numberof = document.createElement('td');
	numberof.className = 'numberofSmetaTd';
	numberof.innerHTML = inner[1];
	var price = document.createElement('td');;
	price.className = 'priceSmetaTd';
	price.innerHTML = inner[3];
	
	item.appendChild(work);
	item.appendChild(cost)
	item.appendChild(numberof)
	item.appendChild(price)
	//item.innerHTML = 'Комнаты: '+inner.rooms.toString()+'<br> '+'работа: '+inner[0]+'; объем: '+inner[1]+'; цена: '+inner[2];
	document.getElementById('smetaTable').appendChild(item);
}

smeta.createSmetaArr = function(room){//создаю главный массив комнат для отправки на сервер
	var roomIn = room;
	//console.log(roomIn.walls.length);
	var roomSmeta = {};
	
	roomSmeta.floor = {};
	roomSmeta.ceiling = {};
	roomSmeta.walls = [];
	
	roomSmeta.floor.works = {};
	roomSmeta.ceiling.works = {};
	
	for(i = 0; i < roomIn.walls.length; i++){
		var wall = {};
		wall.Id = roomIn.walls[i].id;
		wall.NumberWall = i;
		wall.works = {};
		roomSmeta.walls.push(wall);
	}
	
	this.SmetaArr[roomIn.roomID] = roomSmeta;

}

var interfaceResult = {};
interfaceResult.workListArr = '';
interfaceResult.setWorkListArr = function(arr){
	this.workListArr = arr;
}
interfaceResult.getWorkListArr = function(){
	return this.workListArr;
}
interfaceResult.createInterface = function(array){
interfaceResult.setWorkListArr(array)
	var parnt = document.getElementById('interfaceBlock');
	var replCh = document.getElementById('interface');
	var intBlock = document.createElement('div');
	intBlock.id = 'interface';
	
	var quryResultRooms = document.createElement('p');
	quryResultRooms.innerHTML = 'Комнаты: '+array.rooms.toString();
	
	
	
	var quryResultId = document.createElement('p');
	quryResultId.innerHTML = 'Площадь: '+array.squr
	var workList = document.createElement('select');
	workList.size = 3;
	
	for(i = 0; i < array.works.length; i++){
		var workListItem = document.createElement('option')
		workListItem.id = i;
		workListItem.className = 'listGrid'
		workListItem.innerHTML = array.works[i].name;
		workList.appendChild(workListItem);
	}
	intBlock.appendChild(quryResultRooms);
	intBlock.appendChild(quryResultId);
	intBlock.appendChild(workList);
	var look = document.createElement('p');
	look.id = 'look';
	intBlock.appendChild(look);
	parnt.replaceChild(intBlock, replCh);
	
	var array = interfaceResult.getWorkListArr();	
	//console.log(array);
	var timeoutId;
	
	$('#datagrid-row-r1-2-3').on("click",function(e){//клик и дабл клик на одном элементе
		if (!timeoutId)
			timeoutId = setTimeout(function(){
				clearTimeout(timeoutId);
				var s = array.squr;
				var p = array.works[e.target.id].price;
				
				$('#look').replaceWith('<p id="look"> цена:'+array.squr * array.works[e.target.id].price+' стоимость: '+array.works[e.target.id].price+' за м</p>');

			}, 500);
	}).on("dblclick",function(e){
		clearTimeout(timeoutId);
		smeta.item[0] = e.target.innerHTML ;
		smeta.item[3] = array.works[e.target.id].price
		smeta.addItem(smeta.item);
	});
	
}
var scale = {};
scale.scaleVal = 0.5;
scale.getVal = function(){
	return this.scaleVal;
}
scale.setVal = function(val){
	this.scaleVal = val;
}
scale.setCook = function(){
	if(typeof getCookie('scale') == 'undefined'){
		setCookie('scale', 0.7);
		scale.setVal(0.7);
	}else{
		scale.setVal(Number(getCookie('scale')));
	}
}

scale
scale.setCook();
scale.scaleArray = function(jsonArray){ 
    var sv = this.getVal()
	console.log(sv)
	var jsonArr = jsonArray;	
	for(var j = 0; j < jsonArray.floors[0].rooms.length; j++){
		jsonArray.floors[0].rooms[j].walls.forEach(function(item,i){
			for(typewall in jsonArray.floors[0].rooms[j].walls[i]){
						if(typewall == 'inner' || typewall == 'outer'){
							jsonArr.floors[0].rooms[j].walls[i][typewall].start.x *= sv;
							jsonArr.floors[0].rooms[j].walls[i][typewall].end.x *= sv;
							jsonArr.floors[0].rooms[j].walls[i][typewall].start.y *= sv;
							jsonArr.floors[0].rooms[j].walls[i][typewall].end.y *= sv;
						}
			}
		})
	}
	return jsonArr;
};
var serverQuery = {
	queryElementId : [],
}
var Calculator = {
	data : 0, 
	scale : 10,
	clickTimer : setTimeout(" ", 0),
	toRoom : [[],[]],
	queryType : 0,
	
	init : function(json) {
		this.data = scale.scaleArray(JSON.parse(json));
		
		//console.log(this.data)
	},
	

	draw : function(svg) {
		var SVG = Raphael("svg", 2000, 2000);
		var html = '';
		

		for (var floor = 0, floorCount = this.data.floors.length; floor < floorCount; floor++) {

			for (var room = 0, roomCount = this.data.floors[floor].rooms.length; room < roomCount; room++) {
			var roomSqur = [];
			var roomCenter = {
				x : 0,
				y : 0
			};
			var currentRoom = this.data.floors[floor].rooms[room];
				var action = '';
				for (var wall = 0, wallCount = currentRoom.walls.length; wall < wallCount; wall++) {
					if (wall == 0) {
						action += 'M' + currentRoom.walls[wall].inner.start.x+ ' ' + currentRoom.walls[wall].inner.start.y;
						action += ' L' + currentRoom.walls[wall].inner.end.x + ' ' + currentRoom.walls[wall].inner.end.y;
					} else {
						action += ' L' + currentRoom.walls[wall].inner.end.x + ' ' + currentRoom.walls[wall].inner.end.y;	
					}
					woll = wall+1;
					if(woll == wallCount){
						woll = 0
					}
					roomCenter.x += currentRoom.walls[wall].inner.start.x
					roomCenter.y += currentRoom.walls[wall].inner.start.y
					//debugger;
					var roomS = (((currentRoom.walls[wall].inner.start.x/scale.getVal())*(currentRoom.walls[woll].inner.start.y/scale.getVal()))-((currentRoom.walls[wall].inner.start.y/scale.getVal())*(currentRoom.walls[woll].inner.start.x/scale.getVal())));
				roomSqur.push(roomS)
				
				}
				console.log(wallCount)
				action += ' Z';
				var roomSqur = Math.floor(((roomSqur.reduce(function(sum, current) {//сумирую все значения массива площади пользуясь функцией
  return sum + current;
}, 0))*0.5)/1000);
				if(roomSqur == 0){
					 continue;
				}
				var figureRoom = SVG.path(action)
				//console.log(figureRoom)
				figureRoom.attr({stroke: "orange","stroke-width": 1});
				figureRoom.attr({'fill': 'white'});
				var text1 = SVG.text(roomCenter.x/wallCount,roomCenter.y/wallCount, roomSqur).attr({"font-size": "12px", stroke:"black"});
				var pol = SVG.text(roomCenter.x/wallCount,roomCenter.y/wallCount+15, 'Пол').attr({"font-size": "12px", stroke:"black"});
				pol.data('selected', 0);
				pol.data('roomID', currentRoom.roomID);
				pol.data('jsonArrPosition', room);
				var potolok = SVG.text(roomCenter.x/wallCount,roomCenter.y/wallCount+30, 'Потолок').attr({"font-size": "12px", "text-decoration":"underline", stroke:"black"});
				//potolok.print({"text-decoration" : "underline"});
				potolok.data('selected', 0);
				potolok.data('roomID', currentRoom.roomID);
				potolok.data('jsonArrPosition', room);
				//console.log(figureRoom);
				figureRoom.mouseover(function() {
					if (!this.data('selected'))
						this.animate({'fill': '#36D986', "stroke-dasharray": "- ."}, 100);
				});				
				figureRoom.mouseout(function() {
					if (!this.data('selected'))
						this.animate({'fill': 'white'}, 100);
				});
				pol.click(function(e) {
				console.log(e)
					if(Calculator.queryType == 0 || Calculator.queryType == 'room'){
						Calculator.queryType = 'room';
						if (!this.data('selected')) {
						
							serverQuery.queryElementId
							var jsonArrPosition = this.data().jsonArrPosition
							this.data('selected', 1);
							var dt = this.data;
							var an = this.animate;
							this.animate({'fill': '#FEF6BB'}, 100);
							serverQuery.queryElementId.push(e.target.raphaelid);
							clearTimeout(Calculator.clickTimer);
							Calculator.toRoom[0].push(Calculator.data.floors[0].rooms[jsonArrPosition]);
								//console.log(jsonArrPosition);
							Calculator.toRoom[0][Calculator.toRoom[0].length - 1].room_number = +jsonArrPosition +1;
							//console.log(Calculator.toRoom);
							Calculator.clickTimer = setTimeout(function(){
								
								
								Calculator.toRoom[1] = JSON.stringify(Calculator.toRoom[0]);
								$.ajax({
									type: 'POST',
									url: '../widgetas/index.php?action=sample2',
									data: 'query='+Calculator.toRoom[1]+'&scale='+scale.getVal()+'&type='+Calculator.queryType,
									dataType: 'json',
									success: function(data){
										$('#tt').treegrid('loadData', data);
										console.log(data);
										smeta.setSmetaItem(data.info)
										//interfaceResult.createInterface(data.worklist)
										Calculator.toRoom.length = 0;
										queryType = 0;
										$('#tt').treegrid('reload');
										
										dt('selected', 0);
										//an({'fill': 'white'}, 100);
										//this.call(dt,'selected', 0);
								//this.call(an, {'fill': 'white'}, 100);
								serverQuery.queryElementId.length = 0;
								Calculator.queryType = 0;
								Calculator.toRoom = [[],[]];
									}
								});
								
							}, 1500)
							
						} else {
							this.data('selected', 0);
							this.animate({'fill': '#BEC2F1'}, 100);
						}
					}else{
						return false
					}	
					
				});
				potolok.click(function(e) {
				console.log(e)
					if(Calculator.queryType == 0 || Calculator.queryType == 'ceiling'){
						Calculator.queryType = 'ceiling';
						if (!this.data('selected')) {
						
							serverQuery.queryElementId
							var jsonArrPosition = this.data().jsonArrPosition
							this.data('selected', 1);
							var dt = this.data;
							var an = this.animate;
							this.animate({'fill': '#FEF6BB'}, 100);
							serverQuery.queryElementId.push(e.target.raphaelid);
							clearTimeout(Calculator.clickTimer);
							Calculator.toRoom[0].push(Calculator.data.floors[0].rooms[jsonArrPosition]);
								//console.log(jsonArrPosition);
							Calculator.toRoom[0][Calculator.toRoom[0].length - 1].room_number = +jsonArrPosition +1;
							//console.log(Calculator.toRoom);
							Calculator.clickTimer = setTimeout(function(){
								
								
								Calculator.toRoom[1] = JSON.stringify(Calculator.toRoom[0]);
								$.ajax({
									type: 'POST',
									url: '../widgetas/index.php?action=sample2',
									data: 'query='+Calculator.toRoom[1]+'&scale='+scale.getVal()+'&type='+Calculator.queryType,
									dataType: 'json',
									success: function(data){
										$('#tt').treegrid('loadData', data);
										console.log(data);
										smeta.setSmetaItem(data.info)
										//interfaceResult.createInterface(data.worklist)
										Calculator.toRoom.length = 0;
										queryType = 0;
										$('#tt').treegrid('reload');
										
										dt('selected', 0);
										//an({'fill': 'white'}, 100);
										//this.call(dt,'selected', 0);
								//this.call(an, {'fill': 'white'}, 100);
								serverQuery.queryElementId.length = 0;
								Calculator.queryType = 0;
								Calculator.toRoom = [[],[]];
									}
								});
								
							}, 1500)
							
						} else {
							this.data('selected', 0);
							this.animate({'fill': '#BEC2F1'}, 100);
						}
					}else{
						return false
					}	
					
				});
				 for (var wall = 0, wallCount = currentRoom.walls.length; wall < wallCount; wall++) {
					var x = [
						currentRoom.walls[wall].inner.start.x,
						currentRoom.walls[wall].inner.end.x,
						//currentRoom.walls[wall].outer.start.x,
						//currentRoom.walls[wall].outer.end.x
					]; 
					
					var y = [
						currentRoom.walls[wall].inner.start.y,
						currentRoom.walls[wall].inner.end.y,
						//currentRoom.walls[wall].outer.start.y,
						//currentRoom.walls[wall].outer.end.y				
					];
					
					var rect = SVG.rect(getMinValue(x), getMinValue(y), getMaxValue(x)-getMinValue(x), getMaxValue(y)-getMinValue(y));
						
						if(getMaxValue(x)-getMinValue(x) == 0){
							rect.attr({width: "3"})
						}else if(getMaxValue(y)-getMinValue(y) == 0){
							rect.attr({height: "3"})
						}
					rect.attr({fill: "#0C5AA6"});
					rect.data('state', 0);
					rect.data('jsonArrPosition', room);
					rect.data('jsonArrPositionWall', wall);
					
					rect.mouseover(function() {
						if (!this.data('state')) this.animate({'fill' : '#F7A917', 'stroke' : 'black'}, 100);
					});
					rect.mouseout(function() {
						if (!this.data('state')) this.animate({'fill' : '#0C5AA6', 'stroke' : 'black'}, 100);
					});
					rect.click(function(e) {
					console.log(e)
						if(Calculator.queryType == 0 || Calculator.queryType == 'wall'){
							Calculator.queryType = 'wall';
							if (!this.data('state')) {
							serverQuery.queryElementId
							var jsonArrPosition = this.data().jsonArrPosition
							var jsonArrPositionWall = this.data().jsonArrPositionWall
								this.data('state', 1);
								this.animate({'fill' : '#F77C17', 'stroke' : 'black'}, 100);
								serverQuery.queryElementId.push(e.target.raphaelid);
							clearTimeout(Calculator.clickTimer);
							Calculator.toRoom[0].push((+e.target.attributes.height.nodeValue + +e.target.attributes.width.nodeValue)-4);
							//console.log(jsonArrPosition);
							Calculator.toRoom[0][Calculator.toRoom[0].length - 1].room_number = +jsonArrPosition +1;
								
							Calculator.clickTimer = setTimeout(function(){
								
								//console.log(Calculator.queryType);
								Calculator.toRoom[1] = JSON.stringify(Calculator.toRoom[0])
								console.log(Calculator.toRoom[0]);
								$.ajax({
									type: 'POST',
									url: '../widgetas/index.php?action=sample2',
									data: 'query='+Calculator.toRoom[1]+'&scale=1&type='+Calculator.queryType,
									dataType: 'json',
									success: function(data){
										$('#tt').treegrid('loadData', data);
										console.log(data);
										smeta.setSmetaItem(data.info)
										$('#tt').treegrid('reload');
										Calculator.toRoom.length = 0;
										Calculator.queryType = 0;
										Calculator.toRoom = [[],[]];
										//dt('selected', 0);
										//an({'fill': 'white'}, 100);
										
									}
								});
								//this.call(dt,'selected', 0);
								//this.call(an, {'fill': 'white'}, 100);
								//serverQuery.queryElementId.length = 0;
								//Calculator.queryType = 0;
								//Calculator.toRoom = [[],[]];
							}, 1500)
							
							} else {
								this.data('state', 0);
								this.animate({'fill' : '#0C5AA6', 'stroke' : 'black'}, 100);
							}
						}else{
							return false
						}	
					});
					
					if ((currentRoom.walls[wall].openings !== undefined) && (currentRoom.walls[wall].openings.length)) {
						for (var opening = 0, openingCount = currentRoom.walls[wall].openings.length; opening < openingCount; opening++) {
							var x = [
								currentRoom.walls[wall].openings[opening].inner.start.x*scale.getVal(),
								currentRoom.walls[wall].openings[opening].inner.end.x*scale.getVal(),
								currentRoom.walls[wall].openings[opening].outer.start.x*scale.getVal(),
								currentRoom.walls[wall].openings[opening].outer.end.x*scale.getVal()
							]; 
							var y = [
								currentRoom.walls[wall].openings[opening].inner.start.y*scale.getVal(),
								currentRoom.walls[wall].openings[opening].inner.end.y*scale.getVal(),
								currentRoom.walls[wall].openings[opening].outer.start.y*scale.getVal(),
								currentRoom.walls[wall].openings[opening].outer.end.y*scale.getVal()				
							];	
								
							var rect = SVG.rect(min(x), min(y), max(x)-min(x), max(y)-min(y));
							rect.attr({fill: "white"});
							
							
						}
					}
				} 
			}
		}
	}
	
	
}
