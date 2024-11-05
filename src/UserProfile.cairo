#[starknet::interface]
pub trait IUserProfile<TContractState> {
    fn register_user(ref self: TContractState, username: felt252, bio: felt252);
    fn update_profile(ref self: TContractState, username: felt252, bio: felt252);
    fn get_user_profile(self: @TContractState) -> (felt252, felt252);
}

#[starknet::contract]
mod UserProfile {
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map
    };

    #[storage]
    struct Storage {
        usernames: Map<ContractAddress, felt252>, // Map for usernames
        bios: Map<ContractAddress, felt252>, 
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        UserRegistered: UserRegistered,
        ProfileUpdated: ProfileUpdated,
    }

    #[derive(Drop, starknet::Event)]
    struct UserRegistered {
        user: ContractAddress,
        username: felt252,
    }

    #[derive(Drop, starknet::Event)]
    struct ProfileUpdated {
        user: ContractAddress,
        username: felt252,
        bio: felt252,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        // Initialize the dictionary in storage
        // self.profiles = Felt252Dict::new();
    }

    #[abi(embed_v0)]
    impl UserProfileImpl of super::IUserProfile<ContractState> {
        fn register_user(ref self: ContractState, username: felt252, bio: felt252) {
            let caller = get_caller_address();
            // let caller_hash = hash(caller); 
            let existing_username = self.usernames.entry(caller).read(); // Access dictionary using `read`

            assert(existing_username == 0_felt252, 'User already registered');

            // Write username and bio to respective maps
            self.usernames.entry(caller).write(username);
            self.bios.entry(caller).write(bio);

            self.emit(UserRegistered { user: caller, username });
        }

        fn update_profile(ref self: ContractState, username: felt252, bio: felt252) {
            let caller = get_caller_address();

            let existing_username = self.usernames.entry(caller).read(); // Access dictionary using `read`

            assert(existing_username != 0, 'User not registered');

             // Update username and bio in respective maps
            self.usernames.entry(caller).write(username);
            self.bios.entry(caller).write(bio);

            self.emit(ProfileUpdated { user: caller, username, bio });
        }

        fn get_user_profile(self: @ContractState) -> (felt252, felt252) {
            let caller = get_caller_address();
             // Read username and bio from storage maps, return (0, 0) if not found
             let username = self.usernames.entry(caller).read();
             let bio = self.bios.entry(caller).read();
             (username, bio) // Return default if not found
        }
    }
}