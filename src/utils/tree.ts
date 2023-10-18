import { cloneDeep, isArray } from 'lodash-es';

interface TreeNode {
  [key: string | number]: unknown | TreeNode[];
}

/**
 * @description 将树平铺为数组
 * @param { object } tree 数据
 * @param { String } children 树形结构关联的属性
 */

function getTreeMap(tree: any[], children = 'children'): any[] {
  if (!Array.isArray(tree)) return [];

  let result: any[] = [];

  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    result.push(node);

    if (node[children] && node[children].length) {
      result = result.concat(getTreeMap(node[children], children));
    }
  }

  return result;
}

/**
 * @description 将数组变成tree非递归
 * @param {*} arr
 * @param {*} nodeKey 节点标识
 * @param {*} parentKey 父节点标识
 * @param {*} children 子节点属性
 * @returns
 */
function arrayToTree<T>(
  arr: T,
  nodeKey = 'id',
  parentKey = 'parentId',
  children = 'children',
) {
  const result: TreeNode[] = [];

  if (!Array.isArray(arr) || arr.length === 0) {
    return result;
  }

  const map: { [key: string | number]: TreeNode } = {};

  arr.forEach((item) => (map[item[nodeKey] as string | number] = item));
  arr.forEach((item) => {
    const parent = map[item[parentKey] as string | number];

    if (parent) {
      ((parent[children] || (parent[children] = [])) as TreeNode[]).push(item);
      return;
    }

    result.push(item);
  });
  return result;
}

/**
 * @description 查找节点在树中的路径
 * @param {*} tree 树的数据
 * @param {*} id 查找的id
 * @param {*} nodeKey 节点标识符
 * @param {*} children 子节点标识
 * @returns
 */
const getNodePath = (
  tree: any[],
  id: string | number,
  nodeKey = 'id',
  children = 'children',
): (string | number)[] => {
  if (!Array.isArray(tree) || tree.length === 0) {
    return [];
  }

  const path: (string | number)[] = [];

  const treeFindPath = (
    tree: TreeNode[],
    id: string | number,
    path: (string | number)[],
  ): (string | number)[] => {
    for (const item of tree) {
      path.push(item[nodeKey] as string | number);

      if (item[nodeKey] === id) return path;

      if (item[children]) {
        const findChildren = treeFindPath(
          item[children] as TreeNode[],
          id,
          path,
        );

        if (findChildren.length) {
          return findChildren;
        }
      }

      path.pop();
    }

    return [];
  };

  return treeFindPath(tree, id, path);
};

/**
 * @description 模糊匹配树
 * @param {*} arr 树数据
 * @param {*} value  匹配的数据
 * @param {*} nameKey 查询的属性
 * @param {*} children 子节点属性
 * @returns
 */
const fuzzyQueryTree = (
  arr: TreeNode[],
  value: unknown,
  nameKey = 'name',
  children = 'children',
): any[] => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }

  const result: TreeNode[] = [];

  arr.forEach((item) => {
    if ((item[nameKey] as string).indexOf(value as string) > -1) {
      const childrenNode = fuzzyQueryTree(
        item[children] as TreeNode[],
        value,
        nameKey,
        children,
      );
      const obj = { ...item, childrenNode };
      result.push(obj);
      return;
    }

    if ((item[children] as TreeNode[]).length > 0) {
      const childrenNode = fuzzyQueryTree(
        item[children] as TreeNode[],
        value,
        nameKey,
        children,
      );
      const obj = { ...item, childrenNode };

      if (childrenNode && childrenNode.length > 0) {
        result.push(obj);
      }
    }
  });

  return result;
};

/**
 * @description 精确匹配树
 * @param {*} tree 树数据
 * @param {*} value  匹配的数据
 * @param {*} nameKey 查询的属性
 * @param {*} children 子节点属性
 */
function exactMatchTree<T>(
  tree: T,
  func: (node: TreeNode) => boolean,
  children = 'children',
): TreeNode | null {
  if (!Array.isArray(tree) || tree.length === 0) {
    return null;
  }

  for (const data of tree) {
    if (func(data)) return data;

    if (data[children]) {
      const result = exactMatchTree(
        data[children] as TreeNode[],
        func,
        children,
      );

      if (result) return result;
    }
  }

  return null;
}

/**
 * @description 对树节点的属性进行操作
 * @param {Array} tree 树节点数据
 * @param { Function } callBack 回调函数
 * @param { string } children 子节点
 * @returns
 */
const operationAttrToNodes = (
  tree: any[],
  callback: (node: TreeNode) => void,
  children = 'children',
) => {
  tree.forEach((item: TreeNode) => {
    callback(item);

    if ((item[children] as TreeNode[])?.length > 0) {
      operationAttrToNodes(item[children] as TreeNode[], callback, children);
    }
  });

  return tree;
};

/**
 * @description 筛选树并返回新树
 * @param tree
 * @param filterFn
 * @param children
 * @returns
 */
