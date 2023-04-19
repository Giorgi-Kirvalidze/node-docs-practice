/*
console.time() and console.timeEnd(): 
These methods can be used to measure the execution time of a block of code. 
console.time() starts a timer, and console.timeEnd() stops the timer and logs the elapsed time to the console. Here's an example:
*/

console.time("myOperation");
// ... do some work ...
console.timeEnd("myOperation"); // prints "myOperation: XXms"

/*
process.hrtime(): This method returns a high-resolution timestamp 
that can be used to measure the elapsed time between two points in a Node.js application
The returned value is an array of two integers representing 
the number of seconds and nanoseconds since an arbitrary time in the past. 
Here's an example:
*/
const startTime = process.hrtime();
// ... do some work ...
const elapsedTime = process.hrtime(startTime);
console.log(`Elapsed time: ${elapsedTime[0]}s ${elapsedTime[1] / 1000000}ms`);

/*
perf_hooks module: This module provides a set of performance measurement APIs
 that can be used to measure the performance of Node.js applications
  in a more granular way. 
  The perf_hooks module includes classes 
  like PerformanceObserver, PerformanceEntry, and PerformanceMark
   that can be used to measure various aspects of a Node.js application's performance,
    such as CPU usage, memory usage, and network latency. Here's an example:
*/
const { PerformanceObserver, performance } = require('perf_hooks');

const obs = new PerformanceObserver((list) => {
  console.log(list.getEntries()[0].duration);
  obs.disconnect();
});

obs.observe({ entryTypes: ['measure'], buffered: true });

performance.mark('start');

// ... do some work ...

performance.mark('end');
performance.measure('My Operation', 'start', 'end');
