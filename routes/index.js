var express = require('express');
var router = express.Router();

var pagesOpts = {
    index: {
        title: 'Главная страница',
        pageType: 'home'
    },
    'test-page': {
        title: 'Тестовая страница',
        pageType: 'test-page'
    }
};

router.get('/', function (req, res) {
    res.render('index', pagesOpts['index']);
});

/* GET pages */
router.get('/:page', function (req, res) {
    if (!pagesOpts.hasOwnProperty(req.params.page)) {
        res.status(404);
        res.render('error', {
            message: 'Page &laquo;' + req.params.page + '&raquo; not found',
            error: {
                status: '404',
                stack: 'Not found'
            }
        });
        return false;
    }
    res.render(req.params.page, pagesOpts[req.params.page]);
});

module.exports = router;
