use starknet::ContractAddress;
use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};

use social_ai::Moderation::IModerationDispatcher;
use social_ai::Moderation::IModerationDispatcherTrait;
use social_ai::Post::IPostDispatcher;
use social_ai::Post::IPostDispatcherTrait;

// deploy function
fn deploy_contract(name : ByteArray)->ContractAddress{
    let contract = declare(name).unwrap().contract_class();
    let (contract_address,_) = contract.deploy(@ArrayTrait::new()).unwrap();
    contract_address
}

#[test]
fn test_flag_post(){
    let contract_address = deploy_contract("Post");
    let post_dispatcher = IPostDispatcher {contract_address};
    let moderation_dispatcher = IModerationDispatcher { contract_address};

     // create post 
     post_dispatcher.create_post('a test');
    // flag post
    moderation_dispatcher.flag_post(1);
    // get flagged post
    let flag_count = moderation_dispatcher.get_flag(1);
    println!("flag count : {:?}", flag_count);
}