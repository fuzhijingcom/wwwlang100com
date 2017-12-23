<?php
namespace Packet\Controller;
use Think\Controller;
class RedController extends Controller {
    
    public function packet(){
        $id = I('id');
        $code = I('events');
        $token = md5($code.'jing'.$id);
       
        $token1 = I('token');
        if($token !== $token1){
            $this->error('二维码错误');
            exit;
        }
        
        $events = M('events')->where("start<=%d and end>=%d ",$id,$id)->find();
       // dump($events);
        
        
        if(!$events){
        	$this->error('该二维码未启用');
        	exit;
        }
        
        $scan1 = M('scan')->where(array('code'=>$code))->find();
      
	   if(!$scan1){
		        	
        	//判断是否随机金额
        	if($events['rand'] == 0){
        		$money = $events['money'];
        	}else{
        		$money = mt_rand($events['money_start'],$events['money_end']);
        		$money = $money.'.'.mt_rand(0,9).mt_rand(0,9);
        		$money =  (float)$money;
        	}
        	
        	//保存扫码数据
        	$data['code'] = $code;
        	$data['money'] = $money;
        	M('scan')->data($data)->add();
        	
	    }else{
	        //不为空
	    	$money =  $scan1['money'];
	    }
	    $newtoken = md5($code.'jing'.$money.'5558');
	 
     	$this->assign('money',$money);
     	$this->assign('code',$code);
 
     	$this->assign('token',$newtoken);
    	$this->display();
      
    }
    
    
    
   
    
    
   
   
}