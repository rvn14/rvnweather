// Ensure this file is executed in a Node.js environment
(function() {
  var module = module || {};
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    };
  }
})();
