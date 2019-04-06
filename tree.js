var canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width  = window.innerWidth;
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
const NODE_SIZE = 30;

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
    this.draw = function(x, y, spread) {
        ctx.fillStyle = 'white';
        ctx.fillRect(x - NODE_SIZE / 2, y, NODE_SIZE, NODE_SIZE);
        ctx.fillStyle = '#333';
        ctx.fillText(this.value, x, y + 10);
        if (this.leftChild)   this.leftChild.draw(x - spread, y + 40, spread / 2);
        if (this.rightChild) this.rightChild.draw(x + spread, y + 40, spread / 2);
    }
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
    if (!tree.root) {
    }
    tree.root.draw(parseInt(window.innerWidth / 2), 20, 40);
}
draw(tree);
