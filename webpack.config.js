const fs = require('fs');
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

/**
 * @type {{SRC: (*|string), DEV: (*|string), BUILD: (*|string), STATIC: string, PUBLIC: string}}
 */
const PATHS = {
    SRC: path.join(__dirname, 'src'),
    DEV: path.join(__dirname, 'dist'),
    BUILD: path.join(__dirname, 'dist'),
    STATIC: 'static/',
};

const DEV_SERVER_POST_DEFAULT = 3000;

/**
 * @type {Object}
 */
const entriesKeys = {
    'common': `${PATHS.SRC}/index.js`,
};

/**
 * @type {Array}
 */
const HtmlWebpackPlugins = [];

/**
 * @type {Array}
 */
const PAGES = fs.readdirSync(PATHS.SRC + '/pages').filter(function (file) {
    return fs.statSync(path.join(PATHS.SRC + '/pages', file)).isDirectory();
});

PAGES.forEach((page) => {
    entriesKeys[page] = `${PATHS.SRC}/pages/${page}/index.js`;
    HtmlWebpackPlugins.push(
        new HTMLPlugin({
            filename: `${page}.html`,
            chunks: ['common', page],
            template: `${PATHS.SRC}/pages/${page}/index.pug`,
            templateName: page,
        })
    );
});

module.exports = (env = {}, options = {}) => {
    /**
     * @constant
     * @type {boolean}
     */
    const isProd = options.mode === 'production';

    /**
     * @constant
     * @type {boolean}
     */
    const isServer = env.server;

    const nameBase = '[name]' + (isProd ? '.[hash]' : '');
    const name = nameBase + '.[ext]';
    const fileNameJs = nameBase + '.js';
    const fileNameCss = nameBase + '.css';

    const jsModules = [
        {
            test: /\.js$/,
            enforce: 'pre',
            include: PATHS.SRC,
            loader: 'eslint-loader',
            options: {
                quiet: true,
            },
        },
    ];

    // HMR in js not work with babel-loader if js file export no function
    // or this function not executing in parent module
    if (!options.hot) {
        jsModules.push({
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
            },
        });
    }

    return {
        entry: entriesKeys,
        output: {
            path: PATHS.BUILD,
            filename: PATHS.STATIC + 'js/' + fileNameJs,
        },
        module: {
            rules: [
                ...jsModules,
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                    minimize: isProd,
                                },
                            }, 'postcss-loader'],
                    }),
                },
                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                    options: {
                        pretty: !isProd,
                    },
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    loader: `url-loader`,
                    issuer: {
                        test: /\.(css|js)$/, // from css and js files
                    },
                    query: {
                        name,
                        publicPath: isServer ? PATHS.STATIC + `img/` : `../img`,
                        outputPath: PATHS.STATIC + `img/`,
                        limit: 4000,
                    },
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    loader: 'url-loader',
                    issuer: {
                        test: /\.html$/, // from html files
                    },
                    query: {
                        name,
                        publicPath: './img',
                        outputPath: 'img/',
                        limit: 4000,
                    },
                },
                {
                    test: /\.(ttf|eot|woff(2)?)$/,
                    loader: 'url-loader',
                    query: {
                        name,
                        publicPath: isServer ? PATHS.STATIC + `fonts/` : `../fonts`,
                        outputPath: PATHS.STATIC + `fonts/`,
                        limit: 4000,
                    },
                },
            ],
        },
        plugins: [
            new CleanPlugin(PATHS.BUILD),
            new ExtractTextPlugin({
                filename: PATHS.STATIC + 'css/' + fileNameCss,
                disable: isServer,
            }),
            ...HtmlWebpackPlugins,
            new webpack.DefinePlugin({
                ENV: env,
            }),
            new webpack.NamedModulesPlugin(),
        ],
        devtool: isProd ? 'source-map' : 'eval',
        devServer: {
            inline: true,
            overlay: true,
            contentBase: PATHS.DEV,
            port: DEV_SERVER_POST_DEFAULT,
            host: '0.0.0.0',
            public: `http://localhost:${DEV_SERVER_POST_DEFAULT}`,
            stats: 'minimal',
        },
    };
};
