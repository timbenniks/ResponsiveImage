window.responsiveImage = function(options)
{
	var win = window, doc = document,
		breakPoints = options.breakpoints,
		retina = options.retina || false,
		onresize = options.onresize || false,

	matchMedia = window.matchMedia || function()
	{
		var bool, docElem = doc.documentElement, refNode = docElem.firstElementChild || docElem.firstChild,
			fakeBody = doc.createElement('body'), div = doc.createElement('div');

		div.id = 'mq-test-1';
		div.style.cssText = 'position:absolute;top:-100em';
		fakeBody.style.background = 'none';
		fakeBody.appendChild(div);

		return function (q)
		{
			div.innerHTML = '­<style media="' + q + '"> #mq-test-1 { width: 42px; }</style>';
			docElem.insertBefore(fakeBody, refNode);
			bool = div.offsetWidth === 42;
			docElem.removeChild(fakeBody);

			return { matches: bool, media: q };
		};
	},

	setSourceForBreakpoint = function()
	{
		var images = doc.querySelectorAll('[data-sources]'),
			i = 0, b = 0, chosenBreakpoint = 0, devicePixelRatio = (retina) ? win.devicePixelRatio || 1 : 1;

		if(!breakPoints) return;

		for(;i < breakPoints.length; i++)
		{
			if(matchMedia(breakPoints[i]).matches) chosenBreakpoint = i;
		}

		for(;b < images.length; b++)
		{
			var sources = (images[b].dataset !== undefined && images[b].dataset !== null) ? JSON.parse(images[b].dataset['sources']) : JSON.parse(images[b].getAttribute('data-sources')),
				src = sources[chosenBreakpoint];

			if((sources && src) && (images[b].src !== src)) images[b].src = (devicePixelRatio > 1) ? src.split('.')[0] + '@2.' + src.split('.')[1] : src;
		}
	};

	if(onresize) win.addEventListener('resize', setSourceForBreakpoint, false);
	win.addEventListener('orientationchange', setSourceForBreakpoint, false);
	setSourceForBreakpoint();
};