## mongodb.js
Module mongodb.js is like a api for the database.
Which uses mogoose library for the database operations.

The code is a Node.js module that interacts with a MongoDB database using Mongoose. It includes models for images, dates and establishes a connection to the database with the given URI.

## Functionality:

### Database Connection:
- establishes a connection to a MongoDB database using Mongoose.


### Operations for Dates:
- **saveDates**: Saves new date entries if they don’t already exist.
- **insertManyDates**: Inserts multiple new date entries if they don’t already exist.
- **updateDates**: Updates existing date entries with new items.
- **deleteDates**: Deletes date entries based on an ID.
- **getDates**: Retrieves date entries for a specific ID.
- **getAllDateSets**: Retrieves all date entries.
 
### Image Operations:

- **saveImage**: Attempts to save a new image entry to the database if it doesn't already exist. Returns `true` if successful, `false` otherwise.

- **getImage**: Retrieves an image entry from the database based on its ID, excluding certain fields from the result.

- **getAllImages**: Searches for all image entries that match a given search pattern, performing a case-insensitive search and excluding 
specific fields.

- **deleteImage**: Deletes an image entry from the database based on its ID and returns the outcome of this operation.

Each function includes error handling to manage exceptions during database operations.
