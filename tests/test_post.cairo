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
    // create post 
    dispatcher.create_post('a test');

    // retrieve post
    let (author, content, like_count) = dispatcher.get_post(1);

    // assertions
    assert(content == 'a test', 'invalid content');
    assert(like_count == 0, 'wrong likes count');
}

#[test]
fn test_like_post(){
    let contract_address = deploy_contract("Post");
    let dispatcher = IPostDispatcher {contract_address};

    dispatcher.create_post('simple post');
    dispatcher.like_post(1);

    let (_,content,like_count) = dispatcher.get_post(1);

    assert(like_count == 1, 'wrong likes count');

}

#[test]
fn test_add_comment(){
    let contract_address = deploy_contract("Post");
    let dispatcher = IPostDispatcher {contract_address};

    dispatcher.create_post('simple post');
    dispatcher.add_comment(1,'awesome');

    let (commenter, comment) = dispatcher.get_comment(1,0);

    assert(comment == 'awesome', 'invalid post');
}