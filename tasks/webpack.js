import path    from 'path'
import webpack from 'webpack'
import process from 'process'

const isProduction = (process.env.NODE_ENV === 'production')

let config = {

    // I would recommend using different config variables
    // depending on the eviroment.
    // The package 'webpack-merge' can help with that.
    // This tenary setup is just for simplicity sake.
    entry: isProduction ? {
        main: './js/main.js'
    } : {
        main: [
            './js/main.js',
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client'
        ]
    },

    output: {
        filename: './js/bundle.js',
        path: path.resolve(__dirname, '../site')

    },

    context: path.resolve(__dirname, '../site'),

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        }
    },

    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    },

    plugins: isProduction ? [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin()
    ] : [
        new webpack.HotModuleReplacementPlugin()
    ]
}


function scripts() {

    return new Promise(resolve => webpack(config, (err, stats) => {

        if(err) console.log('Webpack', err)

        console.log(stats.toString({ /* stats options */ }))

        resolve()
    }))
}

module.exports = { config, scripts }
