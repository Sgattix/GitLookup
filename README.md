# GitLookup

GitLookup is a React web application that allows users to search for GitHub users and view their repositories, details, and more. It utilizes the GitHub API to fetch user data and repositories.

## Features

- Search for GitHub users
- View user details
- List user repositories
- Responsive design
- Pagination for repositories
- Error handling for API requests
- Loading states for better user experience

## Technologies Used

- React
- Chakra UI
- NodeFetch
- GitHub API

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sgattix/GitLookup.git
   cd GitLookup
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Edit the utils.ts file to include your GitHub API token:
   ```typescript
   const TOKEN = "your_github_api_token_here";
   ```
   Replace `'your_github_api_token_here'` with your actual GitHub API token. You can generate a token from your GitHub account settings under Developer settings.
   Make sure to keep this token secure and do not expose it in public repositories.
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. Enter a GitHub username in the search bar.
2. Click the search button or press Enter.
3. View the user details and their repositories.
4. Use pagination to navigate through the repositories.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the GitHub API for providing the data.
- Special thanks to the open-source community for their contributions and support.

## Contact

For any questions or feedback, please contact the project maintainer at [alessandro.sgattoni20@gmail.com](mailto:alessandro.sgattoni20@gmail.com)

## Screenshots

![Default State](https://i.postimg.cc/c1h8M6P9/immagine-2025-06-09-184851855.png)
![User General Infos](https://i.postimg.cc/sD8P7vhF/immagine-2025-06-09-185006220.png)
![User Repositories & Details](https://i.postimg.cc/jdK29KYW/immagine-2025-06-09-185047816.png)
