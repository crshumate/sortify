$(document).ready(function(){

    $(".products ul.productList").sortify({
        items: "li",
        alphaRefine: "#category-refinement ul li a",
        itemTitle: "h2.title a",
        method : "alphaNumeric",
        paginate: true,
        itemsPerPage:2,
		visiblePageLinks: 2,
		fauxTitle:true,
		fauxTitleType:'data'
    });



});