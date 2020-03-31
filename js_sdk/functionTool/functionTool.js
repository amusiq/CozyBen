export default{
	throttle(fn, delay = 100) {
		let last = 0;
		return function() {
			let curr = +new Date();
			if (curr - last > delay) {
				fn.apply(this, arguments);
				last = curr;
			}
		};
	}
} 