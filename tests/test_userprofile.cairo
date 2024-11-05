use starknet::ContractAddress;
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
    let contract_address = deploy_contract("UserProfile");
    let dispatcher = IUserProfileDispatcher { contract_address};
   
    // Register user with a username and bio
    dispatcher.register_user('olami','lover');

   // Retrieve the profile to confirm registration
   let (username, bio) = dispatcher.get_user_profile();

//    println!("Registered Username: {:?}", username);
//    println!("Registered Bio: {:?}", bio);

   // Assertions
   assert(username == 'olami', 'Username should match');
   assert(bio == 'lover', 'Bio should match');
}

#[test]
fn test_update_profile(){
    let contract_address = deploy_contract("UserProfile");
    let dispatcher = IUserProfileDispatcher { contract_address};

     // Register user with a username and bio
    dispatcher.register_user('olami','lover');
    // update user
    dispatcher.update_profile('adunni','babe');

    // Retrieve the profile to confirm update
    let (username, bio) = dispatcher.get_user_profile();
    // Assertions
    assert(username == 'adunni', 'Username should match');
    assert(bio == 'babe', 'Bio should match');
}
