// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

/*
What is a VendingMachine? What are the functions of this VendingMachine?
Functions:
1. Purchase
2. Restock
3. Get balance
State variables:
1. owner
2. balance
3. amount
*/


contract VendingMachine {
    event Purchase (address indexed purchaser, uint256 amount);

    address public owner; // The owner of the contract (coke vending machine)
    mapping(address => uint) public cokeBalance; // The balance of the vending machine

    constructor() {
        owner = msg.sender; // The owner of the contract
        cokeBalance[address(this)] = 500; // The balance of the vending machine
    }

       function purchase(uint amount) public payable {
        require(msg.value >= amount * 2 ether, "You must pay at least 2 ether per coke");
        require(cokeBalance[address(this)] >= amount, "Not enough coke in stock to fulfill purchase request");
        cokeBalance[msg.sender] += amount; // buyer's balance
        cokeBalance[address(this)] -= amount; // owner's balance
        emit Purchase(msg.sender, amount);
    }

    function getVendingMachineBalance() public view returns(uint) {
        return cokeBalance[address(this)];
    }

    function restock(uint amount) public {
        require(msg.sender == owner, "Only owner can restock this vending machine!!");
        cokeBalance[address(this)] += amount;
    
    }

 

}