var today = new Date();
var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];
var days = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb', 'Dom'];

console.log(today)
var html = `
	<div id="datepicker">
		<div class="header">
			<i class="fas fa-angle-left"></i>
			<span>${months[today.getMonth()]} de ${today.getFullYear()}</span>
			<i class="fas fa-angle-right"></i>
		</div>
		<div class="body">
			<ul>
				<li>Lu</li>
				<li>Ma</li>
				<li>Mi</li>
				<li>Ju</li>
				<li>Vi</li>
				<li>Sa</li>
				<li>Do</li>
			</ul>
		</div>
		<div class="apply">Aplicar</div>
	</div>
`;

(function($){
	$.fn.datepicker = function(options){
		options = $.extend({}, $.fn.datepicker.defaultOptions, options);
		//$(this).after(html);
		$(this).click(function(){
			$(this).after(html);
		});
	}
})(jQuery);