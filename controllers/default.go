package controllers

import (
	"github.com/astaxie/beego"
	"encoding/json"
	"io/ioutil"
	"bytes"
)

type MainController struct {
	beego.Controller
}
var finalData interface{}
func (c *MainController) Get() {
	c.TplName = "index.html"
}
func (c *MainController) GetData() {
	if finalData==nil{
		data,err:=ioutil.ReadFile("data.json")
		data = bytes.TrimPrefix(data, []byte("\xef\xbb\xbf")) // Or []byte{239, 187, 191}
		if err!=nil{
			panic(err)
		}
		if err := json.Unmarshal(data, &finalData);err!=nil{
			panic(err)
		}
	}
	c.Data["json"]=finalData
	c.ServeJSON()
}
func (c *MainController) UpdateData() {
	data,err:=ioutil.ReadFile("data.json")
	data = bytes.TrimPrefix(data, []byte("\xef\xbb\xbf")) // Or []byte{239, 187, 191}
	if err!=nil{
		c.Ctx.WriteString("fail<-"+err.Error())
		return
	}
	if err := json.Unmarshal(data, &finalData);err!=nil{
		c.Ctx.WriteString("fail<-"+err.Error())
		return
	}
	//c.Ctx.WriteString("Update Success")
	c.TplName = "index.html"
}