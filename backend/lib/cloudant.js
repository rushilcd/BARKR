const Cloudant = require('@cloudant/cloudant');

const cloudant_id = process.env.CLOUDANT_ID || '<cloudant_id>'
const cloudant_apikey = process.env.CLOUDANT_IAM_APIKEY || '<cloudant_apikey>';

const _ = require('lodash');

// UUID creation
const uuidv4 = require('uuid/v4');

import { DB_SHOP, DB_NEWS_TWITTER, DB_NEWS_RESEARCH, DB_NEWS_POLITICS } from '../constants';

var cloudant = new Cloudant({
    account: cloudant_id,
    plugins: {
      iamauth: {
        iamApiKey: cloudant_apikey
      }
    }
  })

// Cloudant DB reference
const db_names = [DB_SHOP, DB_NEWS_TWITTER, DB_NEWS_RESEARCH, DB_NEWS_POLITICS];

/**
 * Connects to the Cloudant DB, creating it if does not already exist
 * @return {Promise} - when resolved, contains the db, ready to go
 */
const dbCloudantConnect = () => {
    return new Promise((resolve, reject) => {
        Cloudant({  // eslint-disable-line
            account: cloudant_id,
                plugins: {
                    iamauth: {
                        iamApiKey: cloudant_apikey
                    }
                }
        }, ((err, cloudant) => {
            if (err) {
                console.log('Connect failure: ' + err.message + ' for Cloudant ID: ' +
                    cloudant_id);
                reject(err);
            } else {
                cloudant.db.list().then((body) => {
                    _.forEach(db_names, (db_name) => { 
                        if (!body.includes(db_name)) {
                            console.log('DB Does not exist..check logs: ' + db_name);
                            reject(new Error('Missing DB'));
                        } 
                    });
                    
                    console.log('Connect success! Connected to DB: ' + db_names);
                    resolve('success');
                }).catch((err) => { console.log(err); reject(err); });
            }
        }));
    });
}

// Initialize the DB when this module is loaded
(function getDbConnection() {
    console.log('Initializing Cloudant connection...', 'getDbConnection()');
    dbCloudantConnect().then((database) => {
        console.log('Cloudant connection initialized.', 'getDbConnection()');
        //db = database;
    }).catch((err) => {
        console.log('Error while initializing DB: ' + err.message, 'getDbConnection()');
        throw err;
    });
})();

function getByTimeStart(db_name, start) {
    return new Promise((resolve, reject) => {
        cloudant.use(db_name).find({ 
            'selector': {
                'timestamp': {"$gte": start }
            }
        }, (err, documents) => {
            if (err) {
                reject(err);
            } else {
                resolve({ data: JSON.stringify(documents.docs), statusCode: 200});
            }
        });
    });
}

function getByTimeEnd(db_name, end) {
    return new Promise((resolve, reject) => {
        cloudant.use(db_name).find({ 
            'selector': {
                'timestamp': {"$lte": end }
            }
        }, (err, documents) => {
            if (err) {
                reject(err);
            } else {
                resolve({ data: JSON.stringify(documents.docs), statusCode: 200});
            }
        });
    });
}

function getByTimeRange(db_name, start, end) {
    return new Promise((resolve, reject) => {
        cloudant.use(db_name).find({ 
            'selector': {
                'timestamp': {"$gte": start,"$lte": end}
            }
        }, (err, documents) => {
            if (err) {
                reject(err);
            } else {
                resolve({ data: JSON.stringify(documents.docs), statusCode: 200});
            }
        });
    });
}

function findByLink(db_name, link) {
    return new Promise((resolve, reject) => {
        if (!link) reject(new Error('empty link'));
        const trimmedLink = _.trim(link);

        cloudant.use(db_name).find({ 
            'selector': {'link': trimmedLink}
        }, (err, documents) => {
            if (err) {
                reject(err);
            } else {
                resolve({ data: JSON.stringify(documents.docs), statusCode: 200});
            }
        });
    });
}

function findById(db_name, id) {
    return new Promise((resolve, reject) => {
        if (!id) reject(new Error('empty id'));
        const trimmedId = _.trim(id);

        cloudant.use(db_name).find({ 
            'selector': {'_id': trimmedId}
        }, (err, documents) => {
            if (err) {
                reject(err);
            } else {
                resolve({ data: JSON.stringify(documents.docs), statusCode: 200});
            }
        });
    });
}

