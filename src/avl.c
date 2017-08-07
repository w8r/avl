#include <stdlib.h>
#include <memory.h>
#include "avl_tree.h"
#include <stdio.h>

void traverse(AvlTreeNode* node)
{
  if(node)
  {
    traverse(node->left);
    printf("%d ", *(int*)node->data);
    traverse(node->right);
  }
}

void printTree(AvlTree* tree)
{
  AvlTreeNode* node = tree->root;
  traverse(node);
  printf("\n");
}

void avlTreeNodeInit(AvlTreeNode* node, AvlTreeNode* parent, AvlTreeNode* left, AvlTreeNode* right, void* data)
{
  node->parent = parent;
  node->left = left;
  node->right = right;
  node->data = data;
  node->balanceFactor = 0;
}

AvlTreeNode* avlTreeCreateNode(AvlTreeNode* parent, AvlTreeNode* left, AvlTreeNode* right, void* data)
{
  AvlTreeNode* node = (AvlTreeNode*)malloc(sizeof(AvlTreeNode));
  avlTreeNodeInit(node, parent, left, right, data);
  return node;
}

void avlTreeInit(AvlTree* tree, AvlCompareFunction compareFunction)
{
  tree->compareFunction = compareFunction;
  tree->root = 0;
}

void avlTreeDestroy(AvlTree* tree)
{
  avlTreeNodeDestroy(tree->root);
  tree->root = 0;
}

void avlTreeNodeDestroy(AvlTreeNode* node)
{
  if(node)
  {
    avlTreeNodeDestroy(node->left);
    avlTreeNodeDestroy(node->right);
    free(node);
  }
}

int avlTreeContain(AvlTree* tree, void* data)
{
  if(tree->root)
  {
    AvlTreeNode* node = tree->root;
    while(node)
    {
      int result = tree->compareFunction(data, node->data);
      if(result == 0)
      {
        return 1;
      }
      else if(result == -1)
      {
        node = node->left;
      }
      else
      {
        node = node->right;
      }
    }
  }
  return 0;
}

void avlTreeAdd(AvlTree* tree, void* data)
{
  if(avlTreeContain(tree, data))
  {
    return;
  }

  if(!tree->root)
  {
    tree->root = avlTreeCreateNode(0, 0, 0, data);
    return;
  }

  AvlTreeNode* node = tree->root;
  AvlTreeNode* parent = 0;
  int c = 0;
  while(node)
  {
    c = tree->compareFunction(data, node->data);
    parent = node;
    if(c == -1)
    {
      node = node->left;
    }
    else
    {
      node = node->right;
    }
  }

  AvlTreeNode* newNode = avlTreeCreateNode(parent, 0, 0, data);
  if(c == -1)
  {
    parent->left = newNode;
  }
  else
  {
    parent->right = newNode;
  }

  while(parent)
  {
    if(tree->compareFunction(parent->data, data) == -1)
    {
      parent->balanceFactor -= 1;
    }
    else
    {
      parent->balanceFactor += 1;
    }

    if(parent->balanceFactor == 0)
    {
      break;
    }
    else if(parent->balanceFactor == -2)
    {
      AvlTreeNode* newRoot = avlTreeRightBalance(parent);
      if(parent == tree->root)
      {
        tree->root = newRoot;
      }
      break;
    }
    else if(parent->balanceFactor == 2)
    {
      AvlTreeNode* newRoot = avlTreeLeftBalance(parent);
      if(parent == tree->root)
      {
        tree->root = newRoot;
      }
      break;
    }

    parent = parent->parent;
  }
}

AvlTreeNode* avlTreeSuccessor(AvlTreeNode* node)
{
  AvlTreeNode* sucessor = node->right;

  while(sucessor && sucessor->left)
  {
    sucessor = sucessor ->left;
  }

  return sucessor;
}

AvlTreeNode* avlTreePrecusor(AvlTreeNode* node)
{
  AvlTreeNode* precursor = node->left;
  while(precursor && precursor->right)
  {
    precursor = precursor->right;
  }

  return precursor;
}

