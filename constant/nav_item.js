import {cloneDeep} from 'lodash/Lang'; 

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

const restrictedList = ['/edit', '/diary/upload'];
    
/**
 * 获取导航栏列表，非ydss不显示操作相关的item，
 * 如edit
 *
 * @param {boolean} auth 是否有权限(cookie中有auth=ydss)
 * @return {Array} 导航栏列表
 */
export default function getNavItems(auth) {
    let ret = [];
    // 深拷贝，每次请求都会重新计算
    let copyItems = cloneDeep(navItems);
 
    if (!auth) {
        copyItems.map(item => iterateNavItems(item, ret));
    }
    else {
        ret = navItems;
    }

    return ret;
}

/**
 * 遍历导航栏列表，去掉受限制的item
 *
 * @param {Object} node 列表中的节点，只有叶子节点和非叶子节点之分，
 *  type为NAV_TYPE.NO_LEAF则表示有子节点,
 *  最多只有2层
 */
function iterateNavItems(node, result) {
    // node是否在受限列表中
    if (restrictedList.every(item => item !== node.url)) {
        // 如果node有子节点，则对子节点进行过滤
        if (node.type === NAV_TYPE.NO_LEAF) {
            node = filterChildren(node.children, node);
        }

        node && result.push(node);
    }
}

/**
 * 过滤子节点中受限制的item
 *
 * @param {Array} children 子节点集合
 * @param {Object} parent 父节点
 * @return {Object} 过滤子节点之后的父节点
 */
function filterChildren(children, parent) {
    let newChildren = children.filter(child => {
        return restrictedList.every(item => item !== child.url);
    });

    // 若过滤之后已没有子节点，则把该子节点的父节点去掉
    if (!newChildren.length) {
        return null;
    }

    parent.children = newChildren;
    return parent;
}
