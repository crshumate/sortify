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


The best documentation at this point is to simply open sortify.html in your text editor to see the default HTML that is set up. Then compare it against the default plugin settings so you know how to correctly modify the classes.


Sort/Pagination HTML
--------------------
<pre>
 &gt;div class="sortify-sort"&lt;
                &lt;label class='sortify-sort-label'&gt;Sort by: &lt;/label&gt;&lt;select class="sortify-select"&gt;
                &lt;option value='alpha' class='forward'&gt;Brand, A - Z</option&gt;
                &lt;option value='alpha' class='reverse'&gt;Brand, Z - A</option&gt;
                &lt;option value='numeric' class='forward'&gt;Price, Low to High&lt;/option&gt;
                &lt;option value='numeric' class='reverse'&gt;Price, High to Low&lt;/option&gt;
            &lt;/select&gt;
            &lt;/div&gt;
        &lt;div class="sortify-pagination clone"&gt;&lt;div class="pagination"&gt;&lt;/div&gt;&lt;/div&gt;
</pre>

Item List Example
-----------------

<pre>

<br/>            &lt;ul class='productList'&gt;<br/>              &lt;li&gt;<br/>                  &lt;img src=&quot;images/avatar.jpg&quot; /&gt;<br/>                  &lt;h2 class='title'&gt;&lt;a href=&quot;#&quot;&gt;Avatar the Movie&lt;/a&gt;&lt;/h2&gt;<br/>                  &lt;p class=&quot;price&quot;&gt;$13.99&lt;/p&gt;<br/><br/>              &lt;/li&gt;<br/><br/><br/>                &lt;li&gt;<br/>                    &lt;img src=&quot;images/despicable.jpg&quot; /&gt;<br/>                    &lt;h2 class='title'&gt;&lt;a href=&quot;#&quot;&gt;The Despicable Me&lt;/a&gt;&lt;/h2&gt;<br/>                    &lt;p class=&quot;price&quot;&gt;$12.00&lt;/p&gt;<br/><br/>                &lt;/li&gt;

</pre>


Refinement Example
-------------------
<pre>
 &lt;div id=&quot;category-refinement&quot;&gt;<br/>            &lt;h2&gt;Category&lt;/h2&gt;<br/>            &lt;ul&gt;<br/>                &lt;li data-title=&quot;avatar&quot;&gt;&lt;a href=&quot;#&quot;&gt;Avatar&lt;/a&gt;&lt;/li&gt;<br/>                &lt;li data-title=&quot;despicable-me&quot;&gt;&lt;a href=&quot;#&quot;&gt;Despicable You&lt;/a&gt;&lt;/li&gt;<br/>                &lt;li data-title=&quot;duck-dynasty&quot;&gt;&lt;a href=&quot;#&quot;&gt;Duck Dynasty&lt;/a&gt;&lt;/li&gt;<br/>                &lt;li data-title=&quot;hobbit&quot;&gt;&lt;a href=&quot;#&quot;&gt;The Hobbit&lt;/a&gt;&lt;/li&gt;<br/>                &lt;li data-title=&quot;Oz&quot;&gt;&lt;a href=&quot;#&quot;&gt;Oz&lt;/a&gt;&lt;/li&gt;<br/>                &lt;li data-title=&quot;star&quot;&gt;&lt;a href=&quot;#&quot;&gt;Star&lt;/a&gt;&lt;/li&gt;<br/>                &lt;li data-title=&quot;The&quot;&gt;&lt;a href=&quot;#&quot;&gt;The&lt;/a&gt;&lt;/li&gt;<br/>                &lt;li&gt;&lt;a class=&quot;all&quot; href=&quot;#&quot;&gt;All&lt;/a&gt;&lt;/li&gt;<br/>            &lt;/ul&gt;<br/>        &lt;/div&gt;<br/><br/>        &lt;div id=&quot;numeric-refinement&quot;&gt;<br/>            &lt;h2&gt;Price&lt;/h2&gt;<br/>            &lt;ul&gt;<br/>                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;$10.99 - $12.99&lt;/a&gt;&lt;/li&gt;<br/>                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;$12.99 - $15.99&lt;/a&gt;&lt;/li&gt;<br/>                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;$15.99 - $25.99&lt;/a&gt;&lt;/li&gt;<br/>                &lt;li&gt;&lt;a class=&quot;all&quot; href=&quot;#&quot;&gt;All&lt;/a&gt;&lt;/li&gt;<br/>            &lt;/ul&gt;<br/>        &lt;/div&gt;
</pre>

Note: This plugin is beneficial primarily for anyone not working in an eCommerce platform seeing as how all of this functionality is default out of the box for most eCommerce platforms.

