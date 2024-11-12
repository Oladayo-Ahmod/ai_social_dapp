export const ABI = [
    {
        "type": "impl",
        "name": "UserProfileImpl",
        "interface_name": "social_ai::UserProfile::IUserProfile"
    },
    {
        "type": "interface",
        "name": "social_ai::UserProfile::IUserProfile",
        "items": [
            {
                "type": "function",
                "name": "register_user",
                "inputs": [
                    {
                        "name": "username",
                        "type": "core::felt252"
                    },
                    {
                        "name": "bio",
                        "type": "core::felt252"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "update_profile",
                "inputs": [
                    {
                        "name": "username",
                        "type": "core::felt252"
                    },
                    {
                        "name": "bio",
                        "type": "core::felt252"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "get_user_profile",
                "inputs": [],
                "outputs": [
                    {
                        "type": "(core::felt252, core::felt252)"
                    }
                ],
                "state_mutability": "view"
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
        "name": "social_ai::UserProfile::UserProfile::UserRegistered",
        "kind": "struct",
        "members": [
            {
                "name": "user",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "username",
                "type": "core::felt252",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "social_ai::UserProfile::UserProfile::ProfileUpdated",
        "kind": "struct",
        "members": [
            {
                "name": "user",
                "type": "core::starknet::contract_address::ContractAddress",
                "kind": "data"
            },
            {
                "name": "username",
                "type": "core::felt252",
                "kind": "data"
            },
            {
                "name": "bio",
                "type": "core::felt252",
                "kind": "data"
            }
        ]
    },
    {
        "type": "event",
        "name": "social_ai::UserProfile::UserProfile::Event",
        "kind": "enum",
        "variants": [
            {
                "name": "UserRegistered",
                "type": "social_ai::UserProfile::UserProfile::UserRegistered",
                "kind": "nested"
            },
            {
                "name": "ProfileUpdated",
                "type": "social_ai::UserProfile::UserProfile::ProfileUpdated",
                "kind": "nested"
            }
        ]
    }
] as const