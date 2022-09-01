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
/*
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
*/

    void levelOrder(Node * root) {
        vector<Node> q;
        q.push_back(*root);
        int bot = 0, top = 1;
        while (bot < top) {
            cout << q[bot].data << " ";
            if (q[bot].left) {
                top++;
                q.push_back(*q[bot].left);
            }
            if (q[bot].right) {
                top++;
                q.push_back(*q[bot].right);
            }
            bot++;
        }
    }

}; //End of Solution
