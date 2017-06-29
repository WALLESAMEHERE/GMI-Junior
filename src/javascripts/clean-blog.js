// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Navigation Scripts to Show Header on Scroll-Up
$(document).ready(function($) {
    var MQL = 1170;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height();
        $(window).on('scroll', {
                previousTop: 0
            },
            function() {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                    } else {
                        $('.navbar-custom').removeClass('is-visible is-fixed');
                    }
                } else if (currentTop > this.previousTop) {
                    //if scrolling down...
                    $('.navbar-custom').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                }
                this.previousTop = currentTop;
            });
    }
const basicUrl = 'http://api.nytimes.com/svc/search/v2/';
/*
$.ajax({
        url: basicUrl,
        data :{
            'apikey' :'bb3525b506844487a87c0f9ac7aa1486',
            'username' : 'WALLESAMEHERE'
        },
        type: "Get",
        dataType: "json",
        crossDomain : true,
        success: function (data) {
            console.log(data)
        },
        error: function (message) { alert(message); 
        }

    });
*/
// NOWY REQ
var info = {
    apikey :'bb3525b506844487a87c0f9ac7aa1486',
    name : 'WALLESAMEHERE'
}
function sendA(endpoint, method, data, sCallback, eCallback) {
        $.ajax({
                type: method,
                data: data,
                url: basicUrl + endpoint,
                dataType: "json",
                crossDomain : true,
                success: function (data) {
                    sCallback(data);
                },
                error: function (message) { 
                    eCallback(message); 
                }
            })

    }
sendA('articlesearch.json','GET', info, loadArticle, errorLoad);

function loadArticle(data){
    var text = data.response;
    var arrayWithArticles = text.docs
    for(var i =0;i<arrayWithArticles.length;i++){
        showAtricles(arrayWithArticles[i]);
    }
    $('#lowerData').on('click',function(){
        console.log(arrayWithArticles);
        arrayWithArticles.reverse();
        console.log(arrayWithArticles);
    });
}
function errorLoad(data){

}

function showAtricles(article){
    var headline = article.headline.main;
    var pubDate = article.pub_date;
    var snippet = article.snippet;
    var source = article.source;
    var postedBy = article.byline.original;
    var articleURL = article.web_url;
    var appArticle = "<div class='main-article'><a href='"+articleURL+"'>";
    appArticle += "<h2 class='post-title'>" + headline +"</h2>";
    appArticle += "<h3 class='post-info'>" +snippet +"</h3></a>";
    appArticle += "<p class='post-meta'>Posted <a href='#''>" +postedBy +"</a>";
    appArticle += " on <span class='post-data'>" +pubDate +"</span>, " +source +"</p><div>";
    $('.post-preview').append(appArticle); 
}


});
