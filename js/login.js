$(function () {
    // 表单校验要求
    // 1.用户名密码不能为空；2.密码长度为6^12位字符；3，表单提交的时候做校验，如果校验失败了，阻止表单提交到服务器；
    var $form = $('form');
    $form.bootstrapValidator({　
        // 配置校验时显示的图标，
        feedbackIcons: {
            // 输入符合校验
            valid: 'glyphicon glyphicon-ok',
            // 输入不符合校验
            invalid: 'glyphicon glyphicon-remove',
            // 输入符合校验规则
            validating: 'glyphicon glyphicon-refresh'
        },
        // 配置校验的规则
        fields: {
            // 配置表单里name属性值为username的input标签的效验规则；
            username: {
                // 所有的校验规则
                validators: {
                    // notEmpty不能为空
                    notEmpty: {
                        // message：如果为空弹出的提示信息
                        message: '用户名称不能为空！'
                    }
                }
            },
            // 配置表单里name属性为password的input标签的校验规则
            password: {
                // 所有的校验规则
                validators: {
                    // 不能为空
                    notEmpty: {
                        // 不符合规则弹出的提示信息
                        message: '用户密码不能为空！'
                    },
                    // 输入字符的长度
                    stringLength: {
                        // 最小输入6位
                        min: 6,
                        // 最大输入12位
                        max: 12,
                        // 不符合此规则弹出的提示信息
                        message: '请输入6^12位的字符'
                    }
                }
            }
        }
    });
    
    // 校验成功向服务器发送ajax请求；
    // 使用插件自带的表单校验成功事件；这个事件在表单校验成功以后的时候，点击提交的时候触发；success.form bv
    $form.on('success.form.bv',function(e){
        // console.log(66666);
        // 1.阻止浏览器默认行为（提交表单，刷新页面）jquery阻止浏览器默认行为的方法；
        e.preventDefault();
        $form.serialize();
        // console.log(e);
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$form.serialize(),
            success:function(info){
                console.log(info);
                if(info.success){
                    location.href = 'index.html'
                }
                if(info.error == 1000){
                    // 实例化插件对象（bootstrapValidator）；调用对象的方法
                    // 更改表单显示状态
                    var data = $form.data('bootstrapValidator');
                    // console.log(data);
                }

            }
        })
    })
})