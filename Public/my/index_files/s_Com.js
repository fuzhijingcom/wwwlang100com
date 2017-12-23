/**
* 根namespace，核心模块。
* @Module J16
*/
(function (win, J, undefined) {
    if (win[J] === undefined) win[J] = {};
    J = win[J];
    /**
    * @property {string} 版号
    */
    J.version = "1.1.0";

    /**
    * Simple JavaScript Inheritance
    * By John Resig http://ejohn.org/blog/simple-javascript-inheritance/
    * Inspired by base2 and Prototype
    * MIT Licensed.
    */
    (function () {
        var initializing = false, fnTest = /xyz/.test(function () { xyz; }) ? /\b_super\b/ : /.*/;

        // The base Class implementation (does nothing)
        function Class() { }

        // Create a new Class that inherits from this class
        Class.extend = function (prop) {
            var _super = this.prototype;

            // Instantiate a base class (but only create the instance,
            // don't run the init constructor)
            initializing = true;
            var prototype = new this();
            initializing = false;

            // Copy the properties over onto the new prototype
            for (var name in prop) {
                // Check if we're overwriting an existing function
                prototype[name] = typeof prop[name] == "function" &&
				typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function (name, fn) {
				    return function () {
				        var tmp = this._super;

				        // Add a new ._super() method that is the same method
				        // but on the super-class
				        this._super = _super[name];

				        // The method only need to be bound temporarily, so we
				        // remove it when we're done executing
				        var ret = fn.apply(this, arguments);
				        this._super = tmp;

				        return ret;
				    };
				})(name, prop[name]) :
				prop[name];
            }

            // The dummy class constructor
            function Klass() {
                // All construction is actually done in the init method
                if (!initializing && this.init)
                    this.init.apply(this, arguments);
            }

            // Populate our constructed prototype object
            Klass.prototype = prototype;

            // Enforce the constructor to be what we expect
            Klass.constructor = Class;

            // And make this class extendable
            Klass.extend = arguments.callee;

            return Klass;
        };

        J.Class = Class;
    })();
})(window, "J16");
/** 
* 常量    
* 调用示例：alert(J16.con.get('常量名'));
* @module con
* @requires J16
*/
/**
* util模块。
* 辅助函数不单独建文件放，组件、插件、widget单独建文件存放，比如弹窗组件J16.util.dialog.js
* @module J16.util
* @requires J16
*/
J16.util = window.J16.util || {
	/**
	* 基于firebug环境控制台函数。
	* @method console
	* @param {string} type 函数类型，参见http://getfirebug.com/console.html
	* @public
	*/
	console: function (type, message) {
		if (window.console)
			window.console[type](message);
	},
	getType: function (o) {
		var s = Object.prototype.toString, t =
		{
			'undefined': 'undefined',
			'number': 'number',
			'boolean': 'boolean',
			'string': 'string',
			"[object Function]": "function",
			"[object RegExp]": "regexp",
			"[object Array]": "array",
			"[object Date]": "date",
			"[object Error]": "error"
		};
		return t[typeof o] || t[s.call(o)] || (o ? 'object' : 'null');

	},
	getDomain: function () {
		return "." + location.host.split(".").slice(-2).join(".");
	},
	setHome: function (o, r) {
		o.target = "_self"; var a = "url(#default#homepage)", b = "";
		try {
			if (document.all && !external.max_version) {
				o.style.behavior = a;
				o.setHomePage(r ? r : "http://www" + this.getDomain());
			} else {alert("您的浏览器暂不支持！")};
		} catch (e) {// 有些ie8下external.max_version直接报异常
			if (document.all) {
				o.style.behavior = a;
				o.setHomePage(r ? r : "http://www" + this.getDomain());
			} else {alert("您的浏览器暂不支持！")};
		}
		return false;
	},
	getQueryString: function (name) {
		var reg = new RegExp("[?&]" + name + "=([^&]*)"), h = window.location.href,r;
		h = h.substr(h.indexOf("?"));
		r = h.match(reg);
		return r ? r[1] : "";
	},
	/**
	* 判断两个DOM盒是否重叠
	* @param {object} elem1 Dom对象1
	* @param {object} elem2 Dom对象2
	* @return  {bool}
	*/
	hitTest: function (elem1, elem2) {
		var pos1 = elem1.getBoundingClientRect(), pos2 = elem2.getBoundingClientRect(), x1 = pos1.left, y1 = pos1.top,
            x2 = pos2.left, y2 = pos2.top, w1 = elem1.offsetWidth, h1 = elem1.offsetHeight, w2 = elem2.offsetWidth, h2 = elem2.offsetHeight;
		return (x1 < x2 ? x1 + w1 > x2 : x1 < x2 + w2) && (y1 < y2 ? y1 + h1 > y2 : y1 < y2 + h2);
	},
	/**
	* 简易格式化函数（支持反斜杠转义）mt=mini templet
	* @method mt
	* @param {string} templet
	* @param {json} data
	* @param {boolean} 转义
	* @return {string}
	* @public
	* @example
	* var orign = '这是一个模板函数他的标题是{$title},内容是{$content}';
	* var newtmp = J16.util.mt(orign, {'title': '模板标题', 'content': '模板内容'}); or
	* var newtmp1 = J16.util.mt(orign, [{'title': '模板标题', 'content': '模板内容'}]);
	*/
	mt: (function () {
		function parse(s) {
			var a = [];
			var re_t = /\{\$((?:[^\\}]|\\[\s\S])+)\}/;
			var re_s = /\\([\s\S])/g;
			var esc = function (s) { return s.replace(re_s, '$1'); };
			var re_c = /(?:^|[^\\])(?:\\\\)*$/;
			var t, m, n;
			while (t = re_t.exec(s)) {
				n = (m = t.index) + t[0].length;
				if (re_c.test(s.substr(0, m))) {
					a.push(esc(s.substr(0, m)));
					a.push([esc(t[1])]);
				}
				else a.push(esc(s.substr(0, n)));
				s = s.substr(n);
			}
			return a;
		}
		function show(s, o) {
			var a = parse(s);
			for (var i = 0; i < a.length; i++)
				if (typeof a[i] == 'object')
					a[i] = o[a[i]] || '';
			return a.join('');
		}

		function show2(s, o) {
			return s.replace(/\{\$([^}]+)\}/g, function (a, b) {
				return o[b] || '';
			});
		}
		return function (template, data, adv) {
			var f = adv ? show : show2;
			if (!(data instanceof Array))
				return f(template, data);

			var s = '';
			for (var i = 0; i < data.length; i++)
				s += f(templet, data[i]);
			return s;
		};
	})(),
	guid: (function () {
		if (typeof document.documentElement.uniqueID !== 'undefined') {
			return function (element) {
				return element.uniqueID;
			};
		}
		var uid = 0;
		return function (element) {
			return element.__uniqueID || (element.__uniqueID = 'uniqueID__' + uid++);
		};
	})()
};







