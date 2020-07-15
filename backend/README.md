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
            sub-category options: research, twitter
        shop:
            sub-category options: none



localhost.com:3000/api/getByLink/{:id}
localhost.com:3000/api/getById/{:id}
localhost.com:3000/api/deleteById/{:id}
    {:id} is the unique _id of the item listed in the database
