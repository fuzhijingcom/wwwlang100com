<?php
namespace Ma\Controller;
use Think\Controller;
class LoginController extends Controller {
	
    public function index(){
    	$user_id = session('user_id');
    	if($user_id !== NULL){
    		$this->redirect('ma/admin/index');
    	}
    	
	     if(IS_POST){
	     	$name = I('name');
	     	$password = I('password');
	     	if(!$name){
	     		$this->error('账号不能为空');
	     	}
	     	if(!$password){
	     		$this->error('密码不能为空');
	     	}
	     	$password = md5(I('password'));
	     	$admin = M('admin')->where(array('name'=>$name))->find();
	     	if(!$admin){
	     		$this->error('该用户不存在');
	     	}
	     	if($admin['password']!==$password){
	     		$this->error('密码错误');
	     	}
	     	session('user_id',$admin['user_id']);
	     	session('name',$name);
	     	$this->redirect('ma/admin/index');
	     }
      
     
      $this->display();
    }
    
   
   
}