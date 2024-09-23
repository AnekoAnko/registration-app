# Event Registration App

The application for registration is developed on node.js/react with the ability to view future events and register for them + view event participants

## Technologies

- **Frontend**: React
- **Backend**: Node.js
- **Database**: PostgreSQL

### Base Level

1. **Events Board Page**: 
   - Users can view a paginated list of available events.
   - Each event consists of:
     - Title
     - Description
     - Event Date
     - Organizer

2. **Event Registration Page**:
   - Users can navigate to the event registration page by clicking the "Register" button.
   - The registration form includes the following fields:
     - Full Name
     - Email
     - Date of Birth
     - "Where did you hear about this event?"
   - Upon form submission, the response is stored in the database.

3. **Event Participants Page**:
   - Implement an event participants page where users can see a list of registered participants.
   - This page is accessible by clicking the "View" button.

### Middle Level

- **Events Board Page**:
  - Users can now sort events by title, event date, and organizer.
  
- **Event Registration Page**:
  - Form validation has been added with specific requirements for field validity.
  
- **Event Participants Page**:
  - Users can now search participants by full name and email.
