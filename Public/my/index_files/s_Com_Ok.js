www.concat('theme', {
    hasLoaded: false,
    events: function() {
		/*\u6674\u5929\u589E\u52A0\uFF1Awww.qingtiandy.cn*/
/*		var theme_c=J16.util.cookie.get('qttheme');
		if(theme_c!=null){
			$('#theme_css').attr('href', theme_c ? ''+qTcms_Com_.d+'images/iplatform/theme/' + theme_c + '/css.css': 'about:blank');
		}else{
			if(qTcms_Com_.gobal_pifu!="")
				$('#theme_css').attr('href', ''+qTcms_Com_.d+'images/iplatform/theme/'+qTcms_Com_.gobal_pifu+'/css.css');	
		}	*/	
        var face = $('#face'),
        tip = face.find('span:first'),
        T = this,
        running = 0,
        tipped = J16.util.cookie.get('tipped');
        face.toggle(function() {
            if (running) return;
            running = 1;
            T.loadHtml(function() {
                $('#theme_layer').slideDown(function() {
                    face.html('<em></em>\u6536\u8D77');
                    running = 0;
                });
            });
            J16.util.cookie.set('tipped', '1');
            tip.fadeOut();
        },
        function() {
            if (running) return;
            running = 1;
            $('#theme_layer').slideUp(function() {
                face.html('<em></em>\u6362\u80A4');
                running = 0;
            });
        }).focus(function() {
            this.blur()
        });
        tipped || (tip.show(), setTimeout(function() {
            tip.fadeOut();
        },
        5000))
    },
    loadHtml: function(fn) {
        if (this.hasLoaded) return fn();
        var T = this;
        $.get(qTcms_Com_.theme, '',
        function(e) {
            var bg = e.indexOf('<div');
            var nd = e.indexOf('<script', bg);
            var html = e.substring(bg, nd);
            var css = e.substr(0, bg);
            var js = e.substr(nd);
			html=html.replace("{nextpage}","\u4E0B\u4E00\u9875").replace("{prepage}","\u4E0A\u4E00\u9875").replace("{page}","\u9875").replace("{submit}","\u786E\u5B9A").replace("{skintype}","\u76AE\u80A4\u5206\u7C7B\uFF1A").replace("{quxiao}","\u53D6\u6D88").replace("{moren}","\u6062\u590D\u9ED8\u8BA4")
            $('#theme_layer').html(html);
            $('head').append(css).append(js);
            T.hasLoaded = true;
            setTimeout(fn, 100);
        })
    },
    init: function() {
        this.events();
    }
});