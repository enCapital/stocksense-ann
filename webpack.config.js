var path = require('path');

module.exports = {
    // Change to your "entry-point".
    entry: './lib/index',
    watch: true, 
    watchOptions:{
        ignored: '/node_modules/',
        poll: 1000,
        aggregateTimeout: 300
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
                // Include ts, tsx, and js files.
                test: /\.(tsx?)|(js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ], 
    }
};