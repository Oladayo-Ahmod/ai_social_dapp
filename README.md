

# AI-Based Decentralized Social Network

A decentralized, AI-powered social networking platform built on Starknet using Cairo language. This project leverages blockchain technology to enable a secure, user-friendly social media environment with unique features, including user-generated content, decentralized moderation, and NFT-based identity.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Smart Contracts](#smart-contracts)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [License](#license)

## Introduction

This project is a decentralized social network where users can register, create posts, like, and comment, while also benefiting from decentralized moderation to flag inappropriate content. By utilizing AI-powered analytics, the platform provides a secure, censorship-resistant, and transparent experience that enhances traditional social media models.

## Features

- **User Profiles**: Decentralized and unique NFT-based user profiles.
- **Content Creation**: Decentralized post creation, liking, and commenting.
- **Moderation**: Community-based moderation where users can flag inappropriate content.
- **Interoperability**: Designed to be extendable for integrations with other Starknet-based dApps.

## Smart Contracts

The platform is powered by four main smart contracts:

1. **UserProfile.cairo**: Manages user registration and profile data.
2. **Post.cairo**: Handles the creation, liking, and commenting of posts.
3. **Moderation.cairo**: Manages moderation features, allowing users to flag inappropriate posts.
4. **lib.cairo**: Central controller contract, responsible for managing the interactions between the other three contracts.

Each contract is written in Cairo language and optimized for Starknet, ensuring scalable and gas-efficient transactions.

## Project Structure

```
├── src
│   ├── UserProfile.cairo   # Manages user profiles
│   ├── Post.cairo          # Handles posts, likes, and comments
│   ├── Moderation.cairo    # Manages content moderation
│   └── lib.cairo          # Main controller contract
├── tests
│   ├── test_UserProfile.cairo
│   ├── test_Post.cairo
│   ├── test_Moderation.cairo
│   └── test_Lib.cairo
├── Scarb.toml              # Scarb configuration file
└── README.md               # Project README
```

## Getting Started

To get started, ensure you have [Scarb](https://docs.scarlabs.tech/) installed on your local machine. Scarb is used to compile, test, and deploy Cairo projects on Starknet.

### Prerequisites

- **Scarb**: The Cairo package manager for Starknet projects. Follow the [installation guide](https://docs.scarlabs.tech/getting-started).

### Installation

Clone this repository and navigate into the project directory:

```bash
git clone https://github.com/Oladayo-Ahmod/ai_social_dapp.git
cd ai_social_dapp
```

### Building the Project

Run the following command to build the contracts:

```bash
scarb build
```

### Testing

To run tests for each contract, execute:

```bash
scarb test
```

### Deployment

To deploy the contracts on the Starknet testnet or mainnet, configure your network in `Scarb.toml` and run:

```bash
scarb deploy
```

## Usage

1. **User Registration**: Register new users by calling functions in the `UserProfile` contract.
2. **Create Post**: Registered users can create posts using functions from the `Post` contract.
3. **Moderation**: Users can flag inappropriate posts via functions in the `Moderation` contract.
4. **Interactions**: All contract interactions are managed through the `Lib` contract.

Each function is documented within the code for easy interaction.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or need further assistance with this project!