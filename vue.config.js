module.exports = {
  publicPath: '/TTUID-ClassRoom-Rent-System/',
    outputDir: 'docs',
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import "@/scss/style.scss";
                `
          }
      }
  }
}