export function filterTree<T>(
  tree: T[],
  filterFn: (node: T) => boolean,
  children = 'children',
) {
  let stashTree = tree;
  if (!tree) return null;

  // eslint-disable-next-line no-param-reassign
  if (!isArray(tree)) stashTree = [tree];

  return stashTree.reduce((acc: T[], node) => {
    const newNode = { ...node };

    const childrenList = filterTree((newNode as any)[children] || [], filterFn);

    if (filterFn(newNode) || childrenList?.length) {
      (newNode as any)[children] = childrenList;

      acc.push(newNode as any);
    }

    return acc;
  }, []);
}

interface ModifyTreeKeysProps {
  tree: any;
  keyMap: Record<string, string>;
  modifier: (node: any) => void;
  skipKeys?: string[];
}
/**
 * @description  自定义树形结构的相关属性
 * @param obj
 * @param keyMap
 * @returns
 */
export function modifyTreeKeys({
  tree,
  keyMap,
  modifier,
  skipKeys,
}: ModifyTreeKeysProps): any {
  if (!tree || typeof tree !== 'object') return tree;

  const newObj: any = {};

  // eslint-disable-next-line guard-for-in
  for (let key in tree) {
    if (skipKeys && skipKeys.includes(key)) {
      newObj[key] = tree[key];
      continue;
    }

    if (key in keyMap) {
      newObj[keyMap[key]] = modifyTreeKeys({
        tree: tree[key],
        keyMap,
        modifier,
        skipKeys,
      });
      continue;
    }

    newObj[key] = modifyTreeKeys({
      tree: tree[key],
      keyMap,
      modifier,
      skipKeys,
    });
  }

  if (modifier) {
    modifier(newObj);
  }

  return newObj;
}

/**
 * @description 递归遍历树
 * @param {Array} tree 树节点数据
 * @param { Function } callBack 回调函数
 * @param { string } children 子节点
 * @returns
 */
const traversalTree = (
  tree: TreeNode[],
  callback: (node: TreeNode) => boolean,
  children = 'children',
) => {
  tree.forEach((item: TreeNode) => {
    callback(item);

    if ((item[children] as TreeNode[])?.length > 0) {
      operationAttrToNodes(item[children] as TreeNode[], callback, children);
    }
  });

  return tree;
};

/**
 * @description 删除树的空节点
 * @param {*} tree 数据
 * @param {*} children children = children
 * @returns
 */
function removeEmptyChildren<T>(tree: T[], children = 'children'): T[] {
  tree.forEach((item: any) => {
    if ((item[children] as TreeNode[])?.length === 0) {
      delete item[children];
      return;
    }

    if ((item[children] as TreeNode[]).length > 0) {
      removeEmptyChildren(item[children] as TreeNode[]);
    }
  });

  return tree;
}

/**
 * @description 获取所有的叶子节点
 * @param {*} tree
 * @param {*} children
 * @returns
 */
const getAllLeaf = (tree: TreeNode[], children = 'children') => {
  if (!Array.isArray(tree) || tree.length === 0) {
    return [];
  }

  const result: TreeNode[] = [];
  const getLeaf = (tree: TreeNode[]) => {
    tree.forEach((item: TreeNode) => {
      if ((item[children] as TreeNode[]).length === 0) {
        result.push(item);
        return;
      }

      if ((item[children] as TreeNode[]).length > 0) {
        getLeaf(item[children] as TreeNode[]);
      }
    });
  };

  getLeaf(tree);
  return result;
};

interface DfsFilterTree {
  tree: TreeNode[];
  ope?: (node: TreeNode, depth?: number) => void | null;
  filter: (node: TreeNode) => boolean;
  defaultChildren?: string;
  editChildren?: string;
}

/**
 * @description 筛选过滤树
 * @param { Array } tree 树
 * @param { Function } ope 对属性进行操作
 * @param { Function } filter 筛选函数
 * @param { String } defaultChildren 默认的遍历key
 * @param { string } editChildren 修改之后的便利key
 * @returns
 */
const dfsFilterTree = ({
  tree,
  ope,
  filter,
  defaultChildren = 'children',
  editChildren = 'children',
}: DfsFilterTree) => {
  if (!tree?.length) return [];

  const childrenKey = editChildren || defaultChildren;

  const walkAndCopy = (treeNode: TreeNode, depth = 1) => {
    if (filter(treeNode)) {
      const copy = (
        ope ? cloneDeep(ope(treeNode, depth)) : cloneDeep(treeNode)
      ) as TreeNode;

      if (treeNode[defaultChildren]) {
        copy[defaultChildren] = null;

        copy[childrenKey] = (treeNode[defaultChildren] as TreeNode[])
          .map((node: TreeNode) => walkAndCopy(node, depth + 1))
          .filter((subTree) => (subTree as unknown as TreeNode[])?.length > 0);
      }

      return copy;
    }
  };

  return tree
    .map((treeNode: TreeNode) => walkAndCopy(treeNode))
    .filter(
      (node) =>
        node &&
        ((node[childrenKey] as unknown as TreeNode[])?.length || filter(node)),
    );
};

export {
  getTreeMap,
  getNodePath,
  fuzzyQueryTree,
  operationAttrToNodes,
  removeEmptyChildren,
  getAllLeaf,
  arrayToTree,
  dfsFilterTree,
  traversalTree,
  exactMatchTree,
};