J16.util.cookie = {
    /**
    * 设置cookie。setCookie(name, value, expires, path, domain, secure)
    * @method setCookie
    * @param {string} n cookie字段的名字
    * @param {string} v cookie字段的值
    * @param {number} e expires,保存天数
    * @param {string} p cookie的path
    * @param {string} d cookie的domain
    * @param {boolean} s cookie的secure
    * @return void
    * @public
    */
    set: function (n, v, e, p, /*string*/d, /*boolean*/s) {
        if (!e) e = 365; if (!p) p = '/';
        e = e * 1000 * 60 * 60 * 24;
        var e_date = new Date(new Date().getTime() + (e));
        document.cookie = n + '=' + encodeURIComponent(v) + ((e) ? ';expires=' + e_date.toGMTString() : '') +
						((p) ? ';path=' + p : '') + ((d) ? ';domain=' + d : '') + ((s) ? ';secure' : '');
    },
    /**
    * 获取cookie
    * @method getCookie
    * @param {string} name cookie字段的名字
    * @return {string}
    * @public
    */
    get: function (/*string*/n) {
        var c = document.cookie.split("; ");
        for (var i = 0; i < c.length; i++) {
            var p = c[i].split("=");
            if (n == p[0]) try { return decodeURIComponent(p[1]) } catch (e) { return null }
        }
        return null;
    },
    /**
    * --删除cookie
    * @method deleteCookie
    * @param {string} name
    * @param {string} path
    * @param {string} domain
    * @public */
    del: function (name, path, domain) {
        /*if (this.get(name)) */document.cookie = name + "=1" + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    }
};
/**
* jsonp - get请求
* @param {string} url 必填。
* @param {funciton} fnback 必填。回调函数
* @param {string} callbackName 可选。可以自定义jsonp参数的名称，默认是"callback"
* @param {bool} isSimple 可选。是否简单模式。如果为true, 表示简单创建script标签(而不会带callback=jsonp12344566), 这适用于需要缓存的情况
* @eg: J16.io.get('http://api.1616.net/update.php', fn);
*/

/**
* 本地存储的函数 当指定v的时候表示写，仅指定k的时候表示读取
* @param {string} k
* @param {string} v
* @param {string} domain 所在的域
*/




