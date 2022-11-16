# Trainee Assessment Portal

The Trainee Assessment Portal (TAP) is envisioned to be a one-stop portal for both trainees and instructors to archive, monitor and process graded assessments. This project is tended for the fulfillment of the academic requirements of the Software engineering Immersive programme from General Assembly.

## Background

Trainees presently print out a hardcopy assessment form which their instructors will fill up as the session progresses. After the session is completed, trainees will file the assessment form in their training file for archival and for future instructors to view their progress.

Some issues with the present system is that forms may go missing during the course, causing a gap in the trainees' progress, or checks done at the end of the course highlight that some forms were not filled in according to audit standards.

With the current system of hardcopy assessment forms, any kind of processing requires staff to manually tabulate and analyse data to turn it into useful information.

## Description

The TAP's first goal is to reduce the excessive paper usage generated by the training process. While the TAP itself will not be able to achieve this goal, it takes the first step in the digitalisation of the training process. The TAP currently requires trainees to manually input their assessment details into the portal, but the envisioned outcome is for a digital device to be used during the session (instead of the hardcopy form) to input the assessment details directly into the portal.

THe TAP's second goal is to eliminate mistakes made in the process of filling up the assessment forms. The submission form for adding assessments has a comprehensive list of validations to ensure that the assessment details adhere to the strict audit standards. Trainees will not be able to submit the assessment if any of the criteria is not met.

The TAP's third goal is to provide instructors and management the ability to analyse and process the assessment data input by the trainees. The monitoring of a trainee's progress is crucial in providing a tailored training experience. Instructors need to be able to identify a trainee's strengths and weaknesses early on to maximise a trainee's potential. The TAP provides a dashboard with visual representations of both individual and aggregated data (not implemented yet) for instructors and management to easily obtain an overview of the status of training.

## Technologies Used

The TAP is a PERN stack application, utilising ReactTS for the front-end, ExpressJS for the back-end and Postgres for the database. The TAP is hosted in AWS utilising AWS's 12-month free services of EC2 and RDS (not implemented yet).

BCrypt is used for the hashing of passwords while JSONWebToken is used to manage local sessions.

Charts are generated using D3 and their associated libraries.

## Application Structure

Displayed below is the envisioned structure of the application. Components not yet implemented are indicated with a _[not implemented]_ tag.

```
--> Root (/)
    |--> Login (/login)
         |--> Login page for registered users.
         |--> Generates Refresh and Access Tokens. Refresh Token is stored in Local Storage.
         |--> Global states are automatically populated after login.
    |--> Account Creation (/register)
         |--> Account creation with username and password. All accounts are tagged as non-admin by default.
         |--> Counts as a login and thus will generate Refresh and Access Tokens. Refresh Token is stored in Local Storage.
         |--> Global states are automatically populated after account creation.
    |--> Home Dashboard (/home) [not implemented]
         |--> Dashboard Section to indicate a trainee's progress in their selected position. Includes Live-Sim Ratio, Average Grades, Scenario Percentage Completion and Training Deadlines
    |--> Assessments (/assessments)
         |--> Summary
              |--> Position Selector with a dropdown that includes all of the positions the trainee is training in or has trained in.
              |--> 'New Position' button for trainees to add a new position. [not implemented]
              |--> A grade chart is displayed, showing a graph of the trainee's assessments in the selected position.
         |--> Assessments Table
              |--> Tabular display of all the trainee's assessments for the selected position.
              |--> Trainee is able to add new assessments from this page through the 'Add Assessment' button
              |--> Each assessment is displayed as a row in the table. Trainees are able to edit the assessment details or delete the assessment if it is no longer required.
              |--> All available fields will be automatically populated when editing an assessment.
              |--> Validations are present in both 'Add' and 'Edit' modes to ensure proper submission.
              |--> Assessments are sorted by Assessment Number
    |--> Profile (/profile)
         |--> If no profile is detected, the 'Create Profile' view is displayed.
              |--> Trainees are presented with a form to fill up their trainee profile. All fields are required.
         |--> Profile Details Section is split into two views - 'Display' and 'Edit'.
              |--> Display view displays the trainee profile details
              |--> Edit view displays inputs for trainee to edit their profile details and to change their password
                   |--> The password must always be entered twice to save the edited profile
                   |--> Details such as username and rank and name cannot be updated by the user. Can only be edited through the Admin panel.
         |--> Positions Table
              |--> Tabular display of all the trainee's positions
              |--> Trainee is able to add new positions from this page through the 'Add Position' button
              |--> Each position is displayed as a row in the table. Trainees are able to edit the position details or delete the position if it is no longer required.
              |--> Positions are sorted by Start Date.
    |--> Admin Panel (/admin)
         |--> Contains 6 sub-views for Users, User Positions, Ranks, Flights, Positions and CATs.
         |--> Only available to admin accounts.
         |--> Users View
              |--> Contains Rank, Name, Username, Password and a flag for Admin status. All fields are editable.
              |--> Password is null by default. If a null password is submitted, it will not be changed.
              |--> Admins will not be able to delete their own account.
         |--> User Positions View - contains Rank, Name, Position, Approval Date and a flag for Instructor status. All fields less Rank and Name are editable.
         |--> Ranks View
              |--> Contains all Ranks.
              |--> Ranks are sorted alphabetically.
              |--> Deleting a rank will set all users with said rank to 'null'. Users will have to manually set their new rank.
         |--> Positions View
              |--> Contains all Positions.
              |--> Positions are sorted alphabetically.
              |--> Deleting a position will set all users with said position to 'null'. Users will have to manually set their new position.
         |--> Flights View
              |--> Contains all Flights.
              |--> Flights are sorted alphabetically.
              |--> Deleting a flight will set all users with said flight to 'null'. Users will have to manually set their new flight.
         |--> CATs View
              |--> Contains all CATs.
              |--> CATs are sorted alphabetically.
              |--> Deleting a CAT will set all users with said CAT to 'null'. Users will have to manually set their new CAT.
    |--> Logout (/logout)
         |--> Logs the user out and redirects them to the Login screen.
         |--> Removes the Refresh Token from Local Storage and resets all global states.
```

