# User management

## Setup Instructions

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Agbo-Frank/user-management.git
   ```

2. Navigate to the project directory:
   ```sh
   cd user-management
   ```

3. Install dependencies:
   ```sh
   npm install
   ```
   or using yarn:
   ```sh
   yarn install
   ```

### Environment Configuration

1. Create a `.env` file in the root directory and add necessary environment variables:
   ```sh
   cp .env.example .env
   ```

2. Update the `.env` file with your database and other necessary configurations.

### Database Setup

1. Run migrations to set up the database:
   ```sh
   npm run migrate:up
   ```

2. (Optional) Seed the database with initial data:
   ```sh
   npm run seed
   ```

### Running the Project

#### Development
Start the development server:
   ```sh
   npm run dev
   ```

#### Production
Build and start the project:
   ```sh
   npm run build
   npm start
   ```

### Running Tests
Run tests using Jest:
   ```sh
   npm run test
   ```

### API Documentation
If your project has API documentation, you can access it via:
   ```sh
   https://documenter.getpostman.com/view/17567046/2sAYdkFTJP
   ```

### Contributing
1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

### License
This project is licensed under [MIT License](LICENSE).

