jQuery User Generated PayPal Order Form
======

This is a little jQuery Plugin, weighing in a 1KB that allows the user to build their own PayPal order form. 

This is useful for booking forms, especially those with time slots.

[Demo](http://jsfiddle.net/joekendall/EWnLZ/)

It will need a little bit of tweaking to suit your absolute needs, but this should give you a good start. :)

Simply download the minified js file: ``js/payPalForm.min.js``

And use like so:

	<script type="text/javascript" src="js/payPalForm.min.js"></script>
	<script type="text/javascript">
		$(function() {
			$('.formContainer').payPalForm();
		})
	</script>

Remember, this uses jQuery. **You will need jQuery**.

You will also need to use some classes ``.itemRow, .itemName, .itemNumber, .itemAmount, .itemQuantity``
Please see ``index.html``, I have tried to make it nice and easy for you. You should be able to copy and paste that to get started. 

Thanks!
[@_JoeKendall](http://twitter.com/_JoeKendall)
