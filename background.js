chrome.webNavigation.onBeforeNavigate.addListener(function({url: currentUrl}) {	
	if (!currentUrl.match('authuser')) {
		chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
			const tab = tabs[0];
			const separator = currentUrl.match("\\?") ? "&" : "?";
      			var destination = `${currentUrl}${separator}`;
			chrome.storage.local.get({'map': '0'}, function(result) {
				if (parseInt(result.map)){
					destination = `${currentUrl}${separator}authuser=${result.map}`;
					console.info(`Redirected from ${currentUrl} to ${destination}`);
					chrome.tabs.update(tab.id, {url: destination});
				}
			});
		});
	}
}, {url: [{ urlMatches: 'google.com\/maps' }, { hostEquals: 'map.google.com' }, { hostEquals: 'maps.google.com' }]
});
