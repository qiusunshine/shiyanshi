package routers

import (
	"hdy/shiyanshi/controllers"
	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/data", &controllers.MainController{},"*:GetData")
	beego.Router("/update", &controllers.MainController{},"*:UpdateData")
	beego.Router("/upload", &controllers.UploadController{})
    beego.Router("/", &controllers.MainController{},"*:Get")
	ns:=beego.NewNamespace("/more",
		beego.NSRouter("/admin",&controllers.MoreAdminController{}),
		beego.NSRouter("/data/all",&controllers.MoreIndexController{},"*:GetData"),
		beego.NSRouter("/data/admin",&controllers.MoreAdminController{},"*:GetAdmin"),
		beego.NSRouter("/add",&controllers.AddWebsController{}),
		beego.NSRouter("/",&controllers.MoreIndexController{}),
		beego.NSRouter("/index",&controllers.MoreIndexController{}))
	beego.AddNamespace(ns)
}
