/*--Created by Chris Shumate - http://chris-shumate.com
 Copyright 2013, Chris Shumate
 Free to use under the MIT license.
 http://www.opensource.org/licenses/mit-license.php

--*/

(function($){

    $.fn.sortify = function(options){
        
        var defaults = {
                itemList: this,
                items: "li",
                alphaRefine: "#alpha-refine ul li a",
                itemTitle: "h2.title a",
                method : "alpha",
                numericRefine: '#numeric-refinement ul li a',
                itemNumber:'p.price',
                paginate: true,
                paginateWrapper:'.sortify-pagination.first',
                paginateWrapperClone:'.sortify-pagination.clone',
                itemsPerPage:15,
                visiblePageLinks:3,
                fauxTitle:false,
                fauxTitleType:'class',
                sort:true,
                sortSelect:'.sortify-sort .sortify-select',
                sortList:false,
                fauxRange:false,
                fauxRangeType:'class',
                paginationNext: '.paginationNext',
                paginationPrevious: '.paginationPrevious'

            },
        settings = $.extend({}, defaults, options);

        var allItems = $(settings.itemList).find(settings.items);

	    var itemObj=[];
	    var titles=[];
		var numObj = [];
	    var ranges = [];

        var sortify={
        	
                
                init:function(){
                  this.controller();  
                },

                controller:function(){
                		console.log('controller called');
                	
		            //paginate the page at the beginning..
		            if(settings.paginate)sortify.paginate.init();


		            if(settings.method=='alpha'){
		                //after getCategories finishes run this callback
		                sortify.alphaRefine.init();

		      
		            } else if(settings.method=='numeric'){
		                //after getPrices finishes run this callback
		                sortify.numericRefine.init();

		            } else if(settings.method='alphaNumeric'){

		                //after getCategories finishes run this callback
		               sortify.alphaRefine.init();

		                //after getPrices finishes run this callback
		                 sortify.numericRefine.init();

		            }

		            if(settings.sort){
		                //set the alphaSort && priceSort trigger...
		                $(settings.sortSelect).change(function(){
		                    sortify.sort.init(this);
		                });
		            }

		        },

		        alphaRefine:{

		        	//on click if <a> !haveClass = 'all' then grab data('filter') and use that to access the proper array in itemObj and then append those results to displayWidget
		           
		        	init: function(){
		        		console.log('alphaRefine.init called')
		        		 $(settings.alphaRefine).click(function(ev){
			                ev.preventDefault();
			                $(settings.alphaRefine).parent().parent().find('li.selected').removeClass('selected');
			                $(settings.numericRefine).parent().parent().find('li.selected').removeClass('selected');
			                $(this).parent().addClass('selected');
			                sortify.helper.updateItemList(this, itemObj);
		           		 });

		        		 this.getCategories(function(){
		        		 	sortify.helper.addQty($(settings.alphaRefine), itemObj);

		        		 });

		        	},
		            

		            getCategories: function(callback){
		            	console.log('getCategories called');
		                //first loop through html list to grab each brand
		                $(settings.alphaRefine).each(function(){
		                    if(!$(this).hasClass('all')){
		                        if(!settings.fauxTitle){
		                            var title = $(this).text();
		                        } else{
		                            if(settings.fauxTitleType=='data'){
		                                title = $(this).parent().data('title');
		                            }else{
		                                title = $(this).parent().attr('class');
		                            }
		                        }
		                        //clean string...
		                        title=$.trim(title);
		                        title=title.toLowerCase().replace(/\s+/g, "-");
		                        //push into titles array...
		                        titles.push(title);
		                        //add data item to this link so we know which array we want to call back later....
		                        $(this).data('filter', title)
		                    }
		                });
		                if(allItems.length > 0){
		                    itemObj = sortify.helper.segregateItems(allItems,titles);
		                    callback();
		                }
		            }

	
		        },

		        numericRefine:{


		        	init:function(){
		        		 //onclick updateProductList
			            $(settings.numericRefine).click(function(ev){
			                ev.preventDefault();
			                $(settings.alphaRefine).parent().parent().find('li.selected').removeClass('selected');
			                $(settings.numericRefine).parent().parent().find('li.selected').removeClass('selected');
			                $(this).parent().addClass('selected');
			                sortify.helper.updateItemList(this, numObj);

			            });

			            this.numericRefine(function(){
		                    sortify.helper.addQty(settings.numericRefine, numObj);

		                })
		        	},
		           

		            numericRefine:function(callback){
		                $(settings.numericRefine).each(function(){
		                    if(!$(this).hasClass('all')){
		                        if(!settings.fauxRange){
		                            var range = $(this).text();
		                        } else{
		                            if(settings.fauxRangeType=="class"){
		                              range=$(this).parent().attr('class');
		                            } else if(settings.fauxRangeType=="data"){
		                               range=$(this).parent().data('range');
		                            }
		                        }
		                        //clean string...
		                        range=$.trim(range);
		                        range=range.replace(/\s+/ig, "");
		                        //push into prices array...
		                        ranges.push(range);
		                        //add data item to this link so we know which array we want to call back later....
		                        $(this).data('filter', range)
		                    }
		                });


		                if(allItems.length > 0){
		                    $(allItems).each(function(i, e){
		                        var thisItem = e;
		                        var thisNumber = $(this).find(settings.itemNumber).text();
		                        thisNumber=$.trim(thisNumber);

		                        //loop through all the prices looking for a match between text and the brand name...
		                        $.each(ranges, function(j,el){
		                            var thisRange = el.split("-");
		                            if(thisNumber >= thisRange[0] && thisNumber<=thisRange[1]){
		                                if(numObj[el]){
		                                    numObj[el].push(thisItem);
		                                }else{
		                                    numObj[el]=[];
		                                    numObj[el].push(thisItem);
		                                }
		                            } else{
		                                if(!numObj[el]){
		                                    numObj[el]=[];
		                                }
		                            }
		                        });
		                    });
		                    callback();
		                }
		            }


		        },
		        
		        helper:{

			            segregateItems: function(itemArray, titleArray){
			            	console.log('segregateItems called');
			                var arr=[];
			                $.each(itemArray, function(i,e){
			                    var thisItem = e;
			                    var htmlText = $(thisItem).find(settings.itemTitle);
			                    //title name is always in the text...
			                    htmlText = htmlText.text();
			                    htmlText=htmlText.toLowerCase().replace(/\s+/g, "-");

			                    //loop through all the titles looking for a match between text and the title name...
			                    $.each(titleArray, function(j,el){
			                        var match = htmlText.match(el);
			                        //if there is a match..
			                        if (match || htmlText==el){
			                            //and the array exists push thisItem...
			                            if(arr[el]){
			                                arr[el].push(thisItem)
			                            }//if the array doesn't exist add the array first and then push thisItem
			                            else{
			                                arr[el]=[];
			                                arr[el].push(thisItem)
			                            }
			                        }
			                        //if there is no match then simply add the empty array so we can easily check for length and append 0 to the category link...
			                        else{
			                            if(!arr[el]){
			                                arr[el]=[];
			                            }
			                        }
			                    })
			                });
			                return arr;
			            },



			            addQty:function(thisRefinement, thisObject){
			            	console.log('addQty called');
			                //append qty next to each category filter
			                $(thisRefinement).each(function(){
			                    //clean string...
			                    var filter = $(this).data('filter');
			                    //check for length and append qty next to category link..
			                    if($(this).hasClass('all')){
			                        var allProductQty = allItems.length;
			                        $(this).append(" ("+allProductQty+")");

			                    }else{
			                        var qty = thisObject[filter].length;
			                        $(this).append(" ("+qty+")");
			                    }
			                });

			            },


			            updateItemList:function(specificRefinement, thisObject){
			                if(!$(specificRefinement).hasClass('all')){
			                    var idx = $(specificRefinement).data('filter');
			                    if(thisObject[idx].length > 0)
			                        $(settings.itemList).html(thisObject[idx]);
			                    else
			                        $(settings.itemList).html("<div class='sortify-results-txt'><h2>No Results Available.</h2><p>Please make another selection.</p></div>");
			                }else{
			                    $(settings.itemList).html(allItems);
			                }

			                //repaginate the page
			                if(settings.paginate)sortify.paginate.init();

			            }

		        },

		        sort:{

		        	init:function(thisSelect){
		                var sortBy=$(thisSelect).val();
		                var sortDirection=$(thisSelect).find(':selected').attr('class');

		                if(settings.sortList){
		                    var titleList = $(settings.sortList).text();
		                    //only sort the visible products on this paginated page...
		                    titleList=titleList.toLowerCase().split(';');
		                } else{
		                    titleList=[];
		                    allItems.find(settings.itemTitle).each(function(i,e){
		                      var thisItemTitle = $(e).text();
		                        thisItemTitle = thisItemTitle.toLowerCase();
		                       titleList[i] = thisItemTitle;
		                    })
		                }

		                 for (var i in titleList){
		                   titleList[i] = $.trim(titleList[i]).replace(/\s+/g,"-");

		                }
		                var items=[];
		                var products=$(settings.itemList).find(settings.items);
		                products.each(function(i,e){
		                    //push raw html into array, no jQuery needed
		                    items.push(e);
		                });
		                //wrap products variable in jQuery object so we can use jQuery methods on it....
		                items=$(items);

		                if(sortBy=='alpha'){
		                    //assign the proper direction to the array...
		                    if(sortDirection=='forward'){
		                        titleList=titleList.sort();
		                    } else if(sortDirection=='reverse'){
		                        titleList=titleList.sort().reverse();
		                    }

		                    this.alphaSort(titleList,items);
		                } else if(sortBy=='numeric'){
		                    //Build out the prices array...
		                    var numberText = items.find(settings.itemNumber);
		                    var numbers=[];

		                    $.each(numberText,function(){
		                        var number = $.trim($(this).text());
		                        number = number.slice(1);
		                        numbers.push(number);
		                    });

		                    if(sortDirection =='forward'){
		                        numbers.sort(function(a,b){return a-b});
		                    } else{
		                        numbers.sort(function(a,b){return b-a});
		                    }
		                    this.numericSort(numbers, items);
		                }

            		},

		            //build the numberSort logic
		            numericSort: function(numbers, items){
		                var sortedList=numbers;
		                $.each(items, function(i,e){
		                    var thisItem = e;
		                    var thisNumber = $.trim($(e).find(settings.itemNumber).text());
		                    $.each(numbers, function(j,el){
		                        el="$"+el;
		                        if(thisNumber==el){
		                            sortedList[j]=thisItem;
		                            return false;
		                        }
		                    });
		                });
		                $(settings.itemList).html(sortedList);
		                sortify.paginate.init();
		            },

		            //build the alphaSort logic
		            alphaSort:function(titleList, items){
		                var sortedItems;
		                var sortedList=[];
		                sortedItems= sortify.helper.segregateItems(items,titleList);
		                for (var i in sortedItems){
		                    if(sortedItems[i].length>0){
		                        var hasItems = sortedItems[i];
		                        for (var j in hasItems){
		                            sortedList.push(hasItems[j]);
		                        }
		                    }
		                }
		                $(settings.itemList).html(sortedList);
		                sortify.paginate.init();
		            }


		        },
		        paginate:{

		        	init:function(){
		        		this.paginate();
		        		
		        	},		
				    paginate: function(){
		                /*--Create the paginator--*/
		                //empty out the top paginator...bottom gets rebuilt later
		                $pagination = $(settings.paginateWrapper).find('.pagination');
		                $pagination.html('');
		                //all the products on the page
		                var items = $(settings.itemList).find(settings.items);
		                //create top paginator....
		                var $paginator=$("<ul />").addClass('paginator');

		                //append/prepend paginator html to proper places...
		                //paginator.prependTo(".sortify-pagination.first .pagination");
		                 $pagination.prepend($paginator);
		                 $pagination.prepend("<a class='paginationPrevious' href='#'>< Previous</a>");
		                 $pagination.append("<a class='paginationNext' href='#'>Next ></a>");


		                /*--Create the pages--*/
		                //loop through every settings.itemsPerPage
		                j=0;
		                for (var i=0; i<items.length; i+=settings.itemsPerPage){
		                    j++;

		                    //create a page link in our paginator - .data(thisPage) will contain the div class to show
		                    var pageLink = $("<a />").text("Page "+j).attr('href',"#").data('thisPage','.page'+j);
		                    //append page link into li...
		                    pageLink = $("<li />").append(pageLink);
		                    //append li into paginator...
		                    $paginator.append(pageLink);
		                    if(j==1){
		                        var pageVisibility='showPage';
		                        pageLink.addClass('selected');
		                    } else{
		                        pageVisibility = 'hidePage'
		                    }
		                    items.slice(i, i+settings.itemsPerPage).wrapAll("<div class='pages page"+j+" "+pageVisibility+"'></div>");
		                }

		                //loop through every settings.visiblePageLinks
		                var totalLi = $paginator.find('li');
		                var setOfPages=0;
		                for (i=0; i<totalLi.length; i+=settings.visiblePageLinks){
		                    setOfPages++;
		                    if(setOfPages==1) showHide = ' showSet ';
		                    else showHide=' hideSet ';

		                    totalLi.slice(i,i+settings.visiblePageLinks).wrapAll("<span class='set"+setOfPages+" "+showHide+"'></span>")
		                }
		                //initial onload setup for next/prev
		                sortify.paginate.nextPrev();

		                //attach click event to properly show/hide pages
		                $paginatorLinks = $paginator.find('li a');
		                $paginatorLinks.click(function(ev){
		                    ev.preventDefault();
		                    //first update the paginator links' selected status
		                    var thisIndex=$paginatorLinks.index(this);
		                    $paginator.find('li.selected').removeClass('selected');
		                    $paginator.find('li').eq(thisIndex).addClass('selected');

		                    //now show/hide the corresponding pages...
		                    var thisPage = $(this).data('thisPage');
		                    $(".showPage").addClass('hidePage').removeClass('showPage');
		                    $(thisPage).removeClass('hidePage').addClass('showPage');

		                    //run nextPrev so the next/previous links status' are properly updated...
		                    sortify.paginate.nextPrev();

		                });


		            },

		            //nextPrev keeps track of where we are for the previous and next buttons. It shows/hides them at the appropriate times...
		            nextPrev:function(){
		            	var $paginator = $(settings.paginateWrapper).find('.paginator');
		            	var $li  = $paginator.find('li');
		            	var $selected = $paginator.find('li.selected');
		                var position = $li.index($selected);
		                var posCheck = position+1;
		                var $next = $(settings.paginateWrapper).find(settings.paginationNext);
		                var $previous =  $(settings.paginateWrapper).find(settings.paginationPrevious);


		                //Previous Link: if position is greater than 0, ie: we are not on the first page...
		                if(position > 0){
		                    //if previous hasClass of disabled remove it...
		                    if($previous.hasClass('disabled'))
		                        $previous.removeClass('disabled');
		                }
		                //if position is NOT greater than 0 than we are on the first page...
		                else{
		                    $previous.addClass('disabled');
		                }

		                //Next Link: compare the current link index position+1 and compare it to the length of total page links
		                //if posCheck != to total page link length..
		                if(posCheck != $li.length){
		                    //..and it has a class of disabled, remove it.
		                    if($next.hasClass('disabled'))
		                        $next.removeClass('disabled');
		                    //if posCheck == to total page link length, addClass disabled
		                } else{
		                    $next.addClass('disabled');
		                }

		                //the HTMl dump for the bottom paginator....
		                var associatePagination = $(settings.paginateWrapper).find('.pagination').html();
		                $(settings.paginateWrapperClone).find('.pagination').html(associatePagination)

		            },

		            attachEvents: function(){
		            	var $paginateWrapper= $(settings.paginateWrapper);

		            	$(settings.paginationPrevious).live('click',function(ev){
		                ev.preventDefault();
		                if(!$(this).hasClass('disabled')){
		                    var position = $paginateWrapper.find(".paginator li").index($paginateWrapper.find(".paginator li.selected"));
		                    var newPos = position-1;
		                    var liSetPos = $paginateWrapper.find('.paginator span.showSet li').index($("span.showSet li.selected"));
		                    var spanSetPos = $paginateWrapper.find('.paginator span').index($paginateWrapper.find(".paginator span.showSet"));
		                    if((liSetPos ==0) && spanSetPos != 0){
		                        var thisSpan = $(".first .paginator .showSet");
		                        thisSpan.removeClass('showSet').addClass('hideSet');
		                        thisSpan.prev($("span")).removeClass('hideSet').addClass('showSet')
		                    }
		                    $paginateWrapper.find(".paginator li.selected").removeClass('selected');
		                    $paginateWrapper.find(".paginator li").eq(newPos).addClass('selected').find('a').click();

		                }
		            });

		            $(settings.paginationNext).live('click',function(ev){
		                ev.preventDefault();
		                if(!$(this).hasClass('disabled')){
		                    var position = $(".first .paginator li").index($(".first .paginator li.selected"));
		                    var newPos = position+1;


		                    $paginateWrapper.find(".paginator li.selected").removeClass('selected');
		                    $paginateWrapper.find(".paginator li").eq(newPos).addClass('selected');

		                    /*--show/hide proper pagination spans--*/
		                    var selectedLi = $(".first .paginator li.selected");
		                    var thisSpan = selectedLi.parent();

		                    if(!thisSpan.hasClass('showSet')){
		                        $paginateWrapper.find(".paginator span.showSet").removeClass('showSet').addClass('hideSet');
		                        thisSpan.removeClass('hideSet').addClass('showSet');

		                    }
		                    //click this the very last so the html above is finished changing. Once this is clicked the
		                    //cloned paginator will be rebuilt and we need to make sure that the html above is done changing...
		                    $paginateWrapper.find(".paginator li.selected").find('a').click();
		                }
		            });


					$cloneWrapper = $(settings.paginateWrapperClone);
		            /*--clone events--*/
		            //must use .live since the bottom pagination will be rebuilt with js...
		            $cloneWrapper.find(settings.paginationPrevious).live('click',function(ev){
		                ev.preventDefault();
		                $paginateWrapper.find(settings.paginationPrevious).click();
		                //maintains page position despite content changes...
		                $(window).scrollTop($(document).height());
		            });

		            $cloneWrapper.find(settings.paginationNext).live('click',function(ev){
		                ev.preventDefault();
		               $paginateWrapper.find(settings.paginationNext).click();
		                $(window).scrollTop($(document).height());

		            });

		            $cloneWrapper.find(".paginator li a").live('click',function(ev){
		                ev.preventDefault();
		                var thisIndex=$cloneWrapper.find(".paginator li a").index(this);
		                $cloneWrapper.find(".paginator li a").eq(thisIndex).click();
		                $(window).scrollTop($(document).height());

		            });

		            }
		            
		        }              
	              
            };



        return this.each(function(){
            sortify.init();
            sortify.paginate.attachEvents();

        });
    }
 

}(jQuery));



