export const ABI = [
    {
        "type": "impl",
        "name": "PostImpl",
        "interface_name": "social_ai::Post::IPost"
    },
    {
        "type": "interface",
        "name": "social_ai::Post::IPost",
        "items": [
            {
                "type": "function",
                "name": "create_post",
                "inputs": [
                    {
                        "name": "content",
                        "type": "core::felt252"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "like_post",
                "inputs": [
                    {
                        "name": "post_id",
                        "type": "core::felt252"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "add_comment",
                "inputs": [
                    {
                        "name": "post_id",
                        "type": "core::felt252"
                    },
                    {
                        "name": "comment",
                        "type": "core::felt252"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "get_post",
                "inputs": [
                    {
                        "name": "post_id",
                        "type": "core::felt252"
                    }
                ],
                "outputs": [
                    {
                        "type": "(core::starknet::contract_address::ContractAddress, core::felt252, core::integer::u64)"
                    }
                ],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "get_comment",
                "inputs": [
                    {
                        "name": "post_id",
                        "type": "core::felt252"
                    },
                    {
                        "name": "index",
                        "type": "core::integer::u64"
                    }
                ],
                "outputs": [
                    {
                        "type": "(core::starknet::contract_address::ContractAddress, core::felt252)"
                    }
                ],
                "state_mutability": "external"
            }
        ]
    },
    {
        "type": "constructor",
        "name": "constructor",
        "inputs": []
    },
    {
        "type": "event",
        "name": "social_ai::Post::Post::PostCreated",
        "kind": "struct",
        "members": [
            {
                "name": "post_id",
                "type": "core::felt252",
                "kind": "data"
            },
            {
                "name": "author",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "content",
                "type": "core::felt252",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "social_ai::Post::Post::PostLiked",
        "kind": "struct",
        "members": [
            {
                "name": "post_id",
                "type": "core::felt252",
                "kind": "data"
            },
            {
                "name": "liker",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "social_ai::Post::Post::CommentAdded",
        "kind": "struct",
        "members": [
            {
                "name": "post_id",
                "type": "core::felt252",
                "kind": "data"
            },
            {
                "name": "comment_id",
                "type": "core::felt252",
                "kind": "data"
            },
            {
                "name": "commenter",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "comment",
                "type": "core::felt252",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "social_ai::Post::Post::Event",
        "kind": "enum",
        "variants": [
            {
                "name": "PostCreated",
                "type": "social_ai::Post::Post::PostCreated",
                "kind": "nested"
            },
            {
                "name": "PostLiked",
                "type": "social_ai::Post::Post::PostLiked",
                "kind": "nested"
            },
            {
                "name": "CommentAdded",
                "type": "social_ai::Post::Post::CommentAdded",
                "kind": "nested"
            }
        ]
    }
] as const