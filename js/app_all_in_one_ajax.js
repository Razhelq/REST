$(function() {

	var div_content = $("#content");

	div_content.on('click', 'h2', ajax);
	div_content.on('click', 'h3', ajax);

	$('form').data('type', 'POST').data('submit', 'submit');
	$('form').on('submit', ajax);

	function ajax(event) {
        if ($(this).data('submit') == 'submit') {
            event.preventDefault();
        }
        $("#content div").hide('slow');

		var id = $(this).data('id');
		var wanted_div = $(this).next();
		var del_to_del = $(this);

		var base_url = 'http://127.0.0.1:8000/book/';
		if (id) {
			base_url = base_url + id;
		}

		$.ajax({
			url: base_url,
			data: $(this).serialize(),
			type: $(this).data('type'),
			dataType: "json"
		}).done(function(result) {
			if (result != undefined) {

				// Clean and displays all books
				for (var i=0; i<result.length; i++) {
					prepareBookBox(result[i].title, result[i].id);
				}

				// Inserts and displays new book
				prepareBookBox(result.title, result.id);

				// Displays book details
				var ul = $('<ul>');
                ul.append( $('<li>').text(result.author));
                ul.append( $('<li>').text(result.publisher));
                ul.append( $('<li>').text(result.isbn));
                wanted_div.html(ul);
                wanted_div.hide();
                wanted_div.show('slow');

			} else {

				// Removes selected elements
				del_to_del.prev().prev().remove();
				del_to_del.prev().remove();
				del_to_del.remove();

			}

		}).fail(function(xhr, status, err) {
			console.log(xhr);
			console.log(status, err);
		});
	}

	function prepareBookBox(title, id) {
		var h2 = $('<h2>');
		var delete_book = $('<h3>');
		delete_book.css('padding-left', '10px').css('color', 'red');
		delete_book.data('id', id).data('type', 'DELETE');
		delete_book.text('Delete');
		h2.text(title).css('display', 'inline');
		h2.data('id', id).data('type', 'GET');

		div_content.append(h2);
		div_content.append($("<div>"));
		div_content.append(delete_book);
	}


	ajax()

});