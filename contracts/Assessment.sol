// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;
    uint256 public investment;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event Returny(uint256 amount);
    event Investy(uint256 amount);

    constructor(uint256 initBalance, uint256 initInvest) payable {
        owner = payable(msg.sender);
        balance = initBalance;
        investment = initInvest;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function getInvest() public view returns(uint256){
        return investment;
    }

    function deposit(uint256 _amount) public payable {
        uint256 _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Deposit(_amount);
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // withdraw the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        emit Withdraw(_withdrawAmount);
    }

    error returnTooHigh(uint256 balance, uint256 multiplier);
    error noneToCollect(uint256 balance, uint256 currentInvestAmt);
    function collectInvest(uint256 _multiplier) public payable{
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        uint _previousInvest = investment;
        if (5 < _multiplier) {
            revert returnTooHigh({
                balance: balance,
                multiplier: _multiplier
            });
        }
        if (investment == 0){
            revert noneToCollect({
                balance: balance,
                currentInvestAmt: investment
            });
        }

        investment *= _multiplier;

        uint investReturn = investment;

        balance += investment;

        investment = 0;

        // assert the balance is correct
        assert(balance == (_previousBalance+investReturn));

        // emit the event
        emit Returny(_multiplier);
    }

    error cantInvest(uint256 balance, uint256 investAmt);
    function investy(uint256 _investAmt) public payable{
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        uint _previousInvest = investment;
        
        if (_investAmt>balance) {
            revert cantInvest({
                balance: balance,
                investAmt: _investAmt
            });
        }

        // withdraw the given amount
        balance -= _investAmt;
        investment += _investAmt;

        // assert the balance is correct
        assert(balance == (_previousBalance-_investAmt));
        assert(investment == (_previousInvest+_investAmt));

        // emit the event
        emit Investy(_investAmt);
    }

}
