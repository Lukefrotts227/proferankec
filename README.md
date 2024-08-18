# ProfessorRank

ProfessorRank is a web app that allows students to search for professors based on rankings, the classes they teach, and the universities they are affiliated with. Students can also review professors based on several criteria, providing valuable feedback for others.

## Features

- **Search Functionality:** Users can search for professors and courses. Courses are assigned to schools, meaning a single professor can teach multiple courses from different schools.
- **Review System:** Authenticated users can write reviews. Reviews use a 5-star rating system for various aspects of the course and include a comment section for additional feedback.

## Technology

This application is built with plain JavaScript using the Next.js framework. Prisma is used as an ORM, and the backend is powered by a PostgreSQL database. For user authentication, OAuth and NextAuth are employed. On the frontend, Headless UI and the react-rating package are utilized to enhance the user experience.

## Why this Tech Stack?

- **Next.js:** Ideal for easy deployment, serving as both the frontend and backend. It also offers server-side rendering for better SEO, and Server Components are utilized to improve performance.
- **Prisma:** Integrates well with Next.js and provides a safe, easy-to-use interface for working with SQL databases.
- **PostgreSQL:** A reliable, scalable relational database that pairs well with Prisma for data management.

## How to Set It Up on Your Machine

If you're only interested in checking out the app, visit the site online.

To test and edit it on your own machine, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Lukefrotts227/proferankec.git
   cd proferankec
   ```

2. **Install Dependencies:**
   Ensure you have Node.js installed. Then, run:
   ```bash
   npm install
   ```

3. **Set Up the Database:**
   You have two options for setting up the database:

   - **Option 1: PostgreSQL** (Recommended)
     - Make sure PostgreSQL is installed and running on your machine. Create a new database and configure the connection in the `.env` file:
       ```plaintext
       DATABASE_URL="postgresql://username:password@localhost:5432/professorrank"
       ```
     - Ensure the `provider` in your `schema.prisma` file is set to `postgresql`:
       ```prisma
       datasource db {
         provider = "postgresql"
         url      = env("DATABASE_URL")
       }
       ```

   - **Option 2: SQLite** (For a simpler setup)
     - If you prefer a lighter setup, you can use SQLite. In the `.env` file, set the `DATABASE_URL` to:
       ```plaintext
       DATABASE_URL="file:./dev.db"
       ```
     - Change the `provider` in your `schema.prisma` file to `sqlite`:
       ```prisma
       datasource db {
         provider = "sqlite"
         url      = env("DATABASE_URL")
       }
       ```

4. **Run Migrations:**
   Set up the database schema using Prisma:
   ```bash
   npx prisma migrate dev
   ```

5. **Seed the Database (Optional):**
   If you want to populate the database with initial data, run: 
   ```bash
   npx prisma db seed
   ```
   Feel free to edit the seed file to customize the data.

6. **Start the Development Server:**
   Run the app locally:
   ```bash
   npm run dev
   ```

   Your application should now be running on `http://localhost:3000`.

## What's Next?

- **In Progress:**
  - Handling backend edge cases. 
  - Beautifying and making the UI more unique. 
  - A section at the top of the professor page that includes the overall rating for the course.
  - Analytics for an entire course, pooling all the individual professor ratings associated with a given course.

- **On the Agenda:**
  - A summary comment at the top of the professor page to provide a general idea of the professor.
  - More user authentication options.
  - Switching over to TypeScript if the project grows to a size where it becomes necessary.
