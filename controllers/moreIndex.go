package controllers

import (
	"github.com/astaxie/beego"
	"hdy/shiyanshi/models"
	"strconv"
)

type MoreIndexController struct {
	beego.Controller
}

func (c *MoreIndexController)Get()  {
	class:=c.GetString("class")
	if class==""{
		c.Data["fysys_class"]="all"
	}else {
		c.Data["fysys_class"]=class
	}
	c.TplName="moreIndex.html"
}
func (c *MoreIndexController)Post()  {
	title:=c.GetString("title")
	if title==""{
		c.Ctx.WriteString("title is null")
	}else {
		err:=models.ClickOne(title)
		if err!=nil{
			c.Ctx.WriteString("出错："+err.Error())
		}else {
			c.Ctx.WriteString("title is saved")
		}
	}
}
func (c *MoreIndexController)GetData()  {
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
	data,err:=models.GetVerfiedWebsFromPage(page,c.GetString("class"))
	if err!=nil{
		c.Ctx.WriteString("出错了！请刷新网页。错误的原因为："+err.Error())
		return
	}
	c.Data["json"]=data
	c.ServeJSON()
}
