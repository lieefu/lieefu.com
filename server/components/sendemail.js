var nodemailer = require('nodemailer');
var config = require('..//config/environment');
// create reusable transporter object using SMTP transport
var smtpTransport = nodemailer.createTransport({
	host: "smtp.126.com", // hostname
	secureConnection: true, // use SSL
	port: 465,
	auth: {
		user: "pbcmail@126.com",
		pass: config.MAILCLIENT_PASS_126
	}
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
	from: 'pbcmail ✔ <pbcmail@126.com>', // sender address
	to: 'tb1210582007@126.com ,pbcmail@126.com', // list of receivers
	subject: 'Hello toby✔', // Subject line
	text: 'Hello world ✔', // plaintext body
	html: '<b>Hello world ✔</b>请参考这里的代码 <a href="http://my.oschina.net/lieefu/blog/423884">http://my.oschina.net/lieefu/blog/423884</a>' // html body
};
console.log("config.MAILCLIENT_PASS_126 is",config.MAILCLIENT_PASS_126);

module.exports= function(receiver,action,key,callback){
	// send mail with defined transport object
	mailOptions.to =receiver;
	if(action=="active"){
		mailOptions.subject="金融消费权益保护账号激活";
		mailOptions.text = "把后面的url地址复制到浏览器地址栏内，激活你的账号：http://www.lieefu.com/api/users/active/"+key;
		mailOptions.html = '点击链接，激活你的账号：<a href="http://www.lieefu.com/api/users/active/'+key+'">http://www.lieefu.com/api/users/active/'+key+'</a>';
	}else if(action=="resetpass"){
			mailOptions.subject="金融消费权益保护账号激活";
			mailOptions.text = "把后面的url地址复制到浏览器地址栏内，重置你的密码：http://www.lieefu.com/api/users/resetpass/"+key;
			mailOptions.html = '点击链接，重置密码：<a href="http://www.lieefu.com/api/users/resetpass/'+key+'">http://www.lieefu.com/api/users/resetpass/'+key+'</a>';
	}
	console.log("mailOptions",mailOptions);
	smtpTransport.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
			callback(error);
		} else {
			callback(null,info);
			console.log('Message sent: ' + info.response);
		}
		// if you don't want to use this transport object anymore, uncomment following line
		smtpTransport.close(); // shut down the connection pool, no more messages
	});

}
