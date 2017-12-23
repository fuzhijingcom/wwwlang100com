BizQQWPA.define("wpa.visitor","lang.browser,util.log,util.speedReport,util.getJSONP,util.domain,util.pubSub,wpa.filter,wpa.ta,wpa.invite,wpa.wpaMgr,wpa.ta,wpa.kfuin",function(require){var invite=require("invite"),domain=require("domain"),filter=require("filter"),getJSONP=require("getJSONP"),pubSub=require("pubSub"),log=require("log"),speedReport=require("speedReport"),ta=require("ta"),kfuinCahe=require("kfuin"),browser=require("browser");var CRM_BLOCK_ON_SERVERSIDE=1;var GET_CONFIG_URL="http://visitor.crm2.qq.com/cgi/visitorcgi/ajax/wpa_first_heart_beat.php";return function(config){var nameAccount=config.nameAccount;if(!nameAccount||nameAccount==="undefined"){return}if(invite.isLoaded(nameAccount)||!filter.TA){return}var uid,cfg,launch=function(uid,cfg){if(!uid||!cfg){return}if(cfg.block===CRM_BLOCK_ON_SERVERSIDE){return}if(browser&&browser.ua){var spiderReg=/spider|bot|^\s*$/;if(spiderReg.test(browser.ua)){return}}if(filter.CRM){cfg.di=config.di;cfg.kfuin=config.kfuin;log(nameAccount+" try launch slave");invite.load(nameAccount,uid,cfg)}};pubSub.one("TA.loaded",function(data){uid=data;launch(uid,cfg)});pubSub.one("Invite.first",function(data){cfg=data;launch(uid,cfg)});ta(nameAccount,domain.topDomain,function(uid){pubSub.pub("TA.loaded",uid)});var opts={nameAccount:nameAccount,dm:domain.topDomain,title:document.title,url:location.href.split("://")[1].split("?")[0]};getJSONP(GET_CONFIG_URL,opts,function(cfg){pubSub.pub("Invite.first",cfg)});config.kfuin&&kfuinCahe.set(nameAccount,config.kfuin)}});BizQQWPA.define("wpa.filter","util.domain",function(require){var TA_BLACKLIST="",CRM_BLACKLIST="qq.com,pengyou.com,qzoneapp.com,nipic.com,docin.com,51zxw.net,2155.com,xd.com,yto.net.cn,c-c.com,27.cn,05wan.com,alivv.cn,gogo.com,doctorjob.com.cn,emoney.cn,m4.cn,chinaktv.net,yk988.com,bangkaow.com,wsxsp.com,55tools.com,youxi518.com",CRM_WHITELIST="b.qq.com,sales.b.qq.com,guilin.house.qq.com,ta.qq.com,hn.qq.com,nantong.house.qq.com";var domain=require("domain");return{TA:function(){var dm=domain.topDomain,IPReg=/^[12]?\d?\d\.[12]?\d?\d\.[12]?\d?\d\.[12]?\d?\d$/,LocalReg=/^localhost$/,previewPageReg=/^wpa\.b\.qq\.com/;return TA_BLACKLIST.indexOf(dm)===-1&&!IPReg.test(dm)&&!LocalReg.test(dm)&&!previewPageReg.test(domain.domain)}(),CRM:function(){try{var reg=new RegExp("(^|,)"+domain.domain);if(reg.test(CRM_WHITELIST)){return true}var dm=domain.topDomain,dmReg=new RegExp("(^|,)"+dm),IPReg=/^[12]?\d?\d\.[12]?\d?\d\.[12]?\d?\d\.[12]?\d?\d$/,LocalReg=/^localhost$/;return!dmReg.test(CRM_BLACKLIST)&&!IPReg.test(dm)&&!LocalReg.test(dm)}catch(e){}}()}});BizQQWPA.define("wpa.invite","util.log,util.getJSONP,util.proxy,util.domain,util.blockStorage,util.taskMgr,wpa.wpaMgr",function(require){var MASTER_MONITOR_GAP=2e3,INVITE_MONITOR_GAP=1e3,MASTER_HEATBEAT_GAP=2e3,SLAVE_HEARTBEAT_GAP=2e3,SERVER_MONITOR_GAP_MIN=5e3,SERVER_MONITOR_GAP_MAX=15e3,SERVER_MONITOR_SLEEPCHECK_GAP=36e5,SERVER_MONITOR_SLEEPING_GAP=1e3;var INVITE_SIGNAL="is",INVITE_KFEXT="ik",INVITE_MSG="msg",MASTER_HEARTBEATS="mh",MASTER_ID="mid",SLAVE_IDS="slid";var INVITE_SIGNAL_UNINVITED="0",INVITE_SIGNAL_INVITE="1",INVITE_SIGNAL_INVITED="2",INVITE_KFEXT_AUTO="0",MASTER_HEARTBEATS_ERROR="-1",DATA_SEPERATOR="|";var HEARTBEAT_URL="http://visitor.crm2.qq.com/cgi/visitorcgi/ajax/wpa_heart_beat.php",CONFIRM_AUTO_INVITE_URL="http://visitor.crm2.qq.com/cgi/visitorcgi/ajax/auto_invite.php";var RESULT_SUCCESS=0,INVITE_STATE_UNINVITED="0",INVITE_STATE_INVITE="1",INVITE_STATE_INVITED="2",AUTO_INVITE_TRUE=1;var WPA_TYPE_TA_INVITE_ONLY="0",WPA_TYPE_NORMAL="1",WPA_TYPE_LINK="2",SESSION_VERSION_TA="4",WPA_STYLE_TYPE_INVITE="20",APPOINTED_TYPE_AUTO="0",APPOINTED_TYPE_KFEXT="1",APPOINTED_TYPE_GROUP="2",APPOINTED_TYPE_AUTO_INVITE="4",APPOINTED_TYPE_INVITE="5";var WPA_FLOAT_TYPE_FIXED="0",WPA_FLOAT_POSITION_Y_CENTER="1",WPA_FLOAT_POSITION_X_CENTER="1",IS_INVITE_WPA_FALSE="0",IS_INVITE_WPA_TRUE="1";var log=require("log"),getJSONP=require("getJSONP"),proxy=require("proxy"),domain=require("domain"),blockStorage=require("blockStorage"),taskMgr=require("taskMgr"),wpaMgr=require("wpaMgr");var Slave=function(nameAccount,uid,cfg){this.nameAccount=nameAccount;this.uid=uid;this.config=cfg;this.genID();this.storage=blockStorage(nameAccount);this.monitors={master:taskMgr.newTask(proxy(this,this.masterMonitor),MASTER_MONITOR_GAP).run(),invite:taskMgr.newTask(proxy(this,this.inviteMonitor),INVITE_MONITOR_GAP).run()};this.heartBeat=taskMgr.newTask(proxy(this,this.heartBeatProcess),SLAVE_HEARTBEAT_GAP).run();this.setActive();window.onfocus=proxy(this,this.setActive);log("slave "+this.id+" launched!")};Slave.prototype={genID:function(){this.id="slid_"+ +new Date%1e3+"_"+Math.round(Math.random()*100)},masterMonitor:function(){if(masters[this.nameAccount]){return}log("monitoring mater state");var lastMasterHeartbeat=this.storage.get(MASTER_HEARTBEATS)||0,gap=+new Date-parseInt(lastMasterHeartbeat);log("gap of master is "+gap);if(gap>3*MASTER_HEATBEAT_GAP){this.recoverMaster()}},recoverMaster:function(){masters[this.nameAccount]=new Master(this.nameAccount,this.uid,this.config);log("recover master by slave "+this.id)},inviteMonitor:function(){if(this.isInvited()){this.kill()}else if(this.isInviting()){if(this.isActive()){this.invite()}}log("slave "+this.id+" monitoring invite state")},kill:function(){this.monitors.invite.drop();this.heartBeat.drop();var storage=this.storage,keys=[this.id];for(var i=0,key;key=keys[i++];){storage.del(key)}log("slave "+this.id+" killed")},invite:function(){var kfext=this.storage.get(INVITE_KFEXT);var params={wty:WPA_TYPE_NORMAL,nameAccount:this.nameAccount,kfuin:this.config.kfuin,type:WPA_STYLE_TYPE_INVITE,aty:kfext?kfext===INVITE_KFEXT_AUTO?APPOINTED_TYPE_AUTO_INVITE:APPOINTED_TYPE_INVITE:APPOINTED_TYPE_AUTO_INVITE,a:kfext||"",iv:IS_INVITE_WPA_TRUE,fsty:WPA_FLOAT_TYPE_FIXED,fposX:WPA_FLOAT_POSITION_X_CENTER,fposY:WPA_FLOAT_POSITION_Y_CENTER,sv:SESSION_VERSION_TA,uid:this.uid,dm:domain.topDomain,msg:this.storage.get(INVITE_MSG)};wpaMgr.invite(params,this.config.di);this.storage.set(INVITE_SIGNAL,INVITE_SIGNAL_INVITED);log("invited by slave "+this.id)},heartBeatProcess:function(){var storage=this.storage,ids=storage.get(SLAVE_IDS);if(!ids){storage.set(SLAVE_IDS,this.id+"|")}else if(ids.indexOf(this.id+"|")===-1){storage.set(SLAVE_IDS,this.id+"|"+ids)}storage.set(this.id,+new Date)},setActive:function(){var storage=this.storage,ids=storage.get(SLAVE_IDS)||"",sign=this.id+DATA_SEPERATOR;if(ids.indexOf(this.id)>-1){ids=ids.replace(sign,"")}ids+=sign;storage.set(SLAVE_IDS,ids)},isActive:function(){var slaves=this.storage.get(SLAVE_IDS);if(!slaves){return false}return slaves.substr(0,slaves.length-1).split(DATA_SEPERATOR).pop()===this.id},isInvited:function(){return this.storage.get(INVITE_SIGNAL)===INVITE_SIGNAL_INVITED},isInviting:function(){return this.storage.get(INVITE_SIGNAL)===INVITE_SIGNAL_INVITE}};var masters={};var Master=function(nameAccount,uid,cfg){this.nameAccount=nameAccount;this.uid=uid;this.config=cfg;this.storage=blockStorage(nameAccount);this.genID();this.sleep=false;this.heartBeatURl=cfg.hbDomain||HEARTBEAT_URL;this.storage.set(MASTER_ID,this.id);this.heartBeatProcess();this.heartBeat=taskMgr.newTask(proxy(this,this.heartBeatProcess),MASTER_HEATBEAT_GAP).run();this.initWithConfig();log("master launched!")};Master.prototype={genID:function(){this.id=+new Date%1e3+"_"+Math.round(Math.random()*100)},setInviteState:function(signal,kfext,msg){if(signal===INVITE_SIGNAL_INVITE){this.storage.set(INVITE_KFEXT,kfext);this.storage.set(INVITE_MSG,msg)}this.storage.set(INVITE_SIGNAL,signal)},isInvited:function(){var invited=this.storage.get(INVITE_SIGNAL)===INVITE_SIGNAL_INVITED;if(invited){this.recycle();this.isInvited=function(){return true}}return invited},initWithConfig:function(){var cfg=this.config;if(cfg.r!==RESULT_SUCCESS){this.storage.set(MASTER_HEARTBEATS,MASTER_HEARTBEATS_ERROR);return}if(cfg.isAuto===AUTO_INVITE_TRUE){this.storage.set(INVITE_MSG,cfg.autoMsg);this.autoInviteTimer=setTimeout(proxy(this,function(){this.autoInvite()}),cfg.autoTime*1e3)}this.monitors={slave:taskMgr.newTask(proxy(this,this.slaveMonitor),SLAVE_HEARTBEAT_GAP).run(),server:taskMgr.newTask(proxy(this,this.serverMonitor),SERVER_MONITOR_GAP_MIN).run(),sleep:taskMgr.newTask(proxy(this,this.sleepMonitor),SERVER_MONITOR_SLEEPCHECK_GAP).run()};log("master inited with config")},autoInvite:function(){if(this.isInvited()){return}var opt={nameAccount:this.nameAccount,uid:this.uid};var serverMonitor=this.monitors.server;serverMonitor.pause();getJSONP(CONFIRM_AUTO_INVITE_URL,opt,proxy(this,function(rs){if(rs.r!==RESULT_SUCCESS){serverMonitor.run();return}if(!this.isInvited()){this.setInviteState(INVITE_SIGNAL_INVITE,INVITE_KFEXT_AUTO,this.storage.get(INVITE_MSG));taskMgr.once(function(){serverMonitor.run()},5e3).run()}}))},ajustServerMonitorGap:function(time){this.monitors.server.setGap(Math.min(Math.max(SERVER_MONITOR_GAP_MIN,time),SERVER_MONITOR_GAP_MAX))},serverMonitor:function(){var inviteSignal=this.storage.get(INVITE_SIGNAL);if(this.sleep){return}var opt={nameAccount:this.nameAccount,uid:this.uid};if(inviteSignal===INVITE_SIGNAL_INVITE){opt["inviteState"]=INVITE_STATE_INVITE}if(inviteSignal===INVITE_SIGNAL_INVITED){opt["inviteState"]=INVITE_STATE_INVITED}getJSONP(this.heartBeatURl,opt,proxy(this,function(rs){if(rs.r!==RESULT_SUCCESS){return}if(rs.gap){this.ajustServerMonitorGap(rs.gap*1e3)}if(rs.inviteState===INVITE_STATE_UNINVITED){return}if(rs.inviteState===INVITE_STATE_INVITE){this.setInviteState(INVITE_SIGNAL_INVITE,rs.kfext,rs.inviteMsg);return}if(rs.inviteState===INVITE_STATE_INVITED){this.setInviteState(INVITE_SIGNAL_INVITED)}}))},slaveMonitor:function(){if(this.isInvited()){this.monitors.slave.drop()}var storage=this.storage,slaves=storage.get(SLAVE_IDS);if(!slaves){return}slaves=slaves.split(DATA_SEPERATOR);var aliveSlaves="",time=+new Date,lastSlaveHeartbeat,slave,gap;for(var i=0;slave=slaves[i++];){log("monitoring slave "+slave+" state");lastSlaveHeartbeat=storage.get(slave)||0;gap=time-parseInt(lastSlaveHeartbeat);log("gap of slave "+slave+" is "+gap);if(gap>3*SLAVE_HEARTBEAT_GAP){storage.del(slave);log("clear slave "+slave+" in storage")}else{aliveSlaves+=slave+DATA_SEPERATOR}}storage.set(SLAVE_IDS,aliveSlaves)},sleepMonitor:function(){var slaves=this.storage.get(SLAVE_IDS)||"",activeSlave=slaves.substr(0,slaves.length-1).split(DATA_SEPERATOR).pop();if(this.sleep){if(this.activeSlave!==activeSlave){this.activeSlave=activeSlave;this.sleep=false;this.monitors.sleep.setGap(SERVER_MONITOR_SLEEPCHECK_GAP)}}else{if(this.activeSlave===activeSlave){this.sleep=true;this.monitors.sleep.setGap(SERVER_MONITOR_SLEEPING_GAP)}else{this.activeSlave=activeSlave}}},kill:function(){masters[this.nameAccount]=undefined;if(this.monitors){this.monitors.server.drop();this.monitors.slave.drop();this.heartBeat.drop();clearTimeout(this.autoInviteTimer)}log("master killed")},recycle:function(){var storage=this.storage,keys=[INVITE_KFEXT,INVITE_MSG];for(var i=0,key;key=keys[i++];){storage.del(key)}log("storage recycled")},heartBeatProcess:function(){var storage=this.storage;if(storage.get(MASTER_ID)!==this.id){this.kill();return false}this.storage.set(MASTER_HEARTBEATS,+new Date)}};var slaves={};return{load:function(nameAccount,uid,cfg){if(this.isLoaded(nameAccount)){log(nameAccount+" slave already running");return}var slave=new Slave(nameAccount,uid,cfg);slaves[nameAccount]?slaves[nameAccount].push(slave):slaves[nameAccount]=[slave]},isLoaded:function(nameAccount){return typeof slaves[nameAccount]!=="undefined"}}});BizQQWPA.define("util.blockStorage","util.sessionStorage",function(require){var sessionStorage=require("sessionStorage");var Storage=function(blockIndex){this.blockIndex=blockIndex};Storage.get=function(name){return sessionStorage.get(name)};Storage.set=function(name,value){return sessionStorage.set(name,value)};Storage.del=function(name){return sessionStorage.del(name)};Storage.find=function(){return sessionStorage.find.apply(sessionStorage,arguments)};Storage.prototype={set:function(name,value){return sessionStorage.setItem(this.blockIndex+name,value)},get:function(name){return sessionStorage.getItem(this.blockIndex+name)},del:function(name){return sessionStorage.removeItem(this.blockIndex+name)}};return factory=function(kfuin){return new Storage(kfuin)}});BizQQWPA.define("util.sessionStorage","util.localStorage,util.cookie",function(require){var localStorage=require("util.localStorage"),cookie=require("util.cookie");var SESSION_STORAGE_PRE="IESESSION";var getAliveStatus=function(){return!!cookie.get(SESSION_STORAGE_PRE)},setAliveStatus=function(value){cookie.set(SESSION_STORAGE_PRE,value,null,"/")},clear=function(){var pattern=new RegExp("^"+SESSION_STORAGE_PRE+"[\\S]+$"),queue=[];for(var i=0;i<localStorage.length;i++){if(localStorage.key(i).match(pattern)){queue.push(localStorage.key(i))}}while(queue.length){localStorage.removeItem(queue[0]);queue.shift()}};if(!getAliveStatus()){setAliveStatus("alive");clear()}return{setItem:function(key,value){localStorage.setItem(SESSION_STORAGE_PRE+key,value)},getItem:function(key){return localStorage.getItem(SESSION_STORAGE_PRE+key)},removeItem:function(key){localStorage.removeItem(SESSION_STORAGE_PRE+key)},clear:clear}});BizQQWPA.define("util.localStorage","util.cookie,lang.trim",function(require){var Cookie=require("util.cookie"),trim=require("lang.trim");var COOKIE_PREFIX="IELS";var EXPIRES=31536e8;var doc=document,commonPattern=new RegExp("(?:^|[ ;])"+COOKIE_PREFIX+"[^=]+=([^;$])"),keyPattern=function(key){return COOKIE_PREFIX+key},explore=function(callback){var attributes=doc.cookie.split(";"),i=0,length=attributes.length,items=[],match;if(callback){for(;i<length;i++){if(match=commonPattern.exec(attributes[i])){items.push(match[1]);callback(match[1])}}}else{for(;i<length;i++){(match=commonPattern.exec(attributes[i]))&&items.push(match[1])}}return items};return window.localStorage||{length:explore().length,key:function(index){return explore()[index]||null},getItem:function(key){return Cookie.get(keyPattern(key))},setItem:function(key,value){Cookie.set(keyPattern(key),value,null,"/",EXPIRES)},removeItem:function(key){Cookie.del(key)},clear:function(){explore(function(item){Cookie.del(trim(item.split("=")[0]))})}}});