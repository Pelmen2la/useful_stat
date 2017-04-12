module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-nested'),
        require('postcss-mixins'),
        require('postcss-simple-vars'),
        require('autoprefixer'),
        require('postcss-easings'),
        require('cssnext'),
    ]
}