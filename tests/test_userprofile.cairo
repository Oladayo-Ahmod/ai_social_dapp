use starknet::ContractAddress;
use starknet::get_caller_address;

use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};

use social_ai::UserProfile::IUserProfileDispatcher;
use social_ai::UserProfile::IUserProfileDispatcherTrait;

fn deploy_contract(name : ByteArray)->ContractAddress{
    let contract = declare(name).unwrap().contract_class();
    let (contract_address,_) = contract.deploy(@ArrayTrait::new()).unwrap();
    contract_address
}

#[test]

fn test_register_user(){
    let contract_address = deploy_contract('UserProfile');
    let dispatcher = IUserProfileDispatcher { contract_address};
    let caller = get_caller_address();

    dispatcher.usernames.entry(caller).write('olami');
    dispatcher.bio.entry(caller).write('a developer');

    assert(dispatcher.usernames.entry(caller).read(), 'olami');
}
