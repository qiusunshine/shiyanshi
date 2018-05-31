package controllers

import (
	"github.com/astaxie/beego"
	"strconv"
	"hdy/shiyanshi/models"
)

type MoreAdminController struct {
	beego.Controller
}
func (c *MoreAdminController)Get()  {
	c.TplName="moreAdmin.html"
}
func (c *MoreAdminController)Post()  {
	command:=c.GetString("command")
	id:=c.GetString("id")
	if command=="verify"{
		err:=models.VerfyId(id)
		if err!=nil{
			c.Ctx.WriteString("error："+err.Error())
			return
		}
	}else if command=="delete"{
		err:=models.DeleteId(id)
		if err!=nil{
			c.Ctx.WriteString("error："+err.Error())
			return
		}
	}
	c.Ctx.WriteString("success")
}
func (c *MoreAdminController)GetAdmin()  {
	pageStr:=c.GetString("p")
	var page int
	var err error
	if pageStr==""{
		page=0
	}else {
		page,err=strconv.Atoi(pageStr)
		if err!=nil{
			c.Ctx.WriteString("出错了！请刷新网页。错误的原因为："+err.Error())
			return
		}
	}
	data,err:=models.GetWebsFromPage(page)
	if err!=nil{
		c.Ctx.WriteString("出错了！请刷新网页。错误的原因为："+err.Error())
		return
	}
	c.Data["json"]=data
	c.ServeJSON()
}