jQuery(document).ready(function(){
	var div1=$('#div1');
	$('<img src="images/img1.gif" alt=""/>').appendTo(div1);
	div1.append($('<img src="images/img2.gif" alt=""/>'));
});