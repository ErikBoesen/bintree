var canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width  = window.innerWidth;
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';
const NODE_SIZE = 30,
      X_SPREAD = 40;
      Y_MARGIN = 40;

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
    this.draw = function(x, y) {
        if (this.leftChild) {
            ctx.fillStyle = 'white';
            ctx.moveTo(x, y);
            ctx.lineTo(x - spread, y + Y_MARGIN);
            this.leftChild.draw(x - this.height * X_SPREAD, y + Y_MARGIN);
        }
        if (this.rightChild) {
            ctx.fillStyle = 'white';
            ctx.moveTo(x, y);
            ctx.lineTo(x + spread, y + Y_MARGIN);
            this.rightChild.draw(x + this.height * X_SPREAD, y + 40);
        }
        ctx.fillStyle = 'white';
        ctx.fillRect(x - NODE_SIZE / 2, y, NODE_SIZE, NODE_SIZE);
        ctx.fillStyle = '#333';
        ctx.fillText(this.value, x, y + 10);
    };
    this.height = null;
    this.calculateHeight = function() {
        if (!this.height) {
            leftHeight = this.leftChild ? this.leftChild.calculateHeight() + 1 : 0;
            rightHeight = this.rightChild ? this.rightChild.calculateHeight() + 1 : 0;
            this.height = Math.max(leftHeight, rightHeight);
        }
        return this.height;
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
for (i = 0; i < 100; i++) {
    tree.insert(Math.floor(Math.random() * 100));
}

function draw(tree) {
    if (!tree.root) {
    }
    tree.root.calculateHeight();
    tree.root.draw(parseInt(window.innerWidth / 2), 20);
    ctx.stroke();
}
draw(tree);
