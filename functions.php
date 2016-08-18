<?php
function convert_cash($name){
	$json_kurs = json_decode(file_get_contents('https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDRUB,EURRUB%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='), true);
	if($json_kurs['query']['results']['rate'][0]['Name'] == $name){
		$d = 'Доллар стоит: '.$json_kurs['query']['results']['rate'][0]['Rate'];
		return $d;
	}elseif($json_kurs['query']['results']['rate'][1]['Name'] == $name){
		$e = 'Евро стоит: '.$json_kurs['query']['results']['rate'][1]['Rate'];
		return $e;
	}else{
		return 'NO!';
		echo '<pre>';
	print_r($json_kurs);
	}
}
?>