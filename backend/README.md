# First time starting the service:
1. Install latest node/npm
2. npm install
3. npm start

# Next times starting the service:
1. npm start

# Connecting to the service:
localhost.com:3000/api/upload/[main-category]/[sub-category]
    main-category options: 
        news:
            sub-category options: 
                research - body parameters: title, link, description
                twitter: text, link, author
        shop:
            sub-category options: none
            body parameters: item_name, link, description, cost



localhost.com:3000/api/getByLink/{:id}
localhost.com:3000/api/getById/{:id}
localhost.com:3000/api/deleteById/{:id}
    {:id} is the unique _id of the item listed in the database
    There is also a query parameter [db_name]

localhost.com:3000/api/getByPage/{:page}
    {:page} is the page of data desired
    There is also a query parameter [db_name]
