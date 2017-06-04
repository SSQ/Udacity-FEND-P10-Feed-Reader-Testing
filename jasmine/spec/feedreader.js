/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against application.
 */
$(function() {
    /*  This suite is all about the RSS feeds definitions,
     * the allFeeds variable in application.
     */
    describe('RSS Feeds', function() {
        /* This is first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*  This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URL defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).toBeTruthy();
            });
        });


        /*  This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have name defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });


    /*  This is a new test suite named "The menu" */
    describe('The menu', function() {
        /*  THis is a test that ensures the menu element is
         * hidden by default.
         */

        var body = $("body").hasClass('menu-hidden');
        it('should be hidden by default', function() {
            expect(body).toBe(true);
        });

        /*  THis is a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('display with 1 click and hide with double clicks', function() {
            var menuHidden;
            $('.menu-icon-link').click();
            menuHidden = $("body").hasClass('menu-hidden');
            expect(menuHidden).toBe(false);

            $('.menu-icon-link').click();
            menuHidden = $("body").hasClass('menu-hidden');
            expect(menuHidden).toBe(true);
        });
    });
    /*  THis is a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /*  THis is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('should have at least a single .entry element within the .feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /*  THis is a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        /*  THis is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feed0;
        var feed1;
        beforeEach(function(done) {
            loadFeed(0, function() {
                feed0 = $('.feed').html();
                done();
            });
        });

        it('when a new feed is loaded by the loadFeed function the content actually changes', function(done) {
            loadFeed(1, function() {
                feed1 = $('.feed').html();
                expect(feed1).not.toEqual(feed0);
                // console.log(feed1);
                // console.log(feed0);
                done();
            });
        });
    });
}());
