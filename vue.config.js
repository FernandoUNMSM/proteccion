module.exports = {
    pages: {
        index:{
          entry:"src/main.ts",
          template:"index.html",
          filename:"index.html"
        }
    },
    filenameHashing:false,
    configureWebpack:{
        devtool:'eval-source-map'
    },
    chainWebpack: config =>{

        config.output.filename("js/app.js")
        config.output.chunkFilename("js/chunk-vendor.js")
        config.optimization.minimizer('terser').tap((args)=>{
          args[0].terserOptions.output = {
              ...args[0].terserOptions.output,
              comments: false
          }
          return args
        })
        config.module.
            rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.transformAssetUrls={
                    img:'src',
                    image:'xlink:href',
                    'b-avatar': 'src',
                    'b-img': 'src',
                    'b-img-lazy': ['src', 'blank-src'],
                    'b-card': 'img-src',
                    'b-card-img': 'src',
                    'b-card-img-lazy': ['src', 'blank-src'],
                    'b-carousel-slide': 'img-src',
                    'b-embed': 'src'
                }
                return options;
            })
    },
    transpileDependencies:['vuex-module-decorators']
}