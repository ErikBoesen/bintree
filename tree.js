var canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width  = window.innerWidth;
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';
const NODE_SIZE = 20,
      X_SPREAD = 4;
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
            endX = x - this.height * Math.pow(2, X_SPREAD);
            endY = y + Y_MARGIN;
            ctx.lineTo(endX, endY);
            this.leftChild.draw(endX, endY);
        }
        if (this.rightChild) {
            ctx.fillStyle = 'white';
            ctx.moveTo(x, y);
            endX = x + this.height * Math.pow(2, X_SPREAD);
            endY = y + Y_MARGIN;
            ctx.lineTo(endX, endY);
            this.rightChild.draw(endX, endY);
        }
        ctx.fillStyle = 'white';
        ctx.fillRect(x - NODE_SIZE / 2, y, NODE_SIZE, NODE_SIZE);
        ctx.fillStyle = '#333';
        //ctx.fillText(this.value, x, y + 10);
        ctx.fillText(this.height, x, y + 10);
    };
    this.height = null;
    this.calculateHeight = function() {
        if (!this.height) {
            leftHeight = this.leftChild ? (this.leftChild.calculateHeight() + 1) : 0;
            rightHeight = this.rightChild ? (this.rightChild.calculateHeight() + 1) : 0;
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
for (i = 0; i < 50; i++) {
    tree.insert(Math.floor(Math.random() * 100));
}

function draw(tree) {
    if (!tree.root) {
    }
    console.log(tree.root.calculateHeight());
    tree.root.draw(parseInt(window.innerWidth / 2), 20);
    ctx.stroke();
}
draw(tree);
