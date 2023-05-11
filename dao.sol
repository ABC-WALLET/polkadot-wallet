// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DAO {
    // Define variables
    address public owner;
    mapping(address => uint) public shares;
    uint public totalShares;
    mapping(address => bool) public canVote;
    uint public minimumVotes;

    struct Proposal {
        uint id;
        string description;
        uint votesFor;
        uint votesAgainst;
        bool executed;
    }

    Proposal[] public proposals;
    uint public proposalCount;

    // Define events
    event ProposalAdded(uint proposalId);
    event Voted(uint proposalId, bool inFavor, address voter);
    event ProposalExecuted(uint proposalId);

    // Constructor function
    constructor() {
        owner = msg.sender;
        totalShares = 100;
        shares[owner] = totalShares;
        minimumVotes = totalShares / 2 + 1;
    }

    // Add proposal function
    function addProposal(string memory description) public {
        require(shares[msg.sender] > 0, "You do not have any shares.");
        proposals.push(Proposal({
            id: proposalCount,
            description: description,
            votesFor: 0,
            votesAgainst: 0,
            executed: false
        }));
        proposalCount++;
        emit ProposalAdded(proposalCount - 1);
    }

    // Vote function
    function vote(uint proposalId, bool inFavor) public {
        require(canVote[msg.sender], "You are not allowed to vote.");
        require(!proposals[proposalId].executed, "This proposal has already been executed.");
        if (inFavor) {
            proposals[proposalId].votesFor += shares[msg.sender];
        } else {
            proposals[proposalId].votesAgainst += shares[msg.sender];
        }
        emit Voted(proposalId, inFavor, msg.sender);
    }

    // Execute proposal function
    function executeProposal(uint proposalId) public {
        require(proposals[proposalId].votesFor >= minimumVotes, "Not enough votes.");
        require(!proposals[proposalId].executed, "This proposal has already been executed.");
        proposals[proposalId].executed = true;
        emit ProposalExecuted(proposalId);
    }

    // Add member function
    function addMember(address newMember) public {
        require(msg.sender == owner, "Only the owner can add members.");
        shares[newMember] = 1;
        canVote[newMember] = true;
        totalShares++;
        minimumVotes = totalShares / 2 + 1;
    }
}
