#[starknet::interface]
pub trait IPost<TContractState> {
    fn create_post(ref self: TContractState, content: felt252);
    fn like_post(ref self: TContractState, post_id: felt252);
    fn add_comment(ref self: TContractState, post_id: felt252, comment_id: felt252, comment: felt252);
}

#[starknet::contract]
mod Post {
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use starknet::storage::{
        StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map
    };


    #[storage]
    struct Storage {
        posts: Map<felt252, (ContractAddress, felt252)>, // post_id -> (author, content)
        likes: Map<felt252, u64>,                         // post_id -> like count
        post_comments: Map<(felt252, u64), felt252>,      // (post_id, index) -> comment_id
        comment_details: Map<felt252, (ContractAddress, felt252)>, // comment_id -> (commenter, comment)
        comment_counts: Map<felt252, u64>,    
        posts_count : felt252,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        PostCreated : PostCreated,
        PostLiked : PostLiked,
        CommentAdded : CommentAdded,
    }

    #[derive(Drop, starknet::Event)]
    struct PostCreated {
        post_id: felt252,
        author: ContractAddress,
        content: felt252,
    }

    #[derive(Drop, starknet::Event)]
    struct PostLiked {
        post_id: felt252,
        liker: ContractAddress,
    }

    #[derive(Drop, starknet::Event)]
    struct CommentAdded {
        post_id: felt252,
        comment_id: felt252,
        commenter: ContractAddress,
        comment: felt252,
    }

    #[constructor]
    fn constructor(ref self: ContractState) {
    }

    #[abi(embed_v0)]
    impl PostImpl of super::IPost<ContractState> {
        fn create_post(ref self: ContractState, content: felt252) {
            let caller = get_caller_address();
            let post_id = self.posts_count.read() + 1; // post ID
            // Insert new post and emit event
            self.posts.entry(post_id).write((caller, content));
            self.emit(PostCreated { post_id, author: caller, content });
        }


        fn like_post(ref self: ContractState, post_id: felt252) {
            let caller = get_caller_address();
            // let existing_post = self.posts.entry(post_id).read();

            // Assert that the post exists by checking for non-default value
            // assert(existing_post.0 != ContractAddress::default(), "Post does not exist");

            // Increment like count
            let current_likes = self.likes.entry(post_id).read();
            self.likes.entry(post_id).write(current_likes + 1);

            // Emit like event
            self.emit(PostLiked { post_id, liker: caller });
        }

        fn add_comment(ref self: ContractState, post_id: felt252, comment_id: felt252, comment: felt252) {
            let caller = get_caller_address();
            // let existing_post = self.posts.entry(post_id).read();

            // Ensure the post exists
            // assert(existing_post.0 != ContractAddress::default(), "Post does not exist");
          
            // Retrieve the current count of comments for this post and increment
            let current_count = self.comment_counts.entry(post_id).read();
            self.comment_counts.entry(post_id).write(current_count + 1);

            // Store the comment_id at the next available index in post_comments
            self.post_comments.entry((post_id, current_count)).write(comment_id);

            // Insert comment details in comment_details map
            self.comment_details.entry(comment_id).write((caller, comment));

            // Emit comment event
            self.emit(CommentAdded { post_id, comment_id, commenter: caller, comment });
        }
    }
}
