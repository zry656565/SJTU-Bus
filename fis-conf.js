fis.config.merge({
    project: {
        exclude: /^\/build\//i
    },
    pack: {
        'js/wap.js': [
            'js/zepto.min.js',
            'js/main.wap.js'
        ],
        'js/web.js': [
            'js/jquery-1.11.1.min.js',
            'js/main.web.js'
        ]
    }
});