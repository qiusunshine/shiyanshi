package main

import (
	_ "hdy/shiyanshi/routers"
	"github.com/astaxie/beego"
	"github.com/Unknwon/goconfig"
	"github.com/jinzhu/gorm"
	"hdy/shiyanshi/models"
)

func main() {
	beego.Run()
}
func init() {
	u,pwd,ip1,dbname:= InitMysql()
	dbdetail:=u+":"+pwd+"@tcp("+ip1+")/"+dbname+"?charset=utf8&parseTime=True"
	db,e:=gorm.Open("mysql", dbdetail)
	if e!=nil{
		panic(e)
	}
	models.SetDB(db)
}
func InitMysql() (username, pwd,ip, db string) {
	var ConfError error
	cfg, ConfError := goconfig.LoadConfigFile("config.ini")
	if ConfError != nil {
		panic("配置文件config.ini不存在,请将配置文件复制到运行目录下")
	}
	username, ConfError = cfg.GetValue("MySQL", "username")
	if ConfError != nil {
		panic("读取数据库username错误")
	}
	pwd, ConfError = cfg.GetValue("MySQL", "password")
	if ConfError != nil {
		panic("读取数据库password错误")
	}
	ip, ConfError = cfg.GetValue("MySQL", "ip")
	if ConfError != nil {
		panic("读取数据库ip错误")
	}
	db, ConfError = cfg.GetValue("MySQL", "db")
	if ConfError != nil {
		panic("读取数据库名称错误，数据库可能不存在")
	}
	return username,pwd,ip,db
}