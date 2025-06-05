// Heavy calculation Web Worker
self.onmessage = function(e) {
  const { iterations } = e.data;
  
  // Perform the heavy calculation
  let total = 0;
  for (let i = 0; i < iterations; i++) {
    total += i;
    
    // Optionally report progress every million iterations
    if (i % 1000000 === 0 && i > 0) {
      self.postMessage({
        type: 'progress',
        progress: (i / iterations) * 100,
        current: i
      });
    }
  }
  
  // Send the final result
  self.postMessage({
    type: 'complete',
    result: total
  });
}; 