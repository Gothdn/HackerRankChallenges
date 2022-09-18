#include <bits/stdc++.h>

using namespace std;

class Node {
    public:
        int data;
        Node *left;
        Node *right;
        Node(int d) {
            data = d;
            left = NULL;
            right = NULL;
        }
};

class Solution {
    public:
  		Node* insert(Node* root, int data) {
            if(root == NULL) {
                return new Node(data);
            } else {
                Node* cur;
                if(data <= root->data) {
                    cur = insert(root->left, data);
                    root->left = cur;
                } else {
                    cur = insert(root->right, data);
                    root->right = cur;
               }

               return root;
           }
        }

/*The tree node has data, left child and right child 
class Node {
    int data;
    Node* left;
    Node* right;
};

*/
  
    Node *lca(Node *root, int v1,int v2) {
		Node * cur = root;
        if (v1 > v2) {
            int t = v2;
            v2 = v1;
            v1 = t;
        }
        //cout << cur->data;
        while (!(v1 <= cur->data && cur->data <= v2)) {
            //cout << cur->data;
            if (v1 < cur->data) {
                cur = cur->left;
            } else {
                cur = cur->right;
            }
        }
        return cur;
    }

}; //End of Solution
