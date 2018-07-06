var date = new Date("06/20/2018");

(function($){
	$.fn.datepicker = function(options){
		options = $.extend({}, $.fn.datepicker.defaultOptions, options);
		//$(this).click(function(){
			$('#datepicker').remove();
			initDatepicker(this);
		//});
	}
})(jQuery);

function initDatepicker(element){
	var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
	var days = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb', 'Dom'];
	
	var html = `
		<div id="datepicker">
			<div class="header">
				<i class="fas fa-angle-left"></i>
				<span>${months[date.getMonth()]} de ${date.getFullYear()}</span>
				<i class="fas fa-angle-right"></i>
			</div>
			<div class="body">
				<ul class="letter-days"></ul>
				<div class="num-days"></div>
			</div>
		</div>
	`;
	
	$(element).after(html);
	$.each(days, function(index, value){
		$('#datepicker .letter-days').append('<li>' + value + '</li>');
	});
	
	var daysPerMonth = function(){
		var count = 0;
		switch(date.getMonth()){
			case 0: count = 31; break;
			case 1: 
				((date.getFullYear() % 4 == 0) && (date.getFullYear() % 100 != 0)) || (date.getFullYear() % 400 == 0) ? count = 29 : count = 28;
				break;
			case 2: count = 31; break;
			case 3: count = 30; break;
			case 4: count = 31; break;
			case 5: count = 30; break;
			case 6: count = 31; break;
			case 7: count = 31; break;
			case 8: count = 30; break;
			case 9: count = 31; break;
			case 10: count = 30; break;
			case 11: count = 31; break;
		}
		return count;
	};
	
	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	var a1=[], a2=[], a3=[], a4=[], a5=[], a6=[];
	for(var i = 1; i <= daysPerMonth(); i++){
		if(i <= 7-firstDay + 1) { a1.push(i); }
		else if(i <= 14-firstDay + 1) { a2.push(i); }
		else if(i <= 21-firstDay + 1) { a3.push(i); }
		else if(i <= 28-firstDay + 1) { a4.push(i); }
		else if(i <= 35-firstDay + 1) { a5.push(i); }
		else { a6.push(i); }
	}
	
	while(a1.length < 7){ a1.unshift(0); }
	while(a5.length < 7){ a5.push(0); }
	while(a6.length < 7){ a6.push(0); }
	
	var weeks = [a1, a2, a3, a4, a5, a6];
	$.each(weeks, function(index, value){
		$('#datepicker .num-days').append('<ul></ul>');
		$.each(value, function(i,v){
			if(!(value[0] == 0 && value[value.length - 1] == 0)){
				$('#datepicker .num-days ul').eq(index).append('<li data-day="' + v + '">' + v + '</li>');
				$('#datepicker .num-days ul li[data-day="0"]').css({
					opacity: 0,
					cursor: 'default'
				});
			}
		});
		
	});
}