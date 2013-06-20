sortify
=======

An all-in-one pagination/refinement/sorting jQuery plugin 


This plugin is ready for alpha stage. While there is a lot of refactoring to do you can install this plugin and be on your way!

Sortify is really three plugins in one. It is a paginating, sorting and refining plugin and it is compatible with jQuery 1.3.2+

The plugin is called on your item container. Typically a &lt;ul&gt; but it need not be.

Here are the options for the plugin:
<pre>

items:  //these are all the items in your item container
alphaRefine: //the specific element that represents your alpha refine text
itemTitle:  //The item name that is used to compare against the alphaRefine text
method : //there are three option - alpha, numeric, alphaNumeric
numericRefine: '#numeric-refinement ul li a', //the specific element that represents your numeric refine ranges
itemNumber: //Assigns which element is the price
paginate: //Boolean - Activate pagination
paginateWrapper: //Your header pagination
paginateWrapperClone://Footer pagination should you choose to use it
itemsPerPage: //The number of items per page you wish to display
visiblePageLinks: //How many page links are visible at a time
fauxTitle: /* Boolean - For alpha refine you don't need to rely solely on the the text of your element. You can assign other attributes to be representative of what should be refined against*/

fauxTitleType: //This may be either 'data' or 'class' - note if data then data attribute must be data-title
sort: //Boolean - Activates sorting
sortSelect://Designates which select holds the sorting values
sortList://Boolean - You can predesignate a sort list with a pre-set order if you'd like
fauxRange:// Boolean - Use HTML attributes rather than text for numeric refining, same as fauxTitle for alpha refining 
fauxRangeType://May be either class or data - note if data must be data-filter
paginationNext: //Forward pagination element
paginationPrevious: //Previous pagination element

</pre>


The best documentation at this point is to simply open sortify.html in your text editor to see the default HTML that is set up. The compare it against the default plugin settings so you know how to correctly and change the classes etc.


Note: This plugin is beneficial primarily for anyone not working in an eCommerce platform seeing as how all of this functionality is default out of the box for most eCommerce platforms.

