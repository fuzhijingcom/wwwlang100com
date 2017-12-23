<?php
namespace Ma\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
    
    	//dump(I(''));
    	//exit;
    	
    	
      $code = I('code');
      if($code == NULL){
          header('Location:http://ma.lang100.com/login/index');
      }
      
    $codecode = M('code')->where(array('code'=>$code))->find();
    if($codecode['id'] == NULL){
        $this->error('二维码不存在');
        exit;
    }
    
   
    //跳转去检验是否有效
    if($codecode['status'] == 0){
    	$this->error('来晚了，红包已被领取');
    	exit;
    }
    
    $id = $codecode['id'];
    //跳转去判断是否关注
    
    $token = md5($code.'jing'.$id);
    
    
    $url = 'http://packet.lang100.com/red/packet/events/'.$code.'/id/'.$id.'/token/'.$token;
    
    
    
     header('Location:'.$url);
      
      
    }
    
   
}