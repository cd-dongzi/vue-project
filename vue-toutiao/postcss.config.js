module.exports = {
  plugins: [
    require("autoprefixer")({
      browsers: ["iOS >= 7", "Android >= 4.1", 'last 5 versions']
    })
  ]
};
