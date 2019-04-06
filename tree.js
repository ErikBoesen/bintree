var canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width  = window.innerWidth;
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';
const NODE_SIZE = 20,
      X_SPREAD = 4;
      Y_MARGIN = 40;

function Node(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
    this.addNode = function(node) {
        if (node.value < this.value) {
            if (this.leftChild === null) {
                this.leftChild = node;
            } else {
                this.leftChild.addNode(node);
            }
        } else if (node.value >= this.value) {
            if (this.rightChild === null) {
                this.rightChild = node;
            } else {
                this.rightChild.addNode(node);
            }
        }
    };
    this.draw = function(x, y) {
        if (this.leftChild) {
            ctx.fillStyle = 'white';
            ctx.moveTo(x, y + NODE_SIZE / 2);
            endX = x - this.height * Math.pow(X_SPREAD, 2);
            endY = y + Y_MARGIN;
            ctx.lineTo(endX, endY + NODE_SIZE / 2);
            this.leftChild.draw(endX, endY);
        }
        if (this.rightChild) {
            ctx.fillStyle = 'white';
            ctx.moveTo(x, y + NODE_SIZE / 2);
            endX = x + this.height * Math.pow(X_SPREAD, 2);
            endY = y + Y_MARGIN;
            ctx.lineTo(endX, endY + NODE_SIZE / 2);
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
    };
}
function Tree() {
    this.root = null;
    this.insert = function(value) {
        if (this.root === null) {
            this.root = new Node(value);
        } else {
            this.root.addNode(new Node(value));
        }
    };
    this.draw = function() {
        if (this.root) {
            this.root.calculateHeight();
            this.root.draw(parseInt(window.innerWidth / 2), 20);
            ctx.stroke();
        }
    };
}

var tree = new Tree();
for (i = 0; i < 50; i++) {
    tree.insert(Math.floor(Math.random() * 100));
}

tree.draw();
