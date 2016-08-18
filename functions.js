
var queryType = 0;
var toRoom = [];
var timer = setTimeout(" ", 0);
$(document).ready(function(){
	$('.room').on('click', function(e){
		if(queryType == 0 || queryType == 'room'){
			queryType = 'room';
			toRoom.push([],[]);
			clearTimeout(timer);
			//console.log(e.target.attributes.elmposinarr.value);
			toRoom[0].push(drower.houseArr.floors[0].rooms[e.target.attributes.elmposinarr.value]);
			toRoom[0][toRoom[0].length - 1].room_number = +e.target.attributes.elmposinarr.value +1;
			timer = setTimeout(function(){
			toRoom[1] = JSON.stringify(toRoom[0]);
			console.log('query='+toRoom[1]+'&scale='+scale.getVal()+'&type='+queryType);
		$.ajax({
					type: 'POST',
					url: '../widget/index.php?action=sample2',
					data: 'query='+toRoom[1]+'&scale='+scale.getVal()+'&type='+queryType,
					dataType: 'json',
					success: function(data){
						$('#interface').html(3);
						console.log(data);
						smeta.setSmetaItem(data.info)
						interfaceResult.createInterface(data.worklist)
						toRoom.length = 0;
						queryType = 0;
					}
				});
			},1500);
		}else{
			return false;
		}
	});
});

///////////////////////////////////////////
$(document).ready(function(){
	$('.ceiling').on('click', function(e){
		if(queryType == 0 || queryType == 'ceiling'){
		
			queryType = 'ceiling';
			toRoom.push([],[]);
			clearTimeout(timer);
			toRoom[0].push(drower.houseArr.floors[0].rooms[e.target.attributes.elmposinarr.nodeValue]);
			toRoom[0][toRoom[0].length - 1].room_number = +e.target.attributes.elmposinarr.nodeValue +1;
			timer = setTimeout(function(){
	toRoom[1] = JSON.stringify(toRoom[0])
	console.log(toRoom[1]);
	//console.log(drower.houseArr.floors[0].rooms[e.target.attributes.elmposinarr.nodeValue]);
	$.ajax({
		type: 'POST',
		url: 'index.php?action=sample2',
		data: 'query='+toRoom[1]+'&scale='+scale.getVal()+'&type='+queryType,
		//dataType: 'json',
		success: function(data){
		
		var item = jQuery.parseJSON(data);
	console.log(item.worklist.works);
		$('#interface').html('3');
		
			smeta.setSmetaItem(item['info'])
			interfaceResult.createInterface(item['worklist'])
			toRoom.length = 0;
			queryType = 0;
		}
		});
				
	},1500);
		}else{
			return false;
		}

	});
});
//////////////////////
$(document).ready(function(){
	$('.wall').on('click', function(e){
		if(queryType == 0 || queryType == 'wall'){
		
			queryType = 'wall';
			toRoom.push([],[]);
			clearTimeout(timer);
			toRoom[0].push(drower.houseArr.floors[0].rooms[e.target.attributes.elmposinarr.nodeValue]);
			timer = setTimeout(function(){
	toRoom[1] = JSON.stringify(toRoom[0])
	//console.log(toRoom[1]);
	//console.log(drower.houseArr.floors[0].rooms[e.target.attributes.elmposinarr.nodeValue]);
	$.ajax({
		type: 'POST',
		url: 'index.php?action=sample2',
		data: 'query='+toRoom[1]+'&scale='+scale.getVal(),
		//dataType: 'json',
		success: function(data){
		
		var item = jQuery.parseJSON(data);
	console.log(item.worklist.works);
		$('#interface').html('3');
		
			smeta.setSmetaItem(item['info'])
			interfaceResult.createInterface(item['worklist'])
			toRoom.length = 0;
			queryType = 0;
		}
		});
				
	},1500);
		}else{
			return false;
		}

	});
});
/*
// получение максимального элемента массива
function getMaxValue(array){
    var max = array[0]; // берем первый элемент массива
    for (var i = 0; i < array.length; i++) { // переберем весь массив
        // если элемент больше, чем в переменной, то присваиваем его значение переменной
        if (max < array[i]) max = array[i]; 
    }
    // возвращаем максимальное значение
    return max;
}
// получение минимального элемента массива
function getMinValue(array){
    var min = array[0];
    for (var i = 0; i < array.length; i++) {
        if (min > array[i]) min = array[i];
    }
    return min;
}
 document.getElementById('wrapper').onclick = function(event){
    var event = event;
	var target = event.target;
	if (target.tagName != 'DIV') return;
		alert(target.id)
}
function getPosition(e) {
    e = e || window.event;
    var cursor = {x:0, y:0};
    if (e.pageX || e.pageY) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
    } 
    else {
        var de = document.documentElement;
        var b = document.body;
        cursor.x = e.clientX + 
            (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
        cursor.y = e.clientY + 
            (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
    }
    alert(cursor);
}*/