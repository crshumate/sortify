sortify
=======

An all-in-one pagination/refinement/sorting jQuery plugin 


This plugin is ready for alpha stage. While there is a lot of refactoring to do you can install this plugin and be on your way!

Sortify is really three plugins in one. It is a paginating, sorting and refining plugin and it is compatible with jQuery 1.3.2+

The plugin is called on your item container. Typically a &lt;ul&gt; but it need not be.

Here are the options for the plugin:

<code>
items: 'li', //these are all the items in your item container
alphaRefine: '#alpha-refine ul li a', //the specific element that represents your alpha refine text
itemTitle: 'h2.title a',  //The item name that is used to compare against the alphaRefine text
method : 'alpha', //there are three option - alpha, numeric, alphaNumeric
numericRefine: '#numeric-refinement ul li a', //the specific element that represents your numeric refine ranges
itemNumber:'p.price', //Assigns which element is the price
paginate: true, //Activate pagination
paginateWrapper:'.sortify-pagination.first', //Your header pagination
paginateWrapperClone:'.sortify-pagination.clone', //Footer pagination should you choose to use it
itemsPerPage:15, //The number of items per page you wish to display
visiblePageLinks:3, //How many page links are visible at a time
fauxTitle:false, /*For alpha refine you don't need to rely solely on the the text of your element. You can assign other attributes to be representative of what should be refined against*/

fauxTitleType:'class', //This may be either 'data' or 'class' - note if data then data attribute must be data-title
sort:true, //Activates sorting
sortSelect:'.sortify-sort .sortify-select', //Designates which select holds the sorting values
sortList:false, //you can predesignate a sort list with a pre-set order if you'd like
fauxRange:false, //Use HTML attributes rather than text for numeric refining, same as fauxTitle for alpha refining 
fauxRangeType:'class', //May be either class or data - note if data must be data-filter
paginationNext: '.paginationNext', //Forward pagination element
paginationPrevious: '.paginationPrevious' //Previous pagination element
</code>





Note: If you are working within the framework of an eCommerce platform you most likely will not need this plugin at all. However it can be beneficial for anyone not working in an eCommerce platform. 

