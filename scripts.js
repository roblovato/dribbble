jQuery(document).ready(function($) {

	var current_page = 1;

	loadImg('popular', current_page);

	$("#current_page").val(current_page);

	$('.nav').click(function(){
		var current = $(this).attr('id');
		var category = $('#current_category').val();
		if (current != category) {
			$('#holder').children().remove();
			loadImg(current);
			$('.nav').removeClass('selected');
			$(this).addClass('selected');
			$('#current_category').val(current);
			$("#current_page").val(current_page);
		}
	});

	$(window).scroll(function(){
		if($(window).scrollTop() + 10 > $(document).height() - $(window).height() ){
			loadMore();
		}
	});

});

function loadImg(current, page){
	$.ajax({
		url: 'http://api.dribbble.com/shots/'+current+'/?page='+page+'&callback=getDribbble',
		dataType: 'jsonp',
		crossDomain: true,
		jsonpCallback: 'getDribbble'
	});
}

function getDribbble(data){
	for(i = 0; i < 9; i++){
		var created_datetime = data.shots[i].created_at;
		var image_src = data.shots[i].image_url;
		var likes = data.shots[i].likes_count;
		var comments = data.shots[i].comments_count;
		$("#holder").append($(
			'<div class="item">' +
				'<img src="'+ image_src +'" /> <br />' +
				likes + ' Likes | '+ comments +' Comments' +
			'</div>'
		).hide().fadeIn(200));
	}
	console.log(data);
}

function loadMore() {
	var current = $('.nav.selected').attr('id');
	var page = $("#current_page").val(); 
	page++;
	$("#current_page").val(page);
	loadImg(current, page++);
	console.log(page);
}















