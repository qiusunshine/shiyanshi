function addHtml(data){
    var theClass=data.class;
    switch (theClass) {
        case "网盘":
        case "磁力":
            theClass="网盘磁力";
            break;
        case "日常":
            theClass="生活休闲";
            break;
        case "工具":
            theClass="实用工具";
            break;
    }
    var html="<li class=\"mui-table-view-cell\"><div class=\"am-container\" style='padding-left:0;'><a onclick=\"urlClick('" +
        data.title+"','"+data.url+"')\" style='color: black;' href=\"javascript:void(0);\">" +
        data.title+"</a>" +
        "<span class=\"am-badge am-badge-success am-radius\" style='margin-left: 10px'>"+theClass+"</span>" +
        "<span class=\"am-badge am-badge-warning am-radius\" style='margin-left: 10px'>"+data.click+"</span></div>" +
        "<p style='margin-top: 10px;'>"+data.CreatedAt+"</p></li>";
    $("#fy-data").append(html);
}
function urlClick(title,url) {
    mui.ajax('/more/index',{
        type:'post',
        timeout:8000,
        data:{
            title:title
        },
        dataType:'text',
        success:function(data){
            console.log(data);
        },
        error:function(xhr,type,errorThrown){
            console.log(xhr,type,errorThrown);
        }
    });
    window.open(url);
}
function nextPage() {
    mui("#progressbar").progressbar().show();
    thePage++;
    getJsonData(thePage);
}
function getJsonData(page) {
    console.log("ajax");
    mui.ajax('/more/data/all',{
        dataType:'json',
        type:'get',
        timeout:8000,
        data:{
            p:page,
            class:myClass,
        },
        success:function(data){
            mui("#progressbar").progressbar().hide();
            if(data.length===0){
                mui.toast("已经加载全部数据",{ duration:'short', type:'div' });
            }
            $.each(data,function(idx, obj){
                addHtml(obj);
            });
            if(page!==0&&data.length!==0){
                var $w = $(window);
                var h1=$(document).height();
                var h2=$(".am-pagination:last").height();
                var h3=$(".mui-table-view-cell:first").outerHeight(true);
                var h4=h3*(data.length+3);
                var position=h1-h2-h4;
                $w.smoothScroll({position: position,speed:2500});
            }
        },
        error:function(xhr,type,errorThrown){
            mui("#progressbar").progressbar().hide();
            mui.toast("请刷新网页，加载出错:"+errorThrown,{ duration:'short', type:'div' });
            console.log(xhr,type,errorThrown);
        }
    });
}
mui("#progressbar").progressbar().show();
var thePage=0;
var fysys_class=$("#fysys_class").children();
if(myClass==="all"||myClass===""){
    fysys_class.eq(0).addClass("am-active");
}else {
    for (var i = 1; i < fysys_class.length; i++) {
        if(fysys_class.eq(i).children().text()===myClass){
            fysys_class.eq(i).addClass("am-active");
            break;
        }
    }
}
getJsonData(thePage);
