<!doctype html>
<html class="no-js">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>方圆实验室数据更新</title>
    <!-- Set render engine for 360 browser -->
    <meta name="renderer" content="webkit">
    <!-- No Baidu Siteapp-->
    <meta http-equiv="Cache-Control" content="no-siteapp"/>
    <!-- Add to homescreen for Chrome on Android -->
    <meta name="mobile-web-app-capable" content="yes">
    <!-- Add to homescreen for Safari on iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="方圆实验室数据更新"/>
    <!-- Tile icon for Win8 (144x144 + tile color) -->
    <meta name="msapplication-TileColor" content="#0e90d2">
    <!-- Amaze UI CSS -->
    <link rel="stylesheet" href="https://s2.pstatp.com/cdn/expire-1-M/amazeui/2.7.2/css/amazeui.min.css">
	<!-- mui -->
	<link rel="stylesheet" href="https://s1.pstatp.com/cdn/expire-1-M/mui/3.4.0/css/mui.min.css">
    <script src="https://s1.pstatp.com/cdn/expire-1-M/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://s0.pstatp.com/cdn/expire-1-M/mui/3.4.0/js/mui.min.js"></script>
    <script type="text/javascript" charset="utf-8">
      	mui.init();
    </script>
</head>
<body>
	<div class="am-panel am-panel-warning am-u-sm-12 am-u-sm-centered am-u-lg-8" id="main">
		<form class="am-form" enctype="multipart/form-data" method="post">
			<fieldset>
			 <div class="am-form-group">
		      <label for="doc-ipt-pwd-1">密码</label>
		      <input type="password" class="" name="password" minlength="5" placeholder="请输入密码" required>
		    </div>
		    <hr>
		    <div class="am-form-group am-form-file">
			  <button type="button" class="am-btn am-btn-danger am-btn-sm" id="btn">
			    <i class="am-icon-cloud-upload"></i> 选择要上传的文件
			  </button>
			  <input id="doc-form-file" style="width: 100%;opacity: 0;cursor: pointer;" type="file" name="uploadname" multiple>
			</div>
			<div id="file-list"></div><hr>
			<p><button type="submit" class="am-btn am-btn-default">提交</button></p>
			</fieldset>
		</form>
	</div>

<!--[if lt IE 9]>
<script src="https://s1.pstatp.com/cdn/expire-1-M/modernizr/2010.07.06dev/modernizr.min.js"></script>
<script src="https://s1.pstatp.com/cdn/expire-1-M/respond.js/1.4.2/respond.min.js"></script>
<script src="//cdn.amazeui.org/amazeui/2.1.0/js/amazeui.legacy.min.js"></script>
<![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->
<script src="https://s1.pstatp.com/cdn/expire-1-M/amazeui/2.7.2/js/amazeui.min.js"></script>
<!--<![endif]-->
<script>
  $(function() {
    $('#doc-form-file').on('change', function() {
      var fileNames = '';
      $.each(this.files, function() {
        fileNames += '<span class="am-badge">' + this.name + '</span> ';
      });
      $('#file-list').html(fileNames);
    });
  });
   $("#btn").click(function () {
        $("#doc-form-file").click();
    });
</script>
<!--<![endif]-->
</body>
</html>
