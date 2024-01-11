/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function nodesLength(nodes: ListNode, deep: number = 1){
    return nodes.next === null ? deep : nodesLength(nodes.next, deep + 1);
}

function pushNode(head: ListNode, node: ListNode){
    
    if(!head) return head;

    if(head?.next === null){
        head.next = node;
        return head;
    }

    return pushNode(head?.next, node);
}


function cutNodes(head: ListNode | null, size: number, deep: number = 1, tail = new ListNode()) {
    if (deep === 1)
        tail.val = head.val;
    else if(deep <= size){
        pushNode(tail, new ListNode(head.val));
    }

    return head?.next === null || deep === size
        ? [tail, head.next]
        : cutNodes(head.next, size, deep + 1, tail);
}

function rotateRight(head: ListNode | null, k: number): ListNode | null {
    const nodesLength_ = nodesLength(head, 1);
    const [tail,head_] = cutNodes(head, k % nodesLength_, 1);
    pushNode(head_, tail);

    return head_;
};