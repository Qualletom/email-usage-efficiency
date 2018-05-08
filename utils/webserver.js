const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('../webpack.config');
const env = require('./env');
const path = require('path');

require('./prepare_build_folder');

const compiler = webpack(config);

const server =
    new WebpackDevServer(compiler, {
        hot: true,
        contentBase: path.join(__dirname, '../build'),
        headers: { 'Access-Control-Allow-Origin': '*' },
    });

server.listen(env.PORT);