function cleanUrl(url) { 
    const noProt = _.replace(url, /^https?\:\/\//i, ""); 
    return _.split(noProt, '/')[0];
}

/**
 * Create a resource with the specified attributes
 * 
 * @param {String} item_name - the item_name of the item
 * @param {String} link - the link of the item
 * @param {String} description - the description of the item 
 * @param {String} cost - the cost of the item
 * 
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function addShopItem(item_name, link, description, cost)
    return new Promise((resolve, reject) => {
        const currentTime = _.now();
        const news = {
            _id: currentTime + ':' + cleanUrl(_.trim(link)),
            item_name: _.trim(item_name),
            link: _.trim(link),
            description: _.trim(description),
            cost: _.trim(cost),
            timestamp: currentTime
        };
        cloudant.use(DB_SHOP).insert(news, (err, result) => {
            if (err) {
                console.log('Error occurred: ' + err.message, 'create()');
                reject(err);
            } else {
                resolve({ data: { createdId: result._id, createdRevId: result.rev }, statusCode: 201 });
            }
        });
    });
}

/**
 * Create a resource with the specified attributes
 * 
 * @param {String} title - the title of the news
 * @param {String} link - the link of the news
 * @param {String} description - the description of the news
 * 
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function addResearchNews(title, link, description) {
    return new Promise((resolve, reject) => {
        const currentTime = _.now();
        const news = {
            _id: currentTime + ':' + cleanUrl(_.trim(link)),
            title: _.trim(title),
            link: _.trim(link),
            description: _.trim(description),
            timestamp: currentTime
        };
        cloudant.use(DB_NEWS_RESEARCH).insert(news, (err, result) => {
            if (err) {
                console.log('Error occurred: ' + err.message, 'create()');
                reject(err);
            } else {
                resolve({ data: { createdId: result._id, createdRevId: result.rev }, statusCode: 201 });
            }
        });
    });
}


/**
 * Create a resource with the specified attributes
 * 
 * @param {String} text - the text in the tweet
 * @param {String} link - the link of the tweet
 * @param {String} author - the author of the tweet
 * 
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes
 */
function addTwitterNews(text, link, author) {
    return new Promise((resolve, reject) => {
        const currentTime = _.now();
        const news = {
            _id: currentTime + ':' + cleanUrl(_.trim(link)),
            text: _.trim(text),
            link: _.trim(link),
            author: _.trim(author),
            timestamp: currentTime
        };
        cloudant.use(DB_NEWS_TWITTER).insert(news, (err, result) => {
            if (err) {
                console.log('Error occurred: ' + err.message, 'create()');
                reject(err);
            } else {
                resolve({ data: { createdId: result._id, createdRevId: result.rev }, statusCode: 201 });
            }
        });
    });
}



/**
 * Delete a resource that matches a ID.
 * 
 * @param {String} id
 * 
 * @return {Promise} Promise - 
 *  resolve(): Status code as to whether to the object was deleted
 *  reject(): the err object from the underlying data store
 */
function deleteById(id, rev) {
    return new Promise((resolve, reject) => {
        db.get(id, (err, document) => {
            if (err) {
                resolve(err.statusCode);
            } else {
                db.destroy(id, document._rev, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(200);
                    }
                })
            }            
        })
    });
}


/**
 * Update a resource with the requested new attribute values
 * 
 * @param {String} id - the ID of the item (required)
 * 
 * The following parameters can be null
 * 
 * @param {String} type - the type of the item
 * @param {String} name - the name of the item
 * @param {String} description - the description of the item
 * @param {String} quantity - the quantity available 
 * @param {String} location - the GPS location of the item
 * @param {String} contact - the contact info 
 * @param {String} userID - the ID of the user 
 * 
 * @return {Promise} - promise that will be resolved (or rejected)
 * when the call to the DB completes

function update(id, type, name, description, quantity, location, contact, userID) {
    return new Promise((resolve, reject) => {
        db.get(id, (err, document) => {
            if (err) {
                resolve({statusCode: err.statusCode});
            } else {
                let item = {
                    _id: document._id,
                    _rev: document._rev,            // Specifiying the _rev turns this into an update
                }
                if (type) {item["type"] = type} else {item["type"] = document.type};
                if (name) {item["name"] = name} else {item["name"] = document.name};
                if (description) {item["description"] = description} else {item["description"] = document.description};
                if (quantity) {item["quantity"] = quantity} else {item["quantity"] = document.quantity};
                if (location) {item["location"] = location} else {item["location"] = document.location};
                if (contact) {item["contact"] = contact} else {item["contact"] = document.contact};
                if (userID) {item["userID"] = userID} else {item["userID"] = document.userID};
 
                db.insert(item, (err, result) => {
                    if (err) {
                        console.log('Error occurred: ' + err.message, 'create()');
                        reject(err);
                    } else {
                        resolve({ data: { updatedRevId: result.rev }, statusCode: 200 });
                    }
                });
            }            
        })
    });
}

function info() {
    return cloudant.db.get(db_name)
        .then(res => {
            console.log(res);
            return res;
        });
};
*/


/**
 * Find all resources that match the specified partial name.
 * 
 * @param {String} type
 * @param {String} partialName
 * @param {String} userID
 * 
 * @return {Promise} Promise - 
 *  resolve(): all resource objects that contain the partial
 *          name, type or userID provided, or an empty array if nothing
 *          could be located that matches. 
 *  reject(): the err object from the underlying data store
 
function find(type, partialName, userID) {
    return new Promise((resolve, reject) => {
        let selector = {}
        if (type) {
            selector['type'] = type;
        }
        if (partialName) {
            let search = `(?i).*${partialName}.*`;
            selector['name'] = {'$regex': search};

        }
        if (userID) {
            selector['userID'] = userID;
        }
        
        db.find({ 
            'selector': selector
        }, (err, documents) => {
            if (err) {
                reject(err);
            } else {
                resolve({ data: JSON.stringify(documents.docs), statusCode: 200});
            }
        });
    });
}
*/

module.exports = {
    deleteById: deleteById,
    findById: findById,
    findByLink: findByLink,
    addResearchNews: addResearchNews,
    addTwitterNews: addTwitterNews,
    getByTimeStart: getByTimeStart,
    getByTimeEnd: getByTimeEnd,
    getByTimeRange: getByTimeRange,
  };