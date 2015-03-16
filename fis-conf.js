fis.config.merge({
    project: {
        exclude: /^\/build\//i
    },
    pack: {
        'js/wap.js': [
            'library/inobounce.min.js',
            'library/zepto.min.js',
            'library/spin.js',
            'js/main.wap.js'
        ],
        'js/web.js': [
            'library/jquery-1.11.1.min.js',
            'js/main.web.js'
        ]
    },
    modules: {
        postpackager: 'simple'
    }
});