## Feature List

1. **Language Select** _(Currently not implemented)_

   - Four option buttons for users to select
   - One option must be selected before the user can proceed
   - Page can be skipped if the user has previously logged in

2. **Login Page**

   - Both username and password inputs must be filled up before the `login` button is enabled
   - An error in submission will be reflected as an `invalid username or password`
   - Users have the option to sign up for a new account from the login page

3. **Account Creation**

   - **User Group Selection**

     - Options for migrant workers, donors and volunteers
     - Selection of an option determines the account creation process for the user group

   - **Donor Account Creation**

     - Only consists of User Account Creation

   - **Migrant Worker Account Creation**

     - Split into User Account Creation and Migrant Worker Profile Creation

     - **User Account Creation**

       - Required fields are clearly labelled upon load
       - Front-end validation to ensure the correct password is submitted
       - Back-end validation to ensure the username has not been taken already

     - **Profile Creation**
       - Various input fields for the creation of the migrant worker's profile
       - Required fields are clearly labelled upon load
       - All required fields must be filled in before the users are able to proceed to the next page

4. **Home Page**

   - **Donate Home Page**
     - Options for donors to click on donate button to proceed with donation process
     - Selection of an option will bring up modals to thank and provide donation info

5. **Donation Request**

   - **Donate Donate dashboard**

     - Options for donors to click on item category to donate. The top 4 categories are dynamic and mapped through a dataset that can be modified based on requirement.
     - A clear card shows the items that are currently low in quantity and are in high demand. Sorted based on status. This card is also dynamic and mapped through a dataset that can be modified based on requirement. If an item has low quantity, the color changes accordingly during display.
     - An information icon that can be clicked to provide users with more information on what the status of items mean (through modal)

   - **Donate Location**

     - Users are directed to choose the location to donate their items to (NSEW) via a drop down option menu. Upon selection of area, this will filter volunteer data to the specific areas
     - Visual Maps with clickable location pins will appear for users to choose
     - Drop off information - Volunteer information will be filtered, mapped and displayed. This will include dynamic data such as available time and contact details.
     - All required fields must be selected before the users are able to proceed to the next page

   - **Donate Items Step 1**

     - Once the location and drop off details are confirmed, users will be directed to the donate items step 1 page where users will select a generic category of items they wish to donate (generic layer). This is displayed in a grid format and is dynamic and not hardcoded, allowing the team to change the categories more easily in the future. All required fields must be selected before the users are able to proceed to the next page.

   - **Donate Items Step 2**

     - Once the generic category has been chosen, users will now be directed to the second layer of selection to choose a more specific item to donate (detailed layer). This new category is filtered data based on Donate Items 1 selection, mapped and displayed accordingly in a grid format.
     - Upon selecting the detailed category, users will be directed to a new page (component) to select item details through onclick buttons which set the states for required body values that create backend data through POST method.
     - Users can also choose to upload photo of the items. Currently hardcoded the photo upload to pull specific images from imgur, based on what user has selected.

   - **Donate Confirmation**

     - Once the user submits the application, they will be directed to a page to confirm submission, as well as option to donate a new item or view overall application.

   - **Donate Application**

     - Finally in the donate application tab/page, users get an overview of the donated items pending review through images and texts. This is displayed through a Donate Application Card. The Donate Application Card will fetch the data from the backend. Users can also delete specific item data in the Backend through the DELETE method. Subsequently mapping and displaying the data through text and photo.

