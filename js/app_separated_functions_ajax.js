$(function() {

var base_url = 'http://127.0.0.1:8000/book/';
var div_content = $("#content");

div_content.on('click', 'h2', getBook);
div_content.on('click', 'h3', deleteBook);

$('form').on('submit', insertBook);


function deleteBook(event) {
	var id = $(this).data('id');

	$.ajax({
		url: base_url + id,
		data: $(this).parent(),
		type: "DELETE",
		dataType: "json",
	}).done(function() {
		console.log('Książka usunięta');
		location.reload();
	}).fail(function(xhr, status, err) {
		console.log(xhr);
		console.log(status, err);
	});
}

function insertBook(event) {
	event.preventDefault();

	$.ajax({
	    url: base_url,
	    data: $(this).serialize(),
	    type: "POST",
	    dataType: "json"
	}).done(function(result) {
		console.log(result);
		prepareBookBox(result.title, result.id);
	}).fail(function(xhr,status,err) {
		console.log(xhr);
		console.log(status, err);
		alert('Formularz nie jest poprawnie wypełniony')
	});
}

function getBook(event) {
	var id = $(this).data('id');
	var wanted_div = $(this).next();

	$("#content div").hide('slow');

	$.ajax({
	    url: base_url + id,
	    type: "GET",
	    dataType: "json"
	}).done(function(result) {
		var ul = $('<ul>');
		ul.append( $('<li>').text(result.author));
		ul.append( $('<li>').text(result.publisher));
		ul.append( $('<li>').text(result.isbn));

		wanted_div.html( ul );

		wanted_div.hide();
		wanted_div.show('slow');
	});
}

function prepareBookBox(title, id) {
	var h2 = $('<h2>');
	var delete_book = $('<h3>');
	delete_book.css('padding-left', '10px').css('color', 'red')
	delete_book.data('id', id);
	delete_book.text('Delete');
	console.log(delete_book);
	h2.text(title);
	h2.data('id', id);

	div_content.append(h2.css('display', 'inline'));
	div_content.append($("<div>"));
	div_content.append(delete_book);
}

function getAllBooks() {
	$.ajax({
	    url: base_url,
	    type: "GET",
	    dataType: "json"
	}).done(function(result) {

		for (var i=0; i<result.length; i++) {
			prepareBookBox(result[i].title, result[i].id);
		}

	}).fail(function(xhr,status,err) {

	}).always(function(xhr,status) {

	});
}

getAllBooks();

});