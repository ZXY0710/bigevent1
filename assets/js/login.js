$(function() {
    //去注册账号
    $("#goTocontent").click(function() {
            //显示注册
            $(".content").show();
            //隐藏登录
            $(".login").hide()
        })
        //点击登录
    $("#goTologin").click(function() {
        //显示登录
        $(".login").show()
            //隐藏注册
        $(".content").hide()
    })

    // 从layui中获取form表单相关的功能 ==> 注意一定要如此操作，否则直接使用form会报错
    let form = layui.form
    let layer = layui.layer; // layer 弹框功能
    // 表单的自定义校验规则
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]

        // pass 是密码的校验规则
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function(value, item) {
            // 通过value 和 密码框的值做比较，如果不一致，弹框提示
            // value：表单的值、item：表单的DOM对象
            // console.log(value, item);
            if (value !== $("#newpassword").val()) {
                return "两次输入的密码不一致"

            }
        }
    });

    // 实现注册功能
    // 1. 当form表单提交的时候，触发表单的submit提交功能 ==> 注册form的submit事件
    // 2. 阻止form表单的默认行为
    // 3. 收集表单中数据（用户名 、 密码） ==> jQ的serialize() form中带有name属性的值
    // 4. 发送ajax ==> 照着接口文档
    $("#register").on("submit", function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "http://ajax.frontend.itheima.net/api/reguser",
            data,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    // 注册失败
                    // return console.log(res.message);
                    return layer.msg(res.message);
                }
                // 注册成功
                // console.log("注册成功");
                layer.msg("注册成功");

                // 清空注册的form表单
                $("#register")[0].reset();

                // 去登录 ==> 触发其点击功能
                $("#goTologin").click();

            }
        })
    })

    //登录功能
    $("#loginForm").on("submit", function(e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            type: "POST",
            url: "http://ajax.frontend.itheima.net/api/login ",
            data,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 登录成功
                // layer.msg("登录成功, 即将跳转到首页");
                // 跳转页面 ==> 弹框刚出现，就跳转了（弹框关闭之后在跳转）
                // location.href = "/home/index.html";
                layer.msg(
                    "登录成功, 即将跳转到首页", {
                        time: 2000, // 2秒后关闭，关闭之后在跳转
                    },
                    function() {
                        location.href = "/大事件/01/home/index.html";
                    }
                );
            }

        })
    })

})