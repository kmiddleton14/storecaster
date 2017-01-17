'use strict';

const Sequelize = require('sequelize')
const db = require('APP/db')
const PackageExtras = db.models.packageextra

const Package = db.define('package', {
  name: {
    type: Sequelize.STRING,
    defaultValue: ""
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: ""
  },
  imageURL: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  packageType: {
    type: Sequelize.ENUM('template', 'custom'),
    allowNull: false
  }, 
  price: {
    type: Sequelize.DECIMAL(10, 2)
  }
}, {
  instanceMethods: {
    //TODO: do we want this to be called something different, like packagePrice? It depends on where/how we integrate the dynamic price calculation for the base + extras. 
    basePrice: function() {
      let price;
      return this.getBase()
      .then(base => {
        price = parseFloat(base.basePrice);
        return this.getWeatherextras()
      })
      .then(extrasArray => {
        extrasArray.forEach(extra => {
          price += parseFloat(extra.basePrice);
        })
      })
      .then(() => {
        this.setDataValue('price', price)
      })
    }
  }, 
  classMethods: {
    createWithExtras: function(baseId, packageType, extraIdsArray, name=null, description=null, imageURL=null) {
        return this.create({
          base_id: baseId,
          packageType,
          name, 
          description,
          imageURL
        })
        .then(createdPackage => {
          return createdPackage.setWeatherextras(extraIdsArray)
          .then(() => this.findOne({
            where: {
              id: createdPackage.id,
            },
            include: [{
              all: true
            }]
          }))
      })
    }
  }
})

module.exports = Package;
