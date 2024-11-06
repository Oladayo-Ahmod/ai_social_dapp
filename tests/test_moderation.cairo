use starknet::ContractAddress;
use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};

use social_ai::Moderation::IModerationDispatcher;
use social_ai::Moderation::IModerationDispatcherTrait;

// deploy function
fn deploy_contract(name : ByteArray)->ContractAddress{
    let contract = declare(name).unwrap().contract_class();
    let (contract_address,_) = contract.deploy(@ArrayTrait::new()).unwrap();
    contract_address
}

#[test]
fn test_flag_post(){
    let contract_address = deploy_contract("Moderation");
    let dispatcher = IModerationDispatcher { contract_address};

    // flag post
    dispatcher.flag_post(1);
    // get flagged post
    let flag_count = dispatcher.get_flag(1);

    assert(flag_count == 1, 'invalid flag post');
    // println!("flag count : {:?}", flag_count);
}