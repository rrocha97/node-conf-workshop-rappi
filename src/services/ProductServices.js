const aws = require('aws-sdk');
const oboe = require('oboe');
const moment = require('moment-timezone');
const logger = require('../utils/logger');
const ProductsRepository = require ('../repositories/ProductsRepository')
const { s3: { accessKeyId, bucket: Bucket, secretAccessKey} } = require ('../../config')

const log = logger.getLogger();
log.productService = 'ProductService';

const s3 = new aws.S3(
  {
    accessKeyId,
    secretAccessKey,
  }
)

const ProductServices = module.exports;

ProductServices.getProducts = (quantity) => ProductsRepository.getProducts(quantity);

ProductServices.processProduct = () => {
  return new Promise((resolve, reject) => {
    s3.listObjectsV2({ Bucket }, (error, data) => {
      const start = moment().valueOf();
      log.info(`Starting s3 download`);

      if (error) return log.error(error);

      const { Key } = data.Contents[data.Contents.length - 1] || {};

      console.log(Key);

      const object = s3.getObject({ Key, Bucket }).createReadStream();
      let promisestack = Promise.resolve();

      return oboe(object)
        .node('!.*', (dataObject) => {
          if (!dataObject) return oboe.drop;

          try {
            const { 
              NAME: name,
              DESCRIPTION: description,
              IMAGE: image,
              LABEL: label,
              TYPE: type,
              QUANTITY: quantity,
              TRADEMARK: trademark,
              PRICE: price
            } = dataObject;

            if (price !== "") {
              promisestack = promisestack.then(() => ProductsRepository.insert(
                {
                  name,
                  description,
                  image,
                  label,
                  type,
                  quantity: parseInt(quantity, 10) || 0,
                  trademark,
                  price: parseInt(price, 10) || 0}
                ).catch(dbError => log.error(dbError, dataObject)));
            }
          } catch (parsingError) {
            log.error(parsingError, dataObject);
          }

          return oboe.drop;
        })
        .on('fail', (err) => {
          log.error(err);
          reject(err);
        })
        .on('done', () => {
          promisestack.then(() => {
            const end = moment().valueOf();
            const seconds = (end - start) / 1000;

            log.info(`s3 download and parsing finished in ${seconds} seconds`);
            resolve();
          });
        });
    });
  });
};
