package controllers

import (
	"github.com/astaxie/beego"
	"log"
	"encoding/json"
	"io/ioutil"
	"os"
	"io"
	"bytes"
)

type UploadController struct {
	beego.Controller
}

func (c *UploadController)Get()  {
	c.TplName="upload.tpl"
}
func (c *UploadController) Post() {
	if c.GetString("password")!="admin"{
		c.Ctx.WriteString("error password!")
		return
	}
	//接收文件
	f, _, err := c.GetFile("uploadname")
	if err != nil {
		log.Fatal("getfile err ", err)
	}
	defer f.Close()
	BackFile() //备份文件
	c.SaveToFile("uploadname", "data.json")
	c.UpdateData() //更新数据
}
func (c *UploadController) UpdateData() {
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
func BackFile()  {
	CopyFile("data_back.json","data.json")
}
func CopyFile(dstName, srcName string) (written int64, err error) {
	src, err := os.Open(srcName)
	if err != nil {
		return
	}
	defer src.Close()
	dst, err := os.OpenFile(dstName, os.O_WRONLY|os.O_CREATE, 0644)
	if err != nil {
		return
	}
	defer dst.Close()
	return io.Copy(dst, src)
}