6. **Item Request**

- **Item Application**

  - A pre-set list of categories is available for users to select. Selection will present specific items for the user to add to their cart
  - A text input field is included as an option for users to use in the event they are unable to find the requested item amongst the pre-set list of items
  - In the event the user is unable to find the item within the pre-set list and is unable to adequately describe the item in the text input field, a photo upload option is available for them to upload a photo representing the item they would like to request for

- **Item Cart**

  - Displays the requested items as individual cards, along with the estimated waiting time for the item
  - Edit and Delete options are available for each card
  - An `Add Another` button is included for users to return to the Item Application page to add another item
  - Up to three items can be added to cart (or depending on the remaining number of requests left for the user) and the `Add Another` button will be removed when the limit is reached
  - The `Proceed to Delivery` button will navigate to the Delivery Method page

- **Delivery Method**

  - Includes a summary of requested items and their wait times
  - Last page for users to delete items from their cart before checking out
  - Users can select either delivery or self-pickup
  - The `Next` button will navigate to the confirmation page

- **Confirmation**

  - Includes a summary of requested items and their wait times
  - For a delivery option, the user's details will be populated from their profile (users will still be able to edit the information if they so wish to)
  - For a self-pickup option, IRR's warehouse address will be populated
  - The `Confirm & Apply` button will submit the item requests and if successful, navigate to the Success Page

- **Success**

  - Informs the user that their item application has been submitted
  - Users can then navigate to the Applications page to view all their item requests or return to the Item Application page to start a new application

## Back-end (Server)

The backend repository used for this project can be found at [its-raining-raincoat-backend](https://github.com/maybelline-ang/its-raining-raincoat-backend). The technologies used for the backend are: Node.js, Express, MongoDB & Atlas, Mongoose, UUID, and Bcrypt.

### Back-end Repository Structure

- `server.js` is the entry point to our application, it defines our express server
- `db/db.js` connects our application to our MongoDB Atlas database
- `routes/` contains the route definitions for our API
- `controllers/` contains the controller definitions used in our routes
- `models/` contains the schema definitions for our Mongoose models

### Routes

There are 4 files in the `routes/` folder. Each file contains route definitions to Create, Read, Update, Delete (CRUD) different aspects of the application.

- `donateItem.js` to CRUD donated items selected by the Donor persona. The controllers used are defined in `controllers/donateItem.js`
- `itemRequestRouter.js` to CRUD the requested items selected by the Worker persona. The controllers used are defined in `controllers/itemRequestController.js`
- `userRouter.js` to create and to login user accounts (includes both Worker and Donor persona). The controllers used are defined in `controllers/userController.js`
- `workerProfileRouter.js` to CRUD the accounts and profiles for the Worker persona. The controllers used are defined in `controllers/workerProfileController.js`

### Models

There are 4 models in the `models/` folder. Each file contains Mongoose schema definitions.

- `DonateItems.js` for creating a new donated item, with details filled in by the Donor persona
- `ItemRequest.js` for creating a new requested item, with details filled in by the Worker persona
- `Users.js` for creating a new user account (includes both Donor and Worker accounts)
- `WorkerProfiles.js` for creating a new worker profile, taking in details filled in when a worker creates an account

## Potential Future Implementations

- **Interactive Map for Donor Location Selection**
- **Photo Upload for Item Donations and Item Requests**
- **Volunteer Workflows**

## Issues Faced

- Many repeated components (code is not DRY)
- No standardised implementation of certain features