var JBase = J16.Class.extend({
    __active: 0,
    __iframeMode: 1,
    __needLogin: 0,
    __keepAlive: 1,
    __stickAble: 0,
    __name: '',
    __cfg: {
        __version: '1.0.0'
    },
    __login: function() {},
    __logout: function() {},
    __todo: function() {},
    __upgrade: function(runFrame) {
        runFrame()
    },
    __updateCfg: function(fnback) {
        var runTime = 0,
        recalled, T = this,
        name = this.__name,
        requestConfig = function() {
            /*J.isLogin ? J16.io.get('http://api.1616.net/get2.php?app=' + name, setCfg) : J16.io.get('http://api.1616.net/visitor_get2.php?visitor_id=' + J.user + '&app=' + name, setCfg);*/
			checkUpgrade();
        };
        function setCfg(d) {
            switch (d.code) {
            case 1:
                var e = str2obj(d.desc);;
                if (e != null) {
                    if (e == "") e = {
                        __version: '1.0.0'
                    };
                    T.__cfg = e;
                }
                checkUpgrade();
                break;
            case 0:
                $("#app_loader_" + name).html("<div class=appcfgloaderror>数据读取失败，请<a href='javascript:location.reload();' target=_self>点击这里</a>重试或按F5键刷新。如还无法解决，<a href='http://www.1616.net/jd/misc/advice.htm?app=" + name + "' target=_self>请与我们联系</a>。</div>");
				break;
            case - 1 : showLoginWindow("登录超时，请重新登录");
                break;
            }
        }
        requestConfig();
        function checkUpgrade() {
            fnback.call(T);
        }
    },
    __simpleSave: function(key, fn) {
        var a0 = arguments[0],
        key = $type(a0) == 'string' ? a0: '',
        fn = arguments[1] ? arguments[1] : a0;
        if (key && this.__cfg[key] == undefined || $type(fn) != 'function') return;
        var T = this,
        cfg = key == '' ? obj2str(this.__cfg) : obj2str(this.__cfg[key]),
        hash = {
            app: this.__name,
            key: key,
            value: cfg,
			action: key
        };
        if (J.isLogin) {
			if(hash.action=="famous"){
				J16.io.set(qTcms_Com_.dir+"p_inc/qTcms.J16.asp", $.paramgbk(hash), fn);
			}else{
           		/*J16.io.set('http://api.1616.net/update.php', $.param(hash), fn);*/
			}
        } else {
            hash.visitor_id = J.user;
            /*J16.io.set('http://api.1616.net/visitor_update.php', $.param(hash), fn);*/
        }
    },
    init: function(opt) {
        $.extend(this, opt);
    }
});




