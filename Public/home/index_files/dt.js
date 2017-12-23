(function () {
    function _doWork() {
        var domainMap = _mba.dt_domains;
        if (window._mba && _mba.dt_bis && _mba.dt_bis.length) {
            for (var i in _mba.dt_bis) {
                var dt = new Date().getTime();
                var bid = _mba.dt_bis[i], iframeid = "mb_dt_" + bid + '_' + dt, src = '//' + domainMap[_mba.dt_bis[i]] + '/dt?d=' + _mba.media_id + '&b=' + bid + "&rid=" + _mba.rid + '&_=' + dt;
                var iframe = '<iframe id="' + iframeid + '" src="' + src + '" width="1" height="1" align="center,center" vspace="0" hspace="0" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" style="border: 0; vertical-align: bottom; margin: 0;" allowtransparency="true"></iframe>';
                var divObj = document.createElement("div");
                divObj.innerHTML = iframe;
                document.body.appendChild(divObj);
            }
        }
    }

    setTimeout(_doWork, 500);
})();