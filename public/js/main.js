require.config({
    paths: {
        jquery:     'libs/jquery/jquery',
        underscore: 'libs/underscore/underscore',
        backbone:   'libs/backbone/backbone',
        text:       'libs/require/text',
        json2:      'libs/json/json2',
        encoder: 	"libs/encoder/encoder", 
        templates:   '../templates'
    }

});

require(['view-coordinator'], 
		function(viewCoordinator) {
            viewCoordinator.initialize();
		});