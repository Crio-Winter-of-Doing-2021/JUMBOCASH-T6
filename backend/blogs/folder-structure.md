# Folder Structure

## Advantages

1. Easily add any feature, without changing the implementation of dependent function.
2. Easily change any feature, implementation like add another SQL engine in place of postgres, but behaviour will not change.
3. Abstracts away the implemtation details for invoking function.
4. Each code-base of concerning single unit is broken down based on software-implementation
5. Business logic is separated from software implementation
6. Less need for documentaion, as viewer can easily get the uderstanding of code snippet.
7. Easy to implement as developer needs to focus on only one specific area without worrying about whole picture.

<br>

## Challenges:
1. Needs to refactor the codebase.
2. Think carefully about the name of feature before designing.
3. Needs careful understanding of feature you are trying to implement, such that it can be classifed in the following structure.

<br>

## Modules

### Routes
    where endpoints are defined, and request object is delegated to the controller.
        All endpoints can be defined, and modified from here.
<br>

### Models
    Table schema is defined here.


### Controller
      Main function:
         to extract all the data from request body as defined in schema, 
         invoke the proxy function and get their response
         Wrap the proxy response as send it according to defined schema
         If the request or response schema changes, then we can change the controller code, without tampering with other codeblocks


### Proxy
      Connects with the postgreSQL database, with the help of sequelize ORM.
         all SQL related queries can be added or modified here.
         Invokes validation for json body
         invokes presentation services like file writing, aggregation of response


### Services
      Implements business logic
         Manages filter, page, sort schema
         Handles the error
         Validates the request body
         Aggregates the response based on business requirement
         Generates the report
         Performs folder cleaning on runtime, to optimise memory requirements


### Config
      All the dependecies are initialize here
         database.js - Sequelize config
         passport.js - implements serialize and deserialize stream for cookie handling
         googleStrategy.js - implements google authentication using strategy pattern
         server.js - loads all the environment varible into app from here
         data.js - add or update any functionality based on business requiremnts
            All categories, payment status, payment mode, interval, inflow category, outflow categories are defined here.
