import { isUrl } from '../utils/utils';

const authority = (groupName) => {
  return function (currentAuthority) {
    let groupArr = groupName;
    if (groupName.constructor.name === 'String') {
      groupArr = groupName.split(',');
    }

    console.log(currentAuthority);
    for (let i = 0, l = groupArr.length; i < l; i += 1) {
      if (currentAuthority.split(',').indexOf(groupArr[i]) > -1) {
        return true;
      }
    }
  };
};
const menuData = [{
  name: 'home',
  icon: 'home',
  path: 'home',
}, {
  name: '权限管理',
  icon: 'solution',
  path: 'auth',
  authority: authority('admin'),
  children: [{
    name: '用户管理',
    icon: 'user',
    path: 'users',
  }, {
    name: '用户组管理',
    icon: 'team',
    path: 'group',
  }, {
    name: '功能模块管理',
    icon: 'solution',
    path: 'modules',
  }],
}, {
  name: 'demo',
  icon: 'book',
  path: 'demo',
  // hideInMenu: true,
  children: [
    {
      name: 'dashboard',
      icon: 'dashboard',
      path: 'dashboard',
      children: [{
        name: '分析页',
        path: 'analysis',
      }, {
        name: '监控页',
        path: 'monitor',
      }, {
        name: '工作台',
        path: 'workplace',
        // hideInMenu: true,
      }],
    }, {
      name: '表单页',
      icon: 'form',
      path: 'form',
      children: [{
        name: '基础表单',
        path: 'basic-form',
      }, {
        name: '分步表单',
        path: 'step-form',
      }, {
        name: '高级表单',
        path: 'advanced-form',
      }],
    }, {
      name: '列表页',
      icon: 'table',
      path: 'list',
      children: [{
        name: '查询表格',
        path: 'table-list',
      }, {
        name: '标准列表',
        path: 'basic-list',
      }, {
        name: '卡片列表',
        path: 'card-list',
      }, {
        name: '搜索列表',
        path: 'search',
        children: [{
          name: '搜索列表（文章）',
          path: 'articles',
        }, {
          name: '搜索列表（项目）',
          path: 'projects',
        }, {
          name: '搜索列表（应用）',
          path: 'applications',
        }],
      }],
    }, {
      name: '详情页',
      icon: 'profile',
      path: 'profile',
      children: [{
        name: '基础详情页',
        path: 'basic',
      }, {
        name: '高级详情页',
        path: 'advanced',
      }],
    }, {
      name: '结果页',
      icon: 'check-circle-o',
      path: 'result',
      children: [{
        name: '成功',
        path: 'success',
      }, {
        name: '失败',
        path: 'fail',
      }],
    }, {
      name: '异常页',
      icon: 'warning',
      path: 'exception',
      children: [{
        name: '403',
        path: '403',
      }, {
        name: '404',
        path: '404',
      }, {
        name: '500',
        path: '500',
      }, {
        name: '触发异常',
        path: 'trigger',
      }],
    }, {
      name: '使用文档',
      icon: 'book',
      path: 'http://pro.ant.design/docs/getting-started',
      target: '_blank',
    },
  ],
}];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
