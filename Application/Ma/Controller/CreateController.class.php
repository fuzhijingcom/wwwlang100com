<?php
namespace Ma\Controller;
use Think\Controller;
class CreateController extends Controller {
    public function index(){
    
        $code = $this->create_code();
        
        //$data['code'] = $code;
       // $data['codeurl'] = "http://".$code.".ma.lang100.com/";
        $url = "http://".$code.".ma.lang100.com/";
        
      $codecode = M('code')->data(array('code'=>$code))->add();
      
      $url = "http://".$code.".ma.lang100.com/";
      
      M('code')->where(array('id'=>$codecode))->save(array('codeurl'=>$url));
     
    //  $arr = array(
      	//	'id'=>$codecode,
      	//	'code'=>$url,
    //  );
     // $json = json_encode($arr,true);
      echo $codecode;
    }
    
    

    private function create_code($namespace = '') {
        static $guid = '';
        $uid = uniqid("", true);
        $data = $namespace;
        $data .= $_SERVER['REQUEST_TIME'];
        $data .= $_SERVER['HTTP_USER_AGENT'];
        $data .= $_SERVER['LOCAL_ADDR'];
        $data .= $_SERVER['LOCAL_PORT'];
        $data .= $_SERVER['REMOTE_ADDR'];
        $data .= $_SERVER['REMOTE_PORT'];
        $hash = strtolower(hash('ripemd128', $uid . $guid . md5($data)));
        $guid = substr($hash, 0, 8).substr($hash, 8, 4).substr($hash, 12, 4).substr($hash, 16, 4).substr($hash, 20, 12);
        return $guid;
    }
    
   
}