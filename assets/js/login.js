$(function() {
    $("#link_reg").on('click', function() {
        $(".login-box").hide();
        $(".reg-box").show();

    });
    $("#link_login").on('click', function() {
        $(".login-box").show();
        $(".reg-box").hide();


    });

    // 从layui中获取form对象
    var form = layui.form
        // 通过form.verify()函数自定义效验规则
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
        },
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        //密码效验两次密码是否一致
        repwd: function(value) {
            //通过形参拿到的是确认密码框中的内容
            var pwd = $('#pwd').val();
            console.log(pwd);
            console.log(value);


            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    });

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
            // 2. 发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('http://ajax.frontend.itheima.net/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
                // 模拟人的点击行为
            $('#link_login').click()
        })
    })
})