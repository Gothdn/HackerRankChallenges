#include<bits/stdc++.h>

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
    int min = 0;
    int max = 0;
    string res = "";

    void topView(Node * root) {
        res =std::to_string(root->data);
        vector<Node> q;
        vector<int> c;
        q.push_back(*root);
        c.push_back(0);
        int bot = 0, top = 1;
        while (bot < top) {
            if (c[bot] < min) {
                min = c[bot];
                res = std::to_string(q[bot].data) + " " + res;
            } else if (c[bot] > max) {
                max = c[bot];
                res = res + " " + std::to_string(q[bot].data);
            }
            if (q[bot].left) {
                top++;
                q.push_back(*q[bot].left);
                c.push_back(c[bot] - 1);
            }
            if (q[bot].right) {
                top++;
                q.push_back(*q[bot].right);
                c.push_back(c[bot] + 1);
            }
            bot++;
        }
        cout << res;
    }

}; //End of Solution
