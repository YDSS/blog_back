import express from 'express';
import getNavItems from '../constant/nav_item';

let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    let auth = req.cookies.auth === 'ydss';
    let navItems = getNavItems(auth);

    res.render('index', {
        serverData: JSON.stringify({
            auth: auth,
            navItems: navItems
        })
    });
});

export {router as index};
