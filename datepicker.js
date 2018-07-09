var globalDate = new Date();
var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
var shortMonth = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'];
var days = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb', 'Dom'];
var typeCalendar = 'days';

(function($){
	$.fn.datepicker = function(options){
		options = $.extend({}, $.fn.datepicker.defaultOptions, options);
		var object = this;
		$(this).click(function(){
			initDatepicker(object, globalDate);
		});
	}
})(jQuery);

function initDatepicker(element, date){
	$('#datepicker').remove();
	
	var html = `
		<div id="datepicker">
			<div class="header">
				<i class="fas fa-angle-left" id="prev-month"></i>
				<span class="current-date" id="change-type"></span>
				<i class="fas fa-angle-right" id="next-month"></i>
			</div>
			<div class="body">
				<ul class="letter-days"></ul>
				<div class="num-days"></div>
				<ul class="months"></ul>
				<ul class="years"></ul>
			</div>
		</div>
	`;
	
	$(element).after(html);
	$.each(days, function(index, value){
		$('#datepicker .letter-days').append('<li>' + value + '</li>');
	});
	
	$.each(shortMonth, function(index, value){
		$('#datepicker .months').append('<li class="select-month" data-month="' + index + '"><span>' + value + '</span></li>');
	});
	
	for(var i = globalDate.getFullYear() - 100; i <= globalDate.getFullYear() + 100; i++){
		$('#datepicker .years').append('<li class="select-year" data-year="' + i + '"><span>' + i + '</span></li>')
	};
	
	updateDatepicker(element, date);
	
	var month = date.getMonth();
	$('#next-month').click(function(){
		month++;
		updateDatepicker(element, new Date(date.getFullYear(), month, globalDate.getDate()));
	});
	$('#prev-month').click(function(){
		month--;
		updateDatepicker(element, new Date(date.getFullYear(), month, globalDate.getDate()));
	});
}

function updateDatepicker(element, date){
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
	
	$('.num-days').empty();
	$('.current-date').html(months[date.getMonth()] + ' de ' + date.getFullYear());
	
	var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
	firstDay = (firstDay.getDay() != 0) ? firstDay.getDay() : 7;

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
				$('#datepicker .num-days ul').eq(index).append('<li class="select-day" data-day="' + v + '">' + v + '</li>');
				$('#datepicker .num-days ul li[data-day="0"]').css({
					opacity: 0,
					cursor: 'default'
				});
			}
		});
	});
	
	if(date.getMonth() == globalDate.getMonth()){
		$('.num-days').find('li[data-day="' + date.getDate() + '"]').addClass('active');
	}
	
	$('#change-type').click(function(){
		if(typeCalendar == 'days'){
			typeCalendar = 'months';
			$('.letter-days, .num-days').fadeOut(function(){
				$('.months').fadeIn().css('display', 'flex');
				$('.current-date').html(globalDate.getFullYear());
			});
		}
		else if(typeCalendar == 'months'){
			typeCalendar = 'years';
			$('.months').fadeOut(function(){
				$('.years').fadeIn().css('display', 'flex');
				$('.years').scrollTop($('.years li[data-year="' + globalDate.getFullYear() + '"]').position().top - 65);
				$('.current-date').html('Seleccionar año');
				$('#next-month, #prev-month').addClass('disabled');
			});
		}
	});
	
	var selectDate = [];
	$('.select-year').click(function(){
		var year = this;
		selectDate.push($(year).attr('data-year'));
		$('.years').fadeOut(function(){
			$('.months').fadeIn().css('display', 'flex');
			$('.current-date').html($(year).attr('data-year'));
		});
	});
	
	$('.select-month').click(function(){
		var month = this;
		selectDate.push($(month).attr('data-month'));
		console.log(selectDate)
	});
	
	$('.select-day').click(function(){
		selectDate = new Date(date.getFullYear(), date.getMonth(), $(this).attr('data-day'));
		$(element).val(
			((selectDate.getDate().toString().length == 1) ? "0" + selectDate.getDate() : selectDate.getDate()) + "/" +
			((selectDate.getMonth().toString().length == 1) ? "0" + (selectDate.getMonth() + 1) : (selectDate.getMonth() + 1)) + "/" +
			selectDate.getFullYear());
	});
}