<?php
namespace Share\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
    
      $code = I('code');
      if($code == NULL){
         
      }
      
    	echo $code;
      
    }
    
   
}