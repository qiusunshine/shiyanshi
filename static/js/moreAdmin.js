function addHtml(data){
    var verifyStr =data.verified?"disabled=\"disabled\"":"";
    var html="<li class=\"mui-table-view-cell\"><div class=\"am-container\" style='padding-left:0;'><a " +
        " style='color: black;' href=\""+data.url+"\">" +
        data.title+"</a>" +
        "<span class=\"am-badge am-badge-success am-radius\" style='margin-left: 10px'>"+data.class+"</span>" +
        "<span class=\"am-badge am-badge-warning am-radius\" style='margin-left: 10px'>"+data.click+"</span>" +
        "<span class=\"am-badge am-badge-danger am-radius\" style='margin-left: 10px'>已审核："+data.verified+"</span></div>" +
        "<p>"+data.CreatedAt+"</p>" +
        "<div class=\"am-container\" style='padding-left:0;'>" +
        "<button type=\"button\" class=\"am-btn am-btn-default am-radius\" "+verifyStr+"onclick='verifyClick("+data.ID+")'>审核通过</button>" +
        "<button type=\"button\" class=\"am-btn am-btn-default am-radius\" onclick='deleteClick("+data.ID+")' style='margin-left: 10px;'>删除网站</button></div></li>";
    $("#fy-data").append(html);
}
function verifyClick(id) {
    aj('verify',id,'审核')
}
function deleteClick(id) {
    aj('delete',id,'删除')
}
function aj(command,id,desc) {
    mui.ajax('/more/admin/fysys/top/hdy',{
        type:'post',
        timeout:5000,
        data:{
            command:command,
            id:id
        },
        dataType:'text',
        success:function(data){
            mui.toast(desc+"成功："+data,{ duration:'short', type:'div' });
        },
        error:function(xhr,type,errorThrown){
            mui.toast("加载出错:"+errorThrown,{ duration:'short', type:'div' });
        }
    });
}
function nextPage() {
    mui("#progressbar").progressbar().show();
    thePage++;
    getJsonData(thePage);
}
function getJsonData(page) {
    mui.ajax('/more/data/admin',{
        dataType:'json',
        type:'get',
        timeout:5000,
        data:{
            p:page,
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
                var h2=$(".am-pagination").height();
                var h3=$(".mui-table-view-cell:first").outerHeight(true);
                var h4=h3*(data.length+3);
                var position=h1-h2-h4+20;
                $w.smoothScroll({position: position});
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
getJsonData(thePage);
