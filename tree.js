var canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width  = window.innerWidth;
var ctx = canvas.getContext('2d');

function Leaf(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
    this.addLeaf = function(leaf) {
        if (leaf.value < this.value) {
            if (this.leftChild === null) {
                this.leftChild = leaf;
            } else {
                this.leftChild.addLeaf(leaf);
            }
        } else if (leaf.value >= this.value) {
            if (this.rightChild === null) {
                this.rightChild = leaf;
            } else {
                this.rightChild.addLeaf(leaf);
            }
        }
    };
}
function Tree() {
    this.root = null;
    this.insert = function(value) {
        if (this.root === null) {
            this.root = new Leaf(value);
        } else {
            this.root.addLeaf(new Leaf(value));
        }
    };
}

var tree = new Tree();
tree.insert(3);
tree.insert(44);
tree.insert(32);

function draw(tree) {
    if (tree.root) {

    }
}
