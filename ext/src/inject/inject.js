chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      console.log("Hello. This message was sent from scripts/inject.js");
      // ----------------------------------------------------------
      var reviewers = $('.js-issue-sidebar-form').find('.select-menu-filters').find('.select-menu-item-heading');

      $('.discussion-sidebar-heading.discussion-sidebar-toggle').first().on('click', function(){

        $('#randomizer-link').remove(); // Clear out old link

        setTimeout(function(){ // Ajaxy things are afoot
          var reviewers = [];

          $($('.select-menu-list')[1]).find('.select-menu-item-heading').each(function(ii, element){
            var $el = $(element);
            $el.find('.description').remove();
            username = $el.text().trim();

            reviewers.push(username);
          });

          randomizerButton = $("<a href='#' id='randomizer-link'>Get Random</a>");

          randomizerButton.on('click', function() {
            // Pull a random name from the list
            randReviewer = reviewers[Math.floor(Math.random() * reviewers.length)];
            $('#review-filter-field').val(randReviewer);
            $('#review-filter-field').focus();
          });

          $('.js-review-requests-menu').find('.select-menu-header').append(randomizerButton);

        }, 500)
      })
  	}
	}, 10);
});