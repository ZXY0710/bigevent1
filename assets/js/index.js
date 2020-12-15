// 发送ajax请求来获取到用户的基本信息（头像、昵称）
getUserInfo();
let layer = layui.layer;

function getUserInfo() {
    $.ajax({
        url: "/my/userinfo",
        // 请求头的配置
        // headers: {
        //     // token 的值存储在本地存储中，需要从本地存储中来获取到
        //     // Authorization 这个不是随便写的，后端定义要求的
        //     Authorization: localStorage.getItem("token"),
        // },
        success: function(res) {
            if (res.status !== 0) {
                // console.log(res);

                return layer.msg("获取用户信息失败")
            }

            // 渲染出来头像和昵称
            // 注意点：
            // 1. 如果有头像的话，展示头像，没有的话，展示文字头像
            // 2. 如果有nickname，优先展示nickname，否则才展示username

            // 优先级（nickname和 username）

            let name = res.data.nickname || res.data.username;
            console.log(name);
            //展示名字
            $("#welcome").text("欢迎" + name)
                // 处理：2选1 需要根据 user_pic 来做判断
            if (res.data.user_pic) {
                // if成立，说明有图片
                // 图片显示，隐藏文字头像
                $(".layui-nav-img").attr("src", res.data.user_pic).show();
                $(".textResult").hide()
            } else {
                // 没有图片

                // 展示文字头像; 还需要修改文字头像的文字（来源于name的第一个字）
                let first = name[0].toUpperCase()
                $(".textResult").show().text(first)

                //隐藏图片头像
                $(".layui-nav-img").hide()
            }
        },

        complete: function(res) {
            // console.log("🚀 ~ file: index.js ~ line 55 ~ getUserInfo ~ res", res);
            // 通过res的responseJSON 可以获取到服务器响应回来的数据

            let data = res.responseJSON;

            if (data.status === 1 && data.message === "身份认证失败！") {
                location.href = "/大事件/01/home/login.html"
                localStorage.removeItem("token");
            }

            // 请求完成（不论成功还是失败，都会执行），判断
            // message === "身份认证失败！"
            // status === 1;
            // 就知道用户没有权限进入到index页面，需要回到login页面重新登录
        },
    })
}

//退出
$("#berakBtn").click(function() {
    layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function(index) {
        // 点击确认执行的函数
        // 思路：和登录做的事情是完全相反的
        // 1. 把本地存储的token给移出掉
        // 2. 跳转到登录页面
        location.href = "/大事件/01/home/login.html"
        localStorage.removeItem("token")
        layer.close(index);
    });

})