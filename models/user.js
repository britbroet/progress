'use strict';

var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 60], //min and max
                    msg: "Name must be between 1 and 60 characters"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: "invalid email address"
                }
            }
        },
        phone: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [8, 255],
                    msg: "Password must be between 8 and 255 characters"
                }
            }
        }
    }, {
        hooks: {
            beforeCreate: function(createdUser, options, cb){ //dont care about options in this case, cb is what happens when done
                var hash = bcrypt.hashSync(createdUser.password, 10);
                createdUser.password = hash;
                cb(null, createdUser);
            }
        },  
        classMethods: {
            associate: function(models) {
            // associations can be defined here
                //models.user.hasMany(models.timeline);
            }
        },
        instanceMethods: {
            validPassword: function(password){
                return bcrypt.compareSync(password, this.password);
            },
            toJSON: function() {
                //this will retrieve user info as JSON
                var jsonUserObject = this.get();
                //remove the password firld from the JSON info
                delete jsonUserObject.password;
                return jsonUserObject;
            }
        }
    });
    return user;
};