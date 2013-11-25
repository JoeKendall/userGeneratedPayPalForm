/**
jQuery User Generated PayPal Order Form - 0.0.1
github.com/
Copyright (c) 2013 Joe Kendall
License: MIT
*/
//Joe Kendall 2013 : jQuery User Generated PayPal Order Form
/*jshint -W065 */
(function ($) {
    $.fn.payPalForm = function() {
        //get passed parent class, usually form class
        //for 'live()' benefits and so not reaching into the dom all the time
        //set count for paypal items_
        //cache timeSlot p tag
        var main_content = this,
            file = main_content.find('.itemRow');
        
        //functions
            function updateTotal(){
              //get '.live()' selects
              var amount = main_content.find( '.itemAmount' ),
                quantity = main_content.find( '.itemQuantity' );
              //run through the select values, int them and put them into arrays
              var amounts = amount.map(function() {
                return parseInt($(this).val());
              });
              var quantities = quantity.map(function() {
                return parseInt($(this).val());
              });
              //times the arrays against each each other
              var sum = 0,
                i=0;
              while( i < amounts.length){
                sum += amounts[i] * quantities[i];
                i++;
              }
              //update the dom with the new total
              document.getElementById('totalInt').innerHTML = '&pound;' + sum;
            }
            
            function updatePayPalFormElementNames(){
              //find the 4 elements to update the name of. declare the number of paypal form items using, counter used in loop.
              var elementsToChange = main_content.find(' .itemName, .itemNumber, .itemAmount, .itemQuantity '),
                  totalNumberOfElementsInSet = 4,
                  counter = 0;
              
              //loop through each of found elements, every 4th one, update the counter.
              elementsToChange.each(function(i) {
                var $this = $(this);
                if ( i % totalNumberOfElementsInSet === 0 ) { counter++; }
                //find name of attribute, strip existing number (order), add new number
                $this.attr('name', $this.attr('name').replace(/[0-9]/g, '') + counter);
              });
              //reset the counter for next time its called.
              counter = 0;
            }
            
            function deleteElement(file){
              file.remove();
            }
            
            function duplicateElement(file){
              var newElem = file.clone().attr('class','timeSlotChoosingDupe clearfix');
              newElem.find('.addSlot')
                .addClass('removeSlot').removeClass('addSlot')
                .html('Remove Item');
                //.html('&#8211;'); //minus symbol
              // insert the new element before var file in the dom
              file.before(newElem).hide().slideDown();  
            }
        //function end
        
        //call the various functions with various listeners
        //on every form change, run the totaller
        main_content.on('change', 'select, input', function(){
          updateTotal();
        });
        //add slot
        //duplicate the slot field, update the total, update the item_ count
        main_content.find('.addSlot').on('click', function(){
          duplicateElement(file);
          updatePayPalFormElementNames();
          updateTotal();
        });
        //remove slot
        //duplicate the slot field, update the total, update the item_ count
        main_content.on('click', '.removeSlot', function(){
          deleteElement($(this).parent());
          updatePayPalFormElementNames();
          updateTotal();
        });
    };
})(jQuery);