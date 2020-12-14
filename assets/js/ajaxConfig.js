//路径优化
$.ajaxPrefilter(function(options) {
    options.url = "http://ajax.frontend.itheima.net" + options.url;
    // console.log(options);
})