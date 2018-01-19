<?php
namespace Ma\Controller;
use Think\Controller;
class AdminController extends Controller {
    public function index(){
    	$user_id = session('user_id');
    	if(!$user_id){
    		$this->error('未登录','login/index');
    	}
    	
		$events = M('events')->where(array('user_id'=>$user_id))->select();
		
		
      
		$this->assign('events',$events);
		$this->display();
    }
    
   
    public function all_code(){

        $condition['id'] = array('lt',50);

        $code = M('code')->where('status',1)->where($condition)->select();
       // dump($all);
       $this->assign('code',$code);
        $this->display();
    }
    
    public function logout(){
    	session('name',NULL);
    	session('user_id',NULL);
    	$this->redirect('ma/login/index');
    }
}