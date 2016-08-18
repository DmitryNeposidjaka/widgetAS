<?php
class Iframe{
	public $squr_value = 0;
	public $scale = 1;
	public $elem_type = '';
	
	public function get_html_body(){
		$body = file_get_contents('body.html');
		return $body;
	}
	public function set_scale($scl){
		$this->scale = $scl;
	}
	public function get_room_shb($jsn_arr){
		if(is_string($jsn_arr)){
			/*$room_arr = json_decode($jsn_arr,true);
			
			
			//$room_info_arr = array();
			//$room_id = $room_arr['roomID'];
			$rooms_square_arr = array();
			$rooms = array();
			if($this->elem_type == 'room'){
					$default_works = array('покраска пола','положить ковролин','заменить паркет','положить плитку');		
				}elseif($this->elem_type == 'ceiling'){
					$default_works = array('натяжной потолок','выровнять потолок','покрасить');	
				}	
			
			for($j = 0; $j < count($room_arr); $j++){
				//$room_id = $kay['roomID'];
				$walls_arr = array('x'=>[],'y'=>[]);
	
				for($i = 0; $i < count($room_arr[$j]['walls']); $i++){
					foreach($room_arr[$j]['walls'][$i]['inner'] as $k => $v){
						$walls_arr['x'][] = ($v['x']); 
						$walls_arr['y'][] = ($v['y']); 
					}
				}
				array_push($rooms, $room_arr[$j]['room_number']);
				$rooms_square_arr[$j] = $this->room_square($walls_arr);
			}	
			
			$room_info = array();
			$room_info['worklist'] = array();
			$room_info['info'] = array(" ",array_sum($rooms_square_arr),$this->get_cost(array_sum($rooms_square_arr)));	
			$room_info['info']['rooms'] = array_unique($rooms);
			$room_info['worklist']['squr'] = array_sum(array_unique($rooms_square_arr));
			$room_info['worklist']['rooms'] = array_unique($rooms);
			$room_info['worklist']['works'] = $default_works;
		
			*/
			//$a = array(array('one'=>1, 'two'=> array('three'=>3, 'four'=>4)));
			//echo json_encode($a, JSON_FORCE_OBJECT || JSON_HEX_QUOT || JSON_HEX_APOS);	
			$arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);

			echo json_encode($jsn_arr);
		}else{
			return false;
		}
	}
	private function room_square($walls_arr){
		$sqra = 0;	
		//print_r($walls_arr);
		for($i = 0; $i < count($walls_arr['y']); $i++){
		$j = $i+1;	
		if($j>count($walls_arr['y'])){
			$j = 0;
		}
		$sqra += (($walls_arr['x'][$i]*$walls_arr['y'][$j])-($walls_arr['y'][$i]*$walls_arr['x'][$j]));	
		}
		$sqra = $sqra*0.5;
		$this->squr_value = $sqra;
		return $sqra;
	}
	private function get_cost($value){
		$cost = $value/100;
		return $cost;
		
	}
	public function set_type($string){
		$this->elem_type = $string;
	}
}
?>