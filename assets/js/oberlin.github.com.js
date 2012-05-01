;(function($){
	var s = function( string, values )
			{
				if ( values != null ) /* handle complex strings, otherwise we'll just toss the strings back at 'em */
				{
					for ( key in values ){ /* for each key, replace with value */
						var regex = new RegExp("\\{"+key+"\\}",'g');
						if(values[key]!=null){
							string = string.replace( regex, values[key] );
						} else {
							string = string.replace( regex, '' );
						}
					}
				}
				return string;
			},
			
		displayRepos = function (result) {
				var i,
					data = result.data;
		
				$(function () {
					var $repositories = $('#repositories');
					for (i=0; i < data.length; i++) {
						$repositories.append(s(repository_template, data[i]));
					}
				});
			},
		
		repository_template = 	'\
				<div class="repository">\
					<header class="repository-header">\
						<h1 class="repository-title">\
							<a href="{html_url}">{name}</a>\
						</h1>\
					</header>\
					<p class="repository-description">{description}</p>\
				</div>\
			';
	
	$.getJSON("https://api.github.com/orgs/oberlin/repos?callback=?", displayRepos);
}(jQuery));