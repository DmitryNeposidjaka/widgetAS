<?php
include('Iframe.php');
//include('functions.php');
/*$link = mysql_connect('localhost', 'e95471al_dmitry', 'c20h25n3o');
if (!$link) {
    die('Ошибка соединения: ' . mysql_error());
}
//echo 'Успешно соединились';
$db = "e95471al_dmitry";*/
$iframe = new Iframe;
//mysql_select_db($db, $link);
if($_GET['action'] == 'sample2'){
	$iframe->set_type($_POST['type']);
	$iframe->set_scale($_POST['scale']);
	$iframe->get_room_shb($_POST['query']);
	
	
	/*$id = $_POST['id'];
	$data = mysql_query("SELECT parquet, laminat, stjagka FROM room WHERE id='".$id."'");
	while ($res = mysql_fetch_array($data)) {
		print_r($res);
	}
	if($res){
		$strSQL = "INSERT INTO room(id) VALUES('".$id."')"; 
		mysql_query($strSQL) or die(mysql_error());
		echo 'паркет <input type="radio" name="parkuet" value="1" '.$chp.'><br>ламинат <input type="radio" name="laminat" value="1" '.$chl.'><br>стяжка <input type="radio" name="stjagka" value="1" '.$chs.'><br><input type="button" name="'.$id.'" id="test_button" value="Отправить">';
}else{
		if($res['parquet'] != 0){
			$chp = 'checked="checked"';
		}else{
			$chp = '';
		}
		if($res['laminat'] != 0){
			$chl = 'checked="checked"';
		}else{
			$chl = '';
		}
		if($res['stjagka'] != 0){
			$chs = 'checked="checked"';
		}else{
			$chs = '';
		}
		echo 'паркет <input type="checkbox" name="parkuet" value="1" '.$chp.'><br>ламинат <input type="checkbox" name="laminat" value="1" '.$chl.'><br>стяжка <input type="checkbox" name="stjagka" value="1" '.$chs.'><br><input type="button" name="'.$id.'" id="test_button" value="Отправить">';
	}
*/
}else{
	
	echo $iframe->get_html_body();
}
//printf("Hi. You login is %s.<br />You password is %s.", $data['login'], $data['pass']);
/*
mysql_close($link);
$iframe = new Iframe;
echo $iframe->get_html_body();
*/
?>