void avlTreeDelete(AvlTree* tree, void* data)
{
  if(!tree->root)
  {
    return;
  }

  if(!avlTreeContain(tree, data))
  {
    return;
  }

  AvlTreeNode* node = tree->root;

  while(node)
  {
    int result = tree->compareFunction(data, node->data);
    if(result == 0)
    {
      break;
    }
    else if(result == -1)
    {
      node = node->left;
    }
    else
    {
      node = node->right;
    }
  }


  if(node->left)
  {
    AvlTreeNode* max = node->left;

    while(max->left || max ->right)
    {
      while(max->right)
      {
        max = max->right;
      }
      node->data = max->data;
      if(max->left)
      {
        node = max;
        max = max->left;
      }
    }
    node->data = max->data;
    node = max;
  }

  if(node->right)
  {
    AvlTreeNode* min = node->right;

    while(min->left || min->right)
    {
      while(min->left)
      {
        min = min->left;
      }
      node->data = min->data;
      if(min->right)
      {
        node = min;
        min = min->right;
      }
    }
    node->data = min->data;
    node = min;
  }



  AvlTreeNode* parent = node->parent;
  AvlTreeNode* pp = node;
  while(parent)
  {
    //int result = tree->compareFunction(node->data, parent->data);
    //if(result == -1)
    if(parent->left == pp)
    {
      parent->balanceFactor -= 1;
    }
    else
    {
      parent->balanceFactor += 1;
    }

    if(parent->balanceFactor == -2)
    {
      AvlTreeNode* newRoot = avlTreeRightBalance(parent);
      if(parent == tree->root)
      {
        tree->root = newRoot;
      }
      parent = newRoot;
    }
    else if(parent->balanceFactor == 2)
    {
      AvlTreeNode* newRoot = avlTreeLeftBalance(parent);
      if(parent == tree->root)
      {
        tree->root = newRoot;
      }
      parent = newRoot;
    }

    if(parent->balanceFactor == -1 || parent->balanceFactor == 1)
    {
      break;
    }

    pp = parent;
    parent = parent->parent;
  }

  if(node->parent)
  {
    if(node->parent->left == node)
    {
      node->parent->left = 0;
    }
    else
    {
      node->parent->right = 0;
    }
  }

  if(node == tree->root)
  {
    tree->root = 0;
  }

  free(node);
}

AvlTreeNode* avlTreeLeftRotate(AvlTreeNode* node)
{
  AvlTreeNode* rightNode = node->right;

  node->right = rightNode->left;
  if(rightNode->left)
  {
    rightNode->left->parent = node;
  }

  rightNode->parent = node->parent;
  if(rightNode->parent)
  {
    if(rightNode->parent->left == node)
    {
      rightNode->parent->left = rightNode;
    }
    else
    {
      rightNode->parent->right = rightNode;
    }
  }

  node->parent = rightNode;
  rightNode->left = node;

  node->balanceFactor += 1;
  if(rightNode->balanceFactor < 0)
  {
    node->balanceFactor -= rightNode->balanceFactor;
  }

  rightNode->balanceFactor += 1;
  if(node->balanceFactor > 0)
  {
    rightNode->balanceFactor += node->balanceFactor;
  }
  return rightNode;
}

AvlTreeNode* avlTreeRightRotate(AvlTreeNode* node)
{
  AvlTreeNode* leftNode = node->left;

  node->left = leftNode->right;
  if(node->left)
  {
    node->left->parent = node;
  }

  leftNode->parent = node->parent;
  if(leftNode->parent)
  {
    if(leftNode->parent->left == node)
    {
      leftNode->parent->left = leftNode;
    }
    else
    {
      leftNode->parent->right = leftNode;
    }
  }

  node->parent = leftNode;
  leftNode->right = node;

  node->balanceFactor -= 1;
  if(leftNode->balanceFactor > 0)
  {
    node->balanceFactor -= leftNode->balanceFactor;
  }

  leftNode->balanceFactor -= 1;
  if(node->balanceFactor < 0)
  {
    leftNode->balanceFactor += node->balanceFactor;
  }

  return leftNode;
}

AvlTreeNode* avlTreeLeftBalance(AvlTreeNode* node)
{
  if(node->left->balanceFactor == -1)
  {
    avlTreeLeftRotate(node->left);
  }

  return avlTreeRightRotate(node);
}

AvlTreeNode* avlTreeRightBalance(AvlTreeNode* node)
{
  if(node->right->balanceFactor == 1)
  {
    avlTreeRightRotate(node->right);
  }

  return avlTreeLeftRotate(node);
}

void verifyBalanceFactor(AvlTreeNode* node)
{
  if(node)
  {
    int lh = avlTreeHeight(node->left);
    int rh = avlTreeHeight(node->right);
    if(node->balanceFactor != (lh - rh))
    {
      printf("Unmatch balance factor for %d left height %d right height %d current bf %d node %d.\n", *(int*)(node->data), lh, rh, lh - rh, node->balanceFactor);
    }

    verifyBalanceFactor(node->left);
    verifyBalanceFactor(node->right);
  }

}

int max(int a ,int b)
{
  if(a >= b)
  {
    return a;
  }
  else
  {
    return b;
  }
}

int avlTreeHeight(AvlTreeNode* node)
{
  if(!node)
  {
    return 0;
  }
  else
  {
    return max(avlTreeHeight(node->left), avlTreeHeight(node->right))+ 1;
  }
}
