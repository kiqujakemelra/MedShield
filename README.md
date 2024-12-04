# MedShield

MedShield is a blockchain-based platform for managing health insurance and medical records securely and transparently.

## Features

- Decentralized storage for health records and insurance policies
- Immutable and transparent record-keeping
- Blockchain-powered data persistence with StableBTreeMap
- API endpoints for managing health records and insurance policies

## Installation

### Prerequisites

- Node.js (version 20 or later)
- DFX (Internet Computer SDK)

### Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/medshield.git
    cd medshield
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the DFX project:
    ```bash
    dfx start
    ```

4. Deploy the canister:
    ```bash
    dfx deploy
    ```

5. Run the application:
    ```bash
    npm run dev
    ```

## API Endpoints

### Health Records
- **POST** `/health-records`: Create a new health record
- **GET** `/health-records`: Retrieve all health records
- **GET** `/health-records/:id`: Retrieve a specific health record by ID
- **PUT** `/health-records/:id`: Update a health record by ID
- **DELETE** `/health-records/:id`: Delete a health record by ID

### Insurance Policies
- **POST** `/insurance-policies`: Create a new insurance policy
- **GET** `/insurance-policies`: Retrieve all insurance policies
- **GET** `/insurance-policies/:id`: Retrieve a specific insurance policy by ID

## License

This project is licensed under the MIT License.
