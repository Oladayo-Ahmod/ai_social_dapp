export const ABI = [
    {
        "type": "impl",
        "name": "ModerationImpl",
        "interface_name": "social_ai::Moderation::IModeration"
    },
    {
        "type": "interface",
        "name": "social_ai::Moderation::IModeration",
        "items": [
            {
                "type": "function",
                "name": "flag_post",
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
                "name": "get_flag",
                "inputs": [
                    {
                        "name": "post_id",
                        "type": "core::felt252"
                    }
                ],
                "outputs": [
                    {
                        "type": "core::integer::u64"
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
        "name": "social_ai::Moderation::Moderation::PostFlagged",
        "kind": "struct",
        "members": [
            {
                "name": "post_id",
                "type": "core::felt252",
                "kind": "data"
            },
            {
                "name": "flagger",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "social_ai::Moderation::Moderation::PostRemoved",
        "kind": "struct",
        "members": [
            {
                "name": "post_id",
                "type": "core::felt252",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "social_ai::Moderation::Moderation::Event",
        "kind": "enum",
        "variants": [
            {
                "name": "PostFlagged",
                "type": "social_ai::Moderation::Moderation::PostFlagged",
                "kind": "nested"
            },
            {
                "name": "PostRemoved",
                "type": "social_ai::Moderation::Moderation::PostRemoved",
                "kind": "nested"
            }
        ]
    }
] as const