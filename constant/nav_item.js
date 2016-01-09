const navItems = [
    {
        name: 'HOME',
        icon: 'home',
        url: '/home'
    },
    {
        name: 'EDIT',
        icon: 'pencil',
        url: '/edit'
    },{
        name: 'DIARY',
        icon: 'book',
        url: '/diary'
    },
    {
        name: 'TAG',
        icon: 'tags',
        url: '/tag'
    },
    {
        name: 'ABOUT',
        icon: 'question',
        url: '/about'
    },
    {
        name: 'GITHUB',
        icon: 'github',
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