var Main = J16.Class.extend({

    apps: {},
    __eventQ: {
        logAction: null
    },
    activeAppName: 'www',
    init: function() {
        this.__eventQ.logAction = this.isLogin ? '__login': '__logout';
    },
    add: function(name, app, win) {
		window.status='';
        var T = this;
        app.__name = name;
        app.__active = 1;
        var menu = $('#app_' + name);
        app.__iframeMode = menu.attr('mode');
        app.__version = menu.attr('ver');
        var realApp = this.apps[name] = new JBase(app);
        if (realApp.__beforeInit) {
            realApp.__beforeInit();
        }
        realApp.__updateCfg(function() {
            realApp.init();
            if (menu.attr('todo') !== undefined) {
                realApp.__todo(menu.attr('todo'));
            }
            $('#loading').hide();
            realApp.__updateHeight && realApp.__updateHeight();
            var ev = T.__eventQ;
            for (var p in ev) ev[p] == null || realApp[ev[p]]();
        });
        app = null;
        if (realApp.__iframeMode == 1) {
            if (win && $type(win) == 'object') {
                realApp.__updateHeight = function(height) {
                    var d = win.document;
                    if (!this.originalHeight || height === true) {
                        d.body.style.height = '';
                        height = this.originalHeight = d.body.offsetHeight;
                    }
					
                    height = height || this.originalHeight;
                    var menuHeight = $('#l').height() + 4;
                    var _height = Math.max(height, menuHeight);
                    d.body.style.height = _height + 'px';
                    $('#app_loader_' + name).find('iframe').andSelf().height(_height + 4);
                };
                win.getIns = getIns;
                win.document.body.style.border = '0px';
                if (name == 'tuangou') {
                    //win.document.getElementById('gj').style.border = '0px';
                }
                $(win.document).mousedown(function() {
                    //$('#weather-f').hide();
                })
            }
            if (name == 'radio') {
                //$("#iframe_radio").contents().find("#radio_body").attr('class', 'noborder');
            }
            if (realApp.__stickAble) {
                realApp.__updateStick = function(inner, display) {
                    $('#app_' + name + ' .sk').attr('stick', 1).html(inner);
                };
                realApp.__hideStick = function() {
                    $('#app_' + name + ' .sk').attr('stick', 0).hide();
                };
            }
            if (realApp.__needLogin && !this.isLogin) {}
        }
    },
    load: function(appName) {
        var app = this.apps[appName],
        T = this;
        if (this.activeAppName == appName) return;
        this.unload(this.activeAppName);
        this.activeAppName = appName;
        var endWith = appName == 'www' ? 'index': appName;
        location.hash = endWith;
        if (app && app.__active) {
            var loader = $('#app_loader_' + appName);
            if (appName != 'www') {
                if (navigator.userAgent.indexOf('Firefox') !== -1) {
                    if (loader.data('height')) {
                        loader.css('height', loader.data('height'));
                    }
                } else {
                    loader.css({
                        position: 'relative',
                        left: 0,
                        top: 0
                    });
                }
            } else {
                loader.show();
            }
            $('#loading').hide();
        } else {
            var m = $('#app_' + appName),
            customSrc = m.attr('appurl'),
            _h = m.attr('_h');
            var appDir = customSrc || 'http://loading.qtcms.net/Api/' + appName + '/';
			
            if ($('#app_' + appName).attr('mode') == 1) {
                var template = "<div class='iframe_loader' id='app_loader_" + appName + "'><iframe id='iframe_" + appName + "' frameborder='0' src='" + appDir + "' width='100%' height='" + (_h || "100%") + "' scrolling='no' allowtransparency='true'></iframe></div>";
                $('#r').append(template);
            } else {
                $.get(appDir,
                function(e) {
                    $('<div id="app_loader_' + appName + '" class="iframe_loader">' + e + '</div>').appendTo($('#r'));
                });
            }
            $('#loading').show();
        }
    },
    unload: function(appName) {
        var app = this.apps[appName],
        loader = $('#app_loader_' + appName);
        if (!app) {
            loader[0].innerHTML = '';
            loader.remove();
            return;
        };
        if (app.__onUnload) {
            app.__onUnload();
        }
		
        if (app.__keepAlive) {
            if (appName != 'www') {
                if (navigator.userAgent.indexOf('Firefox') !== -1) {
                    var _height = loader.height();
                    loader.data('height', _height).css({
                        height: 0
                    });
                } else {
                    loader.css({
                        position: 'absolute',
                        left: 0,
                        top: -9999
                    });
                }
            } else {
                loader.hide();
            }
            if (app.__stickAble) {
                app.__showStick && app.__showStick();
            }
        } else {
            loader.remove();
            app.__active = 0;
            if (app.__iframeMode) {
                delete this.apps[appName];
            }
        }
    },
    dispatch: function(eventType, params) {
        if (eventType == '__login' || eventType == '__logout') {
            var hash = location.hash,
            href = "";
            var has = false;
            $('#newnav>li').each(function(k, v) {
                if (v.id.indexOf(hash.slice(1)) > 0) has = true;
            });
            if (eventType == '__login' && hash.indexOf('manager') != -1) {
                has = true;
            }
            hash = has ? hash: location.search == '?exp' ? '?exp': '#index';
            href = location.href.replace(/net.*/, eventType == '__login' ? 'net/' + J.user + '/' + hash: 'net/' + hash);
            location.href == href ? location.reload() : location.href = href;
        } else {
            $.each(this.apps,
            function(k, v) {
                v[eventType] && v[eventType].apply(v, (params || []))
            });
        }
    }
});





var www = {
    $APP: {},
    __iframeMode: 0,
    __cfg: {},
    runInitAuto: true,
    concat: function(GUID, app) {
        app.autoInit = arguments.length == 2;
        this.$APP[GUID] = app;
    },
    events: function() {
        $('#login').click(function() {
            showLoginWindow();
            return false;
        });
        $('#uname').click(function() {
            showWindow({
                iframe: qTcms_Com_.Member,
                width: 440,
                height: 280,
                title: '我的帐户'
            });

            return false;
        });
        $('#mhome,a.sethome').click(function() {
            var s = location.href.replace(/#.*$/, '');
            set_home(this, s);
            return false;
        });
    },
    __beforeInit: function() {
        var T = this;
        $.each(this.$APP,
        function(name, app) {
            app.getCfg = function() {
                return T.__cfg[name]
            };
            app.setCfg = function(cfg) {
                return T.__cfg[name] = cfg
            };
            app.__save = function(cfg, fn) {
                app.setCfg(cfg);
                T.__simpleSave(name, fn);
            }
        });

    },
    __updateCfg: function(callbackFn) {
        callbackFn.call(this);
    },
    get: function(name) {
        return this.$APP[name];
    },
    call: function(fnName) {
        $.each(this.$APP,
        function(k, v) {
            if ((fnName === 'init' && v.autoInit) || fnName !== 'init') fnName in v && v[fnName]();
        });
    },
    __login: function() {
        this.call('__login');
    },
    __logout: function() {
        this.call('__logout');
    },
    __upgrade: function() {
        this.call('__upgrade');
    },
    init: function() {
        this.call('init');
        this.events();
    }
};




var J = new Main();
function getIns(name) {
    return J.apps[name] || null;
}