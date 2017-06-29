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
    // **** Above JS from Template **** 
    "use strict"
    // basic API url and user information
    const basicUrl = 'http://api.nytimes.com/svc/search/v2/';
    const info = {
        apikey: 'bb3525b506844487a87c0f9ac7aa1486',
        name: 'WALLESAMEHERE'
    }
    // general function - request to API
    function sendA(endpoint, method, data, sCallback, eCallback) {
        $.ajax({
            type: method,
            data: data,
            url: basicUrl + endpoint,
            dataType: "json",
            crossDomain: true,
            success: function(data) {
                sCallback(data);
            },
            error: function(message) {
                eCallback(message);
            }
        })
    }
    // send req to api and get response
    sendA('articlesearch.json', 'GET', info, loadArticle, errorLoad);
    // succes function
    function loadArticle(data) {
        var ajaxResponse = data.response;
        var objectWithArticles = ajaxResponse.docs
        // function which get and push articles to site
        objloop(objectWithArticles);
        // 
        $('#latestData').on('click', function() {
            sortNew(objectWithArticles);
        });
        $('#oldestData').on('click', function() {
            sortOld(objectWithArticles);
        });
    }
    // error function
    function errorLoad(data) {
        console.log(data);
    }
    // get articles and start function adding all to site
    function objloop(array) {
        for (var i = 0; i < array.length; i++) {
            showArticles(array[i]);
        };
    };
    // add articles to HTML
    function showArticles(article) {
        var headline = article.headline.main;
        var pubDate = article.pub_date;
        var snippet = article.snippet;
        var source = article.source;
        var postedBy = article.byline.original;
        var articleURL = article.web_url;
        var appArticle = "<div class='main-article'><a href='" + articleURL + "'>";
        appArticle += "<h2 class='post-title'>" + headline + "</h2>";
        appArticle += "<h3 class='post-info'>" + snippet + "</h3></a>";
        appArticle += "<p class='post-meta'>Posted <a href='#''>" + postedBy + "</a>";
        appArticle += " on <span class='post-data'>" + pubDate + "</span>, " + source + "</p><div>";
        $('.post-preview').append(appArticle);
    }
    // function sort articles by date - newest to oldest
    function sortNew(obj) {
        $('.main-article').remove(); // remove articles and add sorted by date
        obj.sort(function(a, b) {
            a = new Date(a.pub_date);
            b = new Date(b.pub_date);
            return a > b ? -1 : a < b ? 1 : 0;
        });
        objloop(obj);
    }
    // function sort articles by date - oldest to newest
    function sortOld(obj) {
        $('.main-article').remove(); // remove articles and add sorted by date
        obj.sort(function(a, b) {
            a = new Date(a.pub_date);
            b = new Date(b.pub_date);
            return b > a ? -1 : b < a ? 1 : 0;
        });
        objloop(obj);
    }
});