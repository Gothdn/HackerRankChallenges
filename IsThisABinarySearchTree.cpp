/* Hidden stub code will pass a root argument to the function below. Complete the function to solve the challenge. Hint: you may want to write one or more helper functions.  

The Node struct is defined as follows:
	struct Node {
		int data;
		Node* left;
		Node* right;
	}
*/
    vector<int> arr;
    void checkBranch(Node* root) {
        if (root == NULL) {
            return;
        }
        checkBranch(root->left);
        arr.push_back(root->data);
        checkBranch(root->right);
    }
    
	bool checkBST(Node* root) {
        checkBranch(root);
        for (int i = 1; i < arr.size(); i++) {
            if (arr[i] <= arr[i - 1]) {
                return false;
            }
        }
		return true;
	}
