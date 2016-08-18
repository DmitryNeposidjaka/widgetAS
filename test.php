<?php

$walls_arr = array('x' => array(980.5, 980.5, 980.5, 980.5, 980.5, 863.5, 863.5, 863.5, 863.5, 980.5),'y' => array(194.5, 224, 224, 297.5, 297.5, 297.5, 297.5, 194.5, 194.5, 194.5));

$sqra = 0;	
		//print_r($walls_arr);
		for($i = 0; $i < count($walls_arr['y']); $i++){
		$j = $i+1;
		
		if($j>=count($walls_arr['y'])){
			$j = 0;
			//echo $walls_arr['x'][$j];
		}
		
		$sqra += (($walls_arr['x'][$i]*$walls_arr['y'][$j])-($walls_arr['y'][$i]*$walls_arr['x'][$j]));	
		//echo $sqra.',';
		}
		//echo '----'.$sqra;
		$sqra = $sqra*0.5;
		//echo " hhh".$walls_arr['x'][10];
		echo (($walls_arr['x'][9]*$walls_arr['y'][0])-($walls_arr['y'][9]*$walls_arr['x'][0]))
?>