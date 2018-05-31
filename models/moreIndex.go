package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/go-sql-driver/mysql"
	"time"
)

type Webs struct {
	gorm.Model
	Title string `gorm:"type:VARCHAR(255);index:idx_title" json:"title"`
	Url string `json:"url"`
	Class string `gorm:"type:VARCHAR(255);index:idx_class" json:"class"`
	Verified bool `json:"verified"`
	Click int `json:"click"`
}
var db *gorm.DB

func NewWebs(title, url, class string) *Webs {
	return &Webs{Title:title,Url:url,Class:class,Verified:false,Click:0}
}
func SetDB(thedb *gorm.DB) {
	db=thedb
	db.LogMode(false)
	// SetMaxIdleConns sets the maximum number of connections in the idle connection pool.
	db.DB().SetMaxIdleConns(500)
	// SetMaxOpenConns sets the maximum number of open connections to the database.
	db.DB().SetMaxOpenConns(1000)
	// SetConnMaxLifetime sets the maximum amount of time a connection may be reused.
	db.DB().SetConnMaxLifetime(time.Hour)
	if !db.HasTable(&Webs{}) {
		if err := db.Set("gorm:table_options", "ENGINE=InnoDB DEFAULT CHARSET=utf8").CreateTable(&Webs{}).Error; err != nil {
			panic(err)
		}
	}
}
func GetWebsFromPage(page int) (data []Webs,err error) {
	err=db.Model(&Webs{}).Limit(20).Offset(20*page).Order("id desc").Find(&data).Error
	return
}
func GetVerfiedWebsFromPage(page int,class string) (data []Webs,err error) {
	if class==""||class=="all"{
		err=db.Model(&Webs{}).Limit(10).Offset(10*page).Order("id desc").Where("verified = ?",true).Find(&data).Error
	}else {
		err=db.Model(&Webs{}).Limit(10).Offset(10*page).Order("id desc").Where("verified = ?",true).Where("class = ?",class).Find(&data).Error
	}
	return
}
func SaveOne(webs *Webs)error  {
	return db.Model(&Webs{}).Save(webs).Error
}
func ClickOne(title string) error {
	var webs Webs
	if err:=db.Model(&Webs{}).Where("title = ?",title).Find(&webs).Error;err!=nil{
		return err
	}
	return db.Model(&webs).Update("click",webs.Click+1).Error
}