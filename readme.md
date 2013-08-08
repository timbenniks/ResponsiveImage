#Yet another responsive image solution

I created this script because I wanted the smallest possible and library agnostic script to handle responsove images. It uses matchMedia so you can add your breakpoints as media queries. 

The image tag should have a `data-sources` attribute with an array of images that needs to be the same length as the amount of breakpoints you specified. This is done to makes sure you create a proper image for all occasions. 

If you dont want to do that you can add an empty index into the array. The script will then use the last selected image when the breakpoint of the empty index hits.

When `retina: true` is added to the settings the script will find out what the device pixel ratio is via javascript. If it is higher then 1 the script will add `@2` to the image source name. `guitar-530.jpg` will become `guitar-530@2.jpg`. 

This solution is quite harsh and it makes sure you create retina assets for all responsive image tags. If you don't, it will break.

## implementation
`<img src="guitar-320.jpg" data-sources='["guitar-320.jpg", "guitar-500.jpg", "guitar-768.jpg", "guitar-1024.jpg", "guitar-1920.jpg"]' alt="guitar" />`

`
var responsiveImageInstance = new responsiveImage(
{
	retina: true,
	onresize: true,
	breakpoints: [
		'(max-width: 320px)',
		'(min-width: 321px) and (max-width: 500px)',
		'(min-width: 501px) and (max-width: 768px)',
		'(min-width: 769px) and (max-width: 1024px)',
		'(min-width: 1024px)'
	]
});
`