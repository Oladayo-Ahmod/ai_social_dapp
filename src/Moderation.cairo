#[starknet::interface]
pub trait IModeration<TContractState> {
    fn flag_post(ref self: TContractState, post_id: felt252);
}

#[starknet::contract]
mod Moderation {
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map
    };
    use starknet::ContractAddress;
    use starknet::get_caller_address;



    #[storage]
    struct Storage {
        flags: Map<felt252, u64>, // post_id -> flag count
    } 

    #[event]
    #[derive(Drop, starknet::Event)]

    enum Event {
        PostFlagged: PostFlagged,
        PostRemoved: PostRemoved,
    }

    #[derive(Drop, starknet::Event)]
    struct PostFlagged {
        post_id: felt252,
        flagger: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct PostRemoved {
        post_id: felt252,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
        // Constructor logic if needed
    }

    #[abi(embed_v0)]
    impl ModerationImpl of super::IModeration<ContractState> { 
        fn flag_post(ref self: ContractState, post_id: felt252) {
            let caller = get_caller_address();
            let current_flags = self.flags.entry(post_id).read();
            self.flags.entry(post_id).write(current_flags + 1);
            self.emit(PostFlagged { post_id, flagger: caller });

            // Remove post if flags reach a threshold (e.g., 10)
            if current_flags + 1 >= 10 {
                // Logic to remove the post
                self.emit(PostRemoved { post_id });
            }
        }
    }
}
