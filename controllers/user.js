let mongoose = require('mongoose');
require('../models/user');
const nodeMailer = require('nodemailer') // 通过node发送邮件
const createToken = require('../token/createToken');
const checkToken = require('../token/checkToken'); // 验证token
const Email = require('../dbs/config.js');
//验证码
const Redis = require('koa-redis')

const Store = new Redis().client;
const User = mongoose.model('User');
var vertify = async (ctx, next) => {
    console.log("------------------------------------------iam coming in",Email.smtp.host,Email.smtp.user);
    const { username } = ctx.request.body;
    console.log( ctx.request.body);
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire') // 拿到过期时间

    console.log(ctx.request.body);
    console.log('当前时间:', new Date().getTime());
    console.log('过期时间：', saveExpire);

    // 检验已存在的验证码是否过期，以限制用户频繁发送验证码
    if (saveExpire && new Date().getTime() - saveExpire < 0) {
        ctx.body = {
            code: -1,
            msg: '发送过于频繁，请稍后再试'
        }
        return
    }
    console.log('------')
    // QQ邮箱smtp服务权限校验
    const transporter = nodeMailer.createTransport({
        /**
         *  端口465和587用于电子邮件客户端到电子邮件服务器通信 - 发送电子邮件。
         *  端口465用于smtps SSL加密在任何SMTP级别通信之前自动启动。
         *  端口587用于msa
         */
        host: Email.smtp.host,
        port: 587,
        secure: false, // 为true时监听465端口，为false时监听其他端口
        auth: {
            user: Email.smtp.user,
            pass: Email.smtp.pass
        }
    })

    // 邮箱需要接收的信息
    const ko = {
        code: Email.smtp.code(),
        expire: Email.smtp.expire(),
        email: ctx.request.body.email,
        user: ctx.request.body.username
    }

    // 邮件中需要显示的内容
    const mailOptions = {
        from: `"认证邮件" <${Email.smtp.user}>`, // 邮件来自
        to: ko.email, // 邮件发往
        subject: '邀请码', // 邮件主题 标题
        text: `"您正在注册****，您的邀请码是"${ko.code}`, // 邮件内容
        html:""
    }

    // 执行发送邮件
    await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log('error')
        } else {
            Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
        }
    })

    ctx.body = {
        code: 0,
        msg: '验证码已发送，请注意查收，可能会有延时，有效期5分钟'
    }
}

//注册
var register = async ctx => {
    const { username, password, email, code } = ctx.request.body;

    // 验证验证码
    if (code) {
        const saveCode = await Store.hget(`nodemail:${username}`, 'code') // 拿到已存储的真实的验证码
        const saveExpire = await Store.hget(`nodemail:${username}`, 'expire') // 过期时间

        console.log(ctx.request.body)
        console.log('redis中保存的验证码：', saveCode)
        console.log('当前时间:', new Date().getTime())
        console.log('过期时间：', saveExpire);

        // 用户提交的验证码是否等于已存的验证码
        if (code === saveCode) {
            if (new Date().getTime() - saveExpire > 0) {
                ctx.body = {
                    code: -1,
                    msg: '验证码已过期，请重新申请'
                }
                return
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '请填写正确的验证码'
            }
            return
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '请填写验证码'
        }
        return
    }

    // 用户名是否已经被注册
    const user = await User.find({ username });
    if (user.length) {
        ctx.body = {
            code: -1,
            msg: '该用户名已被注册'
        }
        return
    }
    // 如果用户名未被注册，则写入数据库
    const newUser = await User.create({
        username,
        password,
        email,
        token: createToken(this.username) // 生成一个token 存入数据库
    })

    // 如果用户名被成功写入数据库，则返回注册成功
    if (newUser) {
        ctx.body = {
            code: 0,
            msg: '注册成功',
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '注册失败'
        }
    }
}

//登录
var login = async (ctx, next) => {
    const { username, password } = ctx.request.body

    let doc = await User.findOne({ username })
    if (!doc) {
        ctx.body = {
            code: -1,
            msg: '用户名不存在'
        }
    } else if (doc.password !== password) {
        ctx.body = {
            code: -1,
            msg: '密码错误'
        }
    } else if (doc.password === password) {
        console.log('密码正确')
        let token = createToken(username) // 生成token
        doc.token = token // 更新mongo中对应用户名的token
        try {
            await doc.save() // 更新mongo中对应用户名的token
            ctx.body = {
                code: 0,
                msg: '登录成功',
                username,
                token
            }
        } catch (err) {
            ctx.body = {
                code: -1,
                msg: '登录失败，请重新登录'
            }
        }
    }
}
module.exports = {
    'POST /vertify':vertify,
    'POST /register': register,
    'POST /login':login
}