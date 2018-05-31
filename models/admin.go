package models

func VerfyId(id string) error {
	var webs Webs
	if err:=db.Model(&Webs{}).Where("id = ?",id).Find(&webs).Error;err!=nil{
		return err
	}
	return db.Model(&webs).Update("verified",true).Error
}
func DeleteId(id string) error {
	return db.Model(&Webs{}).Unscoped().Delete("id = ?",id).Error
}