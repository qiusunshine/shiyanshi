package controllers

import (
	"github.com/astaxie/beego"
	"hdy/shiyanshi/models"
	"strings"
	"net/smtp"
	"fmt"
	"github.com/Unknwon/goconfig"
)
var tasks =make(chan string,100)
var httpp string
type AddWebsController struct {
	beego.Controller
}
func (c *AddWebsController)Get()  {
	c.TplName="addWebs.html"
}
func (c *AddWebsController)Post()  {
	title:=c.GetString("title")
	url:=c.GetString("url")
	class:=c.GetString("class")
	if class==""||(class!="影视" && class!="音乐" && class!="网盘磁力" &&class!="生活休闲" &&class!="实用工具" &&class!="其它") {
		c.Ctx.WriteString("<p>提交的分类不正确！只能提交的分类：影视，音乐，网盘磁力，生活休闲，实用工具，其它；你提交的分类为："+class+"</p><p><a href=\"/\">返回首页</a></p>")
		return
	}
	webs:=models.NewWebs(title,url,class)
	err:=models.SaveOne(webs)
	if err!=nil{
		c.Ctx.WriteString("<p>出错了！错误的原因为："+err.Error()+"</p><p><a href=\"/\">返回首页</a></p>")
	}else {
		tasks<-title
		c.Ctx.WriteString("<p>提交成功，经过审核即可展示！</p><p><a href=\"/\">返回首页</a></p>")
	}
}
func init()  {
	go func() {
		println("开始监听邮箱")
		cfg, ConfError := goconfig.LoadConfigFile("config.ini")
		if ConfError != nil {
			panic("配置文件config.ini不存在,请将配置文件复制到运行目录下")
		}
		httpp, ConfError = cfg.GetValue("Email", "http")
		if ConfError != nil {
			panic("读取Email需要的服务器网址错误")
		}
		for{
			select {
			case title:=<-tasks:
				//println("收到任务")
				sendMailNow(title)
			}
		}
	}()
}
func sendMailNow(title string)  {
	auth := smtp.PlainAuth("", "2449452976@qq.com", "vtkkolwjvzimecfd", "smtp.qq.com")
	to := []string{"1596889407@qq.com"}
	nickname := "HDY邮箱机器人"
	user := "2449452976@qq.com"
	subject := "有人提交网站到方圆实验室了"
	contentType := "Content-Type: text/plain; charset=UTF-8"
	msg := []byte("To: " + strings.Join(to, ",") + "\r\nFrom: " + nickname +
		"<" + user + ">\r\nSubject: " + subject + "\r\n" + contentType + "\r\n\r\n" + title+"\r\n"+httpp+"/more/admin/fysys/top/hdy")
	err := smtp.SendMail("smtp.qq.com:25", auth, user, to, msg)
	if err != nil {
		fmt.Printf("send mail error: %v", err)
	}else {
		fmt.Println("send mail success")
	}
}