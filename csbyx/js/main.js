$(document).on('pagecreate', function(event) {
	var main = $('div[role=main]'),
		list = $('ul[data-role=listview]');
	$.getJSON("data.json", function(json) {
		var tpl = '',
			pop = '';
		_.forEach(json.items, function(val, key) {
			var item = val.item,
				no = item.no,
				question = item.question,
				options = item.options.split('|'),
				answerIndex = item.answer,
				answer = options[answerIndex - 1];
			tpl += '<li data-role="list-divider">' + question +
				'	<span class="ui-li-count">' + answerIndex + '</span>' +
				'</li>' +
				'<li>' +
				'	<a href="#question' + no + '">' +
				'		<p class="ui-screen-hidden">' + question + '</p>' +
				'		<p>' + answer + '</p>' +
				'	</a>' +
				'	<a href="#question' + no + '" data-rel="popup" data-position-to="window" data-transition="pop">详情</a>' +
				'</li>';
			pop += '<div data-role="popup" id="question' + no + '" data-theme="b" data-overlay-theme="b">' +
				'	<ul data-role="listview" data-inset="true">' +
				'		<li data-role="list-divider">' + question + '</li>';
			_.forEach(options, function(v, k) {
				var icon = 'ui-icon-delete';
				if (k == answerIndex - 1) {
					icon = 'ui-icon-check';
				}
				pop += '<li><a href="#" class="ui-btn ui-shadow ui-corner-all ' + icon + ' ui-btn-icon-right">' + v + '</a></li>';
			});
			pop +=
				'	</ul>' +
				'</div>';
		});
		list.append(tpl).listview('refresh');
		main.append(pop).trigger('create');
	});

	// $('#autocomplete').on('filterablebeforefilter', function(e, data) {
	// 	var $ul = $(this),
	// 		$input = $(data.input),
	// 		value = $input.val(),
	// 		html = "";
	// 	if (value && value.length > 2) {
	// 		//@todo remote
	// 		$ul.html("<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>");
	// 		$ul.listview('refresh');
	// 		$ul.trigger('updatelayout');
	// 	}
	// });
});
