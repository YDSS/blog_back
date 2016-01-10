const NAV_TYPE = {
    // 指向内部router的链接, 如/edit
    INNER: 0,
    // 指向外部的链接,如http://www.baidu.com
    OUTER: 1,
    // 有子元素的节点
    NO_LEAF: 2
};

const navItems = [
    {
        name: 'HOME',
        icon: 'home',
        type: NAV_TYPE.INNER,
        url: '/home'
    },
    {
        name: 'EDIT',
        icon: 'pencil',
        type: NAV_TYPE.INNER,
        url: '/edit'
    },{
        name: 'DIARY',
        icon: 'book',
        type: NAV_TYPE.NO_LEAF,
        children: [{
            name: 'view',
            url: '/diary/view'
        }, {
            name: 'upload',
            url: '/diary/upload'
        }],
        url: '/diary'
    },
    {
        name: 'TAGS',
        icon: 'tags',
        type: NAV_TYPE.INNER,
        url: '/tag'
    },
    {
        name: 'ABOUT',
        icon: 'question',
        type: NAV_TYPE.INNER,
        url: '/about'
    },
    {
        name: 'GITHUB',
        icon: 'github',
        type: NAV_TYPE.OUTER,
        url: 'http://github.com/YDSS'
    }
];

const authRestrictedList = ['/edit'];
    
/**
 * 获取导航栏列表，非ydss不显示操作相关的item，
 * 如edit
 *
 * @param {boolean} auth 是否为作者（ydss）
 * @return {Array} 导航栏列表
 */
export default function getNavItems(auth) {
    let ret = [];
 
    if (!auth) {
        ret = navItems.filter(item => {
            let flag = true;
            authRestrictedList.map(e => {
                if (e === item.url) {
                    flag = false;
                }
            });

            return flag;
        });
    }
    else {
        ret = navItems;
    }

    return ret;
}

