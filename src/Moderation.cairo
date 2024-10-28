#[starknet::interface]
pub trait IModeration<TContractState> {
    fn flag_post(ref self: TContractState, post_id: felt252);
}

#[starknet::contract]
mod Moderation {
    #[storage]
    struct Storage {
        flags: Dict<felt252, u64>, // post_id -> flag count
    }

    #[event]
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
            let current_flags = self.flags.get(post_id).unwrap_or(0);
            self.flags.insert(post_id, current_flags + 1);
            self.emit(PostFlagged { post_id, flagger: caller });

            // Remove post if flags reach a threshold (e.g., 10)
            if current_flags + 1 >= 10 {
                // Logic to remove the post
                self.emit(PostRemoved { post_id });
            }
        }
    }
}
