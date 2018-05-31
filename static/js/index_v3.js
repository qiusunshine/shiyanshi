function addHtml(data){
    var icon;
    var cardID;
    var cardContentID;
    var label="";
    switch(data.name){
        case "影视":
            icon="mui-icon-videocam";
            label="<a class=\"am-badge am-badge-danger\" style=\"margin-left:auto;margin-right:0px;\">HOT</a>";
            break;
        case "音乐":
            icon="mui-icon mui-icon-flag";
            label="<a class=\"am-badge am-badge-warning\" style=\"margin-left:auto;margin-right:0px;\">HOT</a>";
            break;
        default:
            icon="mui-icon-paperplane";
            break;

    }
    cardID=data.id+"_card";
    cardContentID=data.id+"_cardContent";
    var html="<div class=\"mui-card\" id=\""+cardID+"\">" +
        "<div class=\"mui-card-header\"  style=\"justify-content:flex-start;\">" +
        "<a class=\"am-icon-btn \">" +
        "<span class=\"mui-icon " +icon+ "\"/>" + "</a>"+
        "<h4 style=\"color:orange;margin-left:20px;margin-right:20px;\">"+ data.name+"</h4>"+
        label+
        "</div>" +
        "<div class=\"mui-card-content-inner am-g\" style=\"padding-bottom: 1rem;padding-top: 1rem;\" id=\""+cardContentID+"\">" +
        "</div>" +
        "</div>";
    $("#main").append(html);
    $.each(data.result,function(idx, obj){
        addUrls(idx,obj,cardContentID);
    });
}
function addUrls(idx,obj,cardContentID){
    var html;
    var s=(!obj.red)?"":" style=\"color: red;\"";
    switch ((idx+1)%3){
        case 0:
            html="<button type=\"button\" title=\""+obj.url+"\" class=\"am-u-sm-4 am-btn am-btn-default mui-btn-outlined  mui-btn-outlined\""+s+" onclick='buttonClick(this.title)'>"+
                obj.name+
                "</button>";
            break;
        default:
            html="<button type=\"button\" title=\""+obj.url+"\" class=\"am-u-sm-4 am-btn am-btn-default mui-btn-outlined am-u-sm-centered\""+s+" onclick='buttonClick(this.title)'>"+
                obj.name+
                "</button>";
            break;
    }
    $("#"+cardContentID).append(html);
}
function buttonClick(url) {
    window.open(url);
}
function searchClick(which){
    var str = $("#search_text").val();
    if(str!==""){
        if(hasWhich!=which){//避免重复点击
            setTimeout(function () {
                hasWhich="111";
            },5000);
        }else {
            return;
        }
        hasWhich=which;
        str=encodeURI(str);
        var url="no";
        switch(which){
            case "fy":
                url="http://118.24.88.92:8080/v2/search?q="+str+"&p=1";
                break;
            case "88":
                url=(theType===1)?"http://m.88ys.tv/index.php?m=vod-search&wd="+str:"http://www.88ys.tv/index.php?m=vod-search&wd="+str;
                break;
            case "bd":
                $("#bdyKey").val(str);
                document.getElementById("fm").submit();
                break;
            case "fk":
                url="http://ifkdy.com/?q="+str+"&p=1";
                break;
            case "owl":
                url="https://www.owllook.net/search?wd="+str;
                break;
            case "bt":
                url="https://www.btmule.org/q/"+str+".html";
                break;
            case "zh":
                url="https://www.zhihu.com/search?type=content&q="+str;
                break;
            case "db":
                url=(theType===1)?"https://m.douban.com/search/?query="+str:"https://www.douban.com/search?q="+str;
                break;
            case "sina":
                url=(theType===1)?"https://m.weibo.cn/p/100103type%3D1%26q%3D"+str:"http://s.weibo.com/weibo/"+str+"&Refer=STopic_box";
                break;
            case "wx":
                url=(theType===1)?"http://weixin.sogou.com/weixinwap?type=2&query="+str:"http://weixin.sogou.com/weixin?type=2&query="+str;
                break;
            case "yk":
                url="http://www.soku.com/m/y/video?q="+str+"&tpa=dW5pb25faWQ9MTAzOTQyXzEwMDAwMV8wMV8wMQ";
                break;
            case "bj":
                url=(theType===1)?"https://m.baidu.com/pu=sz%401321_480/s?pn=10&usm=4&word="+str+"&sa=np&ant_ct=RK7ymxDKg7%2FqgQBBBy1f%2FT2FpqsTn9ilyJZoGzSXgFIzavWjEdEHFZVKCoRuP5rp&rqid=7015555724176550070":"https://www.baidu.com/baidu?wd=" + str;
        }
        if(url!=="no"){
            window.open(url);
        }
    } else {
        $("#search_text").attr("placeholder", "请先在这里输入关键词").focus()
    }
}
function choose(){
    mui('.mui-popover').popover('toggle',document.getElementById("search_group"));
}
function a() {
    var f = $("#search_text").val();
    var e = $.trim(f);
    if (e !== "") {
        if(hasWhich!="baidu"){//避免重复点击
            setTimeout(function () {
                hasWhich="111";
            },3000);
        }else {
            return;
        }
        hasWhich="baidu";
        if(theType===1){
            window.open("https://m.baidu.com/s?word=" + encodeURI(e));
        }else {
            window.open("https://www.baidu.com/baidu?wd=" + encodeURI(e));
        }
    } else {
        $("#search_text").attr("placeholder", "请先在这里输入关键词").focus()
    }
}
mui("#progressbar").progressbar().show();
var hasWhich="111";
var theType=(mui.os.ios||mui.os.android||mui.os.wechat)?1:2;
mui('#quickSearch').on('tap','a',function(){
    this.click();
});
mui("#search_go").on("tap", function () {
    this.click();
});
$(document).on("keydown", function (e) {
    if (e.keyCode == "13") {
        a();
    }
});
mui('#moreSearch').on('tap','img',function(){
    searchClick(this.alt);
});
mui.ajax('./data',{
    dataType:'json',
    type:'get',
    timeout:5000,
    success:function(data){
        mui("#progressbar").progressbar().hide();
        $.each(data,function(idx, obj){
            addHtml(obj);
        });
    },
    error:function(xhr,type,errorThrown){
        mui("#progressbar").progressbar().hide();
        mui.toast("error:"+errorThrown,{ duration:'short', type:'div' });
    }
});
