use starknet::ContractAddress;
use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};

use social_ai::Post::IPostDispatcher;
use social_ai::Post::IPostDispatcherTrait;

// deploy function
fn deploy_contract(name : ByteArray)->ContractAddress{
    let contract = declare(name).unwrap().contract_class();
    let (contract_address,_) = contract.deploy(@ArrayTrait::new()).unwrap();
    contract_address
}

#[test]
fn test_create_post(){
    let contract_address = deploy_contract("Post");
    let dispatcher = IPostDispatcher {contract_address};
    let caller = get_caller_address();
    // create post 
    dispatcher.create_post('a test');

    // retrieve post
    let (author, content, like_count) = dispatcher.get_post(1);

    // assertions
    assert(content == 'a test', 'invalid content');
    assert(like_count == 0, 'wrong likes count');
}