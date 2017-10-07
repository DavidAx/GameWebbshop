$('.minus-btn').on('click', function (e) {
	e.preventDefault();
	var $this = $(this);
	var $input = $this.closest('div').find('input');
	var value = parseInt($input.val());
	var number = parseInt($('.total-price').text());
		if (value > 1) {
			value = value - 1;
		} else {
			value = 0;
		}
	$input.val(value);
	$(".total-price").html(599*value + "kr");
	

});

$('.plus-btn').on('click', function (e) {
	e.preventDefault();
	var $this = $(this);
	var $input = $this.closest('div').find('input');
	var value = parseInt($input.val());
	var number = parseInt($('.total-price').text());
	number/=value;
	if (value < 100) {
		value = value + 1;
		
	} else {
		value = 100;
	}

	$input.val(value);
	$(".total-price").html(599*value + "kr");
});

$('.like-btn').on('click', function () {
	$(this).toggleClass('is-active');
});



function QuantityCost(){
	var prodcost = document.getElementById('total-price').getAttribute('value');
	var prodquant = document.getElementById('total-price').getAttribute('value');
	prodcost = prodcost * prodquant;
	return(prodcost);
	
	
	
}